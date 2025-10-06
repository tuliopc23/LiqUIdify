# Component Overview

Complete catalog of all 48 LiqUIdify components organized by category.

## Quick Reference

| Category | Components | Count |
|----------|------------|-------|
| **Basic** | Button, Card, Badge, IconButton, SymbolTile | 5 |
| **Forms** | Checkbox, Radio, Select, Switch, Slider, Input | 14 |
| **Navigation** | Tabs, Menu, Pagination, Steps, SegmentGroup | 7 |
| **Feedback** | Toast, Dialog, Tooltip, Progress, HoverCard, Popover | 8 |
| **Advanced** | ColorPicker, DatePicker, FileUpload, Carousel, etc. | 14 |

---

## Basic Components

### Button
Primary action component with multiple variants.

```tsx
import { Button } from 'liquidify-react/button';

<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
```

**Variants:** primary, secondary, ghost, danger, success, warning  
**States:** default, hover, active, disabled, loading, focus

### Card
Container component for grouping content.

```tsx
import { Card } from 'liquidify-react/card';

<Card>
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</Card>
```

**Features:** Liquid Glass background, automatic padding, rounded corners

### Badge
Small status indicator or label.

```tsx
import { Badge } from 'liquidify-react/badge';

<Badge>New</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="danger">Error</Badge>
```

**Variants:** default, success, warning, danger, info

### IconButton
Button optimized for icon-only interactions.

```tsx
import { IconButton } from 'liquidify-react/iconButton';
import { Settings } from 'lucide-react';

<IconButton>
  <Settings size={20} />
</IconButton>
```

**Features:** 44px touch target, circular shape, accessible label support

### SymbolTile
Decorative tile for SF Symbols or icons.

```tsx
import { SymbolTile } from 'liquidify-react/symbolTile';
import { Star } from 'lucide-react';

<SymbolTile>
  <Star size={24} />
</SymbolTile>
```

---

## Form Components (Ark UI)

### Checkbox
Multi-selection control.

```tsx
import { Checkbox } from 'liquidify-react/ark-ui/checkbox';

<Checkbox defaultChecked>
  Accept terms and conditions
</Checkbox>
```

**Features:** Indeterminate state, accessible labels, keyboard navigation

### RadioGroup
Single-selection from multiple options.

```tsx
import { RadioGroup } from 'liquidify-react/ark-ui/radioGroup';

<RadioGroup defaultValue="option1">
  <RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
  <RadioGroup.Item value="option2">Option 2</RadioGroup.Item>
</RadioGroup>
```

### Select
Dropdown selection control.

```tsx
import { Select } from 'liquidify-react/ark-ui/select';

<Select.Root>
  <Select.Trigger>Select an option</Select.Trigger>
  <Select.Content>
    <Select.Item value="1">Option 1</Select.Item>
    <Select.Item value="2">Option 2</Select.Item>
  </Select.Content>
</Select.Root>
```

**Features:** Searchable, multi-select, keyboard navigation, virtual scrolling

### Switch
Toggle control for binary states.

```tsx
import { Switch } from 'liquidify-react/ark-ui/switch';

<Switch defaultChecked>
  Enable notifications
</Switch>
```

**Features:** Animated transition, accessible labels

### Slider
Range input with visual feedback.

```tsx
import { Slider } from 'liquidify-react/ark-ui/slider';

<Slider defaultValue={[50]} min={0} max={100} />
```

**Features:** Single/range selection, step increments, value display

### PinInput
Segmented input for codes/pins.

```tsx
import { PinInput } from 'liquidify-react/ark-ui/pinInput';

<PinInput.Root>
  <PinInput.Input index={0} />
  <PinInput.Input index={1} />
  <PinInput.Input index={2} />
  <PinInput.Input index={3} />
</PinInput.Root>
```

**Features:** Auto-focus, paste support, secure input

### NumberInput
Numeric input with increment/decrement.

```tsx
import { NumberInput } from 'liquidify-react/ark-ui/numberInput';

<NumberInput.Root defaultValue="0">
  <NumberInput.Input />
  <NumberInput.Control>
    <NumberInput.IncrementTrigger>+</NumberInput.IncrementTrigger>
    <NumberInput.DecrementTrigger>-</NumberInput.DecrementTrigger>
  </NumberInput.Control>
</NumberInput.Root>
```

**Features:** Min/max validation, step increments, formatting

### PasswordInput
Secure text input with visibility toggle.

```tsx
import { PasswordInput } from 'liquidify-react/ark-ui/passwordInput';

<PasswordInput placeholder="Enter password" />
```

**Features:** Show/hide toggle, strength indicator support

### TagsInput
Multi-value input with tag chips.

```tsx
import { TagsInput } from 'liquidify-react/ark-ui/tagsInput';

<TagsInput.Root>
  <TagsInput.Input placeholder="Add tags..." />
</TagsInput.Root>
```

**Features:** Paste support, validation, tag removal

### Combobox
Autocomplete input with suggestions.

```tsx
import { Combobox } from 'liquidify-react/ark-ui/combobox';

<Combobox.Root items={items}>
  <Combobox.Input />
  <Combobox.Content>
    {/* Suggestions */}
  </Combobox.Content>
</Combobox.Root>
```

**Features:** Fuzzy search, keyboard navigation, custom filtering

### Editable
Inline text editing.

```tsx
import { Editable } from 'liquidify-react/ark-ui/editable';

<Editable.Root defaultValue="Click to edit">
  <Editable.Preview />
  <Editable.Input />
</Editable.Root>
```

**Features:** Edit/preview modes, auto-save, cancel/submit

### RatingGroup
Star rating input.

```tsx
import { RatingGroup } from 'liquidify-react/ark-ui/ratingGroup';

<RatingGroup.Root count={5} defaultValue={3}>
  {/* Star icons */}
</RatingGroup.Root>
```

**Features:** Half-star support, read-only mode, custom icons

### AngleSlider
Circular angle selector.

```tsx
import { AngleSlider } from 'liquidify-react/ark-ui/angleSlider';

<AngleSlider defaultValue={90} />
```

**Features:** 0-360° selection, snap increments

### SignaturePad
Canvas-based signature capture.

```tsx
import { SignaturePad } from 'liquidify-react/ark-ui/signaturePad';

<SignaturePad.Root>
  <SignaturePad.Canvas />
  <SignaturePad.ClearTrigger>Clear</SignaturePad.ClearTrigger>
</SignaturePad.Root>
```

**Features:** Touch/mouse support, export as image

---

## Navigation Components (Ark UI)

### Tabs
Tabbed content organization.

```tsx
import { Tabs } from 'liquidify-react/ark-ui/tabs';

<Tabs.Root defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Content 1</Tabs.Content>
  <Tabs.Content value="tab2">Content 2</Tabs.Content>
</Tabs.Root>
```

**Features:** Keyboard navigation, animated transitions

### Menu
Context menus and dropdowns.

```tsx
import { Menu } from 'liquidify-react/ark-ui/menu';

<Menu.Root>
  <Menu.Trigger>Open Menu</Menu.Trigger>
  <Menu.Content>
    <Menu.Item>Item 1</Menu.Item>
    <Menu.Item>Item 2</Menu.Item>
  </Menu.Content>
</Menu.Root>
```

**Features:** Nested menus, keyboard navigation, separators

### Pagination
Page navigation for lists/tables.

```tsx
import { Pagination } from 'liquidify-react/ark-ui/pagination';

<Pagination.Root count={100} pageSize={10}>
  <Pagination.PrevTrigger>Previous</Pagination.PrevTrigger>
  {/* Page items */}
  <Pagination.NextTrigger>Next</Pagination.NextTrigger>
</Pagination.Root>
```

**Features:** Ellipsis for large ranges, customizable page size

### Steps
Multi-step process indicator.

```tsx
import { Steps } from 'liquidify-react/ark-ui/steps';

<Steps.Root defaultValue={0}>
  <Steps.Item index={0}>Step 1</Steps.Item>
  <Steps.Item index={1}>Step 2</Steps.Item>
  <Steps.Item index={2}>Step 3</Steps.Item>
</Steps.Root>
```

**Features:** Progress tracking, clickable steps, status indicators

### SegmentGroup
Segmented control for related options.

```tsx
import { SegmentGroup } from 'liquidify-react/ark-ui/segmentGroup';

<SegmentGroup.Root defaultValue="view1">
  <SegmentGroup.Item value="view1">View 1</SegmentGroup.Item>
  <SegmentGroup.Item value="view2">View 2</SegmentGroup.Item>
</SegmentGroup.Root>
```

**Features:** Animated selection indicator, keyboard navigation

### TreeView
Hierarchical tree navigation.

```tsx
import { TreeView } from 'liquidify-react/ark-ui/treeView';

<TreeView.Root>
  <TreeView.Item>
    <TreeView.ItemText>Folder</TreeView.ItemText>
    <TreeView.Branch>
      <TreeView.Item>File</TreeView.Item>
    </TreeView.Branch>
  </TreeView.Item>
</TreeView.Root>
```

**Features:** Expand/collapse, selection, lazy loading

### Tour
Guided tour/onboarding component.

```tsx
import { Tour } from 'liquidify-react/ark-ui/tour';

<Tour.Root steps={steps}>
  <Tour.Content>
    <Tour.Title />
    <Tour.Description />
  </Tour.Content>
</Tour.Root>
```

**Features:** Step-by-step guidance, spotlight highlighting

---

## Feedback Components (Ark UI)

### Toast
Temporary notification messages.

```tsx
import { Toast } from 'liquidify-react/ark-ui/toast';

const toast = useToast();

toast.create({
  title: 'Success',
  description: 'Your changes have been saved',
  type: 'success',
});
```

**Types:** success, error, warning, info  
**Features:** Auto-dismiss, action buttons, stacking

### Dialog
Modal dialogs and overlays.

```tsx
import { Dialog } from 'liquidify-react/ark-ui/dialog';

<Dialog.Root>
  <Dialog.Trigger>Open Dialog</Dialog.Trigger>
  <Dialog.Backdrop />
  <Dialog.Positioner>
    <Dialog.Content>
      <Dialog.Title>Dialog Title</Dialog.Title>
      <Dialog.Description>Dialog content</Dialog.Description>
    </Dialog.Content>
  </Dialog.Positioner>
</Dialog.Root>
```

**Features:** Focus trapping, ESC to close, backdrop click

### Tooltip
Contextual information on hover.

```tsx
import { Tooltip } from 'liquidify-react/ark-ui/tooltip';

<Tooltip.Root>
  <Tooltip.Trigger>Hover me</Tooltip.Trigger>
  <Tooltip.Content>Tooltip content</Tooltip.Content>
</Tooltip.Root>
```

**Features:** Smart positioning, delay timing, arrow

### Progress
Loading and progress indicators.

```tsx
import { Progress } from 'liquidify-react/ark-ui/progress';

<Progress.Root value={50}>
  <Progress.Track>
    <Progress.Range />
  </Progress.Track>
</Progress.Root>
```

**Variants:** Linear, Circular  
**Features:** Determinate/indeterminate, animated

### HoverCard
Rich hover popover content.

```tsx
import { HoverCard } from 'liquidify-react/ark-ui/hoverCard';

<HoverCard.Root>
  <HoverCard.Trigger>Hover</HoverCard.Trigger>
  <HoverCard.Content>
    Rich content here
  </HoverCard.Content>
</HoverCard.Root>
```

**Features:** Delay timing, positioning, interactive content

### Popover
Click-triggered popup content.

```tsx
import { Popover } from 'liquidify-react/ark-ui/popover';

<Popover.Root>
  <Popover.Trigger>Open</Popover.Trigger>
  <Popover.Content>
    Popover content
  </Popover.Content>
</Popover.Root>
```

**Features:** Smart positioning, close on outside click

### ScrollArea
Custom scrollbar styling.

```tsx
import { ScrollArea } from 'liquidify-react/ark-ui/scrollArea';

<ScrollArea.Root>
  <ScrollArea.Viewport>
    Long content...
  </ScrollArea.Viewport>
</ScrollArea.Root>
```

**Features:** Custom scrollbar design, smooth scrolling

### Clipboard
Copy-to-clipboard functionality.

```tsx
import { Clipboard } from 'liquidify-react/ark-ui/clipboard';

<Clipboard.Root value="Text to copy">
  <Clipboard.Trigger>Copy</Clipboard.Trigger>
  <Clipboard.Indicator>Copied!</Clipboard.Indicator>
</Clipboard.Root>
```

**Features:** Success feedback, fallback support

---

## Advanced Components (Ark UI)

### ColorPicker
Full-featured color selection.

```tsx
import { ColorPicker } from 'liquidify-react/ark-ui/colorPicker';

<ColorPicker.Root>
  <ColorPicker.Trigger />
  <ColorPicker.Content>
    <ColorPicker.Area />
    <ColorPicker.EyeDropperTrigger />
  </ColorPicker.Content>
</ColorPicker.Root>
```

**Features:** Multiple formats (hex, RGB, HSL), eyedropper, alpha

### DatePicker
Calendar date selection.

```tsx
import { DatePicker } from 'liquidify-react/ark-ui/datePicker';

<DatePicker.Root>
  <DatePicker.Input />
  <DatePicker.Content>
    <DatePicker.View view="day" />
  </DatePicker.Content>
</DatePicker.Root>
```

**Features:** Range selection, min/max dates, localization

### FileUpload
Drag-and-drop file upload.

```tsx
import { FileUpload } from 'liquidify-react/ark-ui/fileUpload';

<FileUpload.Root>
  <FileUpload.Dropzone>
    Drop files here
  </FileUpload.Dropzone>
  <FileUpload.ItemGroup />
</FileUpload.Root>
```

**Features:** Multiple files, validation, preview

### Accordion
Collapsible content sections.

```tsx
import { Accordion } from 'liquidify-react/ark-ui/accordion';

<Accordion.Root>
  <Accordion.Item value="1">
    <Accordion.Trigger>Section 1</Accordion.Trigger>
    <Accordion.Content>Content</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

**Features:** Single/multiple expand, animated transitions

### Carousel
Image/content slider.

```tsx
import { Carousel } from 'liquidify-react/ark-ui/carousel';

<Carousel.Root>
  <Carousel.Viewport>
    <Carousel.ItemGroup>
      <Carousel.Item index={0}>Slide 1</Carousel.Item>
    </Carousel.ItemGroup>
  </Carousel.Viewport>
  <Carousel.Control>
    <Carousel.PrevTrigger />
    <Carousel.NextTrigger />
  </Carousel.Control>
</Carousel.Root>
```

**Features:** Auto-play, loop, thumbnails, touch gestures

### Collapsible
Simple show/hide content.

```tsx
import { Collapsible } from 'liquidify-react/ark-ui/collapsible';

<Collapsible.Root>
  <Collapsible.Trigger>Toggle</Collapsible.Trigger>
  <Collapsible.Content>
    Collapsible content
  </Collapsible.Content>
</Collapsible.Root>
```

### Splitter
Resizable split panes.

```tsx
import { Splitter } from 'liquidify-react/ark-ui/splitter';

<Splitter.Root>
  <Splitter.Panel>Panel 1</Splitter.Panel>
  <Splitter.ResizeTrigger />
  <Splitter.Panel>Panel 2</Splitter.Panel>
</Splitter.Root>
```

**Features:** Horizontal/vertical, min/max sizes, keyboard control

### ToggleGroup
Multi-toggle selection.

```tsx
import { ToggleGroup } from 'liquidify-react/ark-ui/toggleGroup';

<ToggleGroup.Root>
  <ToggleGroup.Item value="bold">Bold</ToggleGroup.Item>
  <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>
</ToggleGroup.Root>
```

**Features:** Single/multiple selection

### QRCode
QR code generator.

```tsx
import { QRCode } from 'liquidify-react/ark-ui/qrCode';

<QRCode.Root value="https://example.com">
  <QRCode.Frame />
</QRCode.Root>
```

**Features:** Customizable size, error correction

### Avatar
User profile image with fallback.

```tsx
import { Avatar } from 'liquidify-react/ark-ui/avatar';

<Avatar.Root>
  <Avatar.Image src="/user.jpg" />
  <Avatar.Fallback>JD</Avatar.Fallback>
</Avatar.Root>
```

**Features:** Fallback initials, loading states

### FloatingPanel
Draggable floating panel.

```tsx
import { FloatingPanel } from 'liquidify-react/ark-ui/floatingPanel';

<FloatingPanel.Root>
  <FloatingPanel.Trigger />
  <FloatingPanel.Content>
    Panel content
  </FloatingPanel.Content>
</FloatingPanel.Root>
```

**Features:** Drag to reposition, minimize/maximize

### Fieldset
Form field grouping.

```tsx
import { Fieldset } from 'liquidify-react/ark-ui/fieldset';

<Fieldset.Root>
  <Fieldset.Legend>Personal Info</Fieldset.Legend>
  {/* Form fields */}
</Fieldset.Root>
```

### Timer
Countdown/countup timer.

```tsx
import { Timer } from 'liquidify-react/ark-ui/timer';

<Timer.Root countdown startMs={60000}>
  <Timer.Display />
</Timer.Root>
```

**Features:** Countdown/countup, pause/resume

### Listbox
Selectable list items.

```tsx
import { Listbox } from 'liquidify-react/ark-ui/listbox';

<Listbox.Root>
  <Listbox.Item value="1">Item 1</Listbox.Item>
  <Listbox.Item value="2">Item 2</Listbox.Item>
</Listbox.Root>
```

**Features:** Multi-select, keyboard navigation

---

## Import Patterns

All components support subpath imports for optimal tree-shaking:

```tsx
// Basic components
import { Button } from 'liquidify-react/button';
import { Card } from 'liquidify-react/card';

// Ark UI components (use ark-ui/ prefix)
import { Dialog } from 'liquidify-react/ark-ui/dialog';
import { Tooltip } from 'liquidify-react/ark-ui/tooltip';
```

---

**Next:** [Importing Guide](./importing.md) | [Basic Components](./basic-components.md)
