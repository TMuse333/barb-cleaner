# What Files to Copy to Parent Project

This guide explains which files from this client project (barb-cleaner) should be copied to the parent/builder project for reuse and documentation.

---

## 🎯 Purpose

The parent project (website builder system) needs:
1. **Templates/Tools** - Reusable guides for documenting future client projects
2. **Examples** - Real-world examples of structure documentation
3. **Lessons Learned** - Error patterns and best practices

---

## ✅ Files to Copy to Parent Project

### 1. **`extraction-guide.md`** ⭐ CRITICAL
**Location:** `frontend/docs/extraction-guide.md`

**Why:**
- This is the **template/checklist** for documenting future client projects
- Should live in the parent project as a reusable tool
- Used when analyzing any new client project from the builder

**What it provides:**
- Systematic checklist for extracting project information
- Template for creating `structure.md` files
- Questions to answer when documenting projects

**Destination in parent project:**
```
parent-project/
└── docs/
    └── extraction-guide.md
```

---

### 2. **`EXTRACTION_GUIDE_ANALYSIS.md`** ✅ RECOMMENDED
**Location:** `frontend/docs/EXTRACTION_GUIDE_ANALYSIS.md`

**Why:**
- Explains how the extraction guide works in practice
- Documents the relationship between guide and actual projects
- Helps understand workflow differences and gaps

**What it provides:**
- Analysis of extraction guide vs. reality
- Workflow insights
- Documentation gaps identified

**Destination in parent project:**
```
parent-project/
└── docs/
    └── EXTRACTION_GUIDE_ANALYSIS.md
```

---

### 3. **`PROJECT_STRUCTURE.md` (as example)** ✅ OPTIONAL
**Location:** `frontend/docs/PROJECT_STRUCTURE.md`

**Why:**
- Serves as a **real-world example** of what `structure.md` looks like
- Shows how the extraction guide results in actual documentation
- Can be used as a template/starting point for future projects

**Important Note:**
- Rename it to something like `structure-example.md` or `client-project-structure-example.md`
- Keep it as a reference, not to replace the extraction guide

**What it provides:**
- Complete structure documentation example
- Shows all sections that should be covered
- Demonstrates formatting and depth

**Destination in parent project:**
```
parent-project/
└── docs/
    └── examples/
        └── structure-example.md  (renamed from PROJECT_STRUCTURE.md)
```

---

### 4. **`errors.md`** ✅ RECOMMENDED
**Location:** `frontend/docs/errors.md`

**Why:**
- Documents common errors encountered during migration
- Helps prevent similar issues in future projects
- Part of the "lessons learned" documentation

**What it provides:**
- Error patterns to watch for
- Common migration issues
- Validation requirements

**Destination in parent project:**
```
parent-project/
└── docs/
    └── common-errors/
        └── migration-errors-example.md  (renamed)
```

---

## ❌ Files to Keep in This Project (Don't Copy)

### 1. **`PROJECT_STRUCTURE.md`** (original)
- **Keep here:** This is specific to the barb-cleaner project
- **Reason:** Contains project-specific paths, components, and structure
- **Note:** Can copy as an EXAMPLE (see above), but keep original here

### 2. **`CURSOR_VS_CLAUDE.md`**
- **Keep here:** Tool comparison specific to this workflow
- **Reason:** More of a personal/workflow preference document

### 3. **`QUICK_START.md`**
- **Keep here:** Specific to this project's setup
- **Reason:** Project-specific quick start guide

### 4. **`copy-analysis.md`**
- **Keep here:** Analysis specific to this project's content
- **Reason:** Content-specific, not structural

### 5. **Any data files** (`homepage.data.ts`, `websiteData.json`)
- **Keep here:** Client-specific content
- **Reason:** Not relevant to parent project structure

---

## 📋 Recommended File Structure in Parent Project

After copying, the parent project should have:

```
parent-project/
└── docs/
    ├── extraction-guide.md                    # Template/checklist (from barb-cleaner)
    ├── EXTRACTION_GUIDE_ANALYSIS.md           # Analysis/insights (from barb-cleaner)
    ├── examples/
    │   ├── structure-example.md               # Example structure doc (from barb-cleaner)
    │   └── migration-errors-example.md        # Example error doc (from barb-cleaner)
    └── templates/
        └── structure-template.md              # Optional: Generic template version
```

---

## 🎯 Summary: What to Copy

| File | Copy? | Rename? | Purpose in Parent |
|------|-------|---------|-------------------|
| `extraction-guide.md` | ✅ YES | No | Reusable template/checklist |
| `EXTRACTION_GUIDE_ANALYSIS.md` | ✅ YES | No | Workflow insights |
| `PROJECT_STRUCTURE.md` | ✅ YES (as example) | → `structure-example.md` | Real-world example |
| `errors.md` | ✅ YES (as example) | → `migration-errors-example.md` | Error patterns |
| `CURSOR_VS_CLAUDE.md` | ❌ NO | - | Keep in client project |
| `QUICK_START.md` | ❌ NO | - | Keep in client project |
| `copy-analysis.md` | ❌ NO | - | Keep in client project |

---

## 🚀 Action Items

### Step 1: Copy Core Templates
```bash
# From parent project, copy these files:
cp barb-cleaner/frontend/docs/extraction-guide.md parent-project/docs/
cp barb-cleaner/frontend/docs/EXTRACTION_GUIDE_ANALYSIS.md parent-project/docs/
```

### Step 2: Copy Examples (renamed)
```bash
# Copy as examples (rename appropriately):
cp barb-cleaner/frontend/docs/PROJECT_STRUCTURE.md parent-project/docs/examples/structure-example.md
cp barb-cleaner/frontend/docs/errors.md parent-project/docs/examples/migration-errors-example.md
```

### Step 3: Update Parent Project Documentation
- Reference the extraction guide in parent project README
- Link to examples in parent project docs
- Create index/table of contents for all docs

---

## 💡 How to Use These Files in Parent Project

### For Future Client Projects:

1. **Start with `extraction-guide.md`**
   - Use the checklist when analyzing a new client project
   - Follow the template to extract information

2. **Reference `EXTRACTION_GUIDE_ANALYSIS.md`**
   - Understand workflow differences
   - Learn from lessons identified

3. **Use `structure-example.md` as template**
   - Copy as starting point
   - Customize for new project's specifics
   - Save as `structure.md` in new project

4. **Check `migration-errors-example.md`**
   - Avoid common pitfalls
   - Watch for error patterns

---

## 🔄 Workflow

```
New Client Project Received
    ↓
Use extraction-guide.md (from parent project)
    ↓
Extract information systematically
    ↓
Create structure.md (using structure-example.md as template)
    ↓
Use structure.md in client project for Claude/AI assistance
    ↓
Document errors in client project's errors.md
    ↓
(Optional) Copy useful insights back to parent project examples
```

---

## ✅ Final Checklist

Before copying, ensure:

- [ ] `extraction-guide.md` is complete and up-to-date
- [ ] `EXTRACTION_GUIDE_ANALYSIS.md` accurately reflects workflow
- [ ] `PROJECT_STRUCTURE.md` is a good example (doesn't have client-specific secrets)
- [ ] `errors.md` has useful patterns (not just project-specific issues)
- [ ] Parent project has appropriate docs/ folder structure

---

**Remember:** The parent project should contain **reusable templates and examples**, while client projects contain **project-specific documentation**.

