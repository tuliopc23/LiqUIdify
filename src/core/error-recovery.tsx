import React, { ReactNode, useEffect, useState } from 'react';

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
  const [error] = useState<Error | null>(null);
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
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('SSR Error:', error, errorInfo);
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
  defaultValue: T
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        setValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Failed to read localStorage key "${key}":`, error);
    }
  }, [key]);

  const setStoredValue = (newValue: T) => {
    try {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.warn(`Failed to write localStorage key "${key}":`, error);
    }
  };

  return [value, setStoredValue];
}

// SSR-Safe Window Hook
export function useWindow() {
  const [windowObj, setWindowObj] = useState<Window | null>(null);

  useEffect(() => {
    setWindowObj(typeof window !== 'undefined' ? window : null);
  }, []);

  return windowObj;
}

// SSR-Safe Document Hook
export function useDocument() {
  const [documentObj, setDocumentObj] = useState<Document | null>(null);

  useEffect(() => {
    setDocumentObj(typeof document !== 'undefined' ? document : null);
  }, []);

  return documentObj;
}

// SSR-Safe Navigator Hook
export function useNavigator() {
  const [navigatorObj, setNavigatorObj] = useState<Navigator | null>(null);

  useEffect(() => {
    setNavigatorObj(typeof navigator !== 'undefined' ? navigator : null);
  }, []);

  return navigatorObj;
}

// SSR-Safe Match Media Hook
export function useMatchMedia(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = () => setMatches(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

// SSR-Safe Intersection Observer Hook
export function useIntersectionObserver(
  options?: IntersectionObserverInit
): IntersectionObserver | null {
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.IntersectionObserver) return;

    const obs = new IntersectionObserver(() => {}, options);
    setObserver(obs);

    return () => obs.disconnect();
  }, [options]);

  return observer;
}

// SSR-Safe Resize Observer Hook
export function useResizeObserver(
  callback: ResizeObserverCallback,
  options?: ResizeObserverOptions
): ResizeObserver | null {
  const [observer, setObserver] = useState<ResizeObserver | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.ResizeObserver) return;

    const obs = new ResizeObserver(callback);
    setObserver(obs);

    return () => obs.disconnect();
  }, [callback, options]);

  return observer;
}

// SSR-Safe Performance Hook
export function usePerformance() {
  const [performanceObj, setPerformanceObj] = useState<Performance | null>(
    null
  );

  useEffect(() => {
    setPerformanceObj(typeof performance !== 'undefined' ? performance : null);
  }, []);

  return performanceObj;
}

// SSR-Safe Request Animation Frame Hook
export function useRequestAnimationFrame() {
  const [requestAnimationFrameFn, setRequestAnimationFrameFn] = useState<
    ((callback: FrameRequestCallback) => number) | null
  >(null);

  useEffect(() => {
    setRequestAnimationFrameFn(
      typeof requestAnimationFrame !== 'undefined'
        ? requestAnimationFrame
        : null
    );
  }, []);

  return requestAnimationFrameFn;
}

// SSR-Safe Set Timeout Hook
export function useSetTimeout() {
  const [setTimeoutFn, setSetTimeoutFn] = useState<
    ((callback: () => void, delay?: number) => NodeJS.Timeout) | null
  >(null);

  useEffect(() => {
    setSetTimeoutFn(typeof setTimeout !== 'undefined' ? setTimeout : null);
  }, []);

  return setTimeoutFn;
}

// SSR-Safe Clear Timeout Hook
export function useClearTimeout() {
  const [clearTimeoutFn, setClearTimeoutFn] = useState<
    ((id: NodeJS.Timeout) => void) | null
  >(null);

  useEffect(() => {
    setClearTimeoutFn(
      typeof clearTimeout !== 'undefined' ? clearTimeout : null
    );
  }, []);

  return clearTimeoutFn;
}

// SSR-Safe Set Interval Hook
export function useSetInterval() {
  const [setIntervalFn, setSetIntervalFn] = useState<
    ((callback: () => void, delay?: number) => NodeJS.Timeout) | null
  >(null);

  useEffect(() => {
    setSetIntervalFn(typeof setInterval !== 'undefined' ? setInterval : null);
  }, []);

  return setIntervalFn;
}

// SSR-Safe Clear Interval Hook
export function useClearInterval() {
  const [clearIntervalFn, setClearIntervalFn] = useState<
    ((id: NodeJS.Timeout) => void) | null
  >(null);

  useEffect(() => {
    setClearIntervalFn(
      typeof clearInterval !== 'undefined' ? clearInterval : null
    );
  }, []);

  return clearIntervalFn;
}

// SSR-Safe Date Hook
export function useSSRSafeDate() {
  const [dateObj, setDateObj] = useState<Date | null>(null);

  useEffect(() => {
    setDateObj(typeof Date !== 'undefined' ? new Date() : null);
  }, []);

  return dateObj;
}

// SSR-Safe Math Hook
export function useMath() {
  const [mathObj, setMathObj] = useState<Math | null>(null);

  useEffect(() => {
    setMathObj(typeof Math !== 'undefined' ? Math : null);
  }, []);

  return mathObj;
}

// SSR-Safe JSON Hook
export function useJSON() {
  const [jsonObj, setJsonObj] = useState<JSON | null>(null);

  useEffect(() => {
    setJsonObj(typeof JSON !== 'undefined' ? JSON : null);
  }, []);

  return jsonObj;
}

// SSR-Safe Console Hook
export function useConsole() {
  const [consoleObj, setConsoleObj] = useState<Console | null>(null);

  useEffect(() => {
    setConsoleObj(typeof console !== 'undefined' ? console : null);
  }, []);

  return consoleObj;
}

// SSR-Safe Process Hook
export function useProcess() {
  const [processObj, setProcessObj] = useState<NodeJS.Process | null>(null);

  useEffect(() => {
    setProcessObj(typeof process !== 'undefined' ? process : null);
  }, []);

  return processObj;
}

// SSR-Safe Environment Hook
export function useEnvironment() {
  const [env, setEnv] = useState<NodeJS.ProcessEnv | null>(null);

  useEffect(() => {
    setEnv(typeof process !== 'undefined' ? process.env : null);
  }, []);

  return env;
}

// SSR-Safe Global Hook
export function useGlobal() {
  const [globalObj, setGlobalObj] = useState<typeof globalThis | null>(null);

  useEffect(() => {
    setGlobalObj(typeof globalThis !== 'undefined' ? globalThis : null);
  }, []);

  return globalObj;
}

// SSR-Safe Buffer Hook
export function useBuffer() {
  const [bufferObj, setBufferObj] = useState<typeof Buffer | null>(null);

  useEffect(() => {
    setBufferObj(typeof Buffer !== 'undefined' ? Buffer : null);
  }, []);

  return bufferObj;
}

// SSR-Safe URL Hook
export function useURL() {
  const [urlObj, setUrlObj] = useState<typeof URL | null>(null);

  useEffect(() => {
    setUrlObj(typeof URL !== 'undefined' ? URL : null);
  }, []);

  return urlObj;
}

// SSR-Safe URLSearchParams Hook
export function useURLSearchParams() {
  const [urlSearchParamsObj, setUrlSearchParamsObj] = useState<
    typeof URLSearchParams | null
  >(null);

  useEffect(() => {
    setUrlSearchParamsObj(
      typeof URLSearchParams !== 'undefined' ? URLSearchParams : null
    );
  }, []);

  return urlSearchParamsObj;
}

// SSR-Safe FormData Hook
export function useFormData() {
  const [formDataObj, setFormDataObj] = useState<typeof FormData | null>(null);

  useEffect(() => {
    setFormDataObj(typeof FormData !== 'undefined' ? FormData : null);
  }, []);

  return formDataObj;
}

// SSR-Safe Headers Hook
export function useHeaders() {
  const [headersObj, setHeadersObj] = useState<typeof Headers | null>(null);

  useEffect(() => {
    setHeadersObj(typeof Headers !== 'undefined' ? Headers : null);
  }, []);

  return headersObj;
}

// SSR-Safe Response Hook
export function useResponse() {
  const [responseObj, setResponseObj] = useState<typeof Response | null>(null);

  useEffect(() => {
    setResponseObj(typeof Response !== 'undefined' ? Response : null);
  }, []);

  return responseObj;
}

// SSR-Safe Request Hook
export function useRequest() {
  const [requestObj, setRequestObj] = useState<typeof Request | null>(null);

  useEffect(() => {
    setRequestObj(typeof Request !== 'undefined' ? Request : null);
  }, []);

  return requestObj;
}

// SSR-Safe WebSocket Hook
export function useWebSocket() {
  const [webSocketObj, setWebSocketObj] = useState<typeof WebSocket | null>(
    null
  );

  useEffect(() => {
    setWebSocketObj(typeof WebSocket !== 'undefined' ? WebSocket : null);
  }, []);

  return webSocketObj;
}

// SSR-Safe Worker Hook
export function useWorker() {
  const [workerObj, setWorkerObj] = useState<typeof Worker | null>(null);

  useEffect(() => {
    setWorkerObj(typeof Worker !== 'undefined' ? Worker : null);
  }, []);

  return workerObj;
}

// SSR-Safe SharedWorker Hook
export function useSharedWorker() {
  const [sharedWorkerObj, setSharedWorkerObj] = useState<
    typeof SharedWorker | null
  >(null);

  useEffect(() => {
    setSharedWorkerObj(
      typeof SharedWorker !== 'undefined' ? SharedWorker : null
    );
  }, []);

  return sharedWorkerObj;
}

// SSR-Safe MessageChannel Hook
export function useMessageChannel() {
  const [messageChannelObj, setMessageChannelObj] = useState<
    typeof MessageChannel | null
  >(null);

  useEffect(() => {
    setMessageChannelObj(
      typeof MessageChannel !== 'undefined' ? MessageChannel : null
    );
  }, []);

  return messageChannelObj;
}

// SSR-Safe BroadcastChannel Hook
export function useBroadcastChannel() {
  const [broadcastChannelObj, setBroadcastChannelObj] = useState<
    typeof BroadcastChannel | null
  >(null);

  useEffect(() => {
    setBroadcastChannelObj(
      typeof BroadcastChannel !== 'undefined' ? BroadcastChannel : null
    );
  }, []);

  return broadcastChannelObj;
}

// SSR-Safe CustomEvent Hook
export function useCustomEvent() {
  const [customEventObj, setCustomEventObj] = useState<
    typeof CustomEvent | null
  >(null);

  useEffect(() => {
    setCustomEventObj(typeof CustomEvent !== 'undefined' ? CustomEvent : null);
  }, []);

  return customEventObj;
}

// SSR-Safe EventTarget Hook
export function useEventTarget() {
  const [eventTargetObj, setEventTargetObj] = useState<
    typeof EventTarget | null
  >(null);

  useEffect(() => {
    setEventTargetObj(typeof EventTarget !== 'undefined' ? EventTarget : null);
  }, []);

  return eventTargetObj;
}

// SSR-Safe Event Hook
export function useEvent() {
  const [eventObj, setEventObj] = useState<typeof Event | null>(null);

  useEffect(() => {
    setEventObj(typeof Event !== 'undefined' ? Event : null);
  }, []);

  return eventObj;
}

// SSR-Safe Error Hook
export function useError() {
  const [errorObj, setErrorObj] = useState<typeof Error | null>(null);

  useEffect(() => {
    setErrorObj(typeof Error !== 'undefined' ? Error : null);
  }, []);

  return errorObj;
}

// SSR-Safe TypeError Hook
export function useTypeError() {
  const [typeErrorObj, setTypeErrorObj] = useState<typeof TypeError | null>(
    null
  );

  useEffect(() => {
    setTypeErrorObj(typeof TypeError !== 'undefined' ? TypeError : null);
  }, []);

  return typeErrorObj;
}

// SSR-Safe RangeError Hook
export function useRangeError() {
  const [rangeErrorObj, setRangeErrorObj] = useState<typeof RangeError | null>(
    null
  );

  useEffect(() => {
    setRangeErrorObj(typeof RangeError !== 'undefined' ? RangeError : null);
  }, []);

  return rangeErrorObj;
}

// SSR-Safe ReferenceError Hook
export function useReferenceError() {
  const [referenceErrorObj, setReferenceErrorObj] = useState<
    typeof ReferenceError | null
  >(null);

  useEffect(() => {
    setReferenceErrorObj(
      typeof ReferenceError !== 'undefined' ? ReferenceError : null
    );
  }, []);

  return referenceErrorObj;
}

// SSR-Safe SyntaxError Hook
export function useSyntaxError() {
  const [syntaxErrorObj, setSyntaxErrorObj] = useState<
    typeof SyntaxError | null
  >(null);

  useEffect(() => {
    setSyntaxErrorObj(typeof SyntaxError !== 'undefined' ? SyntaxError : null);
  }, []);

  return syntaxErrorObj;
}

// SSR-Safe URIError Hook
export function useURIError() {
  const [uriErrorObj, setUriErrorObj] = useState<typeof URIError | null>(null);

  useEffect(() => {
    setUriErrorObj(typeof URIError !== 'undefined' ? URIError : null);
  }, []);

  return uriErrorObj;
}

// SSR-Safe EvalError Hook
export function useEvalError() {
  const [evalErrorObj, setEvalErrorObj] = useState<typeof EvalError | null>(
    null
  );

  useEffect(() => {
    setEvalErrorObj(typeof EvalError !== 'undefined' ? EvalError : null);
  }, []);

  return evalErrorObj;
}

// SSR-Safe AggregateError Hook
export function useAggregateError() {
  const [aggregateErrorObj, setAggregateErrorObj] = useState<any>(null);

  useEffect(() => {
    setAggregateErrorObj(
      typeof globalThis !== 'undefined' && 'AggregateError' in globalThis
        ? (globalThis as any).AggregateError
        : null
    );
  }, []);

  return aggregateErrorObj;
}

// SSR-Safe InternalError Hook
export function useInternalError() {
  const [internalErrorObj, setInternalErrorObj] = useState<any>(null);

  useEffect(() => {
    setInternalErrorObj(
      typeof globalThis !== 'undefined' && 'InternalError' in globalThis
        ? (globalThis as any).InternalError
        : null
    );
  }, []);

  return internalErrorObj;
}

// SSR-Safe Promise Hook
export function usePromise() {
  const [promiseObj, setPromiseObj] = useState<typeof Promise | null>(null);

  useEffect(() => {
    setPromiseObj(typeof Promise !== 'undefined' ? Promise : null);
  }, []);

  return promiseObj;
}

// SSR-Safe Symbol Hook
export function useSymbol() {
  const [symbolObj, setSymbolObj] = useState<typeof Symbol | null>(null);

  useEffect(() => {
    setSymbolObj(typeof Symbol !== 'undefined' ? Symbol : null);
  }, []);

  return symbolObj;
}

// SSR-Safe BigInt Hook
export function useBigInt() {
  const [bigIntObj, setBigIntObj] = useState<typeof BigInt | null>(null);

  useEffect(() => {
    setBigIntObj(typeof BigInt !== 'undefined' ? BigInt : null);
  }, []);

  return bigIntObj;
}

// SSR-Safe Proxy Hook
export function useProxy() {
  const [proxyObj, setProxyObj] = useState<typeof Proxy | null>(null);

  useEffect(() => {
    setProxyObj(typeof Proxy !== 'undefined' ? Proxy : null);
  }, []);

  return proxyObj;
}

// SSR-Safe Reflect Hook
export function useReflect() {
  const [reflectObj, setReflectObj] = useState<typeof Reflect | null>(null);

  useEffect(() => {
    setReflectObj(typeof Reflect !== 'undefined' ? Reflect : null);
  }, []);

  return reflectObj;
}

// SSR-Safe Intl Hook
export function useIntl() {
  const [intlObj, setIntlObj] = useState<typeof Intl | null>(null);

  useEffect(() => {
    setIntlObj(typeof Intl !== 'undefined' ? Intl : null);
  }, []);

  return intlObj;
}

// SSR-Safe Date Hook
export function useDate() {
  const [dateObj, setDateObj] = useState<Date | null>(null);

  useEffect(() => {
    setDateObj(typeof Date !== 'undefined' ? new Date() : null);
  }, []);

  return dateObj;
}

// SSR-Safe RegExp Hook
export function useRegExp() {
  const [regExpObj, setRegExpObj] = useState<typeof RegExp | null>(null);

  useEffect(() => {
    setRegExpObj(typeof RegExp !== 'undefined' ? RegExp : null);
  }, []);

  return regExpObj;
}

// SSR-Safe Array Hook
export function useArray() {
  const [arrayObj, setArrayObj] = useState<typeof Array | null>(null);

  useEffect(() => {
    setArrayObj(typeof Array !== 'undefined' ? Array : null);
  }, []);

  return arrayObj;
}

// SSR-Safe Object Hook
export function useObject() {
  const [objectObj, setObjectObj] = useState<typeof Object | null>(null);

  useEffect(() => {
    setObjectObj(typeof Object !== 'undefined' ? Object : null);
  }, []);

  return objectObj;
}

// SSR-Safe String Hook
export function useString() {
  const [stringObj, setStringObj] = useState<typeof String | null>(null);

  useEffect(() => {
    setStringObj(typeof String !== 'undefined' ? String : null);
  }, []);

  return stringObj;
}

// SSR-Safe Number Hook
export function useNumber() {
  const [numberObj, setNumberObj] = useState<typeof Number | null>(null);

  useEffect(() => {
    setNumberObj(typeof Number !== 'undefined' ? Number : null);
  }, []);

  return numberObj;
}

// SSR-Safe Boolean Hook
export function useBoolean() {
  const [booleanObj, setBooleanObj] = useState<typeof Boolean | null>(null);

  useEffect(() => {
    setBooleanObj(typeof Boolean !== 'undefined' ? Boolean : null);
  }, []);

  return booleanObj;
}

// SSR-Safe Function Hook
export function useFunction() {
  const [functionObj, setFunctionObj] = useState<typeof Function | null>(null);

  useEffect(() => {
    setFunctionObj(typeof Function !== 'undefined' ? Function : null);
  }, []);

  return functionObj;
}

// SSR-Safe Map Hook
export function useMap() {
  const [mapObj, setMapObj] = useState<typeof Map | null>(null);

  useEffect(() => {
    setMapObj(typeof Map !== 'undefined' ? Map : null);
  }, []);

  return mapObj;
}
