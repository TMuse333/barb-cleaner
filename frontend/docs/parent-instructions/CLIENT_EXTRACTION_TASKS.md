# Client Project Extraction Tasks

**Purpose:** Extract information from the client project to bring back to the main SaaS project.

---

## Task 1: Document `websiteData.json` Structure

**Create:** `websiteData-schema.md`

### What to Extract:

1. **Full JSON Example**
   - Copy a complete `websiteData.json` file
   - Include all pages and components
   - Show all component types

2. **Schema Documentation**
   - Top-level structure (templateName, websiteName, status, formData, pages, etc.)
   - Page structure (components array, text array)
   - Component structure (id, type, order, componentCategory, props)
   - Props structure for each component type
   - Array item types (StandardText, CarouselItem, etc.)
   - Color props (mainColor, textColor, baseBgColor, bgLayout)
   - Required vs optional fields

3. **Component Types List**
   - All component types used
   - What props each type expects
   - Special cases or variations

### Questions to Answer:
- What is the exact structure of `websiteData.json`?
- How are components nested within pages?
- What props does each component type have?
- How are arrays structured?
- What are the data types for each field?

---

## Task 2: Analyze Update Script Issues

**Create:** `websiteMaster-updater-analysis.md`

### What to Analyze:

1. **Find the Update Script**
   - Location: `src/utils/updateWebsiteMaster.ts` (in client project)
   - This script was copied from the main SaaS project

2. **Document Current Issues**
   - Where is `type: any` used?
   - What type safety problems exist?
   - What validations are missing?
   - What breaks when it runs?
   - What edge cases aren't handled?

3. **Document Pitfalls**
   - Data inconsistencies
   - Missing error handling
   - Sync issues (code ↔ JSON ↔ MongoDB)
   - What should happen vs what actually happens

4. **Document Ideal Behavior**
   - What should the script do?
   - How should it validate data?
   - How should it handle errors?
   - What should the type safety look like?

### Questions to Answer:
- What does the script currently do?
- Where are the `type: any` usages?
- What validations are missing?
- What breaks when it runs?
- How should it work ideally?
- What are the sync requirements?

---

## Output Files

After extraction, you should have:

1. ✅ `websiteData-schema.md` - Complete JSON structure documentation
2. ✅ `websiteMaster-updater-analysis.md` - Analysis of current script issues

---

## Quick Checklist

### For websiteData.json:
- [ ] Copy full example JSON file
- [ ] Document top-level structure
- [ ] Document page structure
- [ ] Document component structure
- [ ] Document props for each component type
- [ ] Document array item types
- [ ] Document color props structure
- [ ] List all component types

### For Update Script:
- [ ] Locate `updateWebsiteMaster.ts` in client project
- [ ] Document all `type: any` usages
- [ ] Document missing validations
- [ ] Document what breaks
- [ ] Document edge cases not handled
- [ ] Document ideal behavior
- [ ] Document sync requirements

---

**Bring these files back to:** `frontend/docs/clientProjectDocs/`

