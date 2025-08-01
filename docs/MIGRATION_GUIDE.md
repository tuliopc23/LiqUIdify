# LiqUIdify Migration Guide

This guide helps you migrate to LiqUIdify from other popular UI libraries or upgrade from previous versions.

## Table of Contents

1. [Migration from Material-UI](#migration-from-material-ui)
2. [Migration from Ant Design](#migration-from-ant-design)
3. [Migration from Chakra UI](#migration-from-chakra-ui)
4. [Migration from Bootstrap](#migration-from-bootstrap)
5. [Version Upgrades](#version-upgrades)
6. [Breaking Changes](#breaking-changes)
7. [Automated Migration](#automated-migration)

## Migration from Material-UI

### Component Mapping

| Material-UI        | LiqUIdify                       | Notes                             |
| ------------------ | ------------------------------- | --------------------------------- |
| `Button`           | `GlassButton`                   | Similar API, different styling    |
| `Card`             | `GlassCard`                     | Glass effect instead of elevation |
| `Dialog`           | `GlassModal`                    | Built-in focus management         |
| `TextField`        | `GlassInput` + `GlassFormField` | Separated for flexibility         |
| `Select`           | `GlassSelect`                   | Native select with styling        |
| `Tabs`             | `GlassTabs`                     | Keyboard navigation included      |
| `CircularProgress` | `GlassSpinner`                  | Multiple size options             |
| `Alert`            | `GlassAlert`                    | Live region support               |
| `Snackbar`         | `GlassToast`                    | Auto-dismiss functionality        |

### Code Examples

#### Before (Material-UI)

```javascript
import { Button, Card, CardContent, TextField, Dialog } from "@mui/material";

function LoginForm() {
  return (
    <Card elevation={3}>
      <CardContent>
        <TextField label="Email" variant="outlined" fullWidth margin="normal" />
        <Button variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </CardContent>
    </Card>
  );
}
```

#### After (LiqUIdify)

```javascript
import {
  GlassButton,
  GlassCard,
  GlassInput,
  GlassFormField,
} from "@liquidify/components";

function LoginForm() {
  return (
    <GlassCard variant="elevated">
      <div className="card-content">
        <GlassFormField label="Email">
          <GlassInput type="email" fullWidth />
        </GlassFormField>
        <GlassButton variant="primary" fullWidth>
          Login
        </GlassButton>
      </div>
    </GlassCard>
  );
}
```

### Theme Migration

#### Material-UI Theme

```javascript
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});
```

#### LiqUIdify Theme

```javascript
import { UnifiedGlassProvider } from "@liquidify/components";

const glassTheme = {
  colors: {
    primary: "#1976d2",
    secondary: "#dc004e",
  },
  glass: {
    blur: 20,
    opacity: 0.8,
    saturation: 1.5,
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
};

<UnifiedGlassProvider theme={glassTheme}>
  <App />
</UnifiedGlassProvider>;
```

## Migration from Ant Design

### Component Mapping

| Ant Design     | LiqUIdify                        | Notes                     |
| -------------- | -------------------------------- | ------------------------- |
| `Button`       | `GlassButton`                    | Similar props             |
| `Card`         | `GlassCard`                      | Glass effects             |
| `Modal`        | `GlassModal`                     | Better accessibility      |
| `Input`        | `GlassInput`                     | Native input enhanced     |
| `Select`       | `GlassSelect` or `GlassCombobox` | Combobox for search       |
| `Table`        | `GlassTable`                     | Virtual scrolling support |
| `Tabs`         | `GlassTabs`                      | Simpler API               |
| `Spin`         | `GlassSpinner`                   | Multiple variants         |
| `Alert`        | `GlassAlert`                     | ARIA compliant            |
| `Notification` | `GlassNotification`              | Queue management          |

### Form Migration

#### Before (Ant Design)

```javascript
import { Form, Input, Button } from "antd";

function ContactForm() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
```

#### After (LiqUIdify)

```javascript
import { GlassFormField, GlassInput, GlassButton } from "@liquidify/components";

function ContactForm() {
  const [values, setValues] = useState({ name: "" });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.name) {
      setErrors({ name: "Required" });
      return;
    }
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <GlassFormField label="Name" required error={errors.name}>
        <GlassInput
          value={values.name}
          onChange={(e) => setValues({ name: e.target.value })}
        />
      </GlassFormField>
      <GlassButton type="submit" variant="primary">
        Submit
      </GlassButton>
    </form>
  );
}
```

## Migration from Chakra UI

### Component Mapping

| Chakra UI  | LiqUIdify        | Notes                   |
| ---------- | ---------------- | ----------------------- |
| `Button`   | `GlassButton`    | Similar props           |
| `Box`      | `GlassContainer` | Glass styling           |
| `Card`     | `GlassCard`      | Built-in glass          |
| `Modal`    | `GlassModal`     | Focus trap included     |
| `Input`    | `GlassInput`     | Simpler API             |
| `Tabs`     | `GlassTabs`      | Controlled/uncontrolled |
| `Spinner`  | `GlassSpinner`   | Multiple sizes          |
| `Alert`    | `GlassAlert`     | Accessibility built-in  |
| `Skeleton` | `GlassSkeleton`  | Loading states          |
| `Divider`  | `GlassDivider`   | Glass variant           |

### Style Props Migration

#### Before (Chakra UI)

```javascript
import { Box, Button, Text } from "@chakra-ui/react";

function Hero() {
  return (
    <Box bg="gray.100" p={8} borderRadius="lg" boxShadow="xl">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Welcome
      </Text>
      <Button colorScheme="blue" size="lg">
        Get Started
      </Button>
    </Box>
  );
}
```

#### After (LiqUIdify)

```javascript
import { GlassContainer, GlassButton } from '@liquidify/components';

function Hero() {
  return (
    <GlassContainer
      className="hero-container"
      variant="elevated"
    >
      <h2 className="hero-title">
        Welcome
      </h2>
      <GlassButton variant="primary" size="large">
        Get Started
      </GlassButton>
    </GlassContainer>
  );
}

// CSS
.hero-container {
  padding: 2rem;
}
.hero-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
```

## Migration from Bootstrap

### Component Mapping

| Bootstrap        | LiqUIdify          | Notes                |
| ---------------- | ------------------ | -------------------- |
| `btn`            | `GlassButton`      | Component-based      |
| `card`           | `GlassCard`        | Glass effects        |
| `modal`          | `GlassModal`       | Better accessibility |
| `form-control`   | `GlassInput`       | Consistent styling   |
| `nav-tabs`       | `GlassTabs`        | React controlled     |
| `spinner-border` | `GlassSpinner`     | Multiple variants    |
| `alert`          | `GlassAlert`       | Live regions         |
| `toast`          | `GlassToast`       | Auto-dismiss         |
| `breadcrumb`     | `GlassBreadcrumbs` | Route aware          |

### HTML to React Migration

#### Before (Bootstrap)

```html
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Card Title</h5>
    <p class="card-text">Card content</p>
    <button class="btn btn-primary">Action</button>
  </div>
</div>
```

#### After (LiqUIdify)

```javascript
import { GlassCard, GlassButton } from "@liquidify/components";

function CardExample() {
  return (
    <GlassCard>
      <h5>Card Title</h5>
      <p>Card content</p>
      <GlassButton variant="primary">Action</GlassButton>
    </GlassCard>
  );
}
```

## Version Upgrades

### Upgrading from 0.x to 1.0

#### Breaking Changes

1. **Import paths changed**

```javascript
// Before
import { Button } from "@liquidify/components/lib/Button";

// After
import { GlassButton } from "@liquidify/components/button";
```

2. **Component prefix added**

```javascript
// Before
import { Button, Card, Modal } from "@liquidify/components";

// After
import { GlassButton, GlassCard, GlassModal } from "@liquidify/components";
```

3. **Props standardized**

```javascript
// Before
<Button type="primary" block />

// After
<GlassButton variant="primary" fullWidth />
```

4. **Theme structure updated**

```javascript
// Before
const theme = {
  primaryColor: "#1890ff",
  borderRadius: 4,
};

// After
const theme = {
  colors: {
    primary: "#1890ff",
  },
  radius: {
    default: "4px",
  },
  glass: {
    blur: 20,
    opacity: 0.8,
  },
};
```

### Migration Steps

1. **Update package**

```bash
npm update @liquidify/components@latest
```

2. **Run codemod**

```bash
npx @liquidify/codemods v0-to-v1
```

3. **Update imports**

```bash
# Find and replace old imports
find . -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | \
  xargs sed -i 's/from "@liquidify\/components\/lib/from "@liquidify\/components/g'
```

4. **Test thoroughly**

```bash
npm test
npm run type-check
```

## Breaking Changes

### Removed Features

1. **Inline styles removed**

   - Use className and CSS instead
   - Better performance and CSP compliance

2. **jQuery dependency removed**

   - All components use React hooks
   - No external dependencies

3. **IE11 support dropped**
   - Modern CSS features used
   - Smaller bundle size

### API Changes

#### Button

```javascript
// Before
<Button type="primary" danger loading />

// After
<GlassButton variant="danger" loading />
```

#### Modal

```javascript
// Before
<Modal visible={open} onCancel={close} />

// After
<GlassModal isOpen={open} onClose={close} />
```

#### Form

```javascript
// Before
<Form.Item label="Name" validateStatus="error" />

// After
<GlassFormField label="Name" error="Invalid name" />
```

## Automated Migration

### Codemod Tool

Install and run the migration tool:

```bash
# Install globally
npm install -g @liquidify/codemods

# Run migration
liquidify-migrate --from mui --to liquidify ./src

# Available migrations
liquidify-migrate --list
# - mui: Material-UI to LiqUIdify
# - antd: Ant Design to LiqUIdify
# - chakra: Chakra UI to LiqUIdify
# - bootstrap: Bootstrap to LiqUIdify
```

### ESLint Plugin

Add migration hints with ESLint:

```javascript
// .eslintrc.js
module.exports = {
  plugins: ["@liquidify/migration"],
  rules: {
    "@liquidify/migration/no-deprecated": "warn",
    "@liquidify/migration/suggest-replacement": "warn",
  },
};
```

### Migration Checklist

- [ ] Install latest LiqUIdify version
- [ ] Run automated migration tool
- [ ] Update import statements
- [ ] Replace deprecated components
- [ ] Update theme configuration
- [ ] Fix TypeScript errors
- [ ] Update tests
- [ ] Test accessibility
- [ ] Verify bundle size
- [ ] Update documentation

## Common Issues

### CSS Conflicts

```css
/* Reset conflicting styles */
.glass-component {
  all: revert;
  /* LiqUIdify styles */
}
```

### Theme Provider

```javascript
// Ensure provider wraps app
import { UnifiedGlassProvider } from "@liquidify/components";

root.render(
  <UnifiedGlassProvider>
    <App />
  </UnifiedGlassProvider>,
);
```

### TypeScript

```typescript
// Update tsconfig.json
{
  "compilerOptions": {
    "types": ["@liquidify/components"]
  }
}
```

## Support

### Resources

- [Migration Examples](https://github.com/liquidify/migration-examples)
- [Video Tutorials](https://youtube.com/liquidify)
- [Discord Community](https://discord.gg/liquidify)
- [Stack Overflow Tag](https://stackoverflow.com/questions/tagged/liquidify)

### Getting Help

1. Check the [FAQ](https://docs.liquidify.dev/faq)
2. Search [existing issues](https://github.com/liquidify/components/issues)
3. Ask in [Discord](https://discord.gg/liquidify)
4. Create a [minimal reproduction](https://stackblitz.com/fork/liquidify)

---

Remember: Migration is an investment in better performance, accessibility, and user experience. Take it step by step!
