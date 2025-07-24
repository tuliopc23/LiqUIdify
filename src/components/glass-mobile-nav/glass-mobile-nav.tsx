import { ChevronRight, Menu, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn, getGlassClass, microInteraction } from "@/core/utils/classname";

interface NavItem {
	id: string;
	label: string;
	href?: string;
	icon?: React.ReactNode;
	children?: NavItem[];
	action?: () => void;
}

interface GlassMobileNavProps {
	items: NavItem[];
	className?: string;
	onItemClick?: (item: NavItem) => void;
}

export const GlassMobileNav: React.FC<GlassMobileNavProps> = ({
	items,
	className,
	onItemClick,
}) => {
	const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null | null>(null);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	const handleItemClick = (item: NavItem) => {
		if (item.children?.length) {
    setActiveSubmenu(activeSubmenu === item.id ? undefined : item.id);
		} else {
			if (item.action) {
				item.action();
			}
			onItemClick?.(item);
			setIsOpen(false);
		}
	};

	const MenuTrigger = () => (
		<button
			onClick={() => setIsOpen(!isOpen)}
			className={cn(
				"p-3 rounded-xl",
				getGlassClass("default"),
				"hover:bg-[var(--glass-bg-elevated)]",
				microInteraction.interactive,
				"focus:outline-none focus:ring-2 focus:ring-blue-500/30",
				"md:hidden", // Only show on mobile
				className,
			)}
			aria-label="Toggle navigation menu"
		>
			{isOpen ? (
				<X className="w-5 h-5 text-[var(--text-primary)]" />
			) : (
				<Menu className="w-5 h-5 text-[var(--text-primary)]" />
			)}
		</button>
	);

	const renderNavItem = (item: NavItem, level = 0) => (
		<div key={item.id} className="w-full">
			<button
				onClick={() => handleItemClick(item)}
				className={cn(
					"w-full flex items-center justify-between p-4 text-left",
					"hover:bg-[var(--glass-bg)] active:bg-[var(--glass-bg-pressed)]",
					microInteraction.gentle,
					0 < level && "pl-8 border-l-2 border-[var(--glass-border)]",
				)}
			>
				<div className="flex items-center gap-3">
					{item.icon && (
						<span className="w-5 h-5 text-[var(--text-secondary)]">
							{item.icon}
						</span>
					)}
					<span className="text-[var(--text-primary)] font-medium">
						{item.label}
					</span>
				</div>
				{item.children?.length && (
					<ChevronRight
						className={cn(
							"w-4 h-4 text-[var(--text-secondary)] transition-transform duration-200",
							activeSubmenu === item.id && "rotate-90",
						)}
					/>
				)}
			</button>

			{/* Submenu */}
			{item.children?.length && activeSubmenu === item.id && (
				<div className="border-t border-[var(--glass-border)]">
					{item.children.map((child) => renderNavItem(child, level + 1))}
				</div>
			)}
		</div>
	);

	if (!isOpen) {
		return <MenuTrigger />;
	}

	return (
		<>
			<MenuTrigger />
			{"undefined" !== typeof window &&
				createPortal(
					<div className="fixed inset-0 z-50 md:hidden">
						{/* Backdrop */}
						<button
							className="absolute inset-0 bg-black/20 backdrop-blur-sm"
							onClick={() => setIsOpen(false)}
							onKeyDown={(e) => {
								if ("Enter" === e.key || " " === e.key) {
									e.preventDefault();
									setIsOpen(false);
								}
							}}
							aria-label="Close navigation menu"
						/>

						{/* Navigation Panel */}
						<div
							className={cn(
								"absolute right-0 top-0 h-full w-80 max-w-[85vw]",
								getGlassClass("elevated"),
								"border-l border-[var(--glass-border)]",
								"animate-in slide-in-from-right duration-300",
							)}
						>
							{/* Header */}
							<div className="flex items-center justify-between p-4 border-b border-[var(--glass-border)]">
								<h2 className="text-lg font-semibold text-[var(--text-primary)]">
									Navigation
								</h2>
								<button
									onClick={() => setIsOpen(false)}
									className="p-2 rounded-lg hover:bg-[var(--glass-bg)] text-[var(--text-secondary)]"
								>
									<X className="w-5 h-5" />
								</button>
							</div>

							{/* Navigation Items */}
							<div className="flex flex-col overflow-y-auto h-[calc(100%-80px)]">
								{items.map((item) => renderNavItem(item))}
							</div>
						</div>
					</div>,
					document.body,
				)}
		</>
	);
};
