// Test all import patterns for LiqUIdify
import { 
  Button, 
  Card, 
  ThemeProvider, 
  useTheme,
  Accordion,
  Checkbox,
  Select,
  Dialog,
  Badge,
  IconButton,
  Icon,
  SymbolTile
} from './dist/libs/components/index.mjs';

// Test subpath imports
import { Button as ButtonSubpath } from './dist/libs/components/components/button/index.mjs';
import { Accordion as AccordionSubpath } from './dist/libs/components/components/ark-ui/accordion/index.mjs';

console.log('✅ All imports successful!');
console.log('✅ Button:', typeof Button);
console.log('✅ ThemeProvider:', typeof ThemeProvider);
console.log('✅ useTheme:', typeof useTheme);
console.log('✅ Button (subpath):', typeof ButtonSubpath);
console.log('✅ Accordion (subpath):', typeof AccordionSubpath);

// Test ThemeProvider usage
function TestComponent() {
  const theme = useTheme();
  return Button({ children: 'Test', variant: 'filled' });
}

console.log('✅ ThemeProvider test component:', typeof TestComponent);