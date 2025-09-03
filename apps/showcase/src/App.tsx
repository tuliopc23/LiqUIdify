import React from "react";
import {
  Button,
  LiquidAccordion,
  Dialog,
  Menu,
  Select,
  Tabs,
  Tooltip,
  Popover,
  Avatar,
  Checkbox,
  Switch,
  Slider,
  Progress,
  ProgressCircular,
  Combobox,
  DatePicker,
  NumberInput,
  RadioGroup,
  Pagination,
  Carousel,
  RatingGroup,
  PinInput,
  ColorPicker,
  Editable,
  Listbox,
  Steps,
  HoverCard,
  Collapsible,
  QrCode,
  Toggle,
  ToggleGroup,
  SegmentGroup,
  Splitter,
  ScrollArea,
  Field,
  Fieldset,
  FloatingPanel,
  PasswordInput,
  TagsInput,
  Clipboard,
  Timer,
  TreeView,
  Tour,
  FileUpload,
  AngleSlider,
  SignaturePad,
} from "liquidify";

class CardBoundary extends React.Component<{ label: string; children: React.ReactNode }, { error?: Error }>{
  state = { error: undefined as Error | undefined };
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch() { /* no-op */ }
  render() {
    if (this.state.error) {
      return (
        <div style={{ color: "#ef4444", fontSize: 12, textAlign: "center" }}>
          Failed to render {this.props.label}
        </div>
      );
    }
    return <>{this.props.children}</>;
  }
}

function Card({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <article className="card" tabIndex={0} aria-label={title}>
      <div className="card-sheen" aria-hidden="true" />
      <div className="card-body">
        <div className="demo" role="region" aria-label={`${title} demo`}>
          <CardBoundary label={title}>{children}</CardBoundary>
        </div>
        <h3 className="card-title">{title}</h3>
        {sub ? <p className="card-sub">{sub}</p> : null}
      </div>
    </article>
  );
}

export default function App() {
  return (
    <>
      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <div className="brand-mark" aria-hidden="true" />
            <div>
              <h1>LiqUIdify Components</h1>
              <p>All components in Liquid Glass Apple-style cards</p>
            </div>
          </div>
          <div>
            <button className="chip" onClick={() => toggleTheme()}>Toggle theme</button>
          </div>
        </div>
      </header>

      <main className="page">
        <section className="section">
          <h2>Core</h2>
          <p>Buttons and basic inputs.</p>
          <div className="grid">
            <Card title="Button" sub="Variants and sizes">
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="success">Success</Button>
                <Button variant="danger">Danger</Button>
              </div>
            </Card>

            <Card title="Checkbox">
              <Checkbox label="Enable feature" />
            </Card>

            <Card title="Switch">
              <Switch defaultChecked aria-label="Toggle" />
            </Card>

            <Card title="Slider">
              <Slider.Root defaultValue={[40]} style={{ width: 220 }}>
                <Slider.Control>
                  <Slider.Track>
                    <Slider.Range />
                  </Slider.Track>
                  <Slider.Thumb index={0} />
                </Slider.Control>
              </Slider.Root>
            </Card>

            <Card title="Progress (Linear)">
              <Progress label="Loading" value={72} max={100} />
            </Card>

            <Card title="Progress (Circular)">
              <ProgressCircular.Root value={66} max={100}>
                <ProgressCircular.Circle>
                  <ProgressCircular.CircleTrack />
                  <ProgressCircular.CircleRange />
                </ProgressCircular.Circle>
                <ProgressCircular.ValueText />
              </ProgressCircular.Root>
            </Card>

            <Card title="Avatar">
              <Avatar name="Alice" fallback="A" />
            </Card>
          </div>
        </section>

        <section className="section">
          <h2>Navigation & Overlays</h2>
          <p>Tabs, dialogs, menus and popovers.</p>
          <div className="grid">
            <Card title="Tabs">
              <Tabs.Root defaultValue="tab1">
                <Tabs.List>
                  <Tabs.Trigger value="tab1">First</Tabs.Trigger>
                  <Tabs.Trigger value="tab2">Second</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="tab1">Tab one content</Tabs.Content>
                <Tabs.Content value="tab2">Tab two content</Tabs.Content>
              </Tabs.Root>
            </Card>

            <Card title="Dialog">
              <Dialog.Root>
                <Dialog.Trigger>Open dialog</Dialog.Trigger>
                <Dialog.Positioner>
                  <Dialog.Backdrop />
                  <Dialog.Content>
                    <Dialog.Title>Title</Dialog.Title>
                    <Dialog.Description>Apple-style glass dialog</Dialog.Description>
                    <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Dialog.Root>
            </Card>

            <Card title="Menu">
              <Menu.Root>
                <Menu.Trigger>Open menu</Menu.Trigger>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item>
                      <Menu.ItemText>Profile</Menu.ItemText>
                    </Menu.Item>
                    <Menu.Item>
                      <Menu.ItemText>Settings</Menu.ItemText>
                    </Menu.Item>
                    <Menu.Separator />
                    <Menu.Item>
                      <Menu.ItemText>Sign out</Menu.ItemText>
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Menu.Root>
            </Card>

            <Card title="Select">
              <Select.Root>
                <Select.Trigger>Choose</Select.Trigger>
                <Select.Positioner>
                  <Select.Content>
                    <Select.Item value="one">
                      <Select.ItemText>One</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="two">
                      <Select.ItemText>Two</Select.ItemText>
                    </Select.Item>
                  </Select.Content>
                </Select.Positioner>
              </Select.Root>
            </Card>

            <Card title="Tooltip">
              <Tooltip.Root>
                <Tooltip.Trigger>Hover me</Tooltip.Trigger>
                <Tooltip.Positioner>
                  <Tooltip.Content>Helpful tip</Tooltip.Content>
                </Tooltip.Positioner>
              </Tooltip.Root>
            </Card>

            <Card title="Popover">
              <Popover.Root>
                <Popover.Trigger>Open popover</Popover.Trigger>
                <Popover.Positioner>
                  <Popover.Content>Popover content</Popover.Content>
                </Popover.Positioner>
              </Popover.Root>
            </Card>

            <Card title="Hover Card">
              <HoverCard.Root>
                <HoverCard.Trigger>Hover me</HoverCard.Trigger>
                <HoverCard.Positioner>
                  <HoverCard.Content>Extra info</HoverCard.Content>
                </HoverCard.Positioner>
              </HoverCard.Root>
            </Card>
          </div>
        </section>

        <section className="section">
          <h2>Forms & Inputs</h2>
          <p>Rich inputs and groups.</p>
          <div className="grid">
            <Card title="LiquidAccordion">
              <div style={{ width: 300 }}>
                <LiquidAccordion
                  items={[
                    { id: "a", title: "Section A", content: "Content A" },
                    { id: "b", title: "Section B", content: "Content B" },
                  ]}
                />
              </div>
            </Card>

            <Card title="Combobox">
              <Combobox.Root>
                <Combobox.Input placeholder="Search..." />
                <Combobox.Positioner>
                  <Combobox.Content>
                    <Combobox.Item value="alpha">
                      <Combobox.ItemText>Alpha</Combobox.ItemText>
                    </Combobox.Item>
                    <Combobox.Item value="bravo">
                      <Combobox.ItemText>Bravo</Combobox.ItemText>
                    </Combobox.Item>
                  </Combobox.Content>
                </Combobox.Positioner>
              </Combobox.Root>
            </Card>

            <Card title="Date Picker">
              <DatePicker.Root>
                <DatePicker.Trigger>Select date</DatePicker.Trigger>
                <DatePicker.Positioner>
                  <DatePicker.Content>
                    <DatePicker.Table>
                      <DatePicker.TableHead />
                      <DatePicker.TableBody />
                    </DatePicker.Table>
                  </DatePicker.Content>
                </DatePicker.Positioner>
              </DatePicker.Root>
            </Card>

            <Card title="Number Input">
              <NumberInput.Root defaultValue="5">
                <NumberInput.Field />
                <NumberInput.IncrementTrigger>+</NumberInput.IncrementTrigger>
                <NumberInput.DecrementTrigger>-</NumberInput.DecrementTrigger>
              </NumberInput.Root>
            </Card>

            <Card title="Radio Group">
              <RadioGroup.Root defaultValue="opt1">
                <RadioGroup.Item value="opt1">
                  <RadioGroup.ItemControl />
                  <RadioGroup.ItemText>Option 1</RadioGroup.ItemText>
                </RadioGroup.Item>
                <RadioGroup.Item value="opt2">
                  <RadioGroup.ItemControl />
                  <RadioGroup.ItemText>Option 2</RadioGroup.ItemText>
                </RadioGroup.Item>
              </RadioGroup.Root>
            </Card>

            <Card title="Pin Input">
              <PinInput.Root otp>
                <PinInput.Input index={0} />
                <PinInput.Input index={1} />
                <PinInput.Input index={2} />
                <PinInput.Input index={3} />
              </PinInput.Root>
            </Card>

            <Card title="Color Picker">
              <ColorPicker.Root defaultValue={{ hex: "#0a84ff" }}>
                <ColorPicker.ChannelSlider channel="hue" />
              </ColorPicker.Root>
            </Card>

            <Card title="Editable">
              <Editable.Root defaultValue="Edit me" />
            </Card>

            <Card title="Password Input">
              <PasswordInput.Root>
                <PasswordInput.Input placeholder="••••••" />
                <PasswordInput.VisibilityTrigger>Show</PasswordInput.VisibilityTrigger>
              </PasswordInput.Root>
            </Card>

            <Card title="Tags Input">
              <TagsInput.Root defaultValue={["Apple", "HIG"]}>
                <TagsInput.Control>
                  <TagsInput.Input placeholder="Add tag" />
                </TagsInput.Control>
              </TagsInput.Root>
            </Card>

            <Card title="Clipboard">
              <Clipboard.Root value="Copy this">
                <Clipboard.Label>Copy text</Clipboard.Label>
                <Clipboard.Input readOnly />
                <Clipboard.Trigger>Copy</Clipboard.Trigger>
                <Clipboard.Indicator copiedText="Copied!" copyText="Copy" />
              </Clipboard.Root>
            </Card>
          </div>
        </section>

        <section className="section">
          <h2>Data & Feedback</h2>
          <p>Lists, steps, pagination, rating.</p>
          <div className="grid">
            <Card title="Listbox">
              <Listbox.Root>
                <Listbox.Label>Fruits</Listbox.Label>
                <Listbox.Content>
                  <Listbox.Item value="apple"><Listbox.ItemText>Apple</Listbox.ItemText></Listbox.Item>
                  <Listbox.Item value="banana"><Listbox.ItemText>Banana</Listbox.ItemText></Listbox.Item>
                </Listbox.Content>
              </Listbox.Root>
            </Card>

            <Card title="Steps">
              <Steps.Root count={4} value={2} />
            </Card>

            <Card title="Pagination">
              <Pagination.Root count={10} pageSize={10} page={3} />
            </Card>

            <Card title="Rating Group">
              <RatingGroup label="Rate" />
            </Card>

            <Card title="Carousel">
              <Carousel.Root>
                <Carousel.ItemGroup>
                  <Carousel.Item index={0}>Slide 1</Carousel.Item>
                  <Carousel.Item index={1}>Slide 2</Carousel.Item>
                  <Carousel.Item index={2}>Slide 3</Carousel.Item>
                </Carousel.ItemGroup>
                <Carousel.IndicatorGroup>
                  <Carousel.Indicator index={0} />
                  <Carousel.Indicator index={1} />
                  <Carousel.Indicator index={2} />
                </Carousel.IndicatorGroup>
              </Carousel.Root>
            </Card>

            <Card title="QR Code">
              <QrCode.Root value="https://useliquidify.dev" />
            </Card>

            <Card title="Timer">
              <Timer.Root startSeconds={5} />
            </Card>
          </div>
        </section>

        <section className="section">
          <h2>Layout & Misc</h2>
          <p>Scroll areas, splitters, fields, toggles, segments.</p>
          <div className="grid">
            <Card title="Toggle / Toggle Group">
              <div style={{ display: "flex", gap: 8 }}>
                <Toggle.Root>On/Off</Toggle.Root>
                <ToggleGroup.Root value={["b"]} multiple>
                  <ToggleGroup.Item value="a">A</ToggleGroup.Item>
                  <ToggleGroup.Item value="b">B</ToggleGroup.Item>
                  <ToggleGroup.Item value="c">C</ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>
            </Card>

            <Card title="Segment Group">
              <SegmentGroup.Root value="one">
                <SegmentGroup.Item value="one"><SegmentGroup.ItemText>One</SegmentGroup.ItemText></SegmentGroup.Item>
                <SegmentGroup.Item value="two"><SegmentGroup.ItemText>Two</SegmentGroup.ItemText></SegmentGroup.Item>
              </SegmentGroup.Root>
            </Card>

            <Card title="Splitter">
              <Splitter.Root id="s1" orientation="horizontal" style={{ width: 320, height: 140 }}>
                <Splitter.Panel id="p1">Left</Splitter.Panel>
                <Splitter.ResizeTrigger id="rt1" />
                <Splitter.Panel id="p2">Right</Splitter.Panel>
              </Splitter.Root>
            </Card>

            <Card title="Scroll Area">
              <ScrollArea.Root style={{ width: 260, height: 120 }}>
                <ScrollArea.Viewport>
                  <div style={{ padding: 8 }}>
                    {Array.from({ length: 12 }).map((_, i) => (
                      <p key={i}>Scrollable line {i + 1}</p>
                    ))}
                  </div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar orientation="vertical">
                  <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>
            </Card>

            <Card title="Field / Fieldset">
              <Fieldset.Root>
                <Fieldset.Legend>Account</Fieldset.Legend>
                <Field.Root>
                  <Field.Label>Email</Field.Label>
                  <Field.Input placeholder="you@example.com" />
                </Field.Root>
              </Fieldset.Root>
            </Card>

            <Card title="Floating Panel">
              <FloatingPanel.Root>
                <FloatingPanel.Trigger>Open panel</FloatingPanel.Trigger>
                <FloatingPanel.Positioner>
                  <FloatingPanel.Content>
                    <FloatingPanel.Header>
                      <FloatingPanel.Title>Panel</FloatingPanel.Title>
                    </FloatingPanel.Header>
                  </FloatingPanel.Content>
                </FloatingPanel.Positioner>
              </FloatingPanel.Root>
            </Card>

            <Card title="Collapsible">
              <Collapsible.Root>
                <Collapsible.Trigger>Toggle</Collapsible.Trigger>
                <Collapsible.Content>Hidden content</Collapsible.Content>
              </Collapsible.Root>
            </Card>

            <Card title="File Upload">
              <FileUpload.Root>
                <FileUpload.Dropzone>Drop files</FileUpload.Dropzone>
                <FileUpload.Trigger>Select</FileUpload.Trigger>
              </FileUpload.Root>
            </Card>

            <Card title="Angle Slider">
              <AngleSlider.Root value={45} />
            </Card>

            <Card title="Signature Pad">
              <SignaturePad.Root>
                <SignaturePad.Control />
                <SignaturePad.ClearTrigger>Clear</SignaturePad.ClearTrigger>
              </SignaturePad.Root>
            </Card>

            <Card title="Tree View">
              <TreeView.Root>
                <TreeView.Label>Files</TreeView.Label>
                <TreeView.Tree>
                  <TreeView.Branch>
                    <TreeView.BranchText>src</TreeView.BranchText>
                    <TreeView.Item>
                      <TreeView.ItemText>index.ts</TreeView.ItemText>
                    </TreeView.Item>
                  </TreeView.Branch>
                </TreeView.Tree>
              </TreeView.Root>
            </Card>

            <Card title="Tour">
              <Tour.Root open>
                <Tour.Positioner>
                  <Tour.Content>
                    <Tour.Title>Welcome</Tour.Title>
                    <Tour.Description>Quick tour</Tour.Description>
                    <Tour.ActionTrigger>Next</Tour.ActionTrigger>
                    <Tour.CloseTrigger>Close</Tour.CloseTrigger>
                  </Tour.Content>
                </Tour.Positioner>
              </Tour.Root>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
}

function toggleTheme() {
  const root = document.documentElement;
  const cur = root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  root.dataset.theme = cur === "light" ? "dark" : "light";
}
