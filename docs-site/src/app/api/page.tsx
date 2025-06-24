const apiSections = [
    { title: "Component Props", href: "/api/props" },
    { title: "Hooks", href: "/api/hooks" },
    { title: "Utilities", href: "/api/utils" },
    { title: "Tokens", href: "/api/tokens" }
];

export default function APIPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">API Reference</h1>
            <ul className="flex flex-col gap-4">
                {apiSections.map((section) => (
                    <li key={section.href}>
                        <a href={section.href} className="liquid-glass block p-4 rounded-lg border border-white/10 hover:border-green-400/40 transition-colors bg-white/5 hover:bg-green-400/10 font-medium">
                            {section.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
} 