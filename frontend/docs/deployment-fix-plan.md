# Production Deployment Fix Plan

**Goal:** Fix the production deployment system to generate the correct file structure and successfully deploy to the production branch.

**Current Status:** Deployment generates wrong structure and missing component files
**Target Status:** Deployment generates clean three-layer architecture with all necessary files

---

## Overview of Changes

The deployment system needs to:
1. ✅ Generate correct three-file structure per page
2. ✅ Copy component files from experiment to production
3. ✅ Clean up legacy files in production branch
4. ✅ Update git staging to include all generated files
5. ✅ Add validation and testing

---

## Phase 1: Create New Templates & Generators

### Step 1.1: Create Route Template

**File:** `src/lib/deploy/templates/route.template.ts`

**Prompt:**
```
Create a new file at src/lib/deploy/templates/route.template.ts that exports:
1. ROUTE_TEMPLATE - A template string for Next.js route.ts files
2. Helper functions: formatMetadataForRoute(), capitalizePageName()

The route template should:
- Import the page component from @/components/pageComponents/{slug}
- Export Next.js Metadata object with SEO data
- Export default function that renders the page component
- Be production-ready (no editor imports)

Example output structure:
```typescript
import HomePage from '@/components/pageComponents/home';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "...",
  description: "...",
  // ... other SEO fields
};

export default function HomeRoute() {
  return <HomePage />;
}
```
```

**Checkpoint Test:**
```bash
# Verify the template file exists and exports correctly
npx ts-node -e "import('./src/lib/deploy/templates/route.template').then(m => console.log(Object.keys(m)))"
# Expected output: [ 'ROUTE_TEMPLATE', 'formatMetadataForRoute', 'capitalizePageName' ]
```

---

### Step 1.2: Create Page Component Template

**File:** `src/lib/deploy/templates/pageComponent.template.ts`

**Prompt:**
```
Create a new file at src/lib/deploy/templates/pageComponent.template.ts that exports:
1. PAGE_COMPONENT_TEMPLATE - A template for page components
2. Helper functions: generateComponentImport(), generateComponentRender()

The page component template should:
- Import all components used on the page
- Import all props from the data file
- Render components in order with their props
- Be a simple React component (no Metadata here - that's in route.ts)

Example output structure:
```typescript
import AuroraImageHero from '@/components/designs/herobanners/auroraImageHero/auroraImageHero';
import TextAndList from '@/components/designs/textComponents/textAndList/textAndList';
import { component1Props, component2Props } from '@/data/home.data';

export default function HomePage() {
  return (
    <main>
      <AuroraImageHero {...component1Props} />
      <TextAndList {...component2Props} />
    </main>
  );
}
```
```

**Checkpoint Test:**
```bash
# Verify the template file exists and exports correctly
npx ts-node -e "import('./src/lib/deploy/templates/pageComponent.template').then(m => console.log(Object.keys(m)))"
# Expected: [ 'PAGE_COMPONENT_TEMPLATE', 'generateComponentImport', 'generateComponentRender' ]
```

---

### Step 1.3: Update generatePageFiles.ts

**File:** `src/lib/deploy/generators/generatePageFiles.ts`

**Prompt:**
```
Update src/lib/deploy/generators/generatePageFiles.ts to generate the THREE-FILE structure:

1. Add imports for the new templates:
   - Import from './templates/route.template'
   - Import from './templates/pageComponent.template'

2. Create three new generator functions:
   - generatePageComponent() - generates page component file
   - generatePageData() - generates data file (update existing)
   - generateRoute() - generates Next.js route file

3. Update generateAllPageFiles() to generate THREE files per page:
   - src/components/pageComponents/{slug}.tsx (page component)
   - src/data/{slug}.data.ts (data file)
   - src/app/{slug}/route.ts (Next.js route - NOT route.tsx)

4. Handle special case: "index" page should map to:
   - src/components/pageComponents/home.tsx
   - src/data/home.data.ts
   - src/app/route.ts (root route)

5. Keep all existing validation logic (validateComponentTypes, getUsedComponentTypes)
```

**Checkpoint Test:**
```typescript
// Test file: src/lib/deploy/generators/__tests__/generatePageFiles.test.ts
import { generateAllPageFiles } from '../generatePageFiles';

const mockWebsiteData = {
  pages: {
    index: {
      name: 'Home',
      components: [
        { id: 'hero1', type: 'auroraImageHero', order: 1, props: { title: 'Test' } }
      ]
    }
  }
};

const files = generateAllPageFiles(mockWebsiteData, {});

// Should generate 3 files for index page:
console.assert(files.length === 3, 'Should generate 3 files');
console.assert(files.some(f => f.path === 'src/components/pageComponents/home.tsx'), 'Missing home.tsx');
console.assert(files.some(f => f.path === 'src/data/home.data.ts'), 'Missing home.data.ts');
console.assert(files.some(f => f.path === 'src/app/route.ts'), 'Missing route.ts');
console.log('✅ All tests passed');
```

---

## Phase 2: Add Component Copying Logic

### Step 2.1: Create Component Copy Utility

**File:** `src/lib/deploy/copyComponents.ts`

**Prompt:**
```
Create a new file at src/lib/deploy/copyComponents.ts that exports:

1. Function: copyProductionComponents(usedComponentTypes: string[]): Promise<CopyResult>
   - Takes array of component types (e.g., ['auroraImageHero', 'textAndList'])
   - For each type, uses componentRegistry to get file paths
   - Copies ONLY production files (exclude *Edit.tsx and *Edit.ts files)
   - Returns success/failure report

2. Files to copy for each component:
   - {componentName}.tsx (main component file)
   - index.ts (exports component and types)
   - Any .ts files (type definitions)
   - Exclude: *Edit.tsx, *Edit.ts, *.test.tsx, *.stories.tsx

3. Source: Current working directory (experiment branch files)
4. Destination: Same relative paths (will be written when on production branch)

5. Return type:
   interface CopyResult {
     success: boolean;
     componentsCopied: number;
     filesCopied: string[];
     errors: string[];
   }

6. Add dry-run support: if dryRun=true, just log what would be copied
```

**Checkpoint Test:**
```typescript
// Test in Node REPL or test file
import { copyProductionComponents } from './src/lib/deploy/copyComponents';

// Dry run test
const result = await copyProductionComponents(['auroraImageHero'], true);
console.log(result);
// Expected: { success: true, componentsCopied: 1, filesCopied: [...], errors: [] }
// Should list files that WOULD be copied without actually copying
```

---

### Step 2.2: Integrate Component Copying into Deployment

**File:** `src/app/api/production/deploy-stream/route.ts`

**Prompt:**
```
Update src/app/api/production/deploy-stream/route.ts to include component copying:

1. Import the new copyComponents utility
2. Add a new stage BETWEEN validation and file generation:
   - Stage 2: Component Copying (shift SEO to stage 3, files to stage 4, etc.)

3. In the new Component Copying stage:
   - Get used component types from validation.usedTypes
   - Call copyProductionComponents() with dryRun flag
   - Send SSE progress updates
   - Handle errors gracefully (warn but don't fail deployment)

4. Update INITIAL_STAGES in src/components/editor/dashboard/deployPanel.tsx:
   - Add stage: { id: 'components', name: 'Component Copying', description: 'Copying component files', status: 'pending' }
   - Renumber subsequent stages
```

**Checkpoint Test:**
```bash
# Start dev server
npm run dev

# In browser, open editor and go to Deploy tab
# Click "Deploy (Dry Run)"
# Watch console and UI for new "Component Copying" stage
# Should show progress: "Copied N component files"
```

---

## Phase 3: Update Git Operations

### Step 3.1: Update Git Staging Logic

**File:** `src/lib/deploy/git-operations.ts`

**Prompt:**
```
Update src/lib/deploy/git-operations.ts commitProductionBuild() function:

Change line 184 from:
  execGit('add src/app/\\(pages\\)');

To:
  execGit('add src/components/pageComponents');
  execGit('add src/components/designs');
  execGit('add src/data');
  execGit('add src/app');

This ensures all generated and copied files are staged.
```

**Checkpoint Test:**
```bash
# Manual test after implementing:
# 1. Run dry-run deployment
# 2. Check git status to see what would be staged
git status
# Should show files in all four directories
```

---

### Step 3.2: Add websiteData.json Sync

**File:** `src/lib/deploy/git-operations.ts`

**Prompt:**
```
Add a new function to src/lib/deploy/git-operations.ts:

export async function syncWebsiteDataJson(
  websiteData: any
): Promise<GitOperationResult> {
  try {
    const jsonPath = path.join(process.cwd(), 'src/data/websiteData.json');
    const content = JSON.stringify(websiteData, null, 2);
    fs.writeFileSync(jsonPath, content, 'utf-8');

    console.log('✅ Updated websiteData.json');
    return {
      success: true,
      message: 'Updated websiteData.json'
    };
  } catch (error: any) {
    return {
      success: false,
      message: `Failed to update websiteData.json: ${error.message}`
    };
  }
}

Then call this function in deployToProduction() after writing generated files.
Also update git staging to include: execGit('add src/data/websiteData.json');
```

**Checkpoint Test:**
```bash
# After deployment, check if websiteData.json was updated
git diff src/data/websiteData.json
# Should show updated content matching current state
```

---

## Phase 4: Clean Production Branch

### Step 4.1: Manual Cleanup (One-time)

**Prompt:**
```
Manually clean the production branch by deleting legacy files:

# Checkout production branch
git checkout production

# Remove legacy files
rm -rf src/app/\(pages\)
rm -f src/components/pageComponents/PageRenderer.tsx
rm -f src/components/pageComponents/homepage.tsx
rm -rf src/app/\[slug\]

# Update index file to remove componentMap export
# Edit src/components/pageComponents/index.ts
# Remove line: export { componentMap, createRenderComponent } from "./componentMap";

# Commit cleanup
git add -A
git commit -m "Clean up legacy files and incorrect structure"
git push origin production

# Return to experiment branch
git checkout experiment  # or your working branch
```

**Checkpoint Test:**
```bash
# Verify production branch is clean
git checkout production
ls src/app/
# Should NOT show (pages) or [slug] directories

ls src/components/pageComponents/
# Should NOT show PageRenderer.tsx or homepage.tsx

git checkout experiment  # return to working branch
```

---

### Step 4.2: Create Automated Cleanup (Optional)

**File:** `src/lib/deploy/cleanProduction.ts`

**Prompt:**
```
Create src/lib/deploy/cleanProduction.ts that exports:

export async function cleanProductionBranch(): Promise<CleanupResult> {
  // Remove legacy files if they exist:
  const filesToRemove = [
    'src/app/(pages)',
    'src/components/pageComponents/PageRenderer.tsx',
    'src/components/pageComponents/homepage.tsx',
    'src/app/[slug]',
  ];

  // For each file/directory, check if exists and remove
  // Return report of what was cleaned
}

This can be called as an optional pre-deployment step.
```

---

## Phase 5: Add Validation & Testing

### Step 5.1: Create Pre-deployment Validator

**File:** `src/lib/deploy/validators/deploymentValidator.ts`

**Prompt:**
```
Create src/lib/deploy/validators/deploymentValidator.ts that exports:

export async function validateDeployment(
  websiteData: WebsiteData
): Promise<ValidationResult> {
  const issues: string[] = [];
  const warnings: string[] = [];

  // Check 1: All component types exist in registry
  const usedTypes = getUsedComponentTypes(websiteData);
  usedTypes.forEach(type => {
    if (!getComponentInfo(type)) {
      issues.push(`Component type "${type}" not found in registry`);
    }
  });

  // Check 2: All pages have at least one component
  Object.entries(websiteData.pages).forEach(([slug, page]) => {
    if (!page.components || page.components.length === 0) {
      warnings.push(`Page "${slug}" has no components`);
    }
  });

  // Check 3: Component files exist in current branch
  for (const type of usedTypes) {
    const info = getComponentInfo(type);
    if (info) {
      const componentPath = info.componentImportPath.replace('@/', 'src/');
      const filePath = `${componentPath}.tsx`;
      if (!fs.existsSync(filePath)) {
        issues.push(`Component file not found: ${filePath}`);
      }
    }
  }

  return {
    valid: issues.length === 0,
    issues,
    warnings
  };
}
```

**Checkpoint Test:**
```typescript
// Test with valid data
const result = await validateDeployment(validWebsiteData);
console.assert(result.valid === true, 'Should be valid');

// Test with invalid component type
const badData = { pages: { index: { components: [{ type: 'nonexistent', order: 1 }] } } };
const result2 = await validateDeployment(badData);
console.assert(result2.valid === false, 'Should be invalid');
console.assert(result2.issues.length > 0, 'Should have issues');
```

---

### Step 5.2: Add Validation to Deployment Pipeline

**File:** `src/app/api/production/deploy-stream/route.ts`

**Prompt:**
```
Update the deployment pipeline to use the new validator:

1. Import validateDeployment from validators
2. In Stage 1 (Validation), enhance to use the new validator:
   - Call validateDeployment(websiteData)
   - If issues found, send error event and stop
   - If warnings found, send stage event with warnings but continue
3. Update the validation stage to show more detailed messages
```

---

## Phase 6: End-to-End Testing

### Test 6.1: Dry Run Deployment

**Prompt:**
```
Test the complete pipeline with a dry run:

1. Start development server: npm run dev
2. Open browser to editor
3. Navigate to Deploy tab
4. Click "Deploy (Dry Run)"
5. Watch the progress through all stages
6. Verify in console logs:
   - ✅ Validation passed
   - ✅ Components would be copied
   - ✅ SEO generated (or skipped)
   - ✅ Files would be generated (check file paths)
   - ✅ Code review (or skipped)
   - ✅ Git operations simulated
   - ✅ Vercel deployment simulated

7. Check the dry run output lists:
   - src/components/pageComponents/*.tsx files
   - src/data/*.data.ts files
   - src/app/*/route.ts files (NOT src/app/(pages)!)
```

**Expected Output:**
```
📋 DRY RUN - What would happen:

1. ✓ Would checkout/create production branch
2. ✓ Would write 9 files to disk:
     - src/components/pageComponents/home.tsx
     - src/data/home.data.ts
     - src/app/route.ts
     - src/components/pageComponents/about.tsx
     - src/data/about.data.ts
     - src/app/about/route.ts
     - ... (etc)
3. ✓ Would commit with message: "Generated 9 files for 3 pages"
...
```

---

### Test 6.2: Real Deployment

**Prompt:**
```
Test a real deployment to production branch:

⚠️ IMPORTANT: Make sure you've committed all changes in experiment branch first!

1. Ensure experiment branch is clean:
   git status  # should be clean

2. In editor Deploy tab, click "Deploy to Production" (NOT dry run)

3. Monitor the deployment progress

4. After completion, verify the production branch:
   git checkout production

5. Check file structure:
   ls -la src/components/pageComponents/
   # Should show: home.tsx, about.tsx, services.tsx (or your pages)

   ls -la src/data/
   # Should show: home.data.ts, about.data.ts, services.data.ts, websiteData.json

   ls -la src/app/
   # Should show: route.ts, about/, services/ directories

   ls -la src/app/about/
   # Should show: route.ts

6. Check component files were copied:
   ls -la src/components/designs/herobanners/auroraImageHero/
   # Should show: auroraImageHero.tsx, index.ts (NOT .gitkeep only)

7. Verify no legacy files:
   ls src/app/ | grep "(pages)"
   # Should return nothing

   ls src/components/pageComponents/ | grep "PageRenderer"
   # Should return nothing

8. Try to build the production branch:
   npm run build
   # Should build successfully with no errors

9. Return to experiment branch:
   git checkout experiment
```

**Expected Results:**
- ✅ All files in correct locations
- ✅ Component files copied successfully
- ✅ No (pages) directory
- ✅ No PageRenderer or legacy files
- ✅ Build succeeds without errors
- ✅ websiteData.json is up to date

---

### Test 6.3: Verify Production Build Locally

**Prompt:**
```
Test the production build locally:

1. Checkout production branch:
   git checkout production

2. Install dependencies (if needed):
   npm install

3. Build the project:
   npm run build

4. Start production server:
   npm start

5. Visit pages in browser:
   - http://localhost:3000 (home page)
   - http://localhost:3000/about
   - http://localhost:3000/services

6. Verify:
   - ✅ Pages load without errors
   - ✅ Components render correctly
   - ✅ No console errors
   - ✅ No 404s for component imports
   - ✅ SEO metadata appears in page source (View Source)

7. Return to experiment branch:
   git checkout experiment
```

---

## Phase 7: Vercel Deployment (Final Test)

### Test 7.1: Deploy to Vercel

**Prompt:**
```
Test Vercel deployment (requires VERCEL_PROJECT_ID in .env):

1. Ensure .env.local has:
   VERCEL_PROJECT_ID=your-project-id
   VERCEL_TOKEN=your-vercel-token

2. In editor, click "Deploy to Production"

3. Wait for all stages to complete including Vercel deployment

4. Visit the Vercel deployment URL provided

5. Test all pages in production:
   - Home page
   - About page
   - Services page
   - Any other pages

6. Verify in Vercel dashboard:
   - Deployment succeeded
   - Build logs show no errors
   - Production branch was deployed
```

---

## Troubleshooting Guide

### Issue: "Component type not found in registry"

**Solution:**
```
1. Check src/lib/componentRegistry.ts
2. Ensure component type matches exactly (case-sensitive)
3. Add missing component to PRODUCTION_COMPONENTS object
4. Verify componentImportPath is correct
```

### Issue: "Module not found" errors during build

**Solution:**
```
1. Check production branch has component files:
   git checkout production
   find src/components/designs -name "*.tsx" | grep -v Edit
   # Should show actual component files, not just .gitkeep

2. If missing, check copyComponents.ts logic
3. Verify componentRegistry paths are correct
4. Re-run deployment
```

### Issue: Files generated in wrong location

**Solution:**
```
1. Check generatePageFiles.ts line ~260
2. Verify paths use correct structure:
   - src/components/pageComponents/{slug}.tsx
   - src/data/{slug}.data.ts
   - src/app/{slug}/route.ts
3. NOT: src/app/(pages)/{slug}/page.tsx
```

### Issue: Git push fails

**Solution:**
```
1. Check git remote is configured:
   git remote -v

2. Verify you have push permissions

3. Check if production branch exists remotely:
   git ls-remote --heads origin production

4. If not, push manually first:
   git checkout production
   git push -u origin production
   git checkout experiment
```

---

## Success Criteria Checklist

After completing all phases, verify:

- [ ] Deployment generates THREE files per page (component, data, route)
- [ ] Files are in correct locations (NOT in (pages)/)
- [ ] Component files are copied to production branch
- [ ] Legacy files (PageRenderer, homepage, [slug]) are removed
- [ ] websiteData.json is synced
- [ ] Git staging includes all directories
- [ ] Dry run shows correct file paths
- [ ] Real deployment succeeds
- [ ] Production branch builds without errors
- [ ] Production pages load correctly in browser
- [ ] SEO metadata is present
- [ ] Vercel deployment works (if configured)
- [ ] No errors in browser console
- [ ] All pages render components correctly

---

## Rollback Plan

If something goes wrong:

```bash
# 1. Switch to production branch
git checkout production

# 2. Reset to previous working commit (find SHA in git log)
git log --oneline
git reset --hard <previous-working-sha>

# 3. Force push (⚠️ dangerous - only if you're sure)
git push --force origin production

# 4. Return to experiment branch
git checkout experiment

# 5. Debug the issue before trying again
```

---

## Additional Notes

- Always test with dry run first
- Keep experiment branch as source of truth
- Production branch should be auto-generated, not manually edited
- If manual edits needed in production, consider updating the generator instead
- Component files should NOT have *Edit.tsx variants in production
- The production branch should be deployable standalone (no editor dependencies)

---

## Estimated Time

- Phase 1: 2-3 hours (templates and generators)
- Phase 2: 1-2 hours (component copying)
- Phase 3: 30 minutes (git operations)
- Phase 4: 15 minutes (cleanup)
- Phase 5: 1 hour (validation)
- Phase 6: 1 hour (testing)
- Phase 7: 30 minutes (Vercel)

**Total: 6-8 hours of focused work**

---

## Next Steps

Start with Phase 1, Step 1.1 and work through sequentially. Test at each checkpoint before moving to the next step.
