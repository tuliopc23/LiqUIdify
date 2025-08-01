# Component Usage Patterns

Learn how to effectively combine LiquidUI components to build common UI patterns and complete interfaces.

## Form Patterns

### Login Form

```tsx
import {
  GlassCard,
  GlassInput,
  GlassButton,
  GlassCheckbox,
  GlassFormField,
} from "@liquidify/components";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  return (
    <GlassCard className="w-full max-w-md mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Sign In</h2>

      <form className="space-y-4">
        <GlassFormField label="Email" required>
          <GlassInput
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </GlassFormField>

        <GlassFormField label="Password" required>
          <GlassInput
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </GlassFormField>

        <GlassCheckbox
          checked={formData.remember}
          onChange={(e) =>
            setFormData({ ...formData, remember: e.target.checked })
          }
        >
          Remember me
        </GlassCheckbox>

        <GlassButton variant="primary" fullWidth type="submit">
          Sign In
        </GlassButton>
      </form>
    </GlassCard>
  );
}
```

### Multi-Step Form

```tsx
import {
  GlassCard,
  GlassStepper,
  GlassButton,
  GlassProgress,
} from "@liquidify/components";

function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Account", "Profile", "Preferences", "Review"];

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <GlassCard className="max-w-2xl mx-auto p-8">
      <GlassStepper steps={steps} current={currentStep} />
      <GlassProgress value={progress} className="mt-4 mb-8" />

      <div className="min-h-[300px]">
        {currentStep === 0 && <AccountStep />}
        {currentStep === 1 && <ProfileStep />}
        {currentStep === 2 && <PreferencesStep />}
        {currentStep === 3 && <ReviewStep />}
      </div>

      <div className="flex justify-between mt-8">
        <GlassButton
          variant="secondary"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Previous
        </GlassButton>

        <GlassButton
          variant="primary"
          onClick={() =>
            setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
          }
        >
          {currentStep === steps.length - 1 ? "Submit" : "Next"}
        </GlassButton>
      </div>
    </GlassCard>
  );
}
```

### Dynamic Form Fields

```tsx
function DynamicForm() {
  const [fields, setFields] = useState([{ id: 1, value: "" }]);

  const addField = () => {
    setFields([...fields, { id: Date.now(), value: "" }]);
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  return (
    <GlassCard className="p-6">
      <h3 className="text-lg font-semibold mb-4">Dynamic Fields</h3>

      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 mb-3">
          <GlassInput
            placeholder={`Field ${index + 1}`}
            value={field.value}
            onChange={(e) => {
              const updated = [...fields];
              updated[index].value = e.target.value;
              setFields(updated);
            }}
            className="flex-1"
          />
          <GlassButton
            variant="secondary"
            size="sm"
            onClick={() => removeField(field.id)}
            disabled={fields.length === 1}
          >
            Remove
          </GlassButton>
        </div>
      ))}

      <GlassButton variant="primary" size="sm" onClick={addField}>
        Add Field
      </GlassButton>
    </GlassCard>
  );
}
```

## Navigation Patterns

### Dashboard Layout

```tsx
import {
  Navbar,
  Sidebar,
  GlassBreadcrumbs,
  ThemeToggle,
} from "@liquidify/components";

function DashboardLayout({ children }) {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Analytics", href: "/dashboard/analytics" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">LiquidUI Dashboard</h1>
          <ThemeToggle />
        </div>
      </Navbar>

      <div className="flex">
        <Sidebar>
          <SidebarContent />
        </Sidebar>

        <main className="flex-1 p-6">
          <GlassBreadcrumbs items={breadcrumbs} />
          <div className="mt-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
```

### Tab Navigation

```tsx
import { GlassTabs, GlassCard } from "@liquidify/components";

function TabbedInterface() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: <OverviewIcon /> },
    { id: "analytics", label: "Analytics", icon: <AnalyticsIcon /> },
    { id: "reports", label: "Reports", icon: <ReportsIcon /> },
    { id: "settings", label: "Settings", icon: <SettingsIcon /> },
  ];

  return (
    <GlassCard>
      <GlassTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        variant="pills"
      />

      <div className="p-6">
        {activeTab === "overview" && <OverviewContent />}
        {activeTab === "analytics" && <AnalyticsContent />}
        {activeTab === "reports" && <ReportsContent />}
        {activeTab === "settings" && <SettingsContent />}
      </div>
    </GlassCard>
  );
}
```

## Data Display Patterns

### Data Table with Actions

```tsx
import {
  GlassTable,
  GlassButton,
  GlassDropdown,
  GlassBadge,
} from "@liquidify/components";

function UserTable() {
  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions", align: "right" },
  ];

  const data = users.map((user) => ({
    ...user,
    role: <GlassBadge variant="info">{user.role}</GlassBadge>,
    status: (
      <GlassBadge variant={user.active ? "success" : "error"}>
        {user.active ? "Active" : "Inactive"}
      </GlassBadge>
    ),
    actions: (
      <GlassDropdown
        trigger={
          <GlassButton size="sm" variant="ghost">
            •••
          </GlassButton>
        }
        items={[
          { label: "Edit", onClick: () => handleEdit(user.id) },
          {
            label: "Delete",
            onClick: () => handleDelete(user.id),
            danger: true,
          },
        ]}
      />
    ),
  }));

  return (
    <GlassTable
      columns={columns}
      data={data}
      pagination={{
        page: 1,
        pageSize: 10,
        total: 100,
      }}
    />
  );
}
```

### Card Grid

```tsx
import { GlassCard, GlassAvatar, GlassBadge } from "@liquidify/components";

function TeamGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {team.map((member) => (
        <GlassCard key={member.id} className="p-6">
          <div className="flex items-start gap-4">
            <GlassAvatar src={member.avatar} name={member.name} size="lg" />
            <div className="flex-1">
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.title}</p>
              <div className="flex gap-2 mt-2">
                {member.skills.map((skill) => (
                  <GlassBadge key={skill} size="sm">
                    {skill}
                  </GlassBadge>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
```

## Feedback Patterns

### Toast Notifications

```tsx
import { useToast, GlassButton } from "@liquidify/components";

function NotificationExample() {
  const toast = useToast();

  const showNotifications = () => {
    toast.success("Profile updated successfully!");
    toast.error("Failed to save changes");
    toast.warning("Your session will expire in 5 minutes");
    toast.info("New features available");
  };

  return (
    <GlassButton onClick={showNotifications}>Show Notifications</GlassButton>
  );
}
```

### Loading States

```tsx
import { GlassSkeleton, GlassSpinner, GlassCard } from "@liquidify/components";

function LoadingPatterns() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <div className="space-y-4">
        {/* Skeleton for content */}
        <GlassCard className="p-6">
          <GlassSkeleton className="h-6 w-1/3 mb-4" />
          <GlassSkeleton className="h-4 w-full mb-2" />
          <GlassSkeleton className="h-4 w-3/4" />
        </GlassCard>

        {/* Centered spinner */}
        <GlassCard className="p-12 flex justify-center">
          <GlassSpinner size="lg" />
        </GlassCard>
      </div>
    );
  }

  return <ActualContent />;
}
```

### Empty States

```tsx
import { GlassCard, GlassButton } from "@liquidify/components";

function EmptyState({ onAction }) {
  return (
    <GlassCard className="p-12 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
        <EmptyIcon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No data found</h3>
      <p className="text-gray-600 mb-6">
        Get started by creating your first item
      </p>
      <GlassButton variant="primary" onClick={onAction}>
        Create New Item
      </GlassButton>
    </GlassCard>
  );
}
```

## Modal Patterns

### Confirmation Dialog

```tsx
import { GlassModal, GlassButton } from "@liquidify/components";

function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }) {
  return (
    <GlassModal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex gap-3 justify-end">
          <GlassButton variant="secondary" onClick={onClose}>
            Cancel
          </GlassButton>
          <GlassButton variant="primary" onClick={onConfirm}>
            Confirm
          </GlassButton>
        </div>
      </div>
    </GlassModal>
  );
}
```

### Form Modal

```tsx
import {
  GlassModal,
  GlassInput,
  GlassTextarea,
  GlassButton,
} from "@liquidify/components";

function CreateItemModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <GlassModal isOpen={isOpen} onClose={onClose} title="Create New Item">
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <GlassInput
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <GlassTextarea
          label="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={4}
        />

        <div className="flex gap-3 justify-end pt-4">
          <GlassButton type="button" variant="secondary" onClick={onClose}>
            Cancel
          </GlassButton>
          <GlassButton type="submit" variant="primary">
            Create
          </GlassButton>
        </div>
      </form>
    </GlassModal>
  );
}
```

## Complex Patterns

### Dashboard with Metrics

```tsx
import {
  GlassCard,
  GlassChart,
  GlassProgress,
  GlassBadge,
} from "@liquidify/components";

function MetricsDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Metric Cards */}
      {metrics.map((metric) => (
        <GlassCard key={metric.id} className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">{metric.label}</p>
              <h3 className="text-2xl font-bold">{metric.value}</h3>
            </div>
            <GlassBadge variant={metric.trend > 0 ? "success" : "error"}>
              {metric.trend > 0 ? "+" : ""}
              {metric.trend}%
            </GlassBadge>
          </div>
          <GlassProgress value={metric.progress} size="sm" />
        </GlassCard>
      ))}

      {/* Charts */}
      <GlassCard className="col-span-full lg:col-span-2 p-6">
        <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
        <GlassChart type="line" data={revenueData} height={300} />
      </GlassCard>

      <GlassCard className="col-span-full lg:col-span-2 p-6">
        <h3 className="text-lg font-semibold mb-4">User Activity</h3>
        <GlassChart type="bar" data={activityData} height={300} />
      </GlassCard>
    </div>
  );
}
```

### Search with Filters

```tsx
import {
  GlassSearch,
  GlassSelect,
  GlassCheckboxGroup,
  GlassCard,
} from "@liquidify/components";

function SearchInterface() {
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    tags: [],
  });

  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GlassSearch
            placeholder="Search..."
            value={filters.search}
            onChange={(value) => setFilters({ ...filters, search: value })}
            className="md:col-span-2"
          />

          <GlassSelect
            value={filters.category}
            onChange={(value) => setFilters({ ...filters, category: value })}
            options={[
              { value: "all", label: "All Categories" },
              { value: "products", label: "Products" },
              { value: "services", label: "Services" },
            ]}
          />
        </div>

        <div className="mt-4">
          <GlassCheckboxGroup
            label="Tags"
            options={tagOptions}
            value={filters.tags}
            onChange={(tags) => setFilters({ ...filters, tags })}
            inline
          />
        </div>
      </GlassCard>

      <SearchResults filters={filters} />
    </div>
  );
}
```

## Best Practices

1. **Consistency**: Use the same patterns throughout your application
2. **Accessibility**: Always include proper ARIA labels and keyboard support
3. **Loading States**: Show appropriate feedback during async operations
4. **Error Handling**: Provide clear error messages and recovery options
5. **Responsive Design**: Test patterns on different screen sizes
6. **Performance**: Use React.memo and useMemo for complex components
7. **Composition**: Build complex UIs by composing simple components
