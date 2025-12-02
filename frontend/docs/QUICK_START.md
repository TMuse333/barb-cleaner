# Quick Start Guide for Claude Code

This guide explains how to use this project structure as a template/reference for future projects with Claude Code or similar AI coding assistants.

## ✅ Yes, Claude Code is a Solid Option!

Using this project structure guide with Claude Code is a **great approach** for maintaining consistency across projects. Here's why:

### Why This Works Well:

1. **Clear Patterns** - The structure guide documents exact patterns and conventions
2. **Type Safety** - TypeScript interfaces ensure correct prop usage
3. **Consistent Architecture** - All components follow the same structure
4. **Reproducible** - Anyone can follow the guide to create matching components

## 📋 How to Use This Guide with Claude Code

### Step 1: Provide the Structure Guide

When starting a new project, give Claude Code:
```
"Use the project structure from frontend/docs/PROJECT_STRUCTURE.md as a reference. 
Make sure this new project follows the same patterns, conventions, and architecture."
```

### Step 2: Reference Key Files

Point Claude Code to key reference files:
- `PROJECT_STRUCTURE.md` - Architecture patterns
- `errors.md` - Common pitfalls to avoid
- An example component folder structure
- The data organization pattern

### Step 3: Specify Requirements

Example prompt for Claude Code:
```
"Create a new Next.js project with this structure:
- Components in src/components/designs/ organized by category
- Data in src/data/ as typed constants
- Follow the component pattern from PROJECT_STRUCTURE.md
- Use the color system from lib/colorUtils
- Set up Tailwind CSS v4 with the same configuration"
```

## 🎯 Best Practices for Using Claude Code

1. **Reference Existing Code** - Point to working examples
2. **Specify Patterns** - "Use the same prop merging pattern as CarouselHero"
3. **Type Safety** - "All props must extend BaseComponentProps"
4. **File Structure** - "Follow the componentName/componentName.tsx + index.ts pattern"
5. **Error Prevention** - "Make sure to pass bgLayout.type to deriveColorPalette"

## 🔄 Maintaining Consistency

### For Each New Component:

1. Reference the component pattern
2. Use the same prop structure
3. Follow the safe fallback pattern
4. Generate colors using the same method
5. Place data in the data file

### For Each New Project:

1. Copy the directory structure
2. Set up the same utility libraries
3. Configure Tailwind the same way
4. Use the same type definitions
5. Follow the same naming conventions

## 💡 Example Claude Code Prompt

```
"I need to add a new testimonial component. Follow the structure guide:
- Create TestimonialsNew in src/components/designs/testimonials/
- Use the same prop pattern as Testimonials3
- Follow the safe fallback pattern for colors
- Add data to homepage.data.ts as testimonialsNewData
- Make sure bgLayout.type is passed to deriveColorPalette
- Use the same animation patterns"
```

This approach ensures:
- ✅ Consistency across projects
- ✅ Faster development
- ✅ Fewer errors
- ✅ Maintainable codebase
- ✅ Easy onboarding for new developers

