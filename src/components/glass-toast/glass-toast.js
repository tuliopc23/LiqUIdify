import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn, getGlassClass } from "@/lib/glass-utils";
const ToastContext = createContext(undefined);
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
export const ToastProvider = ({ children, position = "top-right" }) => {
    const [toasts, setToasts] = useState([]);
    const addToast = (toast) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast = { ...toast, id };
        setToasts(prev => [...prev, newToast]);
        // Auto remove after duration
        setTimeout(() => {
            removeToast(id);
        }, toast.duration || 5000);
    };
    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };
    const positionClasses = {
        "top-right": "top-4 right-4",
        "top-left": "top-4 left-4",
        "bottom-right": "bottom-4 right-4",
        "bottom-left": "bottom-4 left-4",
        "top-center": "top-4 left-1/2 transform -translate-x-1/2",
        "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2"
    };
    return (_jsxs(ToastContext.Provider, { value: { addToast, removeToast }, children: [children, createPortal(_jsx("div", { className: cn("fixed z-50 flex flex-col space-y-2", positionClasses[position]), children: toasts.map(toast => (_jsx(ToastItem, { toast: toast, onRemove: removeToast }, toast.id))) }), document.body)] }));
};
const ToastItem = ({ toast, onRemove }) => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        setIsVisible(true);
    }, []);
    const handleRemove = () => {
        setIsVisible(false);
        setTimeout(() => onRemove(toast.id), 200);
    };
    const icons = {
        success: CheckCircle,
        error: AlertCircle,
        warning: AlertTriangle,
        info: Info
    };
    const iconColors = {
        success: "text-green-500",
        error: "text-red-500",
        warning: "text-yellow-500",
        info: "text-blue-500"
    };
    const Icon = icons[toast.type || "info"];
    return (_jsx("div", { className: cn(getGlassClass("elevated"), "p-4 rounded-xl border border-white/20 dark:border-white/10", "min-w-[300px] max-w-[400px]", "transition-all duration-200 ease-out", isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"), children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx(Icon, { className: cn("h-5 w-5 mt-0.5 flex-shrink-0", iconColors[toast.type || "info"]) }), _jsxs("div", { className: "flex-1 min-w-0", children: [toast.title && (_jsx("h4", { className: "text-sm font-semibold text-gray-900 dark:text-white mb-1", children: toast.title })), _jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300", children: toast.description }), toast.action && (_jsx("button", { onClick: toast.action.onClick, className: "mt-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline", children: toast.action.label }))] }), _jsx("button", { onClick: handleRemove, className: "flex-shrink-0 p-1 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors", children: _jsx(X, { className: "h-4 w-4 text-gray-400" }) })] }) }));
};
export const GlassToast = ({ type = "info", message, onClose }) => {
    const icons = {
        success: CheckCircle,
        error: AlertCircle,
        warning: AlertTriangle,
        info: Info
    };
    const iconColors = {
        success: "text-green-500",
        error: "text-red-500",
        warning: "text-yellow-500",
        info: "text-blue-500"
    };
    const Icon = icons[type];
    return (_jsx("div", { className: cn(getGlassClass("elevated"), "p-4 rounded-xl border border-white/20 dark:border-white/10", "min-w-[300px] max-w-[400px]", "transition-all duration-200 ease-out"), children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx(Icon, { className: cn("h-5 w-5 mt-0.5 flex-shrink-0", iconColors[type]) }), _jsx("div", { className: "flex-1 min-w-0", children: _jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300", children: message }) }), onClose && (_jsx("button", { onClick: onClose, className: "flex-shrink-0 p-1 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors", children: _jsx(X, { className: "h-4 w-4 text-gray-400" }) }))] }) }));
};
