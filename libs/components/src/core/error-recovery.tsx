import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';

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
  const [error] = useState<Error | null | null>(undefined);
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

  componentDidCatch(_error: Error, _errorInfo: React.ErrorInfo) {
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
  defaultValue: T
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
  const [windowObject, setWindowObject] = useState<Window | null | null>(
    undefined
  );

  useEffect(() => {
    setWindowObject('undefined' === typeof window ? undefined : window);
  }, []);

  return windowObject;
}

// SSR-Safe Document Hook
export function useDocument() {
  const [documentObject, setDocumentObject] = useState<Document | null | null>(
    undefined
  );

  useEffect(() => {
    setDocumentObject('undefined' === typeof document ? undefined : document);
  }, []);

  return documentObject;
}

// SSR-Safe Navigator Hook
export function useNavigator() {
  const [navigatorObject, setNavigatorObject] =
    useState<Navigator | null | null>(undefined);

  useEffect(() => {
    setNavigatorObject(
      'undefined' === typeof navigator ? undefined : navigator
    );
  }, []);

  return navigatorObject;
}

// SSR-Safe Match Media Hook
export function useMatchMedia(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if ('undefined' === typeof window) {
      return;
    }

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
  const [observer, setObserver] = useState<IntersectionObserver | null>(
    undefined
  );

  useEffect(() => {
    if ('undefined' === typeof window || !window.IntersectionObserver) {
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
  _options?: ResizeObserverOptions
): ResizeObserver | null {
  const [observer, setObserver] = useState<ResizeObserver | null | null>(
    undefined
  );

  useEffect(() => {
    if ('undefined' === typeof window || !window.ResizeObserver) {
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
  const [performanceObject, setPerformanceObject] =
    useState<Performance | null>(undefined);

  useEffect(() => {
    setPerformanceObject(
      'undefined' === typeof performance ? undefined : performance
    );
  }, []);

  return performanceObject;
}

// SSR-Safe Request Animation Frame Hook
export function useRequestAnimationFrame() {
  const [requestAnimationFrameFunction, setRequestAnimationFrameFunction] =
    useState<((callback: FrameRequestCallback) => number) | null>(undefined);

  useEffect(() => {
    setRequestAnimationFrameFunction(
      'undefined' === typeof requestAnimationFrame
        ? undefined
        : requestAnimationFrame
    );
  }, []);

  return requestAnimationFrameFunction;
}

// SSR-Safe Set Timeout Hook
export function useSetTimeout() {
  const [setTimeoutFunction, setSetTimeoutFunction] = useState<
    ((callback: () => void, delay?: number) => NodeJS.Timeout) | null
  >(undefined);

  useEffect(() => {
    setSetTimeoutFunction(
      'undefined' === typeof setTimeout ? undefined : setTimeout
    );
  }, []);

  return setTimeoutFunction;
}

// SSR-Safe Clear Timeout Hook
export function useClearTimeout() {
  const [clearTimeoutFunction, setClearTimeoutFunction] = useState<
    ((id: NodeJS.Timeout) => void) | null
  >(undefined);

  useEffect(() => {
    setClearTimeoutFunction(
      'undefined' === typeof clearTimeout ? undefined : clearTimeout
    );
  }, []);

  return clearTimeoutFunction;
}

// SSR-Safe Set Interval Hook
export function useSetInterval() {
  const [setIntervalFunction, setSetIntervalFunction] = useState<
    ((callback: () => void, delay?: number) => NodeJS.Timeout) | null
  >(undefined);

  useEffect(() => {
    setSetIntervalFunction(
      'undefined' === typeof setInterval ? undefined : setInterval
    );
  }, []);

  return setIntervalFunction;
}

// SSR-Safe Clear Interval Hook
export function useClearInterval() {
  const [clearIntervalFunction, setClearIntervalFunction] = useState<
    ((id: NodeJS.Timeout) => void) | null
  >(undefined);

  useEffect(() => {
    setClearIntervalFunction(
      'undefined' === typeof clearInterval ? undefined : clearInterval
    );
  }, []);

  return clearIntervalFunction;
}

// SSR-Safe Date Hook
export function useSSRSafeDate() {
  const [dateObject, setDateObject] = useState<Date | null | null>(undefined);

  useEffect(() => {
    setDateObject('undefined' === typeof Date ? undefined : new Date());
  }, []);

  return dateObject;
}

// SSR-Safe Math Hook
export function useMath() {
  const [mathObject, setMathObject] = useState<Math | null | null>(undefined);

  useEffect(() => {
    setMathObject('undefined' === typeof Math ? undefined : Math);
  }, []);

  return mathObject;
}

// SSR-Safe JSON Hook
export function useJSON() {
  const [jsonObject, setJsonObject] = useState<JSON | null | null>(undefined);

  useEffect(() => {
    setJsonObject('undefined' === typeof JSON ? undefined : JSON);
  }, []);

  return jsonObject;
}

// SSR-Safe Console Hook
export function useConsole() {
  const [consoleObject, setConsoleObject] = useState<Console | null | null>(
    undefined
  );

  useEffect(() => {
    setConsoleObject('undefined' === typeof console ? undefined : console);
  }, []);

  return consoleObject;
}

// SSR-Safe Process Hook
export function useProcess() {
  const [processObject, setProcessObject] = useState<NodeJS.Process | null>(
    undefined
  );

  useEffect(() => {
    setProcessObject('undefined' === typeof process ? undefined : process);
  }, []);

  return processObject;
}

// SSR-Safe Environment Hook
export function useEnvironment() {
  const [environment, setEnvironment] =
    useState<NodeJS.ProcessEnv | null | null>(undefined);

  useEffect(() => {
    setEnvironment('undefined' === typeof process ? undefined : process.env);
  }, []);

  return environment;
}

// SSR-Safe Global Hook
export function useGlobal() {
  const [globalObject, setGlobalObject] = useState<typeof globalThis | null>(
    undefined
  );

  useEffect(() => {
    setGlobalObject('undefined' === typeof globalThis ? undefined : globalThis);
  }, []);

  return globalObject;
}

// SSR-Safe Buffer Hook
export function useBuffer() {
  const [bufferObject, setBufferObject] = useState<typeof Buffer | null | null>(
    undefined
  );

  useEffect(() => {
    setBufferObject('undefined' === typeof Buffer ? undefined : Buffer);
  }, []);

  return bufferObject;
}

// SSR-Safe URL Hook
export function useURL() {
  const [urlObject, setUrlObject] = useState<typeof URL | null | null>(
    undefined
  );

  useEffect(() => {
    setUrlObject('undefined' === typeof URL ? undefined : URL);
  }, []);

  return urlObject;
}

// SSR-Safe URLSearchParams Hook
export function useURLSearchParams() {
  const [urlSearchParamsObject, setUrlSearchParamsObject] = useState<
    typeof URLSearchParams | null
  >(undefined);

  useEffect(() => {
    setUrlSearchParamsObject(
      'undefined' === typeof URLSearchParams ? undefined : URLSearchParams
    );
  }, []);

  return urlSearchParamsObject;
}

// SSR-Safe FormData Hook
export function useFormData() {
  const [formDataObject, setFormDataObject] = useState<typeof FormData | null>(
    undefined
  );

  useEffect(() => {
    setFormDataObject('undefined' === typeof FormData ? undefined : FormData);
  }, []);

  return formDataObject;
}

// SSR-Safe Headers Hook
export function useHeaders() {
  const [headersObject, setHeadersObject] = useState<typeof Headers | null>(
    undefined
  );

  useEffect(() => {
    setHeadersObject('undefined' === typeof Headers ? undefined : Headers);
  }, []);

  return headersObject;
}

// SSR-Safe Response Hook
export function useResponse() {
  const [responseObject, setResponseObject] = useState<typeof Response | null>(
    undefined
  );

  useEffect(() => {
    setResponseObject('undefined' === typeof Response ? undefined : Response);
  }, []);

  return responseObject;
}

// SSR-Safe Request Hook
export function useRequest() {
  const [requestObject, setRequestObject] = useState<typeof Request | null>(
    undefined
  );

  useEffect(() => {
    setRequestObject('undefined' === typeof Request ? undefined : Request);
  }, []);

  return requestObject;
}

// SSR-Safe WebSocket Hook
export function useWebSocket() {
  const [webSocketObject, setWebSocketObject] = useState<
    typeof WebSocket | null
  >(undefined);

  useEffect(() => {
    setWebSocketObject(
      'undefined' === typeof WebSocket ? undefined : WebSocket
    );
  }, []);

  return webSocketObject;
}

// SSR-Safe Worker Hook
export function useWorker() {
  const [workerObject, setWorkerObject] = useState<typeof Worker | null | null>(
    undefined
  );

  useEffect(() => {
    setWorkerObject('undefined' === typeof Worker ? undefined : Worker);
  }, []);

  return workerObject;
}

// SSR-Safe SharedWorker Hook
export function useSharedWorker() {
  const [sharedWorkerObject, setSharedWorkerObject] = useState<
    typeof SharedWorker | null
  >(undefined);

  useEffect(() => {
    setSharedWorkerObject(
      'undefined' === typeof SharedWorker ? undefined : SharedWorker
    );
  }, []);

  return sharedWorkerObject;
}

// SSR-Safe MessageChannel Hook
export function useMessageChannel() {
  const [messageChannelObject, setMessageChannelObject] = useState<
    typeof MessageChannel | null
  >(undefined);

  useEffect(() => {
    setMessageChannelObject(
      'undefined' === typeof MessageChannel ? undefined : MessageChannel
    );
  }, []);

  return messageChannelObject;
}

// SSR-Safe BroadcastChannel Hook
export function useBroadcastChannel() {
  const [broadcastChannelObject, setBroadcastChannelObject] = useState<
    typeof BroadcastChannel | null
  >(undefined);

  useEffect(() => {
    setBroadcastChannelObject(
      'undefined' === typeof BroadcastChannel ? undefined : BroadcastChannel
    );
  }, []);

  return broadcastChannelObject;
}

// SSR-Safe CustomEvent Hook
export function useCustomEvent() {
  const [customEventObject, setCustomEventObject] = useState<
    typeof CustomEvent | null
  >(undefined);

  useEffect(() => {
    setCustomEventObject(
      'undefined' === typeof CustomEvent ? undefined : CustomEvent
    );
  }, []);

  return customEventObject;
}

// SSR-Safe EventTarget Hook
export function useEventTarget() {
  const [eventTargetObject, setEventTargetObject] = useState<
    typeof EventTarget | null
  >(undefined);

  useEffect(() => {
    setEventTargetObject(
      'undefined' === typeof EventTarget ? undefined : EventTarget
    );
  }, []);

  return eventTargetObject;
}

// SSR-Safe Event Hook
export function useEvent() {
  const [eventObject, setEventObject] = useState<typeof Event | null | null>(
    undefined
  );

  useEffect(() => {
    setEventObject('undefined' === typeof Event ? undefined : Event);
  }, []);

  return eventObject;
}

// SSR-Safe Error Hook
export function useError() {
  const [errorObject, setErrorObject] = useState<typeof Error | null | null>(
    undefined
  );

  useEffect(() => {
    setErrorObject('undefined' === typeof Error ? undefined : Error);
  }, []);

  return errorObject;
}

// SSR-Safe TypeError Hook
export function useTypeError() {
  const [typeErrorObject, setTypeErrorObject] = useState<
    typeof TypeError | null
  >(undefined);

  useEffect(() => {
    setTypeErrorObject(
      'undefined' === typeof TypeError ? undefined : TypeError
    );
  }, []);

  return typeErrorObject;
}

// SSR-Safe RangeError Hook
export function useRangeError() {
  const [rangeErrorObject, setRangeErrorObject] = useState<
    typeof RangeError | null
  >(undefined);

  useEffect(() => {
    setRangeErrorObject(
      'undefined' === typeof RangeError ? undefined : RangeError
    );
  }, []);

  return rangeErrorObject;
}

// SSR-Safe ReferenceError Hook
export function useReferenceError() {
  const [referenceErrorObject, setReferenceErrorObject] = useState<
    typeof ReferenceError | null
  >(undefined);

  useEffect(() => {
    setReferenceErrorObject(
      'undefined' === typeof ReferenceError ? undefined : ReferenceError
    );
  }, []);

  return referenceErrorObject;
}

// SSR-Safe SyntaxError Hook
export function useSyntaxError() {
  const [syntaxErrorObject, setSyntaxErrorObject] = useState<
    typeof SyntaxError | null
  >(undefined);

  useEffect(() => {
    setSyntaxErrorObject(
      'undefined' === typeof SyntaxError ? undefined : SyntaxError
    );
  }, []);

  return syntaxErrorObject;
}

// SSR-Safe URIError Hook
export function useURIError() {
  const [uriErrorObject, setUriErrorObject] = useState<typeof URIError | null>(
    undefined
  );

  useEffect(() => {
    setUriErrorObject('undefined' === typeof URIError ? undefined : URIError);
  }, []);

  return uriErrorObject;
}

// SSR-Safe EvalError Hook
export function useEvalError() {
  const [evalErrorObject, setEvalErrorObject] = useState<
    typeof EvalError | null
  >(undefined);

  useEffect(() => {
    setEvalErrorObject(
      'undefined' === typeof EvalError ? undefined : EvalError
    );
  }, []);

  return evalErrorObject;
}

// SSR-Safe AggregateError Hook
export function useAggregateError() {
  const [aggregateErrorObject, setAggregateErrorObject] = useState<any | null>(
    undefined
  );

  useEffect(() => {
    setAggregateErrorObject(
      'undefined' !== typeof globalThis && 'AggregateError' in globalThis
        ? (globalThis as unknown).AggregateError
        : undefined
    );
  }, []);

  return aggregateErrorObject;
}

// SSR-Safe InternalError Hook
export function useInternalError() {
  const [internalErrorObject, setInternalErrorObject] = useState<any | null>(
    undefined
  );

  useEffect(() => {
    setInternalErrorObject(
      'undefined' !== typeof globalThis && 'InternalError' in globalThis
        ? (globalThis as unknown).InternalError
        : undefined
    );
  }, []);

  return internalErrorObject;
}

// SSR-Safe Promise Hook
export function usePromise() {
  const [promiseObject, setPromiseObject] = useState<typeof Promise | null>(
    undefined
  );

  useEffect(() => {
    setPromiseObject('undefined' === typeof Promise ? undefined : Promise);
  }, []);

  return promiseObject;
}

// SSR-Safe Symbol Hook
export function useSymbol() {
  const [symbolObject, setSymbolObject] = useState<typeof Symbol | null | null>(
    undefined
  );

  useEffect(() => {
    setSymbolObject('undefined' === typeof Symbol ? undefined : Symbol);
  }, []);

  return symbolObject;
}

// SSR-Safe BigInt Hook
export function useBigInt() {
  const [bigIntObject, setBigIntObject] = useState<typeof BigInt | null | null>(
    undefined
  );

  useEffect(() => {
    setBigIntObject('undefined' === typeof BigInt ? undefined : BigInt);
  }, []);

  return bigIntObject;
}

// SSR-Safe Proxy Hook
export function useProxy() {
  const [proxyObject, setProxyObject] = useState<typeof Proxy | null | null>(
    undefined
  );

  useEffect(() => {
    setProxyObject('undefined' === typeof Proxy ? undefined : Proxy);
  }, []);

  return proxyObject;
}

// SSR-Safe Reflect Hook
export function useReflect() {
  const [reflectObject, setReflectObject] = useState<typeof Reflect | null>(
    undefined
  );

  useEffect(() => {
    setReflectObject('undefined' === typeof Reflect ? undefined : Reflect);
  }, []);

  return reflectObject;
}

// SSR-Safe Intl Hook
export function useIntl() {
  const [intlObject, setIntlObject] = useState<typeof Intl | null | null>(
    undefined
  );

  useEffect(() => {
    setIntlObject('undefined' === typeof Intl ? undefined : Intl);
  }, []);

  return intlObject;
}

// SSR-Safe Date Hook
export function useDate() {
  const [dateObject, setDateObject] = useState<Date | null | null>(undefined);

  useEffect(() => {
    setDateObject('undefined' === typeof Date ? undefined : new Date());
  }, []);

  return dateObject;
}

// SSR-Safe RegExp Hook
export function useRegExp() {
  const [regExpObject, setRegExpObject] = useState<typeof RegExp | null | null>(
    undefined
  );

  useEffect(() => {
    setRegExpObject('undefined' === typeof RegExp ? undefined : RegExp);
  }, []);

  return regExpObject;
}

// SSR-Safe Array Hook
export function useArray() {
  const [arrayObject, setArrayObject] = useState<typeof Array | null | null>(
    undefined
  );

  useEffect(() => {
    setArrayObject('undefined' === typeof Array ? undefined : Array);
  }, []);

  return arrayObject;
}

// SSR-Safe Object Hook
export function useObject() {
  const [objectObject, setObject] = useState<typeof Object | null | null>(
    undefined
  );

  useEffect(() => {
    setObject('undefined' === typeof Object ? undefined : Object);
  }, []);

  return objectObject;
}

// SSR-Safe String Hook
export function useString() {
  const [stringObject, setStringObject] = useState<typeof String | null | null>(
    undefined
  );

  useEffect(() => {
    setStringObject('undefined' === typeof String ? undefined : String);
  }, []);

  return stringObject;
}

// SSR-Safe Number Hook
export function useNumber() {
  const [numberObject, setNumberObject] = useState<typeof Number | null | null>(
    undefined
  );

  useEffect(() => {
    setNumberObject('undefined' === typeof Number ? undefined : Number);
  }, []);

  return numberObject;
}

// SSR-Safe Boolean Hook
export function useBoolean() {
  const [booleanObject, setBooleanObject] = useState<typeof Boolean | null>(
    undefined
  );

  useEffect(() => {
    setBooleanObject('undefined' === typeof Boolean ? undefined : Boolean);
  }, []);

  return booleanObject;
}

// SSR-Safe Function Hook
export function useFunction() {
  const [functionObject, setFunctionObject] = useState<typeof Function | null>(
    undefined
  );

  useEffect(() => {
    setFunctionObject('undefined' === typeof Function ? undefined : Function);
  }, []);

  return functionObject;
}

// SSR-Safe Map Hook
export function useMap() {
  const [mapObject, setMapObject] = useState<typeof Map | null | null>(
    undefined
  );

  useEffect(() => {
    setMapObject('undefined' === typeof Map ? undefined : Map);
  }, []);

  return mapObject;
}
