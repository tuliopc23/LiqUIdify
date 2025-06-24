const guides = [
    { title: "Getting Started", href: "/guides/getting-started" },
    { title: "Theming & Customization", href: "/guides/theming" },
    { title: "Animations & Physics", href: "/guides/animations" },
    { title: "Accessibility", href: "/guides/accessibility" },
    { title: "Best Practices", href: "/guides/best-practices" }
];

export default function GuidesPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Guides</h1>
            <ul className="flex flex-col gap-4">
                {guides.map((guide) => (
                    <li key={guide.href}>
                        <a href={guide.href} className="liquid-glass block p-4 rounded-lg border border-white/10 hover:border-purple-400/40 transition-colors bg-white/5 hover:bg-purple-400/10 font-medium">
                            {guide.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
} 