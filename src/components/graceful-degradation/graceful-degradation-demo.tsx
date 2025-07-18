import React, { useState } from 'react';
import {
  GracefulComponent,
  GracefulImage,
  GracefulAnimation,
  GracefulInteractive,
  CSSAccordion,
  CSSTabs,
  CSSModal,
} from './graceful-component';
import { useDegradationAware } from '../../utils/graceful-degradation';
import '../../styles/graceful-degradation.css';

export const GracefulDegradationDemo: React.FC = () => {
  const {
    featureSupport,
    isLoading,
    networkStatus,
    performanceLevel,
    prefersReducedMotion,
    prefersReducedData,
  } = useDegradationAware();

  const [showDetails, setShowDetails] = useState(false);

  if (isLoading) {
    return (
      <div className="graceful-degradation-demo">
        <div className="css-skeleton-fallback" style={{ height: '200px' }} />
      </div>
    );
  }

  return (
    <div className="graceful-degradation-demo p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Graceful Degradation Demo</h1>

      {/* System Status */}
      <div className="mb-8 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium">Network</h3>
            <p>Status: {networkStatus.online ? 'Online' : 'Offline'}</p>
          </div>
          <div>
            <h3 className="font-medium">Performance</h3>
            <p>Level: {performanceLevel}</p>
            <p>Reduced Motion: {prefersReducedMotion ? 'Yes' : 'No'}</p>
            <p>Reduced Data: {prefersReducedData ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>

      {/* Feature Support Matrix */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Feature Support</h2>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {showDetails ? 'Hide' : 'Show'} Details
        </button>
        
        {showDetails && featureSupport && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            {Object.entries(featureSupport).map(([feature, supported]) => (
              <div
                key={feature}
                className={`p-2 rounded ${
                  supported ? 'bg-green-100' : 'bg-red-100'
                }`}
              >
                {feature}: {supported ? '✅' : '❌'}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Graceful Image Demo */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Graceful Image Loading</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GracefulImage
            src="https://picsum.photos/400/300?random=1"
            alt="Demo image 1"
            fallbackSrc="https://via.placeholder.com/400x300/cccccc/666666?text=Fallback+Image"
            placeholder={<div className="w-full h-48 bg-gray-200 animate-pulse" />}
            className="w-full h-48 object-cover rounded"
          />
          <GracefulImage
            src="https://invalid-url-that-will-fail.jpg"
            alt="Demo image 2 (will fail)"
            fallbackSrc="https://via.placeholder.com/400x300/ffcccc/666666?text=Error+Fallback"
            className="w-full h-48 object-cover rounded"
          />
        </div>
      </section>

      {/* Graceful Animation Demo */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Graceful Animations</h2>
        <div className="space-y-4">
          <GracefulAnimation animation="fadeInUp" duration={500}>
            <div className="p-4 bg-blue-100 rounded">
              This will animate if supported
            </div>
          </GracefulAnimation>
          
          <GracefulAnimation animation="slideInLeft" duration={700} delay={200}>
            <div className="p-4 bg-green-100 rounded">
              This has a delay and will respect reduced motion preferences
            </div>
          </GracefulAnimation>
        </div>
      </section>

      {/* Graceful Interactive Demo */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Graceful Interactions</h2>
        <div className="space-y-4">
          <GracefulInteractive
            fallback={<div className="p-4 bg-yellow-100 rounded">Interactive features disabled</div>}
            staticFallback={<div className="p-4 bg-gray-100 rounded">Static content shown</div>}
          >
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Click me (if interactions work)
            </button>
          </GracefulInteractive>

          <GracefulInteractive>
            <div className="p-4 bg-purple-100 rounded">
              This content adapts to network/performance conditions
            </div>
          </GracefulInteractive>
        </div>
      </section>

      {/* CSS-Only Fallbacks */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">CSS-Only Fallbacks</h2>
        
        <div className="space-y-6">
          {/* CSS Accordion */}
          <div>
            <h3 className="text-lg font-medium mb-2">CSS Accordion</h3>
            <CSSAccordion
              items={[
                {
                  title: 'Section 1',
                  content: <p>This content is accessible even without JavaScript</p>,
                },
                {
                  title: 'Section 2',
                  content: <p>Click the labels to expand/collapse sections</p>,
                },
              ]}
            />
          </div>

          {/* CSS Tabs */}
          <div>
            <h3 className="text-lg font-medium mb-2">CSS Tabs</h3>
            <CSSTabs
              tabs={[
                {
                  id: 'tab1',
                  label: 'Tab 1',
                  content: <p>Content for tab 1 - works without JavaScript</p>,
                },
                {
                  id: 'tab2',
                  label: 'Tab 2',
                  content: <p>Content for tab 2 - uses CSS :target selector</p>,
                },
              ]}
            />
          </div>

          {/* CSS Modal */}
          <div>
            <h3 className="text-lg font-medium mb-2">CSS Modal</h3>
            <CSSModal
              trigger={<button className="px-4 py-2 bg-green-500 text-white rounded">Open Modal</button>}
              content={
                <div>
                  <h4>CSS-Only Modal</h4>
                  <p>This modal works without JavaScript using CSS :target</p>
                </div>
              }
              modalId="demo-modal"
            />
          </div>
        </div>
      </section>

      {/* Progressive Enhancement Demo */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Progressive Enhancement</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="progressive-enhancement p-4">
            <h3 className="font-medium">Basic Card</h3>
            <p>Works everywhere</p>
          </div>
          
          <div className="progressive-enhancement p-4">
            <h3 className="font-medium">Enhanced Card</h3>
            <p>Enhanced with CSS Grid if supported</p>
          </div>
          
          <div className="progressive-enhancement p-4">
            <h3 className="font-medium">Advanced Card</h3>
            <p>Backdrop blur if supported</p>
          </div>
        </div>
      </section>

      {/* Network-Aware Content */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Network-Aware Content</h2>
        
        <GracefulComponent
          feature="webGL"
          fallback={
            <div className="p-4 bg-orange-100 rounded">
              <h3>WebGL Fallback</h3>
              <p>Showing simplified version without 3D effects</p>
            </div>
          }
          staticFallback={
            <div className="p-4 bg-red-100 rounded">
              <h3>Static Fallback</h3>
              <p>Basic content for low-performance devices</p>
            </div>
          }
        >
          <div className="p-4 bg-blue-100 rounded">
            <h3>Enhanced Content</h3>
            <p>Full experience with WebGL and advanced features</p>
          </div>
        </GracefulComponent>
      </section>

      {/* Loading States */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Loading States</h2>
        
        <div className="space-y-4">
          <div className="css-loading-fallback p-4 rounded">
            <p>Loading content...</p>
          </div>
          
          <div className="css-skeleton-fallback" style={{ height: '60px', width: '100%' }} />
        </div>
      </section>
    </div>
  );
};

export default GracefulDegradationDemo;