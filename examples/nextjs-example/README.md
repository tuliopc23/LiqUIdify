# LiqUIdify Next.js Example

This is a complete example application demonstrating how to use LiqUIdify components in a Next.js project with TypeScript and Tailwind CSS.

## Features Demonstrated

- **Navigation**: Navbar and Sidebar components with responsive behavior
- **Layout**: Grid systems and card layouts
- **Forms**: Input components with validation and styling
- **Data Display**: Tables, progress bars, and loading states
- **Overlays**: Modals, toasts, and notifications
- **Interactive**: Tabs, accordions, and collapsible content
- **Theming**: Dark mode support and custom styling

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm, yarn, or bun package manager

### Installation

1. Clone the repository and navigate to this example:

```bash
cd examples/nextjs-example
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
bun install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
nextjs-example/
├── src/
│   ├── app/
│   │   ├── globals.css       # Global styles and CSS variables
│   │   ├── layout.tsx        # Root layout with ThemeProvider
│   │   └── page.tsx          # Main homepage component
│   └── components/           # Custom components (if any)
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Key Implementation Details

### Theme Setup

The application uses LiqUIdify's `ThemeProvider` in the root layout:

```tsx
import { ThemeProvider } from "liquidify";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

### Component Usage

Components are imported from the main package with tree shaking:

```tsx
import {
  GlassButton,
  GlassCard,
  GlassInput,
  GlassModal,
  // ... other components
} from "liquidify";
```

### Styling Integration

The example combines LiqUIdify components with Tailwind CSS for additional styling:

```tsx
<GlassCard className="p-6 shadow-xl">
  <GlassButton className="bg-gradient-to-r from-blue-500 to-purple-600">
    Custom Styled Button
  </GlassButton>
</GlassCard>
```

### Responsive Design

The layout adapts to different screen sizes using responsive design patterns:

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Responsive grid layout */}
</div>
```

## Component Examples

### Navigation

- **Navbar**: Top navigation with brand, menu items, and actions
- **Sidebar**: Collapsible side navigation with nested groups

### Forms

- **Input Fields**: Text, email, search inputs with icons
- **Validation**: Error states and helper text

### Data Display

- **Tables**: Sortable data tables with actions
- **Progress**: Progress bars and loading spinners
- **Cards**: Content cards with glassmorphism effects

### Overlays

- **Modals**: Dialog boxes with backdrop blur
- **Toasts**: Notification messages
- **Tooltips**: Contextual help text

### Interactive Components

- **Tabs**: Tabbed content sections
- **Accordions**: Collapsible content panels
- **Buttons**: Various button styles and states

## Customization

### Custom Themes

You can customize the theme by extending the default configuration:

```tsx
import { ThemeProvider, createTheme } from "liquidify";

const customTheme = createTheme({
  colors: {
    primary: {
      500: "#your-color",
    },
  },
  glass: {
    blur: "16px",
    opacity: 0.15,
  },
});

<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>;
```

### CSS Variables

Override CSS variables in your global styles:

```css
:root {
  --liquidify-color-primary-500: #3b82f6;
  --liquidify-glass-blur: 12px;
  --liquidify-glass-opacity: 0.1;
}
```

## Performance Considerations

### Bundle Size Optimization

Import individual components for better tree shaking:

```tsx
// Better for bundle size
import { GlassButton } from "liquidify/button";
import { GlassCard } from "liquidify/card";

// Or use feature bundles
import { GlassButton, GlassCard } from "liquidify/core";
```

### Dynamic Imports

For heavy components, consider dynamic imports:

```tsx
const GlassDataTable = dynamic(() =>
  import("liquidify").then((mod) => ({ default: mod.GlassDataTable })),
);
```

## Accessibility

This example demonstrates accessibility best practices:

- Proper semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility

## Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Deploy to Vercel

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com):

```bash
npm install -g vercel
vercel
```

### Deploy to Other Platforms

This Next.js application can be deployed to any platform that supports Node.js:

- **Netlify**: Using `@netlify/plugin-nextjs`
- **AWS**: Using AWS Amplify or Lambda
- **DigitalOcean**: Using App Platform
- **Railway**: Direct deployment from Git

## Development Tips

1. **Hot Reload**: Changes to components will hot reload automatically
2. **TypeScript**: Full TypeScript support with component prop types
3. **Linting**: ESLint configuration included for code quality
4. **Dev Tools**: Use React DevTools for debugging

## Troubleshooting

### Common Issues

**Components not rendering properly:**

- Ensure LiqUIdify is properly installed
- Check that ThemeProvider wraps your app
- Verify CSS imports are included

**Styling conflicts:**

- Check Tailwind CSS configuration
- Ensure proper CSS variable definitions
- Verify component prop combinations

**TypeScript errors:**

- Update to latest TypeScript version
- Check component prop types
- Ensure proper imports

## Learn More

- [LiqUIdify Documentation](https://liquidify.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## Contributing

If you find issues with this example or have suggestions for improvements, please open an issue or submit a pull request to the main LiqUIdify repository.
