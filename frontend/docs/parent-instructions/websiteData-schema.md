# websiteData.json Schema Documentation

**Purpose:** Complete documentation of the `websiteData.json` structure used in client projects. This schema defines the data format exported from the website builder and used in client repositories.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Complete JSON Example](#complete-json-example)
3. [Top-Level Structure](#top-level-structure)
4. [FormData Structure](#formdata-structure)
5. [Pages Structure](#pages-structure)
6. [Component Structure](#component-structure)
7. [Component Type Registry](#component-type-registry)
8. [Props Structures by Component Type](#props-structures-by-component-type)
9. [Type Definitions](#type-definitions)
10. [Validation Rules](#validation-rules)
11. [Common Patterns](#common-patterns)

---

## Overview

`websiteData.json` is the complete website configuration exported from the website builder. It contains:

- **Form responses** - User-submitted content and preferences
- **Page structure** - Complete page layout with components
- **Component configurations** - All component props and settings
- **Metadata** - Website name, status, timestamps

**Location in client projects:** `frontend/src/data/websiteData.json`

---

## Complete JSON Example

```json
{
  "_id": "692bc4d1633c31b17027540a",
  "owner": "btqcleaningservices@gmail.com",
  "templateName": "Professional Services",
  "websiteName": "Unnamed Website",
  "formData": {
    "fastTrackDescription": {
      "answer": "Long form text content..."
    },
    "contactEmail": {
      "answer": "btqcleaningservices@gmail.com"
    },
    "mainColor": {
      "answer": "#3B82F6"
    },
    "baseBgColor": {
      "answer": "#FFFFFF"
    },
    "textColor": {
      "answer": "#000000"
    },
    "bgLayoutType": {
      "answer": "solid"
    },
    "additionalInfo": {
      "answer": "Additional content..."
    }
  },
  "pages": [
    {
      "components": [
        {
          "id": "carouselHero-0",
          "type": "carouselHero",
          "order": 0,
          "context": "A herobanner that uses a slide show of images",
          "componentCategory": "hero",
          "props": {
            "subTitle": "Welcome to BTQ Cleaning",
            "title": "Your Reliable & Friendly Cleaning Service",
            "description": "Experience a clean home...",
            "buttonText": "Get Started",
            "array": [],
            "mainColor": "#3B82F6",
            "textColor": "#000000",
            "baseBgColor": "#FFFFFF",
            "bgLayout": {
              "type": "solid"
            }
          }
        }
      ],
      "text": []
    }
  ],
  "status": "draft",
  "createdAt": "2025-11-30T04:15:13.159Z",
  "updatedAt": "2025-11-30T04:15:13.159Z",
  "__v": 0
}
```

---

## Top-Level Structure

### Required Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | `string` | ✅ Yes | MongoDB ObjectId of the website |
| `pages` | `Page[]` | ✅ Yes | Array of page objects |
| `formData` | `FormData` | ✅ Yes | User form responses |

### Optional Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `owner` | `string` | ❌ No | Email of website owner |
| `templateName` | `string` | ❌ No | Template identifier |
| `websiteName` | `string` | ❌ No | User-defined website name |
| `status` | `string` | ❌ No | Website status (e.g., "draft", "published") |
| `createdAt` | `string` (ISO 8601) | ❌ No | Creation timestamp |
| `updatedAt` | `string` (ISO 8601) | ❌ No | Last update timestamp |
| `__v` | `number` | ❌ No | MongoDB version key |

### Status Values

Common status values:
- `"draft"` - Not published
- `"published"` - Live website
- `"in-progress"` - Being worked on
- `"archived"` - Archived/deprecated

---

## FormData Structure

The `formData` object contains user-submitted form responses. Each field follows this pattern:

```typescript
{
  "fieldName": {
    "answer": "field value"
  }
}
```

### Common FormData Fields

| Field Name | Type | Description |
|------------|------|-------------|
| `fastTrackDescription` | `string` | Main business description |
| `additionalInfo` | `string` | Additional business information |
| `contactEmail` | `string` | Contact email address |
| `mainColor` | `string` (hex) | Primary brand color (e.g., "#3B82F6") |
| `baseBgColor` | `string` (hex) | Background base color (e.g., "#FFFFFF") |
| `textColor` | `string` (hex) | Primary text color (e.g., "#000000") |
| `bgLayoutType` | `string` | Background layout type ("solid", "radial", "linear") |

### FormData Example

```json
{
  "formData": {
    "fastTrackDescription": {
      "answer": "*My experiences: I worked as an office manager..."
    },
    "contactEmail": {
      "answer": "btqcleaningservices@gmail.com"
    },
    "mainColor": {
      "answer": "#3B82F6"
    },
    "baseBgColor": {
      "answer": "#FFFFFF"
    },
    "textColor": {
      "answer": "#000000"
    },
    "bgLayoutType": {
      "answer": "solid"
    },
    "additionalInfo": {
      "answer": "Additional content details..."
    }
  }
}
```

**Note:** Form fields can vary by template and form configuration. The structure is consistent (field name → `{ answer: value }`), but field names may differ.

---

## Pages Structure

The `pages` array contains page objects. Each page represents a single page on the website.

### Page Object Structure

```typescript
interface Page {
  components: Component[];  // Array of components on the page
  text?: string[];          // Optional text array (often empty)
}
```

### Page Example

```json
{
  "pages": [
    {
      "components": [
        {
          "id": "carouselHero-0",
          "type": "carouselHero",
          "order": 0,
          "context": "A herobanner that uses a slide show of images",
          "componentCategory": "hero",
          "props": { /* component props */ }
        }
      ],
      "text": []
    }
  ]
}
```

**Notes:**
- `components` array is **required** (but can be empty)
- `text` array is **optional** (often empty `[]`)
- Components are ordered by their `order` property

---

## Component Structure

Each component in the `components` array has a consistent structure:

### Required Component Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | ✅ Yes | Unique component identifier (e.g., "carouselHero-0") |
| `type` | `string` | ✅ Yes | Component type (e.g., "carouselHero", "experienceCard") |
| `order` | `number` | ✅ Yes | Display order on page (0-based) |
| `context` | `string` | ✅ Yes | Description/context of component |
| `componentCategory` | `string` | ✅ Yes | Category (e.g., "hero", "textComponent") |
| `props` | `object` | ✅ Yes | Component-specific properties |

### Component Example

```json
{
  "id": "carouselHero-0",
  "type": "carouselHero",
  "order": 0,
  "context": "A herobanner that uses a slide show of images",
  "componentCategory": "hero",
  "props": {
    "subTitle": "Welcome to BTQ Cleaning",
    "title": "Your Reliable & Friendly Cleaning Service",
    "description": "Experience a clean home...",
    "buttonText": "Get Started",
    "mainColor": "#3B82F6",
    "textColor": "#000000",
    "baseBgColor": "#FFFFFF",
    "bgLayout": {
      "type": "solid"
    }
  }
}
```

---

## Component Type Registry

All component types found in this project:

| Component Type | Category | Description |
|----------------|----------|-------------|
| `carouselHero` | `hero` | Hero banner with image carousel |
| `experienceCard` | `contentPiece` | Content card with image, text, and list items |
| `textAndList` | `textComponent` | Text content with bulleted list |
| `featureBoxes` | `textComponent` | Grid of feature/service boxes |
| `accordion` | `textComponent` | Expandable FAQ/accordion component |
| `gridCarousel` | `carousel` | Image gallery/grid carousel |
| `testimonials3` | `testimonial` | Testimonial display component |
| `contactCloser` | `misc` | Closing call-to-action section |

### Component Categories

| Category | Description | Component Types |
|----------|-------------|----------------|
| `hero` | Hero/banner sections | `carouselHero` |
| `contentPiece` | Content blocks | `experienceCard` |
| `textComponent` | Text-based components | `textAndList`, `featureBoxes`, `accordion` |
| `carousel` | Image carousels | `gridCarousel` |
| `testimonial` | Testimonial displays | `testimonials3` |
| `misc` | Miscellaneous | `contactCloser` |

---

## Props Structures by Component Type

### Common Props

All components share these common props (all optional):

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Main heading text |
| `description` | `string` | Main description text |
| `subTitle` | `string` | Subheading text |
| `buttonText` | `string` | Button label text |
| `mainColor` | `string` (hex) | Primary accent color |
| `textColor` | `string` (hex) | Text color |
| `baseBgColor` | `string` (hex) | Background base color |
| `bgLayout` | `GradientConfig` | Background layout configuration |
| `array` | `ArrayItem[]` | Generic array (varies by component) |

### 1. carouselHero

**Type:** `"carouselHero"`  
**Category:** `"hero"`  
**Props:**

```typescript
{
  subTitle?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  array?: [];  // Often empty array
  items?: CarouselItem[];  // Used in code, not always in JSON
  mainColor?: string;
  textColor?: string;
  baseBgColor?: string;
  bgLayout?: GradientConfig;
}
```

**Example:**
```json
{
  "id": "carouselHero-0",
  "type": "carouselHero",
  "componentCategory": "hero",
  "props": {
    "subTitle": "Welcome to BTQ Cleaning",
    "title": "Your Reliable & Friendly Cleaning Service",
    "description": "Experience a clean home...",
    "buttonText": "Get Started",
    "array": [],
    "mainColor": "#3B82F6",
    "textColor": "#000000",
    "baseBgColor": "#FFFFFF",
    "bgLayout": { "type": "solid" }
  }
}
```

---

### 2. experienceCard

**Type:** `"experienceCard"`  
**Category:** `"contentPiece"`  
**Props:**

```typescript
{
  title?: string;
  description?: string;
  subTitle?: string;
  buttonText?: string;
  array?: StandardText[];  // Array of { title, description }
  mainColor?: string;
  textColor?: string;
  baseBgColor?: string;
  bgLayout?: GradientConfig;
}
```

**StandardText Array Item:**
```json
{
  "title": "Personalized Cleaning Plans",
  "description": "We tailor our services..."
}
```

**Example:**
```json
{
  "id": "experienceCard-1",
  "type": "experienceCard",
  "componentCategory": "contentPiece",
  "props": {
    "title": "Why Choose Us?",
    "description": "With over 20 years of experience...",
    "subTitle": "Key Highlights",
    "buttonText": "Learn More",
    "array": [
      {
        "title": "Personalized Cleaning Plans",
        "description": "We tailor our services..."
      }
    ],
    "mainColor": "#3B82F6",
    "textColor": "#000000",
    "baseBgColor": "#FFFFFF",
    "bgLayout": { "type": "solid" }
  }
}
```

---

### 3. textAndList

**Type:** `"textAndList"`  
**Category:** `"textComponent"`  
**Props:**

```typescript
{
  title?: string;
  description?: string;
  subTitle?: string;
  textArray?: StandardText[];  // Alternative array prop
  array?: StandardText[];  // Main array prop
  mainColor?: string;
  textColor?: string;
  baseBgColor?: string;
  bgLayout?: GradientConfig;
}
```

**Note:** Both `textArray` and `array` may be present (duplicates).

**Example:**
```json
{
  "id": "textAndList-2",
  "type": "textAndList",
  "componentCategory": "textComponent",
  "props": {
    "subTitle": "Our Commitment to Quality",
    "title": "Discover the BTQ Difference",
    "description": "We are dedicated...",
    "textArray": [
      {
        "title": "Customized Services",
        "description": "Every home is unique..."
      }
    ],
    "array": [
      {
        "title": "Customized Services",
        "description": "Every home is unique..."
      }
    ],
    "mainColor": "#3B82F6",
    "textColor": "#000000",
    "baseBgColor": "#FFFFFF",
    "bgLayout": { "type": "solid" }
  }
}
```

---

### 4. featureBoxes

**Type:** `"featureBoxes"`  
**Category:** `"textComponent"`  
**Props:**

```typescript
{
  title?: string;
  description?: string;
  array?: StandardText[];  // Array of features/services
  mainColor?: string;
  textColor?: string;
  baseBgColor?: string;
  bgLayout?: GradientConfig;
}
```

**Example:**
```json
{
  "id": "featureBoxes-3",
  "type": "featureBoxes",
  "componentCategory": "textComponent",
  "props": {
    "array": [
      {
        "title": "Home Cleaning",
        "description": "Thorough cleaning services..."
      },
      {
        "title": "Deep Cleaning",
        "description": "In-depth cleaning..."
      }
    ],
    "title": "Our Services",
    "description": "Explore our range of cleaning services...",
    "mainColor": "#3B82F6",
    "textColor": "#000000",
    "baseBgColor": "#FFFFFF",
    "bgLayout": { "type": "solid" }
  }
}
```

---

### 5. accordion

**Type:** `"accordion"`  
**Category:** `"textComponent"`  
**Props:**

```typescript
{
  title?: string;
  description?: string;
  buttonText?: string;
  array?: StandardText[];  // FAQ items
  mainColor?: string;
  textColor?: string;
  baseBgColor?: string;
  bgLayout?: GradientConfig;
}
```

**Example:**
```json
{
  "id": "accordion-4",
  "type": "accordion",
  "componentCategory": "textComponent",
  "props": {
    "array": [
      {
        "title": "What areas do you serve?",
        "description": "We provide cleaning services..."
      },
      {
        "title": "Do you bring your own supplies?",
        "description": "Yes, we bring all necessary..."
      }
    ],
    "title": "Frequently Asked Questions",
    "description": "Here are some common questions...",
    "buttonText": "Contact Us",
    "mainColor": "#3B82F6",
    "textColor": "#000000",
    "baseBgColor": "#FFFFFF",
    "bgLayout": { "type": "solid" }
  }
}
```

---

### 6. gridCarousel

**Type:** `"gridCarousel"`  
**Category:** `"carousel"`  
**Props:**

```typescript
{
  subTitle?: string;
  title?: string;
  description?: string;
  array?: [];  // Often empty (images added separately)
  items?: CarouselItem[];  // Used in code
  mainColor?: string;
  textColor?: string;
  baseBgColor?: string;
  bgLayout?: GradientConfig;
}
```

**Example:**
```json
{
  "id": "gridCarousel-5",
  "type": "gridCarousel",
  "componentCategory": "carousel",
  "props": {
    "subTitle": "See Our Work",
    "title": "Transformations We Create",
    "description": "Browse through our gallery...",
    "array": [],
    "mainColor": "#3B82F6",
    "textColor": "#000000",
    "baseBgColor": "#FFFFFF",
    "bgLayout": { "type": "solid" }
  }
}
```

---

### 7. testimonials3

**Type:** `"testimonials3"`  
**Category:** `"testimonial"`  
**Props:**

```typescript
{
  title?: string;
  description?: string;
  testimonials?: TestimonialItem[];  // Testimonial-specific array
  array?: [];  // Often empty
  mainColor?: string;
  textColor?: string;
  baseBgColor?: string;
  bgLayout?: GradientConfig;
}
```

**TestimonialItem Structure:**
```json
{
  "name": "Sarah L.",
  "role": "Homeowner",
  "quote": "BTQ Cleaning Services transformed my home!"
}
```

**Example:**
```json
{
  "id": "testimonials3-6",
  "type": "testimonials3",
  "componentCategory": "testimonial",
  "props": {
    "testimonials": [
      {
        "name": "Sarah L.",
        "role": "Homeowner",
        "quote": "BTQ Cleaning Services transformed my home!"
      },
      {
        "name": "Mark T.",
        "role": "Business Owner",
        "quote": "Dependable and thorough!"
      }
    ],
    "title": "Client Testimonials",
    "description": "Hear what our satisfied clients...",
    "array": [],
    "mainColor": "#3B82F6",
    "textColor": "#000000",
    "baseBgColor": "#FFFFFF",
    "bgLayout": { "type": "solid" }
  }
}
```

---

### 8. contactCloser

**Type:** `"contactCloser"`  
**Category:** `"misc"`  
**Props:**

```typescript
{
  title?: string;
  description?: string;
  buttonText?: string;
  email?: string;  // Contact email
  phone?: string;  // Contact phone
  facebookUrl?: string;  // Facebook link
  array?: [];  // Often empty
  mainColor?: string;
  textColor?: string;
  baseBgColor?: string;
  bgLayout?: GradientConfig;
}
```

**Example:**
```json
{
  "id": "contactCloser-7",
  "type": "contactCloser",
  "componentCategory": "misc",
  "props": {
    "title": "Ready for a Spotless Home?",
    "description": "Contact us today to schedule...",
    "buttonText": "Get in Touch",
    "array": [],
    "mainColor": "#3B82F6",
    "textColor": "#000000",
    "baseBgColor": "#FFFFFF",
    "bgLayout": { "type": "solid" }
  }
}
```

---

## Type Definitions

### GradientConfig

Background layout configuration:

```typescript
interface GradientConfig {
  type: "solid" | "radial" | "linear";
  
  // Radial-specific (optional)
  radialSize?: string;        // e.g., "125% 125%"
  radialPosition?: string;    // e.g., "50% 0%"
  radialBaseStop?: number;    // e.g., 50
  
  // Linear-specific (optional)
  direction?: string;         // e.g., "to bottom"
  colorStops?: number[];      // Gradient color positions
}
```

**Examples:**

```json
// Solid background
{
  "type": "solid"
}

// Radial gradient
{
  "type": "radial",
  "radialSize": "125% 125%",
  "radialPosition": "50% 0%",
  "radialBaseStop": 50
}

// Linear gradient
{
  "type": "linear",
  "direction": "to bottom"
}
```

---

### StandardText Array Item

Used in `array` props for many components:

```typescript
interface StandardText {
  title: string;
  description: string;
  // Note: In JSON, type discriminator is not always present
  // In TypeScript code: type: "StandardText"
}
```

**Example:**
```json
{
  "title": "Customized Services",
  "description": "Every home is unique, and so are our cleaning solutions..."
}
```

---

### TestimonialItem

Used in `testimonials` prop for `testimonials3`:

```typescript
interface TestimonialItem {
  name: string;
  role: string;
  quote: string;
  src?: string;  // Optional image URL
  alt?: string;  // Optional image alt text
}
```

**Example:**
```json
{
  "name": "Sarah L.",
  "role": "Homeowner",
  "quote": "BTQ Cleaning Services transformed my home!"
}
```

---

### CarouselItem

Used in `items` prop for carousel components (typically not in JSON, added in code):

```typescript
interface CarouselItem {
  image: {
    src: string;
    alt: string;
  };
  description?: string;
  title?: string;
  buttonText?: string;
  extraInfo?: string;
}
```

---

## Validation Rules

### Top-Level Validation

- ✅ `_id` must be a valid MongoDB ObjectId (24 hex characters)
- ✅ `pages` must be an array (can be empty)
- ✅ `formData` must be an object
- ✅ All timestamps must be valid ISO 8601 strings

### FormData Validation

- ✅ Each form field must have `{ answer: value }` structure
- ✅ `mainColor`, `baseBgColor`, `textColor` must be valid hex colors (format: `#RRGGBB`)
- ✅ `bgLayoutType` must be one of: `"solid"`, `"radial"`, `"linear"`

### Page Validation

- ✅ `components` array is required (can be empty `[]`)
- ✅ `text` array is optional (often empty `[]`)
- ✅ Component IDs within a page must be unique

### Component Validation

- ✅ `id` is required and must be unique within the page
- ✅ `type` must match a known component type
- ✅ `order` must be a number (0-based)
- ✅ `componentCategory` must match the component type's category
- ✅ `props` must be an object

**Component Type Validation:**

| Component Type | Required Props | Validation Rules |
|----------------|---------------|------------------|
| `carouselHero` | - | `array` should be empty or valid |
| `experienceCard` | - | `array` items must have `title` and `description` |
| `textAndList` | - | `array` or `textArray` items must have `title` and `description` |
| `featureBoxes` | - | `array` items must have `title` and `description` |
| `accordion` | - | `array` items must have `title` and `description` |
| `gridCarousel` | - | `array` often empty, images added separately |
| `testimonials3` | - | `testimonials` array items must have `name`, `role`, `quote` |
| `contactCloser` | - | Optional `email`, `phone`, `facebookUrl` |

### Props Validation

**Color Props:**
- ✅ `mainColor`, `textColor`, `baseBgColor` must be valid hex colors
- ✅ Format: `#RRGGBB` (6 hex digits)

**bgLayout Validation:**
- ✅ `type` must be `"solid"`, `"radial"`, or `"linear"`
- ✅ If `type: "radial"`, optional: `radialSize`, `radialPosition`, `radialBaseStop`
- ✅ If `type: "linear"`, optional: `direction`, `colorStops`

**Array Validation:**
- ✅ `array` must be an array (can be empty `[]`)
- ✅ Array items must match expected structure (StandardText, TestimonialItem, etc.)

---

## Common Patterns

### Pattern 1: Empty Array Props

Many components have empty `array: []` props:

```json
{
  "array": []
}
```

**Components using this:**
- `carouselHero` (uses `items` in code instead)
- `gridCarousel` (uses `items` in code instead)
- `contactCloser` (no array needed)

---

### Pattern 2: Duplicate Array Props

Some components have both `array` and `textArray` with duplicate data:

```json
{
  "textArray": [
    { "title": "...", "description": "..." }
  ],
  "array": [
    { "title": "...", "description": "..." }
  ]
}
```

**Components using this:**
- `textAndList`

---

### Pattern 3: Component-Specific Array Props

Some components use specialized array prop names:

```json
{
  "testimonials": [
    { "name": "...", "role": "...", "quote": "..." }
  ],
  "array": []  // Empty fallback
}
```

**Components using this:**
- `testimonials3` (uses `testimonials` prop)

---

### Pattern 4: Standard Color Props

All components share the same color props structure:

```json
{
  "mainColor": "#3B82F6",
  "textColor": "#000000",
  "baseBgColor": "#FFFFFF",
  "bgLayout": {
    "type": "solid"
  }
}
```

---

### Pattern 5: Component ID Naming

Component IDs follow the pattern: `{type}-{order}`

Examples:
- `carouselHero-0`
- `experienceCard-1`
- `textAndList-2`
- `featureBoxes-3`
- `accordion-4`
- `gridCarousel-5`
- `testimonials3-6`
- `contactCloser-7`

**Note:** The number in the ID matches the `order` property.

---

## Summary

### Key Points

1. **Structure:** `websiteData.json` contains `formData`, `pages`, and metadata
2. **Components:** Each page has an array of components with consistent structure
3. **Props:** Components share common props (colors, text) and have type-specific props
4. **Arrays:** Components use `array` prop, but some have specialized arrays (`testimonials`, `textArray`)
5. **Colors:** All components support `mainColor`, `textColor`, `baseBgColor`, `bgLayout`
6. **Validation:** IDs must be unique, types must match known components, colors must be hex

### Required vs Optional

**Required:**
- `_id`, `pages`, `formData` (top-level)
- `id`, `type`, `order`, `context`, `componentCategory`, `props` (components)

**Optional:**
- All prop fields are optional (components have default props)
- `text` array in pages
- Metadata fields (`owner`, `templateName`, `websiteName`, `status`, timestamps)

---

## Next Steps

When working with `websiteData.json`:

1. ✅ Validate structure matches this schema
2. ✅ Verify component types are recognized
3. ✅ Check that IDs are unique within pages
4. ✅ Validate color hex codes
5. ✅ Ensure `bgLayout.type` is valid
6. ✅ Verify array items match expected structure

---

**This schema documentation should be updated when:**
- New component types are added
- New form fields are added
- Component prop structures change
- Validation rules change

