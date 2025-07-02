# 🎨 Visual Smoke Test Checklist

This checklist must be completed manually before each stable release to ensure visual quality and user experience consistency.

## Pre-Release Setup

- [ ] Build the library: `npm run build`
- [ ] Start Storybook: `npm run storybook`
- [ ] Open Storybook in Chrome, Firefox, and Safari
- [ ] Test on desktop (1920x1080), tablet (768x1024), and mobile (375x667) viewports

## 🔵 Core Components

### GlassButton
- [ ] **Visual Quality**
  - [ ] Glass effect is visible and smooth
  - [ ] Border radius matches design system
  - [ ] Typography is crisp and readable
  - [ ] Icons align properly with text
- [ ] **States**
  - [ ] Default state renders correctly
  - [ ] Hover state shows appropriate visual feedback
  - [ ] Focus state has visible outline
  - [ ] Active state provides tactile feedback
  - [ ] Disabled state is visually distinct
  - [ ] Loading state shows spinner and dims text
- [ ] **Variants**
  - [ ] Primary variant has correct colors
  - [ ] Secondary variant has correct colors
  - [ ] Destructive variant has correct colors
  - [ ] Ghost variant has correct colors
- [ ] **Sizes**
  - [ ] Small size maintains proportions
  - [ ] Medium size (default) looks balanced
  - [ ] Large size maintains readability

### GlassCard
- [ ] **Visual Quality**
  - [ ] Glass blur effect is applied consistently
  - [ ] Border and shadow are subtle but visible
  - [ ] Content inside maintains readability
  - [ ] Rounded corners are consistent
- [ ] **Variants**
  - [ ] Light blur variant works in light theme
  - [ ] Medium blur variant provides good balance
  - [ ] Heavy blur variant maintains content visibility
- [ ] **Content Adaptation**
  - [ ] Text content adapts to card background
  - [ ] Images and media display correctly
  - [ ] Nested components maintain styling

### GlassInput
- [ ] **Visual Quality**
  - [ ] Glass effect doesn't interfere with text
  - [ ] Placeholder text is readable
  - [ ] Border is visible but not distracting
  - [ ] Icons integrate seamlessly
- [ ] **States**
  - [ ] Default state is inviting
  - [ ] Focus state clearly indicates selection
  - [ ] Error state is visually distinct
  - [ ] Disabled state is obviously non-interactive
- [ ] **Types**
  - [ ] Text input works correctly
  - [ ] Password input masks characters
  - [ ] Email input accepts @ symbol
  - [ ] Number input shows spinners

### GlassModal
- [ ] **Visual Quality**
  - [ ] Backdrop blur creates depth
  - [ ] Modal content is clearly separated
  - [ ] Close button is easily accessible
  - [ ] Scrolling works when content overflows
- [ ] **Behavior**
  - [ ] Modal centers correctly on all screen sizes
  - [ ] Animation in/out is smooth
  - [ ] Focus trap works correctly
  - [ ] Escape key closes modal

### GlassTooltip
- [ ] **Visual Quality**
  - [ ] Tooltip background has glass effect
  - [ ] Text is readable on various backgrounds
  - [ ] Arrow/pointer aligns correctly
  - [ ] Animation is smooth and subtle
- [ ] **Positioning**
  - [ ] Top position works correctly
  - [ ] Bottom position works correctly
  - [ ] Left position works correctly
  - [ ] Right position works correctly

### GlassTabs
- [ ] **Visual Quality**
  - [ ] Active tab is clearly distinguished
  - [ ] Tab transitions are smooth
  - [ ] Content area has appropriate glass effect
  - [ ] Tab indicators align properly
- [ ] **Behavior**
  - [ ] Click interaction works smoothly
  - [ ] Keyboard navigation functions
  - [ ] Content switches correctly

## 🎭 Responsive Design

### Mobile (375px width)
- [ ] All components scale appropriately
- [ ] Touch targets meet minimum size (44px)
- [ ] Text remains readable
- [ ] Glass effects don't cause performance issues
- [ ] Hover states adapt to touch interactions

### Tablet (768px width)
- [ ] Components use available space effectively
- [ ] Glass effects maintain quality
- [ ] Touch and mouse interactions both work
- [ ] Layout adapts gracefully

### Desktop (1920px width)
- [ ] Components don't scale beyond comfortable size
- [ ] Glass effects are performant
- [ ] Hover states provide good feedback
- [ ] Focus states are keyboard-accessible

## 🌓 Theme Compatibility

### Light Theme
- [ ] Glass effects provide appropriate contrast
- [ ] Text remains readable on glass backgrounds
- [ ] Colors match design system values
- [ ] Shadows and borders are visible but subtle

### Dark Theme
- [ ] Glass effects work with dark backgrounds
- [ ] Text contrast meets accessibility standards
- [ ] Colors adapt correctly to dark mode
- [ ] Component boundaries remain clear

## ⚡ Performance & Quality

### Animation Performance
- [ ] Hover animations run at 60fps
- [ ] Transition animations are smooth
- [ ] No janky or stuttering movements
- [ ] Glass blur effects don't cause lag

### Visual Consistency
- [ ] Border radius is consistent across components
- [ ] Glass opacity levels follow design system
- [ ] Typography scales properly
- [ ] Color usage follows brand guidelines

### Content Adaptation
- [ ] Long text doesn't break layouts
- [ ] Images scale appropriately within glass containers
- [ ] User-generated content displays correctly
- [ ] Overflow handling works consistently

## 🌐 Browser Compatibility

### Chrome (latest)
- [ ] All glass effects render correctly
- [ ] Animations are smooth
- [ ] No console errors
- [ ] Performance is acceptable

### Firefox (latest)
- [ ] Backdrop-filter fallbacks work
- [ ] No visual regressions
- [ ] Performance is comparable to Chrome
- [ ] No console errors

### Safari (latest)
- [ ] WebKit-specific features work
- [ ] iOS compatibility confirmed
- [ ] Glass effects are supported
- [ ] No performance issues

## 📱 Mobile Testing

### iOS Safari
- [ ] Touch interactions work smoothly
- [ ] Glass effects are performant
- [ ] No layout shift issues
- [ ] Viewport scaling correct

### Android Chrome
- [ ] Touch targets are adequate
- [ ] Performance is smooth
- [ ] Glass effects render correctly
- [ ] No visual glitches

## ♿ Accessibility Visual Check

### Focus Management
- [ ] Focus indicators are clearly visible
- [ ] Focus order is logical
- [ ] No focus traps in wrong places
- [ ] Skip links work when present

### Color Contrast
- [ ] Text meets WCAG AA standards (4.5:1)
- [ ] Icon colors have sufficient contrast
- [ ] Interactive elements are distinguishable
- [ ] Error states are clearly marked

### Visual Hierarchy
- [ ] Headings create clear structure
- [ ] Interactive elements look clickable
- [ ] Important information stands out
- [ ] Related content is visually grouped

## 🎯 Final Checks

### Storybook Quality
- [ ] All stories load without errors
- [ ] Controls work as expected
- [ ] Documentation is accurate
- [ ] Examples represent real usage

### Bundle Quality
- [ ] CSS is properly minified
- [ ] No duplicate styles
- [ ] Unused code is eliminated
- [ ] File sizes are reasonable

### Edge Cases
- [ ] Empty states render correctly
- [ ] Loading states are appropriate
- [ ] Error states are helpful
- [ ] Extreme content scenarios work

---

## Release Sign-off

**Tester:** _____________________ **Date:** _____/_____/_____

**Browser Versions Tested:**
- Chrome: _______________
- Firefox: ______________
- Safari: _______________

**Devices Tested:**
- Desktop: ______________
- Tablet: _______________
- Mobile: _______________

**Critical Issues Found:** [ ] None [ ] See attached notes

**Ready for Release:** [ ] Yes [ ] No (see notes)

**Notes:**
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

*This checklist should be completed by a designer or QA engineer who understands the visual design requirements and user experience goals of the LiquidUI library.*
