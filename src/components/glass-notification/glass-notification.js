import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle, Bell } from "lucide-react";
import { cn, getGlassClass, microInteraction } from "@/lib/glass-utils";
export const NotificationCenter = ({ notifications, onMarkAsRead, onMarkAllAsRead, onDismiss, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const unreadCount = notifications.filter(n => !n.read).length;
    const getIcon = (type) => {
        const iconClasses = "w-4 h-4 flex-shrink-0";
        switch (type) {
            case "success": return _jsx(CheckCircle, { className: cn(iconClasses, "text-green-500") });
            case "error": return _jsx(AlertCircle, { className: cn(iconClasses, "text-red-500") });
            case "warning": return _jsx(AlertTriangle, { className: cn(iconClasses, "text-yellow-500") });
            case "info": return _jsx(Info, { className: cn(iconClasses, "text-blue-500") });
            default: return _jsx(Bell, { className: cn(iconClasses, "text-gray-500") });
        }
    };
    const formatTime = (timestamp) => {
        const now = new Date();
        const diff = now.getTime() - timestamp.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        if (minutes < 1)
            return "Just now";
        if (minutes < 60)
            return `${minutes}m ago`;
        if (hours < 24)
            return `${hours}h ago`;
        return timestamp.toLocaleDateString();
    };
    return (_jsxs("div", { className: cn("relative", className), children: [_jsxs("button", { onClick: () => setIsOpen(!isOpen), className: cn("relative p-2 rounded-xl", getGlassClass("default"), "hover:bg-[var(--glass-bg-elevated)]", microInteraction.gentle, "focus:outline-none focus:ring-2 focus:ring-blue-500/30"), children: [_jsx(Bell, { className: "w-5 h-5 text-[var(--text-secondary)]" }), unreadCount > 0 && (_jsx("span", { className: "absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium", children: unreadCount > 9 ? "9+" : unreadCount }))] }), isOpen && (_jsxs("div", { className: cn("absolute right-0 top-full mt-2 w-80 max-h-96 overflow-hidden rounded-xl z-50", getGlassClass("elevated"), "border border-[var(--glass-border)]"), children: [_jsx("div", { className: "p-4 border-b border-[var(--glass-border)]", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "font-semibold text-[var(--text-primary)]", children: "Notifications" }), _jsxs("div", { className: "flex items-center gap-2", children: [unreadCount > 0 && (_jsx("button", { onClick: onMarkAllAsRead, className: "text-xs text-blue-500 hover:text-blue-600 font-medium", children: "Mark all read" })), _jsx("button", { onClick: () => setIsOpen(false), className: "p-1 rounded-lg hover:bg-[var(--glass-bg)] text-[var(--text-secondary)]", children: _jsx(X, { className: "w-4 h-4" }) })] })] }) }), _jsx("div", { className: "max-h-80 overflow-y-auto", children: notifications.length === 0 ? (_jsxs("div", { className: "p-8 text-center", children: [_jsx(Bell, { className: "w-8 h-8 text-[var(--text-tertiary)] mx-auto mb-2" }), _jsx("p", { className: "text-[var(--text-secondary)] text-sm", children: "No notifications" })] })) : (notifications.map((notification) => (_jsx("div", { className: cn("p-4 border-b border-[var(--glass-border)] last:border-b-0", "hover:bg-[var(--glass-bg)] cursor-pointer", microInteraction.gentle, !notification.read && "bg-blue-50/50 dark:bg-blue-950/20"), onClick: () => onMarkAsRead?.(notification.id), children: _jsxs("div", { className: "flex items-start gap-3", children: [getIcon(notification.type), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center justify-between gap-2", children: [_jsx("h4", { className: cn("text-sm font-medium truncate", notification.read ? "text-[var(--text-secondary)]" : "text-[var(--text-primary)]"), children: notification.title }), !notification.read && (_jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" }))] }), _jsx("p", { className: "text-xs text-[var(--text-secondary)] mt-1 line-clamp-2", children: notification.message }), _jsxs("div", { className: "flex items-center justify-between mt-2", children: [notification.timestamp && (_jsx("span", { className: "text-xs text-[var(--text-tertiary)]", children: formatTime(notification.timestamp) })), notification.action && (_jsx("button", { onClick: (e) => {
                                                            e.stopPropagation();
                                                            notification.action.onClick();
                                                        }, className: "text-xs text-blue-500 hover:text-blue-600 font-medium", children: notification.action.label }))] })] }), _jsx("button", { onClick: (e) => {
                                            e.stopPropagation();
                                            onDismiss?.(notification.id);
                                        }, className: "p-1 rounded-lg hover:bg-[var(--glass-bg)] text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx(X, { className: "w-3 h-3" }) })] }) }, notification.id)))) })] }))] }));
};
