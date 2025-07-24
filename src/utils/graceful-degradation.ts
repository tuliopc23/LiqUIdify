/**
 * Graceful degradation utilities for handling feature failures
 * Provides fallbacks when advanced features aren't supported
 */

import { useCallback, useEffect, useState } from 'react';

export interface FeatureSupport {
  animations: boolean;
  webGL: boolean;
  serviceWorker: boolean;
  webAssembly: boolean;
  intersectionObserver: boolean;
  resizeObserver: boolean;
  matchMedia: boolean;
  clipboard: boolean;
  geolocation: boolean;
  notifications: boolean;
  push: boolean;
  webRTC: boolean;
  webAudio: boolean;
  canvas: boolean;
  webGL2: boolean;
  webGPU: boolean;
  fileSystem: boolean;
  webShare: boolean;
  vibration: boolean;
  battery: boolean;
  deviceOrientation: boolean;
  deviceMotion: boolean;
  speechSynthesis: boolean;
  speechRecognition: boolean;
  paymentRequest: boolean;
  credentialManagement: boolean;
  webAuthn: boolean;
  webXR: boolean;
  webNFC: boolean;
  webSerial: boolean;
  webUSB: boolean;
  webBluetooth: boolean;
}

export interface DegradationConfig {
  enableFallbacks: boolean;
  enableStaticFallbacks: boolean;
  enableCSSFallbacks: boolean;
  enableNetworkFallbacks: boolean;
  enablePerformanceFallbacks: boolean;
  enableAccessibilityFallbacks: boolean;
}

export class GracefulDegradationManager {
  private static instance: GracefulDegradationManager;
  private featureSupport: FeatureSupport | null = null;
  private config: DegradationConfig;
  private listeners: Set<(support: FeatureSupport) => void> = new Set();

  private constructor() {
    this.config = {
      enableFallbacks: true,
      enableStaticFallbacks: true,
      enableCSSFallbacks: true,
      enableNetworkFallbacks: true,
      enablePerformanceFallbacks: true,
      enableAccessibilityFallbacks: true,
    };
  }

  public static getInstance(): GracefulDegradationManager {
    if (!GracefulDegradationManager.instance) {
      GracefulDegradationManager.instance = new GracefulDegradationManager();
    }
    return GracefulDegradationManager.instance;
  }

  public async detectFeatureSupport(): Promise<FeatureSupport> {
    if (this.featureSupport) {
      return this.featureSupport;
    }

    const support: Partial<FeatureSupport> = {};

    // Animation support
    support.animations = this.checkCSSFeature('animation');

    // WebGL support
    support.webGL = this.checkWebGLSupport();

    // Service Worker support
    support.serviceWorker = 'serviceWorker' in navigator;

    // WebAssembly support
    support.webAssembly = 'undefined' !== typeof WebAssembly;

    // Observer APIs
    support.intersectionObserver = 'IntersectionObserver' in window;
    support.resizeObserver = 'ResizeObserver' in window;

    // Media queries
    support.matchMedia = 'matchMedia' in window;

    // Clipboard API
    support.clipboard = 'clipboard' in navigator;

    // Geolocation
    support.geolocation = 'geolocation' in navigator;

    // Notifications
    support.notifications = 'Notification' in window;

    // Push API
    support.push = 'PushManager' in window;

    // WebRTC
    support.webRTC = 'RTCPeerConnection' in window;

    // Web Audio
    support.webAudio =
      'AudioContext' in window || 'webkitAudioContext' in window;

    // Canvas
    support.canvas = this.checkCanvasSupport();

    // WebGL2
    support.webGL2 = this.checkWebGL2Support();

    // WebGPU
    support.webGPU = 'gpu' in navigator;

    // File System Access API
    support.fileSystem = 'showOpenFilePicker' in window;

    // Web Share API
    support.webShare = 'share' in navigator;

    // Vibration API
    support.vibration = 'vibrate' in navigator;

    // Battery API
    support.battery = 'getBattery' in navigator;

    // Device APIs
    support.deviceOrientation = 'DeviceOrientationEvent' in window;
    support.deviceMotion = 'DeviceMotionEvent' in window;

    // Speech APIs
    support.speechSynthesis = 'speechSynthesis' in window;
    support.speechRecognition =
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

    // Payment APIs
    support.paymentRequest = 'PaymentRequest' in window;

    // Credential Management
    support.credentialManagement = 'credentials' in navigator;

    // WebAuthn
    support.webAuthn = 'PublicKeyCredential' in window;

    // WebXR
    support.webXR = 'XR' in window || 'XRSystem' in window;

    // WebNFC
    support.webNFC = 'NDEFReader' in window;

    // WebSerial
    support.webSerial = 'serial' in navigator;

    // WebUSB
    support.webUSB = 'usb' in navigator;

    // WebBluetooth
    support.webBluetooth = 'bluetooth' in navigator;

    this.featureSupport = support as FeatureSupport;
    this.notifyListeners();
    return this.featureSupport;
  }

  private checkCSSFeature(property: string): boolean {
    if ('undefined' === typeof window) {
      return false;
    }

    const element = document.createElement('div');
    const capitalizedProperty =
      property.charAt(0).toUpperCase() + property.slice(1);

    return (
      property in element.style ||
      `webkit${capitalizedProperty}` in element.style ||
      `moz${capitalizedProperty}` in element.style ||
      `ms${capitalizedProperty}` in element.style
    );
  }

  private checkWebGLSupport(): boolean {
    if ('undefined' === typeof window) {
      return false;
    }

    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!gl;
    } catch {
      return false;
    }
  }

  private checkWebGL2Support(): boolean {
    if ('undefined' === typeof window) {
      return false;
    }

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2');
      return !!gl;
    } catch {
      return false;
    }
  }

  private checkCanvasSupport(): boolean {
    if ('undefined' === typeof window) {
      return false;
    }

    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      return !!context;
    } catch {
      return false;
    }
  }

  public updateConfig(newConfig: Partial<DegradationConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  public getConfig(): DegradationConfig {
    return this.config;
  }

  public getFeatureSupport(): FeatureSupport | null {
    return this.featureSupport;
  }

  public addListener(callback: (support: FeatureSupport) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notifyListeners(): void {
    if (this.featureSupport) {
      for (const callback of this.listeners) {callback(this.featureSupport!);}
    }
  }

  public shouldUseFallback(feature: keyof FeatureSupport): boolean {
    if (!this.config.enableFallbacks) {
      return false;
    }
    if (!this.featureSupport) {
      return true;
    }

    return !this.featureSupport[feature];
  }

  public getFallbackClass(feature: string, baseClass: string = ''): string {
    if (!this.config.enableCSSFallbacks) {
      return baseClass;
    }

    const shouldFallback = this.shouldUseFallback(
      feature as keyof FeatureSupport
    );
    const fallbackClass = shouldFallback ? `${baseClass}--fallback` : baseClass;

    return fallbackClass.trim();
  }

  public async checkNetworkStatus(): Promise<{
    online: boolean;
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
  }> {
    if ('undefined' === typeof window) {
      return { online: true };
    }

    const online = navigator.onLine;

    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      return {
        online,
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
      };
    }

    return { online };
  }

  public getPerformanceLevel(): 'high' | 'medium' | 'low' {
    if ('undefined' === typeof window) {
      return 'high';
    }

    const memory = (navigator as any).deviceMemory;
    const cores = navigator.hardwareConcurrency;

    if (memory && cores) {
      if (8 <= memory && 8 <= cores) {
        return 'high';
      }
      if (4 <= memory && 4 <= cores) {
        return 'medium';
      }
      return 'low';
    }

    // Fallback based on connection speed
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const effectiveType = connection.effectiveType;

      if ('4g' === effectiveType) {
        return 'high';
      }
      if ('3g' === effectiveType) {
        return 'medium';
      }
      return 'low';
    }

    return 'high';
  }
}

// React hook for graceful degradation
export function useGracefulDegradation() {
  const [manager] = useState(() => GracefulDegradationManager.getInstance());
  const [featureSupport, setFeatureSupport] = useState<FeatureSupport | null>(
    // @ts-expect-error TS(2345): Argument of type 'undefined' is not assignable to ... Remove this comment to see the full error message
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeatures = async () => {
      setIsLoading(true);
      const support = await manager.detectFeatureSupport();
      setFeatureSupport(support);
      setIsLoading(false);
    };

    loadFeatures();

    const unsubscribe = manager.addListener(setFeatureSupport);
    return unsubscribe;
  }, [manager]);

  const shouldUseFallback = useCallback(
    (feature: keyof FeatureSupport) => {
      return manager.shouldUseFallback(feature);
    },
    [manager]
  );

  const getFallbackClass = useCallback(
    (feature: string, baseClass: string = '') => {
      return manager.getFallbackClass(feature, baseClass);
    },
    [manager]
  );

  const checkNetworkStatus = useCallback(async () => {
    return manager.checkNetworkStatus();
  }, [manager]);

  const getPerformanceLevel = useCallback(() => {
    return manager.getPerformanceLevel();
  }, [manager]);

  return {
    featureSupport,
    isLoading,
    shouldUseFallback,
    getFallbackClass,
    checkNetworkStatus,
    getPerformanceLevel,
    updateConfig: manager.updateConfig.bind(manager),
    getConfig: manager.getConfig.bind(manager),
  };
}

// Network-aware fallback hook
export function useNetworkAwareFallback() {
  const { checkNetworkStatus, getPerformanceLevel } = useGracefulDegradation();
  const [networkStatus, setNetworkStatus] = useState({ online: true });
  const [performanceLevel, setPerformanceLevel] = useState<
    'high' | 'medium' | 'low'
  >('high');

  useEffect(() => {
    const updateStatus = async () => {
      const [status, level] = await Promise.all([
        checkNetworkStatus(),
        Promise.resolve(getPerformanceLevel()),
      ]);

      setNetworkStatus(status);
      setPerformanceLevel(level);
    };

    updateStatus();

    const handleOnline = () => updateStatus();
    const handleOffline = () => updateStatus();

    if ("undefined" !== typeof window) {
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
    }

    return () => {
      if ("undefined" !== typeof window) {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      }
    };
  }, [checkNetworkStatus, getPerformanceLevel]);

  return {
    networkStatus,
    performanceLevel,
    shouldReduceMotion: 'low' === performanceLevel,
    shouldReduceQuality: 'low' === performanceLevel || !networkStatus.online,
    shouldUseStaticFallbacks:
      'low' === performanceLevel || !networkStatus.online,
  };
}

// Accessibility-aware fallback hook
export function useAccessibilityFallback() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [prefersReducedData, setPrefersReducedData] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    if ('undefined' === typeof window) {
      return;
    }

    const mediaQueryMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );
    const mediaQueryData = window.matchMedia('(prefers-reduced-data: reduce)');
    const mediaQueryContrast = window.matchMedia('(prefers-contrast: high)');

    const updateMotion = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    const updateData = (e: MediaQueryListEvent) =>
      setPrefersReducedData(e.matches);
    const updateContrast = (e: MediaQueryListEvent) =>
      setHighContrast(e.matches);

    setPrefersReducedMotion(mediaQueryMotion.matches);
    setPrefersReducedData(mediaQueryData.matches);
    setHighContrast(mediaQueryContrast.matches);

    mediaQueryMotion.addEventListener('change', updateMotion);
    mediaQueryData.addEventListener('change', updateData);
    mediaQueryContrast.addEventListener('change', updateContrast);

    return () => {
      mediaQueryMotion.removeEventListener('change', updateMotion);
      mediaQueryData.removeEventListener('change', updateData);
      mediaQueryContrast.removeEventListener('change', updateContrast);
    };
  }, []);

  return {
    prefersReducedMotion,
    prefersReducedData,
    highContrast,
    shouldUseStaticFallbacks: prefersReducedMotion || prefersReducedData,
    shouldReduceAnimations: prefersReducedMotion,
    shouldReduceQuality: prefersReducedData,
  };
}

// Combined degradation hook
export function useDegradationAware() {
  const graceful = useGracefulDegradation();
  const network = useNetworkAwareFallback();
  const accessibility = useAccessibilityFallback();

  return {
    ...graceful,
    ...network,
    ...accessibility,
    shouldUseFallback: (feature: keyof FeatureSupport) => {
      return (
        graceful.shouldUseFallback(feature) ||
        network.shouldUseStaticFallbacks ||
        accessibility.shouldUseStaticFallbacks
      );
    },
    getDegradationClass: (feature: string, baseClass: string = '') => {
      const classes = [baseClass];

      if (graceful.shouldUseFallback(feature as keyof FeatureSupport)) {
        classes.push(`${baseClass}--feature-fallback`);
      }

      if (network.shouldUseStaticFallbacks) {
        classes.push(`${baseClass}--network-fallback`);
      }

      if (accessibility.shouldUseStaticFallbacks) {
        classes.push(`${baseClass}--accessibility-fallback`);
      }

      if (accessibility.prefersReducedMotion) {
        classes.push(`${baseClass}--reduced-motion`);
      }

      if (accessibility.highContrast) {
        classes.push(`${baseClass}--high-contrast`);
      }

      return classes.filter(Boolean).join(' ');
    },
  };
}
