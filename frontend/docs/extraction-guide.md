# Client Project Extraction Guide

## Purpose

This document serves as a guide to extract all necessary information from the client project that will be used to:
1. Create the `structure.md` instructions manual for Claude
2. Understand how to properly update `websiteData.json`
3. Document the project structure and conventions
4. Identify any structural errors or issues to avoid

**Use this guide when examining the client project to gather all required information.**

---

## Information to Extract

### 1. Project Structure Overview

**What to Document:**
- Root directory structure
- Key folders and their purposes
- File organization patterns
- Naming conventions

**Questions to Answer:**
- What is the overall folder structure?
- Where are components located?
- Where is `websiteData.json` stored?
- Where are pages defined?
- What is the Next.js app router structure?

**Extract:**
```
[Document the full directory tree or key folders]
```

---

### 2. Component System Structure

**What to Document:**
- How components are organized
- Component file structure
- Component categories/types
- Import patterns
- Props structure

**Questions to Answer:**
- Where are components located? (`src/components/designs/`?)
- How are components categorized? (navbar, hero, footer, etc.)
- What files does each component have? (component.tsx, index.ts, etc.)
- How are components imported?
- What is the props structure?

**Extract:**
```
Component Location: [path]
Component Categories: [list]
Component File Structure: [example]
Import Pattern: [example]
Props Structure: [example]
```

---

### 3. websiteData.json Structure

**What to Document:**
- Exact schema/structure of `websiteData.json`
- Required fields
- Optional fields
- Data types
- Nested structures

**Questions to Answer:**
- What is the exact structure of `websiteData.json`?
- What fields are required?
- How are pages structured?
- How are components represented?
- How are props stored?
- What metadata is included?

**Extract:**
```
[Copy or document the exact structure]
[Include example with all fields]
[Note required vs optional fields]
```

---

### 4. How to Update websiteData.json

**What to Document:**
- Process for updating `websiteData.json`
- What needs to be updated when code changes
- How to keep code and JSON in sync
- Common update patterns

**Questions to Answer:**
- When should `websiteData.json` be updated?
- What changes require JSON updates?
- How do code changes map to JSON changes?
- Are there any automated tools/scripts?
- What is the manual process?

**Extract:**
```
Update Process: [step-by-step]
Mapping Rules: [code → JSON]
Common Patterns: [examples]
```

---

### 5. Structural Errors Documentation

**What to Document:**
- Any existing `.md` file about structural errors
- Common mistakes to avoid
- Validation rules
- Error patterns

**Questions to Answer:**
- What structural errors exist?
- What causes them?
- How to prevent them?
- What validation is needed?

**Extract:**
```
[Reference or copy content from structural errors .md file]
[Document common issues]
[Document validation requirements]
```

---

### 6. Code Style & Conventions

**What to Document:**
- Code style guidelines
- Naming conventions
- File organization rules
- Best practices

**Questions to Answer:**
- What are the naming conventions?
- How should files be organized?
- What are the coding standards?
- Any specific patterns to follow?

**Extract:**
```
Naming Conventions: [rules]
File Organization: [rules]
Code Style: [guidelines]
Best Practices: [list]
```

---

### 7. Dependencies & Configuration

**What to Document:**
- Package dependencies
- Configuration files
- Environment variables
- Build setup

**Questions to Answer:**
- What are the key dependencies?
- What configuration is needed?
- Are there any special setup requirements?
- What environment variables are used?

**Extract:**
```
Key Dependencies: [list]
Configuration Files: [list]
Environment Variables: [list]
Build Requirements: [notes]
```

---

### 8. Data Flow & Relationships

**What to Document:**
- How data flows through the project
- Relationships between files
- How components use data
- How pages are generated

**Questions to Answer:**
- How does `websiteData.json` get used?
- How are components rendered from data?
- How are pages generated?
- What is the data flow?

**Extract:**
```
Data Flow: [diagram or description]
File Relationships: [map]
Component Data Usage: [examples]
Page Generation: [process]
```

---

### 9. Update Patterns & Examples

**What to Document:**
- Common update scenarios
- Examples of code changes
- Examples of JSON updates
- Before/after examples

**Questions to Answer:**
- What are common edit scenarios?
- How are colors changed?
- How is content updated?
- How is layout modified?

**Extract:**
```
Common Scenarios: [list with examples]
Color Changes: [example]
Content Updates: [example]
Layout Changes: [example]
```

---

### 10. Validation & Testing

**What to Document:**
- How to validate changes
- Testing requirements
- What to check after updates
- Error detection

**Questions to Answer:**
- How to validate JSON structure?
- How to test component changes?
- What should be checked?
- How to detect errors?

**Extract:**
```
Validation Rules: [list]
Testing Checklist: [list]
Error Detection: [methods]
```

---

## Extraction Checklist

Use this checklist when examining the client project:

### Project Structure
- [ ] Document root directory structure
- [ ] Document key folders (components, pages, data, etc.)
- [ ] Document file organization patterns
- [ ] Document naming conventions

### Component System
- [ ] Document component location
- [ ] Document component categories
- [ ] Document component file structure
- [ ] Document import patterns
- [ ] Document props structure
- [ ] Document component examples

### websiteData.json
- [ ] Copy exact JSON structure
- [ ] Document required fields
- [ ] Document optional fields
- [ ] Document data types
- [ ] Document nested structures
- [ ] Include full example

### Update Process
- [ ] Document update workflow
- [ ] Document code → JSON mapping
- [ ] Document common patterns
- [ ] Document manual process
- [ ] Document automated tools (if any)

### Structural Errors
- [ ] Read structural errors .md file
- [ ] Document common errors
- [ ] Document prevention methods
- [ ] Document validation rules
- [ ] Document error patterns

### Code Style
- [ ] Document naming conventions
- [ ] Document file organization
- [ ] Document code style guidelines
- [ ] Document best practices

### Dependencies
- [ ] List key dependencies
- [ ] Document configuration files
- [ ] Document environment variables
- [ ] Document build requirements

### Data Flow
- [ ] Document data flow diagram
- [ ] Document file relationships
- [ ] Document component data usage
- [ ] Document page generation

### Examples
- [ ] Collect common update examples
- [ ] Collect before/after examples
- [ ] Collect error examples
- [ ] Collect validation examples

### Validation
- [ ] Document validation rules
- [ ] Document testing checklist
- [ ] Document error detection
- [ ] Document quality checks

---

## Extraction Template

Use this template to organize the extracted information:

```markdown
# Client Project Information

## 1. Project Structure
[Your findings here]

## 2. Component System
[Your findings here]

## 3. websiteData.json Structure
[Your findings here]

## 4. Update Process
[Your findings here]

## 5. Structural Errors
[Your findings here - reference the .md file]

## 6. Code Style
[Your findings here]

## 7. Dependencies
[Your findings here]

## 8. Data Flow
[Your findings here]

## 9. Examples
[Your findings here]

## 10. Validation
[Your findings here]
```

---

## Specific Files to Examine

### Must Read:
1. **`structure.md` or similar** - Project structure documentation
2. **`websiteData.json`** - Actual data file (example)
3. **Structural errors .md file** - Error documentation
4. **`package.json`** - Dependencies
5. **Component files** - Example components
6. **Page files** - Example pages
7. **`README.md`** - Project overview

### Should Read:
8. **Configuration files** - `next.config.js`, `tsconfig.json`, etc.
9. **Type definitions** - TypeScript types/interfaces
10. **Utility files** - Helper functions
11. **Update scripts** - Any existing update utilities

---

## Key Questions to Answer

### For Claude Instructions Manual:

1. **Project Structure:**
   - What is the folder structure?
   - Where should files be placed?
   - What are the naming conventions?

2. **Component System:**
   - How are components organized?
   - What is the component structure?
   - How are components used?

3. **Data Management:**
   - How is `websiteData.json` structured?
   - How should it be updated?
   - What is the relationship between code and JSON?

4. **Update Process:**
   - What is the correct way to make changes?
   - How to keep code and JSON in sync?
   - What are common update patterns?

5. **Error Prevention:**
   - What structural errors exist?
   - How to avoid them?
   - What validation is needed?

---

## Output Format

After extraction, you should have:

1. **`structure.md`** - Complete instructions manual for Claude
   - Project structure
   - Component system
   - Update guidelines
   - Error prevention
   - Examples

2. **`websiteData-schema.md`** (optional) - JSON schema documentation
   - Exact structure
   - Field descriptions
   - Examples

3. **`update-process.md`** (optional) - Detailed update process
   - Step-by-step guide
   - Code → JSON mapping
   - Common patterns

---

## Next Steps After Extraction

1. **Review extracted information**
   - Ensure completeness
   - Verify accuracy
   - Fill any gaps

2. **Create structure.md**
   - Combine all information
   - Format for Claude
   - Add examples
   - Add error prevention

3. **Test understanding**
   - Can you explain the structure?
   - Can you explain the update process?
   - Do you know what errors to avoid?

4. **Bring back to this project**
   - Copy `structure.md` to this project
   - Update documentation
   - Use in Claude prompts

---

## Notes Section

Use this section to record any additional findings, questions, or observations:

```
[Your notes here]
```

---

## Questions to Ask Yourself

After extraction, can you answer:

- [ ] What is the exact project structure?
- [ ] How are components organized?
- [ ] What is the structure of `websiteData.json`?
- [ ] How should `websiteData.json` be updated?
- [ ] What structural errors exist?
- [ ] How to prevent errors?
- [ ] What are the code conventions?
- [ ] How does data flow through the project?
- [ ] What are common update patterns?
- [ ] How to validate changes?

If you can answer all of these, you have extracted enough information!

---

## Tips for Extraction

1. **Take Screenshots**
   - Directory structure
   - File examples
   - Code examples

2. **Copy Actual Files**
   - `websiteData.json` example
   - Component examples
   - Configuration files

3. **Document Patterns**
   - Common code patterns
   - Update patterns
   - Error patterns

4. **Ask Questions**
   - If something is unclear, note it
   - Document assumptions
   - Verify understanding

5. **Be Thorough**
   - Better to extract too much than too little
   - Include examples
   - Include edge cases

---

## Final Checklist

Before leaving the client project, ensure you have:

- [ ] Complete project structure documented
- [ ] Component system understood
- [ ] `websiteData.json` structure copied
- [ ] Update process documented
- [ ] Structural errors documented
- [ ] Code style documented
- [ ] Examples collected
- [ ] Questions answered
- [ ] Ready to create `structure.md`

---

**Good luck with the extraction!** 🚀

