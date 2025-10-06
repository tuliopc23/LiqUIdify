# Font Implementation Guide

## Overview

LiqUIdify uses the **SF (San Francisco)** font family to match Apple's Human Interface Guidelines, ensuring a premium, native-like feel across all platforms.

## Font Stack

### Primary Fonts (Web Fonts)

The project loads web fonts from [fontapi.ir](https://v1.fontapi.ir) to ensure consistent rendering across all operating systems:

1. **SF Pro Display** - Primary display and UI font
2. **SF UI Display** - Fallback for older systems
3. **SF UI Text** - Additional fallback for text rendering
4. **SF Mono** - Monospace font for code

### Complete Font Stack

#### Sans-serif (Body & Display)
```css
font-family: "SF Pro Display", "SF UI Display", "SF UI Text", -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

**Fallback Order:**
1. SF Pro Display (web font)
2. SF UI Display (web font)
3. SF UI Text (web font)
4. -apple-system (native macOS/iOS)
5. BlinkMacSystemFont (native macOS)
6. system-ui (cross-platform system font)
7. Segoe UI (Windows)
8. Roboto (Android)
9. Helvetica Neue (fallback)
10. Arial (universal fallback)
11. Generic sans-serif

#### Monospace (Code)
```css
font-family: "SF Mono", "SFMono-Regular", ui-monospace, Menlo, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace;
```

**Fallback Order:**
1. SF Mono (web font)
2. SFMono-Regular (native macOS)
3. ui-monospace (modern browsers)
4. Menlo (macOS)
5. Monaco (macOS)
6. Cascadia Code (Windows modern)
7. Roboto Mono (cross-platform)
8. Consolas (Windows)
9. Courier New (universal)
10. Generic monospace

## Implementation

### In HTML Files

Add these tags in the `<head>` section for optimal performance:

```html
<!-- Preconnect to font CDN for better performance -->
<link rel="preconnect" href="https://fdn.fontcdn.ir">
<link rel="preconnect" href="https://v1.fontapi.ir">

<!-- Import SF Fonts -->
<link href="https://v1.fontapi.ir/css/SFProDisplay" rel="stylesheet">
<link href="https://v1.fontapi.ir/css/SFUIDisplay" rel="stylesheet">
<link href="https://v1.fontapi.ir/css/SFUIText" rel="stylesheet">
<link href="https://v1.fontapi.ir/css/SFMono" rel="stylesheet">
```

### In CSS Files

The fonts are automatically imported via:

```css
@import './fonts.css';
```

Located at: `libs/components/src/styles/fonts.css`

### In Panda Config

Font tokens are defined in `panda.config.ts`:

```typescript
fonts: {
  sans: {
    value: '"SF Pro Display", "SF UI Display", "SF UI Text", -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  display: {
    value: '"SF Pro Display", "SF UI Display", "SF UI Text", -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  mono: {
    value: '"SF Mono", "SFMono-Regular", ui-monospace, Menlo, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
  },
}
```

## Typography Scale

Following Apple HIG specifications:

| Style | Font Size | Weight | Line Height | Letter Spacing |
|-------|-----------|--------|-------------|----------------|
| Large Title | 34px | Bold (700) | 1.1 | -0.026em |
| Title 1 | 28px | Bold (700) | 1.2 | -0.022em |
| Title 2 | 22px | Bold (700) | 1.2 | -0.022em |
| Title 3 | 20px | Semibold (600) | 1.2 | -0.022em |
| Headline | 17px | Semibold (600) | 1.25 | -0.019em |
| Body | 17px | Regular (400) | 1.25 | -0.016em |
| Callout | 16px | Medium (500) | 1.25 | -0.012em |
| Subheadline | 15px | Regular (400) | 1.4 | -0.006em |
| Footnote | 13px | Regular (400) | 1.4 | -0.003em |
| Caption 1 | 12px | Medium (500) | 1.4 | 0em |
| Caption 2 | 11px | Regular (400) | 1.6 | 0em |

## Usage in Components

### Using Panda Tokens

```tsx
import { css } from '../styled-system/css';

const MyComponent = () => (
  <div className={css({
    fontFamily: 'sans',
    fontSize: 'body',
    fontWeight: 'normal',
  })}>
    Content
  </div>
);
```

### Using Text Styles

```tsx
import { css } from '../styled-system/css';

const Heading = () => (
  <h1 className={css({
    textStyle: 'title1'
  })}>
    Large Heading
  </h1>
);
```

## Performance Considerations

1. **Preconnect**: The `preconnect` links establish early connections to the font CDN
2. **Font Loading**: Fonts load asynchronously and don't block page rendering
3. **Fallback Stack**: Ensures text is readable immediately with system fonts
4. **FOUT Prevention**: The comprehensive fallback stack minimizes flash of unstyled text

## Cross-Browser Support

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (macOS/iOS)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile, Samsung Internet)
- ✅ Progressive enhancement for older browsers

## Accessibility

- All font sizes meet WCAG 2.1 AA standards
- Negative letter spacing follows Apple's guidelines for SF fonts
- Line heights ensure optimal readability
- Font weights provide sufficient contrast

## Troubleshooting

### Fonts not loading?

1. Check network tab for font CDN requests
2. Verify preconnect links are in HTML `<head>`
3. Ensure CSS import path is correct
4. Clear browser cache

### Fonts look different on Windows?

This is expected - the web fonts ensure consistency, but minor rendering differences exist between operating systems due to ClearType and other OS-level rendering engines.

## License

SF fonts are loaded from a third-party CDN (fontapi.ir). For production use, verify licensing terms and consider:
- Self-hosting fonts
- Using official Apple font CDN (if available)
- Falling back to system fonts only

---

**Note**: The SF font family is designed by Apple Inc. This implementation uses web fonts for cross-platform consistency while respecting the design principles of Apple's Human Interface Guidelines.
