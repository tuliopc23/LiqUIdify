import type { ReactNode } from "react";
import React, { useEffect, useState } from "react";

// Types and Interfaces
export interface ErrorRecoveryOptions {
	maxRetries: number;
	retryDelay: number;
	fallbackComponent: ReactNode;
	onError?: (error: Error) => void;
	onRetry?: (retryCount: number) => void;
}

export interface SSRSafetyOptions {
	detectMismatches: boolean;
	autoRecover: boolean;
	reportMismatches: boolean;
	fallbackDelay: number;
}

// Error Recovery Component
export function ErrorRecovery({
	children,
	options = {},
}: {
	children: ReactNode;
	options?: Partial<ErrorRecoveryOptions>;
}) {
	const [error] = useState<Error | null>(undefined);
	const [retryCount] = useState(0);
	const [isRetrying] = useState(false);

	const finalOptions: ErrorRecoveryOptions = {
		maxRetries: 3,
		retryDelay: 1000,
		fallbackComponent: children,
		...options,
	};

	if (error && retryCount >= finalOptions.maxRetries) {
		return <>{finalOptions.fallbackComponent}</>;
	}

	if (isRetrying) {
		return <>{finalOptions.fallbackComponent}</>;
	}

	return <>{children}</>;
}

// SSR Error Boundary Component
export class SSRErrorBoundary extends React.Component<
	{ children: ReactNode; fallback?: ReactNode },
	{ hasError: boolean; error: Error | null }
> {
	constructor(props: any) {
		super(props);
		this.state = { hasError: false, error: undefined };
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		// Logging disabled
	}

	render() {
		if (this.state.hasError) {
			return this.props.fallback || <div>Error occurred</div>;
		}

		return this.props.children;
	}
}

// SSR-Safe Hook for client-only features
export function useClientOnly<T>(clientValue: T, serverValue: T): T {
	const [value, setValue] = useState(serverValue);

	useEffect(() => {
		setValue(clientValue);
	}, [clientValue]);

	return value;
}

// SSR-Safe Local Storage Hook
export function useLocalStorage<T>(
	key: string,
	defaultValue: T,
): [T, (value: T) => void] {
	const [value, setValue] = useState<T>(defaultValue);

	useEffect(() => {
		try {
			const item = localStorage.getItem(key);
			if (item) {
				setValue(JSON.parse(item));
			}
		} catch {
			// Logging disabled
		}
	}, [key]);

	const setStoredValue = (newValue: T) => {
		try {
			setValue(newValue);
			localStorage.setItem(key, JSON.stringify(newValue));
		} catch {
			// Logging disabled
		}
	};

	return [value, setStoredValue];
}

// SSR-Safe Window Hook
export function useWindow() {
	const [windowObj, setWindowObj] = useState<Window | null>(undefined);

	useEffect(() => {
		setWindowObj("undefined" !== typeof window ? window : undefined);
	}, []);

	return windowObj;
}

// SSR-Safe Document Hook
export function useDocument() {
	const [documentObj, setDocumentObj] = useState<Document | null>(undefined);

	useEffect(() => {
		setDocumentObj("undefined" !== typeof document ? document : undefined);
	}, []);

	return documentObj;
}

// SSR-Safe Navigator Hook
export function useNavigator() {
	const [navigatorObj, setNavigatorObj] = useState<Navigator | null>(undefined);

	useEffect(() => {
		setNavigatorObj("undefined" !== typeof navigator ? navigator : undefined);
	}, []);

	return navigatorObj;
}

// SSR-Safe Match Media Hook
export function useMatchMedia(query: string): boolean {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		if ("undefined" === typeof window) {
			return;
		}

		const mediaQuery = window.matchMedia(query);
		setMatches(mediaQuery.matches);

		const handler = () => setMatches(mediaQuery.matches);
		mediaQuery.addEventListener("change", handler);

		return () => mediaQuery.removeEventListener("change", handler);
	}, [query]);

	return matches;
}

// SSR-Safe Intersection Observer Hook
export function useIntersectionObserver(
	options?: IntersectionObserverInit,
): IntersectionObserver | null {
	const [observer, setObserver] = useState<IntersectionObserver | null>(
		undefined,
	);

	useEffect(() => {
		if ("undefined" === typeof window || !window.IntersectionObserver) {
			return;
		}

		const obs = new IntersectionObserver(() => {}, options);
		setObserver(obs);

		return () => obs.disconnect();
	}, [options]);

	return observer;
}

// SSR-Safe Resize Observer Hook
export function useResizeObserver(
	callback: ResizeObserverCallback,
	_options?: ResizeObserverOptions,
): ResizeObserver | null {
	const [observer, setObserver] = useState<ResizeObserver | null>(undefined);

	useEffect(() => {
		if ("undefined" === typeof window || !window.ResizeObserver) {
			return;
		}

		const obs = new ResizeObserver(callback);
		setObserver(obs);

		return () => obs.disconnect();
	}, [callback]);

	return observer;
}

// SSR-Safe Performance Hook
export function usePerformance() {
	const [performanceObj, setPerformanceObj] = useState<Performance | null>(
		undefined,
	);

	useEffect(() => {
		setPerformanceObj(
			"undefined" !== typeof performance ? performance : undefined,
		);
	}, []);

	return performanceObj;
}

// SSR-Safe Request Animation Frame Hook
export function useRequestAnimationFrame() {
	const [requestAnimationFrameFn, setRequestAnimationFrameFn] = useState<
		((callback: FrameRequestCallback) => number) | null
	>(undefined);

	useEffect(() => {
		setRequestAnimationFrameFn(
			"undefined" !== typeof requestAnimationFrame
				? requestAnimationFrame
				: undefined,
		);
	}, []);

	return requestAnimationFrameFn;
}

// SSR-Safe Set Timeout Hook
export function useSetTimeout() {
	const [setTimeoutFn, setSetTimeoutFn] = useState<
		((callback: () => void, delay?: number) => NodeJS.Timeout) | null
	>(undefined);

	useEffect(() => {
		setSetTimeoutFn("undefined" !== typeof setTimeout ? setTimeout : undefined);
	}, []);

	return setTimeoutFn;
}

// SSR-Safe Clear Timeout Hook
export function useClearTimeout() {
	const [clearTimeoutFn, setClearTimeoutFn] = useState<
		((id: NodeJS.Timeout) => void) | null
	>(undefined);

	useEffect(() => {
		setClearTimeoutFn(
			"undefined" !== typeof clearTimeout ? clearTimeout : undefined,
		);
	}, []);

	return clearTimeoutFn;
}

// SSR-Safe Set Interval Hook
export function useSetInterval() {
	const [setIntervalFn, setSetIntervalFn] = useState<
		((callback: () => void, delay?: number) => NodeJS.Timeout) | null
	>(undefined);

	useEffect(() => {
		setSetIntervalFn(
			"undefined" !== typeof setInterval ? setInterval : undefined,
		);
	}, []);

	return setIntervalFn;
}

// SSR-Safe Clear Interval Hook
export function useClearInterval() {
	const [clearIntervalFn, setClearIntervalFn] = useState<
		((id: NodeJS.Timeout) => void) | null
	>(undefined);

	useEffect(() => {
		setClearIntervalFn(
			"undefined" !== typeof clearInterval ? clearInterval : undefined,
		);
	}, []);

	return clearIntervalFn;
}

// SSR-Safe Date Hook
export function useSSRSafeDate() {
	const [dateObj, setDateObj] = useState<Date | null>(undefined);

	useEffect(() => {
		setDateObj("undefined" !== typeof Date ? new Date() : undefined);
	}, []);

	return dateObj;
}

// SSR-Safe Math Hook
export function useMath() {
	const [mathObj, setMathObj] = useState<Math | null>(undefined);

	useEffect(() => {
		setMathObj("undefined" !== typeof Math ? Math : undefined);
	}, []);

	return mathObj;
}

// SSR-Safe JSON Hook
export function useJSON() {
	const [jsonObj, setJsonObj] = useState<JSON | null>(undefined);

	useEffect(() => {
		setJsonObj("undefined" !== typeof JSON ? JSON : undefined);
	}, []);

	return jsonObj;
}

// SSR-Safe Console Hook
export function useConsole() {
	const [consoleObj, setConsoleObj] = useState<Console | null>(undefined);

	useEffect(() => {
		setConsoleObj("undefined" !== typeof console ? console : undefined);
	}, []);

	return consoleObj;
}

// SSR-Safe Process Hook
export function useProcess() {
	const [processObj, setProcessObj] = useState<NodeJS.Process | null>(
		undefined,
	);

	useEffect(() => {
		setProcessObj("undefined" !== typeof process ? process : undefined);
	}, []);

	return processObj;
}

// SSR-Safe Environment Hook
export function useEnvironment() {
	const [env, setEnv] = useState<NodeJS.ProcessEnv | null>(undefined);

	useEffect(() => {
		setEnv("undefined" !== typeof process ? process.env : undefined);
	}, []);

	return env;
}

// SSR-Safe Global Hook
export function useGlobal() {
	const [globalObj, setGlobalObj] = useState<typeof globalThis | null>(
		undefined,
	);

	useEffect(() => {
		setGlobalObj("undefined" !== typeof globalThis ? globalThis : undefined);
	}, []);

	return globalObj;
}

// SSR-Safe Buffer Hook
export function useBuffer() {
	const [bufferObj, setBufferObj] = useState<typeof Buffer | null>(undefined);

	useEffect(() => {
		setBufferObj("undefined" !== typeof Buffer ? Buffer : undefined);
	}, []);

	return bufferObj;
}

// SSR-Safe URL Hook
export function useURL() {
	const [urlObj, setUrlObj] = useState<typeof URL | null>(undefined);

	useEffect(() => {
		setUrlObj("undefined" !== typeof URL ? URL : undefined);
	}, []);

	return urlObj;
}

// SSR-Safe URLSearchParams Hook
export function useURLSearchParams() {
	const [urlSearchParamsObj, setUrlSearchParamsObj] = useState<
		typeof URLSearchParams | null
	>(undefined);

	useEffect(() => {
		setUrlSearchParamsObj(
			"undefined" !== typeof URLSearchParams ? URLSearchParams : undefined,
		);
	}, []);

	return urlSearchParamsObj;
}

// SSR-Safe FormData Hook
export function useFormData() {
	const [formDataObj, setFormDataObj] = useState<typeof FormData | null>(
		undefined,
	);

	useEffect(() => {
		setFormDataObj("undefined" !== typeof FormData ? FormData : undefined);
	}, []);

	return formDataObj;
}

// SSR-Safe Headers Hook
export function useHeaders() {
	const [headersObj, setHeadersObj] = useState<typeof Headers | null>(
		undefined,
	);

	useEffect(() => {
		setHeadersObj("undefined" !== typeof Headers ? Headers : undefined);
	}, []);

	return headersObj;
}

// SSR-Safe Response Hook
export function useResponse() {
	const [responseObj, setResponseObj] = useState<typeof Response | null>(
		undefined,
	);

	useEffect(() => {
		setResponseObj("undefined" !== typeof Response ? Response : undefined);
	}, []);

	return responseObj;
}

// SSR-Safe Request Hook
export function useRequest() {
	const [requestObj, setRequestObj] = useState<typeof Request | null>(
		undefined,
	);

	useEffect(() => {
		setRequestObj("undefined" !== typeof Request ? Request : undefined);
	}, []);

	return requestObj;
}

// SSR-Safe WebSocket Hook
export function useWebSocket() {
	const [webSocketObj, setWebSocketObj] = useState<typeof WebSocket | null>(
		undefined,
	);

	useEffect(() => {
		setWebSocketObj("undefined" !== typeof WebSocket ? WebSocket : undefined);
	}, []);

	return webSocketObj;
}

// SSR-Safe Worker Hook
export function useWorker() {
	const [workerObj, setWorkerObj] = useState<typeof Worker | null>(undefined);

	useEffect(() => {
		setWorkerObj("undefined" !== typeof Worker ? Worker : undefined);
	}, []);

	return workerObj;
}

// SSR-Safe SharedWorker Hook
export function useSharedWorker() {
	const [sharedWorkerObj, setSharedWorkerObj] = useState<
		typeof SharedWorker | null
	>(undefined);

	useEffect(() => {
		setSharedWorkerObj(
			"undefined" !== typeof SharedWorker ? SharedWorker : undefined,
		);
	}, []);

	return sharedWorkerObj;
}

// SSR-Safe MessageChannel Hook
export function useMessageChannel() {
	const [messageChannelObj, setMessageChannelObj] = useState<
		typeof MessageChannel | null
	>(undefined);

	useEffect(() => {
		setMessageChannelObj(
			"undefined" !== typeof MessageChannel ? MessageChannel : undefined,
		);
	}, []);

	return messageChannelObj;
}

// SSR-Safe BroadcastChannel Hook
export function useBroadcastChannel() {
	const [broadcastChannelObj, setBroadcastChannelObj] = useState<
		typeof BroadcastChannel | null
	>(undefined);

	useEffect(() => {
		setBroadcastChannelObj(
			"undefined" !== typeof BroadcastChannel ? BroadcastChannel : undefined,
		);
	}, []);

	return broadcastChannelObj;
}

// SSR-Safe CustomEvent Hook
export function useCustomEvent() {
	const [customEventObj, setCustomEventObj] = useState<
		typeof CustomEvent | null
	>(undefined);

	useEffect(() => {
		setCustomEventObj(
			"undefined" !== typeof CustomEvent ? CustomEvent : undefined,
		);
	}, []);

	return customEventObj;
}

// SSR-Safe EventTarget Hook
export function useEventTarget() {
	const [eventTargetObj, setEventTargetObj] = useState<
		typeof EventTarget | null
	>(undefined);

	useEffect(() => {
		setEventTargetObj(
			"undefined" !== typeof EventTarget ? EventTarget : undefined,
		);
	}, []);

	return eventTargetObj;
}

// SSR-Safe Event Hook
export function useEvent() {
	const [eventObj, setEventObj] = useState<typeof Event | null>(undefined);

	useEffect(() => {
		setEventObj("undefined" !== typeof Event ? Event : undefined);
	}, []);

	return eventObj;
}

// SSR-Safe Error Hook
export function useError() {
	const [errorObj, setErrorObj] = useState<typeof Error | null>(undefined);

	useEffect(() => {
		setErrorObj("undefined" !== typeof Error ? Error : undefined);
	}, []);

	return errorObj;
}

// SSR-Safe TypeError Hook
export function useTypeError() {
	const [typeErrorObj, setTypeErrorObj] = useState<typeof TypeError | null>(
		undefined,
	);

	useEffect(() => {
		setTypeErrorObj("undefined" !== typeof TypeError ? TypeError : undefined);
	}, []);

	return typeErrorObj;
}

// SSR-Safe RangeError Hook
export function useRangeError() {
	const [rangeErrorObj, setRangeErrorObj] = useState<typeof RangeError | null>(
		undefined,
	);

	useEffect(() => {
		setRangeErrorObj(
			"undefined" !== typeof RangeError ? RangeError : undefined,
		);
	}, []);

	return rangeErrorObj;
}

// SSR-Safe ReferenceError Hook
export function useReferenceError() {
	const [referenceErrorObj, setReferenceErrorObj] = useState<
		typeof ReferenceError | null
	>(undefined);

	useEffect(() => {
		setReferenceErrorObj(
			"undefined" !== typeof ReferenceError ? ReferenceError : undefined,
		);
	}, []);

	return referenceErrorObj;
}

// SSR-Safe SyntaxError Hook
export function useSyntaxError() {
	const [syntaxErrorObj, setSyntaxErrorObj] = useState<
		typeof SyntaxError | null
	>(undefined);

	useEffect(() => {
		setSyntaxErrorObj(
			"undefined" !== typeof SyntaxError ? SyntaxError : undefined,
		);
	}, []);

	return syntaxErrorObj;
}

// SSR-Safe URIError Hook
export function useURIError() {
	const [uriErrorObj, setUriErrorObj] = useState<typeof URIError | null>(
		undefined,
	);

	useEffect(() => {
		setUriErrorObj("undefined" !== typeof URIError ? URIError : undefined);
	}, []);

	return uriErrorObj;
}

// SSR-Safe EvalError Hook
export function useEvalError() {
	const [evalErrorObj, setEvalErrorObj] = useState<typeof EvalError | null>(
		undefined,
	);

	useEffect(() => {
		setEvalErrorObj("undefined" !== typeof EvalError ? EvalError : undefined);
	}, []);

	return evalErrorObj;
}

// SSR-Safe AggregateError Hook
export function useAggregateError() {
	const [aggregateErrorObj, setAggregateErrorObj] = useState<any>(undefined);

	useEffect(() => {
		setAggregateErrorObj(
			"undefined" !== typeof globalThis && "AggregateError" in globalThis
				? (globalThis as any).AggregateError
				: undefined,
		);
	}, []);

	return aggregateErrorObj;
}

// SSR-Safe InternalError Hook
export function useInternalError() {
	const [internalErrorObj, setInternalErrorObj] = useState<any>(undefined);

	useEffect(() => {
		setInternalErrorObj(
			"undefined" !== typeof globalThis && "InternalError" in globalThis
				? (globalThis as any).InternalError
				: undefined,
		);
	}, []);

	return internalErrorObj;
}

// SSR-Safe Promise Hook
export function usePromise() {
	const [promiseObj, setPromiseObj] = useState<typeof Promise | null>(
		undefined,
	);

	useEffect(() => {
		setPromiseObj("undefined" !== typeof Promise ? Promise : undefined);
	}, []);

	return promiseObj;
}

// SSR-Safe Symbol Hook
export function useSymbol() {
	const [symbolObj, setSymbolObj] = useState<typeof Symbol | null>(undefined);

	useEffect(() => {
		setSymbolObj("undefined" !== typeof Symbol ? Symbol : undefined);
	}, []);

	return symbolObj;
}

// SSR-Safe BigInt Hook
export function useBigInt() {
	const [bigIntObj, setBigIntObj] = useState<typeof BigInt | null>(undefined);

	useEffect(() => {
		setBigIntObj("undefined" !== typeof BigInt ? BigInt : undefined);
	}, []);

	return bigIntObj;
}

// SSR-Safe Proxy Hook
export function useProxy() {
	const [proxyObj, setProxyObj] = useState<typeof Proxy | null>(undefined);

	useEffect(() => {
		setProxyObj("undefined" !== typeof Proxy ? Proxy : undefined);
	}, []);

	return proxyObj;
}

// SSR-Safe Reflect Hook
export function useReflect() {
	const [reflectObj, setReflectObj] = useState<typeof Reflect | null>(
		undefined,
	);

	useEffect(() => {
		setReflectObj("undefined" !== typeof Reflect ? Reflect : undefined);
	}, []);

	return reflectObj;
}

// SSR-Safe Intl Hook
export function useIntl() {
	const [intlObj, setIntlObj] = useState<typeof Intl | null>(undefined);

	useEffect(() => {
		setIntlObj("undefined" !== typeof Intl ? Intl : undefined);
	}, []);

	return intlObj;
}

// SSR-Safe Date Hook
export function useDate() {
	const [dateObj, setDateObj] = useState<Date | null>(undefined);

	useEffect(() => {
		setDateObj("undefined" !== typeof Date ? new Date() : undefined);
	}, []);

	return dateObj;
}

// SSR-Safe RegExp Hook
export function useRegExp() {
	const [regExpObj, setRegExpObj] = useState<typeof RegExp | null>(undefined);

	useEffect(() => {
		setRegExpObj("undefined" !== typeof RegExp ? RegExp : undefined);
	}, []);

	return regExpObj;
}

// SSR-Safe Array Hook
export function useArray() {
	const [arrayObj, setArrayObj] = useState<typeof Array | null>(undefined);

	useEffect(() => {
		setArrayObj("undefined" !== typeof Array ? Array : undefined);
	}, []);

	return arrayObj;
}

// SSR-Safe Object Hook
export function useObject() {
	const [objectObj, setObjectObj] = useState<typeof Object | null>(undefined);

	useEffect(() => {
		setObjectObj("undefined" !== typeof Object ? Object : undefined);
	}, []);

	return objectObj;
}

// SSR-Safe String Hook
export function useString() {
	const [stringObj, setStringObj] = useState<typeof String | null>(undefined);

	useEffect(() => {
		setStringObj("undefined" !== typeof String ? String : undefined);
	}, []);

	return stringObj;
}

// SSR-Safe Number Hook
export function useNumber() {
	const [numberObj, setNumberObj] = useState<typeof Number | null>(undefined);

	useEffect(() => {
		setNumberObj("undefined" !== typeof Number ? Number : undefined);
	}, []);

	return numberObj;
}

// SSR-Safe Boolean Hook
export function useBoolean() {
	const [booleanObj, setBooleanObj] = useState<typeof Boolean | null>(
		undefined,
	);

	useEffect(() => {
		setBooleanObj("undefined" !== typeof Boolean ? Boolean : undefined);
	}, []);

	return booleanObj;
}

// SSR-Safe Function Hook
export function useFunction() {
	const [functionObj, setFunctionObj] = useState<typeof Function | null>(
		undefined,
	);

	useEffect(() => {
		setFunctionObj("undefined" !== typeof Function ? Function : undefined);
	}, []);

	return functionObj;
}

// SSR-Safe Map Hook
export function useMap() {
	const [mapObj, setMapObj] = useState<typeof Map | null>(undefined);

	useEffect(() => {
		setMapObj("undefined" !== typeof Map ? Map : undefined);
	}, []);

	return mapObj;
}
