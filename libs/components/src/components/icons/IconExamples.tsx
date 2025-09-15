import { useState } from "react";
import { IconButton } from "../iconButton";
import { Icon, type IconName } from "../icons";

/**
 * Example component showcasing the new Lucide-based icon system
 * This demonstrates contextual imports and SF Symbols-like icon usage
 */
export const IconExamples = () => {
	const [selectedIcon, setSelectedIcon] = useState<IconName>("home");

	const commonIcons: IconName[] = [
		"home",
		"search",
		"settings",
		"user",
		"mail",
		"phone",
		"edit",
		"trash-2",
		"plus",
		"minus",
		"check",
		"x",
		"eye",
		"eye-off",
		"download",
		"upload",
		"folder",
		"file",
	];

	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="text-center">
				<h1 className="text-2xl font-semibold mb-2">Icon System Examples</h1>
				<p className="text-muted-foreground">
					Lucide icons with contextual imports and SF Symbols-like naming
				</p>
			</div>

			{/* Basic Icon Usage */}
			<section className="space-y-4">
				<h2 className="text-lg font-medium">Basic Icon Usage</h2>
				<div className="flex items-center gap-4 p-4 border rounded-lg">
					<Icon name="home" size="md" />
					<Icon name="search" size="md" />
					<Icon name="settings" size="md" />
					<Icon name="user" size="md" />
					<Icon name="mail" size="md" />
				</div>
			</section>

			{/* Icon Sizes */}
			<section className="space-y-4">
				<h2 className="text-lg font-medium">Icon Sizes</h2>
				<div className="flex items-end gap-4 p-4 border rounded-lg">
					<div className="flex flex-col items-center gap-2">
						<Icon name="home" size="xs" />
						<span className="text-xs">xs (12px)</span>
					</div>
					<div className="flex flex-col items-center gap-2">
						<Icon name="home" size="sm" />
						<span className="text-xs">sm (16px)</span>
					</div>
					<div className="flex flex-col items-center gap-2">
						<Icon name="home" size="md" />
						<span className="text-xs">md (20px)</span>
					</div>
					<div className="flex flex-col items-center gap-2">
						<Icon name="home" size="lg" />
						<span className="text-xs">lg (24px)</span>
					</div>
					<div className="flex flex-col items-center gap-2">
						<Icon name="home" size="xl" />
						<span className="text-xs">xl (28px)</span>
					</div>
					<div className="flex flex-col items-center gap-2">
						<Icon name="home" size="2xl" />
						<span className="text-xs">2xl (32px)</span>
					</div>
					<div className="flex flex-col items-center gap-2">
						<Icon name="home" size={40} />
						<span className="text-xs">custom (40px)</span>
					</div>
				</div>
			</section>

			{/* IconButton Examples */}
			<section className="space-y-4">
				<h2 className="text-lg font-medium">IconButton Examples</h2>
				<div className="flex flex-wrap gap-4 p-4 border rounded-lg">
					<IconButton
						icon="search"
						variant="primary"
						size="sm"
						aria-label="Search"
					/>
					<IconButton
						icon="plus"
						variant="secondary"
						size="md"
						aria-label="Add new item"
					/>
					<IconButton
						icon="settings"
						variant="ghost"
						size="lg"
						aria-label="Open settings"
					/>
					<IconButton
						icon="trash-2"
						variant="danger"
						size="sm"
						aria-label="Delete item"
					/>
					<IconButton
						icon="download"
						variant="success"
						size="md"
						aria-label="Download file"
					/>
				</div>
			</section>

			{/* Interactive Icon Gallery */}
			<section className="space-y-4">
				<h2 className="text-lg font-medium">Interactive Icon Gallery</h2>
				<div className="p-4 border rounded-lg">
					<div className="mb-4">
						<p className="text-sm text-muted-foreground mb-2">
							Click an icon below:
						</p>
						<div className="flex gap-2 mb-4">
							{commonIcons.map((iconName) => (
								<button
									key={iconName}
									type="button"
									onClick={() => setSelectedIcon(iconName)}
									className={`p-2 rounded border transition-colors ${
										selectedIcon === iconName
											? "bg-primary text-primary-foreground border-primary"
											: "hover:bg-muted"
									}`}
								>
									<Icon name={iconName} size="md" />
								</button>
							))}
						</div>
					</div>
					<div className="flex items-center gap-4 p-4 bg-muted rounded">
						<Icon name={selectedIcon} size="2xl" />
						<div>
							<p className="font-medium">Selected: {selectedIcon}</p>
							<p className="text-sm text-muted-foreground">
								This icon is loaded contextually - only when needed!
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Usage Patterns */}
			<section className="space-y-4">
				<h2 className="text-lg font-medium">Common Usage Patterns</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* Form with Icons */}
					<div className="p-4 border rounded-lg">
						<h3 className="font-medium mb-3">Form Controls</h3>
						<div className="space-y-3">
							<div className="flex items-center gap-3 p-2 border rounded">
								<Icon name="user" size="sm" />
								<input
									type="text"
									placeholder="Username"
									className="flex-1 bg-transparent outline-none"
								/>
							</div>
							<div className="flex items-center gap-3 p-2 border rounded">
								<Icon name="mail" size="sm" />
								<input
									type="email"
									placeholder="Email"
									className="flex-1 bg-transparent outline-none"
								/>
							</div>
							<div className="flex items-center gap-3 p-2 border rounded">
								<Icon name="eye-off" size="sm" />
								<input
									type="password"
									placeholder="Password"
									className="flex-1 bg-transparent outline-none"
								/>
								<IconButton
									icon="eye"
									variant="ghost"
									size="sm"
									aria-label="Toggle visibility"
								/>
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="p-4 border rounded-lg">
						<h3 className="font-medium mb-3">Action Buttons</h3>
						<div className="flex flex-wrap gap-2">
							<IconButton
								icon="edit"
								variant="primary"
								size="sm"
								aria-label="Edit"
							/>
							<IconButton
								icon="download"
								variant="secondary"
								size="sm"
								aria-label="Download"
							/>
							<IconButton
								icon="settings"
								variant="ghost"
								size="sm"
								aria-label="Share"
							/>
							<IconButton
								icon="trash-2"
								variant="danger"
								size="sm"
								aria-label="Delete"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Code Examples */}
			<section className="space-y-4">
				<h2 className="text-lg font-medium">Code Examples</h2>
				<div className="space-y-4">
					<div className="p-4 bg-muted rounded-lg">
						<h4 className="font-medium mb-2">Basic Icon Usage</h4>
						<pre className="text-sm overflow-x-auto">
							{`<Icon name="home" size="md" />
<Icon name="search" size="lg" className="text-blue-500" />`}
						</pre>
					</div>

					<div className="p-4 bg-muted rounded-lg">
						<h4 className="font-medium mb-2">IconButton Usage</h4>
						<pre className="text-sm overflow-x-auto">
							{`<IconButton
  icon="search"
  variant="primary"
  size="sm"
  onClick={handleSearch}
  aria-label="Search"
/>`}
						</pre>
					</div>

					<div className="p-4 bg-muted rounded-lg">
						<h4 className="font-medium mb-2">Available Icons</h4>
						<p className="text-sm mb-2">
							Icons are imported contextually - only used icons are bundled:
						</p>
						<div className="flex flex-wrap gap-1 text-xs">
							{commonIcons.slice(0, 12).map((icon) => (
								<span key={icon} className="px-2 py-1 bg-background rounded">
									{icon}
								</span>
							))}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default IconExamples;
