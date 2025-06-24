export interface AccessibilityCheckResult {
    element: string;
    issues: AccessibilityIssue[];
    score: number;
}
export interface AccessibilityIssue {
    type: 'error' | 'warning' | 'info';
    rule: string;
    message: string;
    element?: string;
}
export declare class AccessibilityChecker {
    private issues;
    checkElement(element: HTMLElement, componentName: string): AccessibilityCheckResult;
    private checkAriaAttributes;
    private checkKeyboardAccess;
    private checkColorContrast;
    private checkFocusManagement;
    private checkSemanticMarkup;
    private isInteractiveElement;
}
export declare function runAccessibilityCheck(element: HTMLElement, componentName: string): AccessibilityCheckResult;
export declare function expectAccessible(element: HTMLElement, componentName: string, minScore?: number): void;
//# sourceMappingURL=accessibility-testing.d.ts.map