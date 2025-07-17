import React, { useState, useEffect } from 'react';
import { GracefulComponent, GracefulImage, GracefulAnimation } from './graceful-component';
import { useDegradationAware } from '../../utils/graceful-degradation';

export const GracefulDegradationTest: React.FC = () => {
    const [testResults, setTestResults] = useState<Record<string, boolean>>({});
    const [isTesting, setIsTesting] = useState(false);
    const { featureSupport, networkStatus, performanceLevel, prefersReducedMotion } = useDegradationAware();

    const runFeatureTests = async () => {
        setIsTesting(true);
        const results: Record<string, boolean> = {};

        // Test WebGL support
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            results.webGL = !!gl;
        } catch {
            results.webGL = false;
        }

        // Test WebAssembly support
        results.webAssembly = typeof WebAssembly !== 'undefined';

        // Test Service Worker support
        results.serviceWorker = 'serviceWorker' in navigator;

        // Test Intersection Observer
        results.intersectionObserver = 'IntersectionObserver' in window;

        // Test Resize Observer
        results.resizeObserver = 'ResizeObserver' in window;

        // Test Clipboard API
        results.clipboard = 'clipboard' in navigator;

        // Test Geolocation
        results.geolocation = 'geolocation' in navigator;

        // Test Notifications
        results.notifications = 'Notification' in window;

        // Test WebRTC
        results.webRTC = 'RTCPeerConnection' in window;

        // Test Canvas
        results.canvas = !!document.createElement('canvas').getContext;

        // Test Web Audio
        results.webAudio = 'AudioContext' in window || 'webkitAudioContext' in window;

        // Test Speech Synthesis
        results.speechSynthesis = 'speechSynthesis' in window;

        // Test Speech Recognition
        results.speechRecognition = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

        // Test Payment Request
        results.paymentRequest = 'PaymentRequest' in window;

        // Test WebXR
        results.webXR = 'xr' in navigator;

        // Test Web Share
        results.webShare = 'share' in navigator;

        // Test Vibration
        results.vibration = 'vibrate' in navigator;

        // Test Battery
        results.battery = 'getBattery' in navigator;

        // Test Device Orientation
        results.deviceOrientation = 'DeviceOrientationEvent' in window;

        // Test Device Motion
        results.deviceMotion = 'DeviceMotionEvent' in window;

        // Test Web NFC
        results.webNFC = 'NDEFReader' in window;

        // Test Web Serial
        results.webSerial = 'serial' in navigator;

        // Test Web USB
        results.webUSB = 'usb' in navigator;

        // Test Web Bluetooth
        results.webBluetooth = 'bluetooth' in navigator;

        setTestResults(results);
        setIsTesting(false);
    };

    useEffect(() => {
        runFeatureTests();
    }, []);

    const calculateSupportScore = () => {
        const total = Object.keys(testResults).length;
        const supported = Object.values(testResults).filter(Boolean).length;
        return total > 0 ? Math.round((supported / total) * 100) : 0;
    };

    const supportScore = calculateSupportScore();

    return (
        <div className="graceful-degradation-test p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Graceful Degradation Test Suite</h1>

            {/* Summary */}
            <div className="mb-8 p-4 border rounded-lg bg-gray-50">
                <h2 className="text-xl font-semibold mb-4">Test Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <h3 className="font-medium">Feature Support Score</h3>
                        <p className="text-2xl font-bold">{supportScore}%</p>
                    </div>
                    <div>
                        <h3 className="font-medium">Network Status</h3>
                        <p>{networkStatus.online ? 'Online' : 'Offline'}</p>
                    </div>
                    <div>
                        <h3 className="font-medium">Performance Level</h3>
                        <p className="capitalize">{performanceLevel}</p>
                    </div>
                </div>
            </div>

            {/* Feature Matrix */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Feature Support Matrix</h2>
                <button
                    onClick={runFeatureTests}
                    disabled={isTesting}
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    {isTesting ? 'Testing...' : 'Re-run Tests'}
                </button>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {Object.entries(testResults).map(([feature, supported]) => (
                        <div
                            key={feature}
                            className={`p-3 rounded text-sm ${supported ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}
                        >
                            <div className="font-medium">{feature}</div>
                            <div>{supported ? '✅ Supported' : '❌ Not Supported'}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Graceful Component Tests */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Component Tests</h2>

                <div className="space-y-6">
                    {/* Image Loading Test */}
                    <div>
                        <h3 className="text-lg font-medium mb-2">Image Loading</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <GracefulImage
                                src="https://picsum.photos/300/200?random=1"
                                alt="Test image 1"
                                fallbackSrc="https://via.placeholder.com/300x200/cccccc/666666?text=Fallback"
                                className="w-full h-32 object-cover rounded"
                            />
                            <GracefulImage
                                src="https://invalid-url.jpg"
                                alt="Test image 2 (will fail)"
                                fallbackSrc="https://via.placeholder.com/300x200/ffcccc/666666?text=Error"
                                className="w-full h-32 object-cover rounded"
                            />
                        </div>
                    </div>

                    {/* Animation Test */}
                    <div>
                        <h3 className="text-lg font-medium mb-2">Animation Support</h3>
                        <div className="space-y-4">
                            <GracefulAnimation animation="fadeIn" duration={1000}>
                                <div className="p-4 bg-blue-100 rounded">
                                    This should fade in if animations are supported
                                </div>
                            </GracefulAnimation>

                            <GracefulAnimation animation="slideInUp" duration={800} delay={200}>
                                <div className="p-4 bg-green-100 rounded">
                                    This should slide up with delay
                                </div>
                            </GracefulAnimation>
                        </div>
                    </div>

                    {/* Feature Fallback Test */}
                    <div>
                        <h3 className="text-lg font-medium mb-2">Feature Fallbacks</h3>
                        <div className="space-y-4">
                            <GracefulComponent
                                feature="webGL"
                                fallback={
                                    <div className="p-4 bg-yellow-100 rounded">
                                        <h4>WebGL Fallback</h4>
                                        <p>WebGL is not supported, showing simplified version</p>
                                    </div>
                                }
                                staticFallback={
                                    <div className="p-4 bg-red-100 rounded">
                                        <h4>Static Fallback</h4>
                                        <p>Static content for low-performance devices</p>
                                    </div>
                                }
                            >
                                <div className="p-4 bg-blue-100 rounded">
                                    <h4>Enhanced WebGL Content</h4>
                                    <p>This would show advanced 3D graphics if WebGL is supported</p>
                                </div>
                            </GracefulComponent>

                            <GracefulComponent
                                feature="animations"
                                fallback={
                                    <div className="p-4 bg-orange-100 rounded">
                                        <h4>Animation Fallback</h4>
                                        <p>Animations disabled, showing static content</p>
                                    </div>
                                }
                            >
                                <div className="p-4 bg-purple-100 rounded animate-pulse">
                                    <h4>Animated Content</h4>
                                    <p>This content has animations enabled</p>
                                </div>
                            </GracefulComponent>
                        </div>
                    </div>
                </div>
            </div>

            {/* Performance Simulation */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Performance Simulation</h2>

                <div className="space-y-4">
                    <div className="p-4 border rounded">
                        <h3 className="font-medium mb-2">Current Performance Level: {performanceLevel}</h3>

                        {performanceLevel === 'low' && (
                            <div className="bg-red-100 p-3 rounded">
                                <p>Low performance mode activated - using static fallbacks</p>
                            </div>
                        )}

                        {performanceLevel === 'medium' && (
                            <div className="bg-yellow-100 p-3 rounded">
                                <p>Medium performance mode - reduced animations and quality</p>
                            </div>
                        )}

                        {performanceLevel === 'high' && (
                            <div className="bg-green-100 p-3 rounded">
                                <p>High performance mode - full features enabled</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Network Simulation */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Network Simulation</h2>

                <div className="space-y-4">
                    <div className="p-4 border rounded">
                        <h3 className="font-medium mb-2">Network Status: {networkStatus.online ? 'Online' : 'Offline'}</h3>

                        {!networkStatus.online && (
                            <div className="bg-red-100 p-3 rounded">
                                <p>Offline mode - using cached/static content</p>
                            </div>
                        )}

                        {networkStatus.online && (
                            <div className="bg-green-100 p-3 rounded">
                                <p>Online mode - full network features available</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Accessibility Tests */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Accessibility Tests</h2>

                <div className="space-y-4">
                    <div className="p-4 border rounded">
                        <h3 className="font-medium mb-2">Reduced Motion Preference</h3>
                        <p>System prefers reduced motion: {prefersReducedMotion ? 'Yes' : 'No'}</p>

                        {prefersReducedMotion && (
                            <div className="bg-blue-100 p-3 rounded mt-2">
                                <p>Animations will be disabled or simplified</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GracefulDegradationTest;