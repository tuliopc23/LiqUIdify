import { describe, expect, it, jest } from "bun:test";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Calculator, Home, User, Settings } from "lucide-react";

// Import components for integration testing
import { GlassFormField } from "../components/glass-form-field/glass-form-field";
import { GlassNumberInput } from "../components/glass-number-input/glass-number-input";
import { GlassTextarea } from "../components/glass-textarea/glass-textarea";
import { GlassCheckboxGroup } from "../components/glass-checkbox-group/glass-checkbox-group";
import { GlassRadioGroup, RadioGroup } from "../components/glass-radio-group/glass-radio-group";
import { GlassSelect } from "../components/glass-select/glass-select";
import { GlassSearch } from "../components/glass-search/glass-search";
import { GlassMobileNav, type NavItem } from "../components/glass-mobile-nav/glass-mobile-nav";
import { GlassPagination } from "../components/glass-pagination/glass-pagination";

// Mock createPortal for mobile nav testing
jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    createPortal: (children: React.ReactNode) => children,
}));

describe("Integration Tests", () => {
    describe("Form Composition", () => {
        it("should compose form components together", async () => {
            const handleSubmit = jest.fn();

            const FormExample = () => {
                const [name, setName] = useState("");
                const [age, setAge] = useState<number | undefined>();
                const [bio, setBio] = useState("");
                const [preferences, setPreferences] = useState<string[]>([]);
                const [gender, setGender] = useState("");

                return (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit({ name, age, bio, preferences, gender });
                    }}>
                        <GlassFormField
                            label="Personal Information"
                            variant="card"
                        >
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full Name"
                                className="w-full p-2 rounded bg-white/10 text-white"
                            />
                        </GlassFormField>

                        <GlassNumberInput
                            label="Age"
                            value={age}
                            onChange={setAge}
                            min={0}
                            max={120}
                        />

                        <GlassTextarea
                            label="Bio"
                            value={bio}
                            onChange={setBio}
                            maxLength={500}
                            showCharacterCount
                        />

                        <GlassCheckboxGroup
                            label="Interests"
                            options={[
                                { value: "tech", label: "Technology" },
                                { value: "sports", label: "Sports" },
                                { value: "music", label: "Music" },
                            ]}
                            value={preferences}
                            onChange={setPreferences}
                        />

                        <RadioGroup
                            value={gender}
                            onValueChange={setGender}
                        >
                            <RadioGroup.Item value="male">Male</RadioGroup.Item>
                            <RadioGroup.Item value="female">Female</RadioGroup.Item>
                            <RadioGroup.Item value="other">Other</RadioGroup.Item>
                        </RadioGroup>

                        <button type="submit">Submit</button>
                    </form>
                );
            };

            render(<FormExample />);

            // Fill out the form
            const nameInput = screen.getByPlaceholderText("Full Name");
            fireEvent.change(nameInput, { target: { value: "John Doe" } });

            const ageInput = screen.getByRole("spinbutton");
            fireEvent.change(ageInput, { target: { value: "25" } });

            const bioTextarea = screen.getByLabelText("Bio");
            fireEvent.change(bioTextarea, { target: { value: "Software developer" } });

            const techCheckbox = screen.getByLabelText("Technology");
            fireEvent.click(techCheckbox);

            const maleRadio = screen.getByText("Male");
            fireEvent.click(maleRadio);

            const submitButton = screen.getByText("Submit");
            fireEvent.click(submitButton);

            expect(handleSubmit).toHaveBeenCalledWith({
                name: "John Doe",
                age: 25,
                bio: "Software developer",
                preferences: ["tech"],
                gender: "male",
            });
        });

        it("should handle form validation workflow", () => {
            const ValidationForm = () => {
                const [email, setEmail] = useState("");
                const [password, setPassword] = useState("");
                const [errors, setErrors] = useState<Record<string, string>>({});

                const validate = () => {
                    const newErrors: Record<string, string> = {};

                    if (!email.includes("@")) {
                        newErrors.email = "Please enter a valid email";
                    }

                    if (password.length < 8) {
                        newErrors.password = "Password must be at least 8 characters";
                    }

                    setErrors(newErrors);
                    return Object.keys(newErrors).length === 0;
                };

                return (
                    <div>
                        <GlassFormField
                            label="Email"
                            error={!!errors.email}
                            helperText={errors.email}
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 rounded bg-white/10 text-white"
                            />
                        </GlassFormField>

                        <GlassFormField
                            label="Password"
                            error={!!errors.password}
                            helperText={errors.password}
                        >
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 rounded bg-white/10 text-white"
                            />
                        </GlassFormField>

                        <button onClick={validate}>Validate</button>
                    </div>
                );
            };

            render(<ValidationForm />);

            const validateButton = screen.getByText("Validate");
            fireEvent.click(validateButton);

            expect(screen.getByText("Please enter a valid email")).toBeInTheDocument();
            expect(screen.getByText("Password must be at least 8 characters")).toBeInTheDocument();
        });
    });

    describe("Navigation Workflows", () => {
        it("should handle mobile navigation flow", async () => {
            const handleNavigation = jest.fn();

            const navItems: NavItem[] = [
                {
                    id: "home",
                    label: "Home",
                    icon: <Home className="h-5 w-5" />,
                },
                {
                    id: "profile",
                    label: "Profile",
                    icon: <User className="h-5 w-5" />,
                    children: [
                        {
                            id: "settings",
                            label: "Settings",
                            icon: <Settings className="h-5 w-5" />,
                        },
                    ],
                },
            ];

            render(
                <GlassMobileNav
                    items={navItems}
                    onItemClick={handleNavigation}
                />
            );

            // Open navigation
            const hamburgerButton = screen.getByLabelText("Open navigation menu");
            fireEvent.click(hamburgerButton);

            await waitFor(() => {
                expect(screen.getByRole("navigation")).toBeInTheDocument();
            });

            // Expand nested item
            const profileButton = screen.getByText("Profile");
            fireEvent.click(profileButton);

            await waitFor(() => {
                expect(screen.getByText("Settings")).toBeInTheDocument();
            });

            // Click nested item
            const settingsButton = screen.getByText("Settings");
            fireEvent.click(settingsButton);

            expect(handleNavigation).toHaveBeenCalledWith(
                expect.objectContaining({ id: "settings", label: "Settings" })
            );
        });

        it("should handle pagination workflow", () => {
            const handlePageChange = jest.fn();

            render(
                <GlassPagination
                    currentPage={1}
                    totalPages={10}
                    onPageChange={handlePageChange}
                />
            );

            // Click next page
            const nextButton = screen.getByLabelText("Go to next page");
            fireEvent.click(nextButton);

            expect(handlePageChange).toHaveBeenCalledWith(2);

            // Click specific page
            const page5Button = screen.getByLabelText("Go to page 5");
            fireEvent.click(page5Button);

            expect(handlePageChange).toHaveBeenCalledWith(5);
        });
    });

    describe("Search and Selection Workflows", () => {
        it("should handle search with suggestions", async () => {
            const handleSearch = jest.fn();
            const handleSuggestionClick = jest.fn();

            const suggestions = [
                { id: "1", text: "React", type: "suggestion" as const },
                { id: "2", text: "TypeScript", type: "suggestion" as const },
                { id: "3", text: "JavaScript", type: "suggestion" as const },
            ];

            render(
                <GlassSearch
                    suggestions={suggestions}
                    onSearch={handleSearch}
                    onSuggestionClick={handleSuggestionClick}
                />
            );

            const searchInput = screen.getByPlaceholderText("Search...");

            // Type in search
            fireEvent.change(searchInput, { target: { value: "React" } });
            fireEvent.focus(searchInput);

            await waitFor(() => {
                expect(screen.getByText("React")).toBeInTheDocument();
            });

            // Click suggestion
            const reactSuggestion = screen.getByText("React");
            fireEvent.click(reactSuggestion);

            expect(handleSuggestionClick).toHaveBeenCalledWith(
                expect.objectContaining({ text: "React" })
            );
        });

        it("should handle select with multiple options", async () => {
            const handleChange = jest.fn();

            const options = [
                { value: "react", label: "React" },
                { value: "vue", label: "Vue" },
                { value: "angular", label: "Angular" },
            ];

            render(
                <GlassSelect
                    options={options}
                    multiple={true}
                    onChange={handleChange}
                    placeholder="Select frameworks"
                />
            );

            const selectTrigger = screen.getByText("Select frameworks");
            fireEvent.click(selectTrigger);

            await waitFor(() => {
                expect(screen.getByText("React")).toBeInTheDocument();
            });

            // Select multiple options
            const reactOption = screen.getByText("React");
            fireEvent.click(reactOption);

            const vueOption = screen.getByText("Vue");
            fireEvent.click(vueOption);

            expect(handleChange).toHaveBeenCalledWith(["react"]);
            expect(handleChange).toHaveBeenCalledWith(["react", "vue"]);
        });
    });

    describe("Responsive Behavior", () => {
        it("should handle responsive components", () => {
            // Mock window.innerWidth for responsive testing
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 768,
            });

            const ResponsiveExample = () => {
                return (
                    <div>
                        <GlassMobileNav
                            items={[
                                { id: "home", label: "Home" },
                                { id: "about", label: "About" },
                            ]}
                        />
                    </div>
                );
            };

            render(<ResponsiveExample />);

            // Should render mobile navigation
            expect(screen.getByLabelText("Open navigation menu")).toBeInTheDocument();
        });
    });

    describe("Component State Management", () => {
        it("should handle complex state interactions", () => {
            const ComplexForm = () => {
                const [formData, setFormData] = useState({
                    quantity: 1,
                    notes: "",
                    categories: [] as string[],
                });

                const updateQuantity = (value: number | undefined) => {
                    setFormData(prev => ({ ...prev, quantity: value || 0 }));
                };

                const updateNotes = (value: string) => {
                    setFormData(prev => ({ ...prev, notes: value }));
                };

                const updateCategories = (value: string[]) => {
                    setFormData(prev => ({ ...prev, categories: value }));
                };

                return (
                    <div>
                        <GlassNumberInput
                            label="Quantity"
                            value={formData.quantity}
                            onChange={updateQuantity}
                            min={1}
                            max={100}
                        />

                        <GlassTextarea
                            label="Notes"
                            value={formData.notes}
                            onChange={updateNotes}
                            maxLength={200}
                            showCharacterCount
                        />

                        <GlassCheckboxGroup
                            label="Categories"
                            options={[
                                { value: "urgent", label: "Urgent" },
                                { value: "important", label: "Important" },
                            ]}
                            value={formData.categories}
                            onChange={updateCategories}
                        />

                        <div data-testid="form-state">
                            {JSON.stringify(formData)}
                        </div>
                    </div>
                );
            };

            render(<ComplexForm />);

            // Update quantity
            const quantityInput = screen.getByRole("spinbutton");
            fireEvent.change(quantityInput, { target: { value: "5" } });

            // Update notes
            const notesTextarea = screen.getByLabelText("Notes");
            fireEvent.change(notesTextarea, { target: { value: "Test notes" } });

            // Update categories
            const urgentCheckbox = screen.getByLabelText("Urgent");
            fireEvent.click(urgentCheckbox);

            const formState = screen.getByTestId("form-state");
            expect(formState).toHaveTextContent('"quantity":5');
            expect(formState).toHaveTextContent('"notes":"Test notes"');
            expect(formState).toHaveTextContent('"categories":["urgent"]');
        });
    });
});

// Helper function to simulate React state in tests
function useState<T>(initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
    let value = initialValue;
    const setValue = (newValue: T | ((prev: T) => T)) => {
        if (typeof newValue === 'function') {
            value = (newValue as (prev: T) => T)(value);
        } else {
            value = newValue;
        }
    };
    return [value, setValue];
}