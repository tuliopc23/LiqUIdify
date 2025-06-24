import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useId } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/glass-utils";
export function GlassModal({ isOpen, onClose, title, children, className, titleClassName, contentClassName, }) {
    const modalRef = useRef(null);
    const titleId = useId();
    // const contentId = useId(); // If using aria-describedby for a specific content block
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.addEventListener("keydown", handleEsc);
            // TODO: Implement focus trapping. When modal opens, focus should be moved inside.
            // Tab navigation should be contained within the modal.
            // modalRef.current?.focus(); // Example: focus the modal container or first focusable element
        }
        else {
            document.body.style.overflow = "unset";
            document.removeEventListener("keydown", handleEsc);
            // TODO: Restore focus to the element that opened the modal when it closes.
        }
        return () => {
            document.body.style.overflow = "unset";
            document.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, onClose]);
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", 
        // TODO: Move these styles to a dedicated CSS class e.g., .glass-modal-backdrop
        style: {
            background: "rgba(0, 0, 0, 0.5)", // Example: --glass-modal-backdrop-bg or similar token
            backdropFilter: "blur(10px)", // Example: --glass-modal-backdrop-blur or similar token
        }, onClick: onClose, children: _jsxs("div", { ref: modalRef, role: "dialog", "aria-modal": "true", "aria-labelledby": title ? titleId : undefined, 
            // aria-describedby={contentId} // If you have a specific content block to describe the modal
            className: cn("glass-effect rounded-2xl p-8 max-w-md w-full animate-scale", // Base styles
            "outline-none", // Ensure focus styles are managed if modal itself is focused
            className // Custom class for the modal dialog
            ), onClick: (e) => e.stopPropagation(), tabIndex: -1, children: [title && (_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { id: titleId, className: cn("text-lg font-semibold text-primary", titleClassName), children: title }), _jsx("button", { onClick: onClose, "aria-label": "Close modal", className: "p-2 rounded-lg glass-effect btn-scale focus:outline-none focus:ring-2 focus:ring-blue-500" // Added focus styles
                            , children: _jsx(X, { className: "h-4 w-4 text-secondary" }) })] })), _jsxs("div", { className: cn(contentClassName), children: [" ", " ", children] })] }) }));
}
