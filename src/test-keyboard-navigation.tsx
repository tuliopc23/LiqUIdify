/**
 * Keyboard Navigation Test Script
 * Tests the accessibility improvements for keyboard support
 */

import React from "react";

import { GlassCard } from "./components/glass-card-refactored/glass-card";

import { CommandPalette } from "./components/glass-command/glass-command";

import { GlassMobileNav } from "./components/glass-mobile-nav/glass-mobile-nav";

import { GlassModal } from "./components/glass-modal/glass-modal";

import { NotificationCenter } from "./components/glass-notification/glass-notification";

import { GlassModalLite } from "./lite/glass-modal-lite";

export function KeyboardNavigationTest() {
	const [modalLiteOpen, setModalLiteOpen] = React.useState(false);
	const [modalOpen, setModalOpen] = React.useState(false);
	const [selectedCard, setSelectedCard] = React.useState(false);

	const navItems = [
		{ id: "home", label: "Home", href: "/" },
		{ id: "about", label: "About", href: "/about" },
		{ id: "contact", label: "Contact", href: "/contact" },
	];

	const commandItems = [
		{
			id: "search",
			label: "Search",
			description: "Search for anything",
			action: () => console.log("Search action"),
		},
		{
			id: "settings",
			label: "Settings",
			description: "Open settings",
			action: () => console.log("Settings action"),
		},
	];

	const notifications = [
		{
			id: "1",
			title: "Test Notification",
			message: "This is a test notification message",
			type: "info" as const,
			timestamp: new Date(),
			read: false,
		},
	];

	return (

		<div className="p-8 max-w-4xl mx-auto space-y-8">

			<h1 className="text-3xl font-bold mb-8">Keyboard Navigation Test</h1>

			<div className="space-y-6">

				<section className="border p-6 rounded-lg">

					<h2 className="text-xl font-semibold mb-4">1. Glass Modal Lite</h2>

					<p className="text-gray-600 mb-4">
						Click the button or press Tab and Enter to open the modal. Press
						Escape or Enter on the backdrop to close.
					</p>

					<button
						onClick={() => setModalLiteOpen(true)}
						className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
					>
						Open Modal Lite
					</button>

					<GlassModalLite
						isOpen={modalLiteOpen}
						onClose={() => setModalLiteOpen(false)}
						title="Test Modal"
					>

						<p>Press Escape to close this modal</p>
					</GlassModalLite>
				</section>

				<section className="border p-6 rounded-lg">

					<h2 className="text-xl font-semibold mb-4">2. Glass Card</h2>

					<p className="text-gray-600 mb-4">
						Tab to focus the card, then press Enter or Space to select it.
					</p>

					<GlassCard
						interactive
						selectable
						selected={selectedCard}
						onCardSelect={setSelectedCard}
						className="p-6"
					>

						<h3 className="font-semibold mb-2">Interactive Card</h3>

						<p>Selected: {selectedCard ? "Yes" : "No"}</p>
					</GlassCard>
				</section>

				<section className="border p-6 rounded-lg">

					<h2 className="text-xl font-semibold mb-4">3. Glass Mobile Nav</h2>

					<p className="text-gray-600 mb-4">
						The mobile nav backdrop should be keyboard accessible.
					</p>

					<GlassMobileNav items={navItems} />
				</section>

				<section className="border p-6 rounded-lg">

					<h2 className="text-xl font-semibold mb-4">4. Command Palette</h2>

					<p className="text-gray-600 mb-4">
						The command palette backdrop should be keyboard accessible.
					</p>

					<CommandPalette items={commandItems} />
				</section>

				<section className="border p-6 rounded-lg">

					<h2 className="text-xl font-semibold mb-4">5. Glass Modal</h2>

					<p className="text-gray-600 mb-4">
						The modal backdrop should be keyboard accessible.
					</p>

					<button
						onClick={() => setModalOpen(true)}
						className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
					>
						Open Modal
					</button>

					<GlassModal
						isOpen={modalOpen}
						onClose={() => setModalOpen(false)}
						title="Test Modal"
					>

						<p>Press Escape to close this modal</p>
					</GlassModal>
				</section>

				<section className="border p-6 rounded-lg">

					<h2 className="text-xl font-semibold mb-4">6. Notification Center</h2>

					<p className="text-gray-600 mb-4">
						Notifications should be keyboard accessible. Tab to focus and press
						Enter or Space.
					</p>

					<NotificationCenter
						notifications={notifications}
						onMarkAsRead={(id) => console.log("Marked as read:", id)}
					/>
				</section>
			</div>

			<div className="mt-8 p-4 bg-gray-100 rounded-lg">

				<h3 className="font-semibold mb-2">
					Keyboard Navigation Instructions:
				</h3>

				<ul className="list-disc list-inside space-y-1 text-sm">

					<li>Use Tab to navigate between interactive elements</li>

					<li>
						Press Enter or Space to activate buttons and clickable elements
					</li>

					<li>Press Escape to close modals and overlays</li>

					<li>All interactive elements should have visible focus indicators</li>

					<li>Screen readers should announce proper labels and descriptions</li>
				</ul>
			</div>
		</div>
	);
}
