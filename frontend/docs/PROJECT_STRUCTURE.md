# Project Structure Guide

This document explains the architecture, organization, and patterns used in this Next.js website builder project. Use this as a reference guide for understanding how components, data, and styling work together.

## 📁 Directory Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with Tailwind CSS import
│   │   ├── page.tsx           # Homepage entry point
│   │   └── globals.css        # Tailwind CSS imports
│   │
│   ├── components/
│   │   ├── designs/           # Reusable design components
│   │   │   ├── carousels/
│   │   │   ├── contentPieces/
│   │   │   ├── herobanners/
│   │   │   ├── miscellaneous/
│   │   │   ├── testimonials/
│   │   │   └── textComponents/
│   │   └── pageComponents/    # Page-level compositions
│   │       └── homePage.tsx
│   │
│   ├── data/                   # Static data files
│   │   ├── homepage.data.ts   # Typed component data
│   │   └── websiteData.json   # Source data from builder
│   │
│   ├── lib/                    # Shared utilities
│   │   ├── colorUtils/        # Color palette & gradient generation
│   │   └── hooks/             # Custom React hooks
│   │
│   └── types/                  # TypeScript type definitions
│       ├── componentTypes.ts  # Base component interfaces
│       ├── colors.ts          # Gradient configuration types
│       └── navbar.ts          # Navigation types
│
├── docs/                       # Documentation
│   ├── errors.md              # Error log from migration
│   ├── PROJECT_STRUCTURE.md   # This file
│   └── links.md               # Image URLs
│
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
└── postcss.config.mjs         # PostCSS configuration
```

## 🏗️ Component Architecture

### Component File Structure

Each design component follows this pattern:

```
componentName/
├── componentName.tsx    # Main component implementation
└── index.ts             # Exports: Props interface, default props, component
```

**Example:**
```
carouselHero/
├── carouselHero.tsx
└── index.ts
```

### Component Pattern

Every component follows this structure:

```typescript
// 1. Import dependencies
import { ComponentProps, defaultComponentProps } from ".";

// 2. Merge props with defaults
const { ...props } = { ...defaultComponentProps, ...props };

// 3. Create safe fallbacks
const safeTextColor = textColor ?? defaultComponentProps.textColor;
const safeBaseBgColor = baseBgColor ?? defaultComponentProps.baseBgColor;
const safeMainColor = mainColor ?? defaultComponentProps.mainColor;
const safeBgLayout = bgLayout ?? defaultComponentProps.bgLayout;

// 4. Generate colors
const colors = deriveColorPalette(
  { textColor: safeTextColor, baseBgColor: safeBaseBgColor, mainColor: safeMainColor, bgLayout: safeBgLayout },
  safeBgLayout.type  // ⚠️ CRITICAL: Must pass type as second parameter
);

// 5. Generate background
const background = useAnimatedGradient(safeBgLayout, colors);

// 6. Render component
return <motion.section style={{ background }}>...</motion.section>;
```

### Component Categories

Components are organized by category:

- **`herobanners/`** - Hero sections (CarouselHero)
- **`contentPieces/`** - Content blocks (ExperienceCard)
- **`textComponents/`** - Text-based components (Accordion, FeatureBoxes, TextAndList)
- **`carousels/`** - Image carousels (GridCarousel)
- **`testimonials/`** - Testimonial displays (Testimonials3)
- **`miscellaneous/`** - Other components (ContactCloser)

## 📊 Data Organization

### Data Flow Pattern

```
websiteData.json (source)
    ↓
homepage.data.ts (typed constants)
    ↓
homePage.tsx (spreads props)
    ↓
Component (uses props)
```

### Data File Structure

`homepage.data.ts` contains typed data objects:

```typescript
import { CarouselHeroProps } from "@/components/designs/herobanners/carouselHero";

export const carouselHeroData: CarouselHeroProps = {
  title: "...",
  description: "...",
  items: [...],
  // ... other props
};
```

### Using Data in Components

```typescript
// In homePage.tsx
import { carouselHeroData } from "@/data/homepage.data";

<CarouselHero {...carouselHeroData} />
```

## 🎨 Styling System

### Color System Architecture

1. **Base Colors** (from props):
   - `textColor` - Main text color
   - `baseBgColor` - Background base color
   - `mainColor` - Accent/highlight color
   - `bgLayout` - Gradient configuration

2. **Color Palette Generation**:
   ```typescript
   const colors = deriveColorPalette(baseColors, bgLayout.type);
   ```
   Generates:
   - `accentColor` - Darker version of mainColor
   - `lightAccent` / `darkAccent` - Gradient variations
   - `gradientBg` - Array of gradient colors
   - `textColor` / `baseBgColor` / `mainColor` - Passed through

3. **Background Generation**:
   ```typescript
   const background = useAnimatedGradient(bgLayout, colors);
   ```
   Returns:
   - Solid color string (if `type: "solid"`)
   - Linear gradient string (if `type: "linear"`)
   - Radial gradient string (if `type: "radial"`)

### Background Layout Types

**Solid Background:**
```typescript
bgLayout: { type: "solid" }
// Uses baseBgColor directly
```

**Radial Gradient:**
```typescript
bgLayout: {
  type: "radial",
  radialSize: "125% 125%",
  radialPosition: "50% 0%",
  radialBaseStop: 50
}
// Creates radial gradient from baseBgColor outward
```

**Linear Gradient:**
```typescript
bgLayout: {
  type: "linear",
  direction: "to bottom"
}
// Creates linear gradient from baseBgColor
```

### Critical Pattern: bgLayout.type Parameter

⚠️ **IMPORTANT**: Always pass `bgLayout.type` as second parameter to `deriveColorPalette()`:

```typescript
// ✅ CORRECT
const colors = deriveColorPalette(baseColors, safeBgLayout.type);

// ❌ WRONG - Will use wrong color for gradient base
const colors = deriveColorPalette(baseColors);
```

**Why?**
- For `"radial"`: Uses `mainColor` as gradient base → Can create blue tints
- For `"solid"`: Uses `baseBgColor` as gradient base → Creates white background

## 🔧 Type System

### Base Component Props

All components extend `BaseComponentProps`:

```typescript
interface BaseComponentProps {
  // Text props
  title?: string;
  description?: string;
  subTitle?: string;
  buttonText?: string;
  array?: BaseArrayItem[];
  
  // Color props
  textColor?: string;
  baseBgColor?: string;
  mainColor?: string;
  bgLayout?: GradientConfig;
  
  // Other
  images?: Record<string, ImageProp>;
  items?: CarouselItem[]; // For carousel components
}
```

### Component-Specific Props

Components extend base props and add their own:

```typescript
// CarouselHero adds items
interface CarouselHeroProps extends Partial<BaseComponentProps> {
  items?: CarouselItem[];
}

// ExperienceCard customizes array type
interface ExperienceCardProps extends Omit<Partial<BaseComponentProps>, 'array'> {
  array?: (Omit<StandardText, "description">)[];
}
```

### Array Item Types

**StandardText** (for arrays):
```typescript
{
  type: "StandardText",
  title: string,
  description: string
}
```

**CarouselItem** (for carousels):
```typescript
{
  image: {
    src: string,
    alt: string
  },
  description?: string
}
```

## 🖼️ Image Handling

### Image Sources

1. **Local Images**: Stored in `/public/` folder
   ```typescript
   src: "/placeholder.webp"
   ```

2. **External Images** (Vercel Blob):
   ```typescript
   src: "https://*.public.blob.vercel-storage.com/..."
   ```
   - Configured in `next.config.ts` via `remotePatterns`
   - Next.js Image component automatically optimizes

### Image Prop Structure

```typescript
interface ImageProp {
  src: string;
  alt: string;
  styles?: string;
}
```

## 📝 Component Data Patterns

### Default Props Pattern

Every component has default props in its `index.ts`:

```typescript
export const defaultComponentProps: Required<...> = {
  title: "Default Title",
  textColor: "#1f2937",
  baseBgColor: "#f0f9ff",
  mainColor: "#3B82F6",
  bgLayout: { type: "radial", ... },
  // ...
};
```

### Safe Fallback Pattern

Components use safe fallbacks to prevent undefined values:

```typescript
const safeTextColor = textColor ?? defaultComponentProps.textColor;
const safeBaseBgColor = baseBgColor ?? defaultComponentProps.baseBgColor;
const safeMainColor = mainColor ?? defaultComponentProps.mainColor;
const safeBgLayout = bgLayout ?? defaultComponentProps.bgLayout;
```

## 🎯 Page Component Pattern

Page components (`pageComponents/homePage.tsx`) are simple compositions:

```typescript
import Component from "@/components/designs/.../Component";
import { componentData } from "@/data/homepage.data";

export default function IndexPage() {
  return (
    <main>
      <Component {...componentData} />
      {/* More components */}
    </main>
  );
}
```

## 🔄 Common Patterns

### Color Palette Usage

```typescript
// 1. Merge props with defaults
const props = { ...defaultProps, ...incomingProps };

// 2. Create safe fallbacks
const safeColors = {
  textColor: props.textColor ?? defaultProps.textColor,
  baseBgColor: props.baseBgColor ?? defaultProps.baseBgColor,
  mainColor: props.mainColor ?? defaultProps.mainColor,
  bgLayout: props.bgLayout ?? defaultProps.bgLayout,
};

// 3. Derive color palette
const colors = deriveColorPalette(safeColors, safeColors.bgLayout.type);

// 4. Generate background
const background = useAnimatedGradient(safeColors.bgLayout, colors);

// 5. Use in component
<motion.section style={{ background, color: colors.textColor }}>
```

### Array Item Rendering

```typescript
// Filter and map array items
const items = array
  .filter((item): item is ValidType => 
    typeof item === 'object' && item !== null && 'title' in item
  )
  .map(item => ({
    title: item.title ?? "",
    description: item.description ?? "",
  }));

// Render
{items.map((item, index) => (
  <div key={index}>{item.title}</div>
))}
```

## 🛠️ Utility Functions

### Color Utils (`lib/colorUtils/`)

- **`deriveColorPalette()`** - Generates color variations from base colors
- **`useAnimatedGradient()`** - Creates animated gradient backgrounds
- **`darkenHexColor()` / `lightenHexColor()`** - Color manipulation
- **`getLuminance()`** - Calculates color brightness

### Custom Hooks (`lib/hooks/`)

- **`useIsMobile()`** - Responsive breakpoint detection

## 📦 Key Dependencies

- **Next.js 15.5.6** - React framework
- **React 19.1.0** - UI library
- **Tailwind CSS v4** - Utility-first CSS
- **Framer Motion** - Animation library
- **lucide-react** - Icon library
- **react-feather** - Alternative icons

## 🎨 Tailwind CSS Setup

### Configuration

1. **`globals.css`**: Contains `@import "tailwindcss";`
2. **`tailwind.config.ts`**: Defines content paths for scanning
3. **`postcss.config.mjs`**: Configures `@tailwindcss/postcss` plugin
4. **`layout.tsx`**: Imports `globals.css`

### Usage

All Tailwind utility classes work throughout components:
```tsx
<div className="flex items-center justify-center p-4 bg-blue-500">
```

## 🚀 Best Practices

1. **Always use typed data objects** - Don't inline props in components
2. **Use safe fallbacks** - Prevent undefined prop errors
3. **Pass bgLayout.type** - Critical for correct background colors
4. **Separate concerns** - Data in `/data`, components in `/components`
5. **Follow naming conventions** - ComponentName.tsx, index.ts pattern
6. **Use default props** - Provide fallbacks for all optional props

## 📋 Adding a New Component

1. Create component folder: `components/designs/category/componentName/`
2. Create `componentName.tsx` with component logic
3. Create `index.ts` with:
   - Props interface extending `BaseComponentProps`
   - Default props object
   - Export component
4. Add data to `homepage.data.ts`:
   ```typescript
   export const componentNameData: ComponentNameProps = { ... };
   ```
5. Use in page component:
   ```typescript
   <ComponentName {...componentNameData} />
   ```

## 🔍 Key Files Reference

- **`src/app/layout.tsx`** - Root layout, imports CSS
- **`src/app/page.tsx`** - Homepage entry point
- **`src/components/pageComponents/homePage.tsx`** - Page composition
- **`src/data/homepage.data.ts`** - All component data
- **`src/types/componentTypes.ts`** - Base type definitions
- **`src/lib/colorUtils/`** - Color system utilities
- **`next.config.ts`** - Next.js config (image domains)
- **`tailwind.config.ts`** - Tailwind content paths

This structure ensures:
- ✅ Type safety throughout
- ✅ Consistent styling system
- ✅ Easy content management
- ✅ Reusable components
- ✅ Scalable architecture

