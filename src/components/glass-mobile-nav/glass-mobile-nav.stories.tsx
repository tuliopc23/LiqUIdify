import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	Bell,
	Calendar,
	Heart,
	Home,
	Mail,
	Phone,
	Search,
	Settings,
	Star,
	User,
} from "lucide-react";
import { GlassMobileNav } from "./glass-mobile-nav";

const meta: Meta<typeof GlassMobileNav> = {
	title: "Glass/GlassMobileNav",
	component: GlassMobileNav,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"A responsive mobile navigation component with glass morphism effects and nested menu support.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		onItemClick: {
			action: "item clicked",
			description: "Callback fired when a navigation item is clicked",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicNavItems = [
	{
		id: "home",
		label: "Home",
		href: "/",
		icon: <Home className="w-5 h-5" />,
	},
	{
		id: "profile",
		label: "Profile",
		href: "/profile",
		icon: <User className="w-5 h-5" />,
	},
	{
		id: "settings",
		label: "Settings",
		href: "/settings",
		icon: <Settings className="w-5 h-5" />,
	},
	{
		id: "contact",
		label: "Contact",
		href: "/contact",
		icon: <Mail className="w-5 h-5" />,
	},
];

const nestedNavItems = [
	{
		id: "home",
		label: "Home",
		href: "/",
		icon: <Home className="w-5 h-5" />,
	},
	{
		id: "services",
		label: "Services",
		icon: <Star className="w-5 h-5" />,
		children: [
			{
				id: "web-design",
				label: "Web Design",
				href: "/services/web-design",
			},
			{
				id: "development",
				label: "Development",
				href: "/services/development",
			},
			{
				id: "consulting",
				label: "Consulting",
				href: "/services/consulting",
			},
		],
	},
	{
		id: "products",
		label: "Products",
		icon: <Search className="w-5 h-5" />,
		children: [
			{
				id: "mobile-apps",
				label: "Mobile Apps",
				href: "/products/mobile-apps",
			},
			{
				id: "web-apps",
				label: "Web Applications",
				href: "/products/web-apps",
			},
			{
				id: "plugins",
				label: "Plugins",
				href: "/products/plugins",
			},
		],
	},
	{
		id: "contact",
		label: "Contact",
		href: "/contact",
		icon: <Phone className="w-5 h-5" />,
	},
];

const complexNavItems = [
	{
		id: "dashboard",
		label: "Dashboard",
		href: "/dashboard",
		icon: <Home className="w-5 h-5" />,
	},
	{
		id: "account",
		label: "Account",
		icon: <User className="w-5 h-5" />,
		children: [
			{
				id: "profile",
				label: "Profile Settings",
				href: "/account/profile",
			},
			{
				id: "billing",
				label: "Billing",
				href: "/account/billing",
			},
			{
				id: "notifications",
				label: "Notifications",
				href: "/account/notifications",
			},
			{
				id: "security",
				label: "Security",
				href: "/account/security",
			},
		],
	},
	{
		id: "workspace",
		label: "Workspace",
		icon: <Calendar className="w-5 h-5" />,
		children: [
			{
				id: "projects",
				label: "Projects",
				href: "/workspace/projects",
			},
			{
				id: "team",
				label: "Team Members",
				href: "/workspace/team",
			},
			{
				id: "analytics",
				label: "Analytics",
				href: "/workspace/analytics",
			},
		],
	},
	{
		id: "support",
		label: "Support",
		icon: <Bell className="w-5 h-5" />,
		children: [
			{
				id: "help-center",
				label: "Help Center",
				href: "/support/help",
			},
			{
				id: "tickets",
				label: "Support Tickets",
				href: "/support/tickets",
			},
			{
				id: "feedback",
				label: "Send Feedback",
				href: "/support/feedback",
			},
		],
	},
	{
		id: "settings",
		label: "Settings",
		href: "/settings",
		icon: <Settings className="w-5 h-5" />,
	},
];

export const Default: Story = {
	args: {
		items: basicNavItems,
		onItemClick: (item) => console.log("Clicked:", item),
	},
};

export const WithNestedMenus: Story = {
	args: {
		items: nestedNavItems,
		onItemClick: (item) => console.log("Clicked:", item),
	},
};

export const ComplexNavigation: Story = {
	args: {
		items: complexNavItems,
		onItemClick: (item) => console.log("Clicked:", item),
	},
};

export const MinimalNav: Story = {
	args: {
		items: [
			{
				id: "home",
				label: "Home",
				href: "/",
			},
			{
				id: "about",
				label: "About",
				href: "/about",
			},
			{
				id: "contact",
				label: "Contact",
				href: "/contact",
			},
		],
		onItemClick: (item) => console.log("Clicked:", item),
	},
};

export const WithActions: Story = {
	args: {
		items: [
			{
				id: "home",
				label: "Home",
				href: "/",
				icon: <Home className="w-5 h-5" />,
			},
			{
				id: "favorites",
				label: "Add to Favorites",
				icon: <Heart className="w-5 h-5" />,
				action: () => alert("Added to favorites!"),
			},
			{
				id: "notifications",
				label: "Enable Notifications",
				icon: <Bell className="w-5 h-5" />,
				action: () => alert("Notifications enabled!"),
			},
			{
				id: "settings",
				label: "Settings",
				href: "/settings",
				icon: <Settings className="w-5 h-5" />,
			},
		],
		onItemClick: (item) => {
			console.log("Clicked:", item);
			if (item.action) {
				item.action();
			}
		},
	},
};

export const CustomStyling: Story = {
	args: {
		items: nestedNavItems,
		className: "custom-mobile-nav",
		onItemClick: (item) => console.log("Clicked:", item),
	},
	parameters: {
		docs: {
			description: {
				story:
					"Mobile navigation with custom styling applied through className prop.",
			},
		},
	},
};
