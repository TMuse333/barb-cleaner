# Reverse Engineer WebsiteMaster Pages from Codebase

## Context

You are working in a client's GitHub repository where code changes have been made directly (components modified, new props added, etc.) but the `pages` attribute of the `websiteMaster` object in MongoDB has not been updated to reflect these changes.

**IMPORTANT:** 
1. Your task is to ONLY update the `pages` array. Do NOT modify other metadata fields like `_id`, `owner`, `templateName`, `websiteName`, `repoName`, `versions`, etc. These will be preserved from the existing `websiteData.json` file.
2. **Read type definitions from repository files** (see "Type Definitions Reference" below) instead of defining them inline. This ensures accuracy and reduces prompt size.

Your task is to analyze the current codebase structure and generate ONLY the `pages` array that accurately represents the current state of the website.

## Project Structure

The repository follows this structure:

```
src/
├── app/
│   ├── page.tsx                    # Homepage (index route)
│   └── [slug]/
│       └── page.tsx                # Other pages
├── components/
│   └── designs/
│       ├── herobanners/
│       │   └── [componentType]/
│       │       ├── [componentType].tsx    # Production component
│       │       └── index.ts               # Props interface & defaults
│       ├── textComponents/
│       ├── contentPieces/
│       ├── carousels/
│       ├── testimonials/
│       ├── navbars/
│       └── footers/
└── data/
    └── homepage.data.ts            # Component props data (if exists)
```

## Component Categories

Components are organized by category:
- `hero` → `herobanners/`
- `textComponent` → `textComponents/`
- `contentPiece` → `contentPieces/`
- `carousel` → `carousels/`
- `testimonial` → `testimonials/`
- `navbar` → `navbars/`
- `footer` → `footers/`
- `misc` → other locations

## Type Definitions Reference

**IMPORTANT:** Instead of defining types inline, read these type files from the repository:

1. **`src/types/websiteDataTypes.ts`** - Contains:
   - `WebsitePage` interface
   - `ComponentTextSnapshot` interface

2. **`src/types/registry/mainRegistry.ts`** - Contains:
   - `PageComponentInstance` interface
   - `ComponentType` and `ComponentCategory` types

3. **`src/types/navbar.ts`** - Contains:
   - `NavbarProps` interface
   - `NavItem` interface (with type, label, href, etc.)

4. **`src/types/registry/types/footer.ts`** - Contains:
   - `Footer1Props` interface
   - References `BaseFooterProps` from `src/types/navbar.ts`

**Read these files to understand the exact structure.** Do not define types inline - reference the actual type definitions.

## Output Structure

**You only need to generate the `pages` array.** The rest of the websiteMaster object will be preserved from existing `websiteData.json`.

The `pages` array must match the `WebsitePage[]` type from `src/types/websiteDataTypes.ts`:

**See `src/types/websiteDataTypes.ts` and `src/types/registry/mainRegistry.ts` for exact interfaces.**

Key points:
- `PageComponentInstance.id` format: `"{componentType}-{order}"`
- `PageComponentInstance.componentCategory` must match folder structure
- `ComponentTextSnapshot.componentId` must match `PageComponentInstance.id`
- `ComponentTextSnapshot.text` is `Partial<BaseTextProps>` (see `src/types/componentTypes.ts`)

## Analysis Steps

### Step 1: Discover Pages

1. Scan `src/app/` directory for page files:
   - `src/app/page.tsx` → homepage (slug: "index")
   - `src/app/[slug]/page.tsx` → dynamic pages
   - `src/app/about/page.tsx` → static pages (slug: "about")

2. For each page file:
   - Extract the page name from the component name or route
   - Determine the slug (route path without leading slash)
   - Note: Homepage always has slug "index"

### Step 2: Extract Components from Pages

For each page file (`page.tsx`):

1. **Find component imports:**
   ```typescript
   import ComponentName from "@/components/designs/{category}/{type}/{type}";
   ```

2. **Find component usage:**
   ```typescript
   <ComponentName {...componentData} />
   ```

3. **Extract props from data files:**
   - Check for `src/data/homepage.data.ts` or similar
   - Look for exported constants like `auroraImageHeroData`, `textAndListData`, etc.
   - These contain the actual prop values

4. **If no data file exists:**
   - Read props directly from component usage in the page file
   - Check for inline props or default values

### Step 3: Read Component Files for Structure

For each component found:

1. **Read the component file:**
   - `src/components/designs/{category}/{type}/{type}.tsx`
   - Identify the component's props interface

2. **Read the index file (if exists):**
   - `src/components/designs/{category}/{type}/index.ts`
   - Contains the props interface definition
   - May contain default props

3. **Map component type to category:**
   - Use folder structure: `herobanners/` → `hero`, `textComponents/` → `textComponent`, etc.

### Step 4: Extract Component Props

For each component instance, extract ALL props including:

**Standard Props (from BaseComponentProps):**
- `mainColor?: string` - Primary color (hex)
- `textColor?: string` - Text color (hex)
- `baseBgColor?: string` - Background color (hex)
- `bgLayout?: { type: "solid" | "linear" | "radial", ... }` - Background layout
- `array?: Array<any>` - Generic array for lists/items
- `items?: Array<any>` - Alternative to array (for carousels)

**Component-Specific Props:**
- Text props: `title`, `description`, `subTitle`, `buttonText`
- Image props: `images.main.src`, `images.main.alt`, `images.logo.src`, etc.
- Layout props: `reverse`, `alignment`, `sticky`, etc.
- Any custom props added to the component

**Important:** If you see a new prop that wasn't in the original structure (like a new image prop), include it in the props object.

### Step 5: Generate Component IDs and Order

For each component in a page:
- **ID Format:** `{componentType}-{order}`
  - Example: `auroraImageHero-0`, `textAndList-1`, `landingNavbar-0`
- **Order:** Based on appearance in the page file (0-based index)
- **Category:** Determined from folder structure

### Step 6: Extract Text Snapshots

For each component, extract text-only data into `ComponentTextSnapshot`:

1. Extract from props:
   - `title` → `text.title`
   - `description` → `text.description`
   - `subTitle` → `text.subTitle`
   - `buttonText` → `text.buttonText`
   - `array` → `text.array` (if it contains text data)

2. Create snapshot:
   ```typescript
   {
     componentId: "auroraImageHero-0",
     componentType: "auroraImageHero",
     text: {
       title: "Extracted title",
       description: "Extracted description",
       // ... other text fields
     }
   }
   ```

### Step 7: Navbar and Footer Prop Conversion

**CRITICAL:** Navbar and Footer components in the client project may have custom prop structures that don't match the registry. You must convert them to match the expected format.

#### Navbar Props Conversion

**Read `src/types/navbar.ts` for exact `NavbarProps` and `NavItem` interfaces.**

The registry expects `NavbarProps` which extends `BaseColorProps` and includes:
- `tabs: NavItem[]` (REQUIRED)
- `logoSrc`, `logoAlt`, `logoText`
- `sticky`, `alignment`, `ctaDestination`, `buttonText`
- Plus `BaseColorProps`: `mainColor`, `textColor`, `baseBgColor`, `bgLayout`

**NavItem structure** (from `src/types/navbar.ts`):
- `type: "link" | "scroll" | "submenu" | "external"`
- `label: string`
- `href?`, `scrollTo?`, `target?`, `children?`

**Common prop name conversions:**
- `links: NavLink[]` → `tabs: NavItem[]` (convert NavLink to NavItem format)
- `navigation: Array<{name, href}>` → `tabs: NavItem[]` (add type: "link")
- `menuItems` → `tabs`
- `navLinks` → `tabs`

**Example conversion:**
```typescript
// Client project might have:
links: [{ name: "Home", destination: "/" }]

// Convert to:
tabs: [{ type: "link", label: "Home", href: "/" }]
```

#### Footer Props Conversion

**Read `src/types/registry/types/footer.ts` for exact `Footer1Props` interface.**
**Also read `src/types/navbar.ts` for `BaseFooterProps` and `StandardTab` interfaces.**

The registry expects `Footer1Props` which extends:
- `BaseFooterProps` (from `src/types/navbar.ts`): `logoSrc`, `logoAlt`, `brandName`, `contact`, `navItems`, `socialLinks`, `developerCredit`
- `BaseColorProps`: `mainColor`, `textColor`, `baseBgColor`, `bgLayout`
- `Footer1Props` requires: `bgLayout: { type: "solid" }`

**StandardTab structure** (from `src/types/navbar.ts`):
- `name: string`
- `href: string`

**Common prop name conversions:**
- `links: Array<{label, url}>` → `navItems: StandardTab[]` (map label→name, url→href)
- `socialMedia: Array<{platform, url}>` → `socialLinks: Array<{name, href}>`
- `contactInfo: {phone, email}` → `contact: FooterContact`
- `footerLinks` → `navItems`

**Example conversion:**
```typescript
// Client project might have:
footerLinks: [{ label: "About", url: "/about" }]

// Convert to:
navItems: [{ name: "About", href: "/about" }]
```

**Important:** 
- If you cannot determine the exact mapping, preserve the original props structure. The system uses `strict: false` in MongoDB schema to allow dynamic props.
- However, try to convert to the expected format first for consistency with the editor.

### Step 8: Handle Special Cases

1. **Navbar Components:**
   - Usually appear first (order: 0)
   - Category: `navbar`
   - May have `array` prop for navigation items

2. **Footer Components:**
   - Usually appear last
   - Category: `footer`

3. **Carousel Components:**
   - May use `items` prop instead of `array`
   - Include all carousel items

4. **New Props:**
   - If you find props that don't match known structure, include them anyway
   - The system uses `strict: false` in MongoDB schema to allow dynamic props

## Output Format

**Generate a markdown file with three sections:**

### 1. Original websiteData.json
Read `src/data/websiteData.json` (if it exists) and display the original `pages` array.

### 2. New websiteData.json
Generate the new `pages` array based on current codebase analysis.

### 3. Changes Documentation
Document all changes between original and new:
- Pages added/removed
- Components added/removed/reordered
- Props changed/added/removed
- Text snapshots updated
- Navbar/Footer prop conversions made

**Output as a single markdown file with this structure:**

```markdown
# WebsiteMaster Pages Update

## Original websiteData.json (pages array)

\`\`\`json
[original pages array from src/data/websiteData.json]
\`\`\`

## New websiteData.json (pages array)

\`\`\`json
[new pages array from codebase analysis]
\`\`\`

## Changes Documentation

### Pages
- [List page changes]

### Components
- [List component changes]

### Props
- [List prop changes]

### Text Snapshots
- [List text snapshot changes]

### Navbar/Footer Conversions
- [List any prop conversions made]
```

**Requirements for the new pages array:**

1. **Accurately reflects current codebase:**
   - All pages from `app/` directory
   - All components in correct order
   - All props including newly added ones
   - All text data extracted

2. **Follows correct structure:**
   - Component IDs in format `{type}-{order}`
   - Component categories match folder structure
   - Text snapshots match component IDs
   - Props are complete and accurate
   - Navbar/Footer props converted to registry format

## Example Output Format

```markdown
# WebsiteMaster Pages Update

## Original websiteData.json (pages array)

\`\`\`json
[
  {
    "pageName": "Home",
    "slug": "index",
    "components": [
      {
        "id": "landingNavbar-0",
        "type": "landingNavbar",
        "order": 0,
        "componentCategory": "navbar",
        "props": {
          "logoText": "Old Name",
          "tabs": []
        }
      }
    ],
    "text": []
  }
]
\`\`\`

## New websiteData.json (pages array)

\`\`\`json
[
  {
    "pageName": "Home",
    "slug": "index",
    "components": [
      {
        "id": "landingNavbar-0",
        "type": "landingNavbar",
        "order": 0,
        "componentCategory": "navbar",
        "props": {
          "logoText": "Client Name",
          "tabs": [
            {
              "type": "link",
              "label": "Home",
              "href": "/"
            }
          ],
          "mainColor": "#3B82F6",
          "textColor": "#FFFFFF",
          "baseBgColor": "#000000",
          "bgLayout": { "type": "solid" }
        }
      },
      {
        "id": "auroraImageHero-1",
        "type": "auroraImageHero",
        "order": 1,
        "componentCategory": "hero",
        "props": {
          "title": "Welcome",
          "description": "Description text",
          "mainColor": "#00FF99",
          "textColor": "#FFFFFF",
          "baseBgColor": "#000000",
          "bgLayout": { "type": "radial" },
          "images": {
            "main": {
              "src": "https://example.com/image.jpg",
              "alt": "Hero image"
            },
            "newImageProp": {
              "src": "https://example.com/new-image.jpg",
              "alt": "New image"
            }
          }
        }
      }
    ],
    "text": [
      {
        "componentId": "landingNavbar-0",
        "componentType": "landingNavbar",
        "text": {
          "title": "Client Name"
        }
      },
      {
        "componentId": "auroraImageHero-1",
        "componentType": "auroraImageHero",
        "text": {
          "title": "Welcome",
          "description": "Description text"
        }
      }
    ]
  }
]
\`\`\`

## Changes Documentation

### Pages
- ✅ Home page exists in both (no changes)

### Components
- ✅ `landingNavbar-0` - Updated props
- ➕ `auroraImageHero-1` - **NEW** component added (order: 1)

### Props
- `landingNavbar-0`:
  - ✅ `logoText`: "Old Name" → "Client Name" (updated)
  - ➕ `tabs`: [] → [{type: "link", label: "Home", href: "/"}] (added navigation)
  - ➕ `mainColor`, `textColor`, `baseBgColor`, `bgLayout` (added color props)
- `auroraImageHero-1`:
  - ➕ All props are new (new component)

### Text Snapshots
- ✅ `landingNavbar-0` - Updated text.title
- ➕ `auroraImageHero-1` - **NEW** text snapshot added

### Navbar/Footer Conversions
- ✅ `landingNavbar-0`: Converted `links` prop to `tabs: NavItem[]` format
```

## Validation Checklist

Before outputting, verify:

- [ ] Original `pages` array is read from `src/data/websiteData.json` (if exists)
- [ ] New `pages` array accurately reflects current codebase
- [ ] All pages from `app/` directory are included
- [ ] All components in each page are included
- [ ] Component IDs follow `{type}-{order}` format
- [ ] Component categories match folder structure
- [ ] All props are extracted (including new ones)
- [ ] Navbar props converted to `tabs: NavItem[]` format
- [ ] Footer props converted to `Footer1Props` format
- [ ] Text snapshots match component IDs
- [ ] Changes are clearly documented with ✅ (unchanged), ➕ (added), ➖ (removed), 🔄 (changed)
- [ ] JSON is valid and properly formatted
- [ ] Markdown file is properly formatted with code blocks

## Notes

- If a component type cannot be determined, use `"misc"` as category
- If props are missing, use empty object `{}` rather than omitting
- Always include `array: []` or `items: []` if the component supports arrays
- Preserve all color and layout props even if they seem default
- New props (like the new image prop mentioned) should be included in the props object

