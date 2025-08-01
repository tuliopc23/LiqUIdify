import type { Preview } from "@storybook/react";
import { GlassUIProvider } from "../../../libs/components/src/providers/glass-ui-provider";
import { ThemeProvider } from "../../../libs/components/src/components/theme-provider/theme-provider";
import React from "react";

// Import CSS styles
import "../../../libs/components/src/styles/glass.css";
import "../../../libs/components/src/styles/glass-core.css";
import "../../../libs/components/src/styles/glass-themes.css";
import "../../../libs/components/src/styles/glass-animations.css";
import "../../../libs/components/src/styles/glass-utilities.css";

const preview: Preview = {
    parameters: {
        actions: {argTypesRegex: "^on[A-Z].*"},
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
            expanded: true,
        },
        docs: {
            toc: true,
            canvas: {sourceState: "shown"},
        },
        backgrounds: {
            default: "glass",
            values: [
                {
                    name: "glass",
                    value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                },
                {
                    name: "light",
                    value: "#ffffff",
                },
                {
                    name: "dark",
                    value: "#1a1a1a",
                },
            ],
        },
        viewport: {
            viewports: {
                mobile1: {
                    name: "Small mobile",
                    styles: {width: "320px", height: "568px"},
                    type: "mobile",
                },
                mobile2: {
                    name: "Large mobile",
                    styles: {width: "414px", height: "896px"},
                    type: "mobile",
                },
                tablet: {
                    name: "Tablet",
                    styles: {width: "768px", height: "1024px"},
                    type: "tablet",
                },
                desktop: {
                    name: "Desktop",
                    styles: {width: "1440px", height: "900px"},
                    type: "desktop",
                },
            },
        },
        a11y: {
            config: {
                rules: [
                    {
                        id: "color-contrast",
                        enabled: true,
                    },
                    {
                        id: "aria-roles",
                        enabled: true,
                    },
                ],
            },
        },
    },
    globalTypes: {
        theme: {
            name: "Theme",
            description: "Global theme for components",
            defaultValue: "light",
            toolbar: {
                icon: "paintbrush",
                items: [
                    {value: "light", title: "Light", right: "☀️"},
                    {value: "dark", title: "Dark", right: "🌙"},
                ],
                showName: true,
                dynamicTitle: true,
            },
        },
    },
    decorators: [
        (Story, context) => {
            const theme = context.globals.theme;

            // Apply theme to document element
            React.useEffect(() => {
                document.documentElement.setAttribute("data-theme", theme);
                document.body.className = `theme-${ theme }`;
            }, [theme]);

            return React.createElement(
                ThemeProvider,
                {theme},
                React.createElement(
                    GlassUIProvider,
                    {
                        config: {
                            enableAnimations: true,
                            enableGlassEffects: true,
                            reducedMotion: false,
                        }
                    },
                    React.createElement(
                        "div",
                        {
                            style: {
                                padding: "1rem",
                                minHeight: "100vh",
                                background: theme === "dark"
                                    ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
                                    : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            }
                        },
                        React.createElement(Story)
                    )
                )
            );
        },
    ],
};
