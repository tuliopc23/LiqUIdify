export default function AnimationsGuidePage() {
    return (
        <div className="prose">
            <h1>Animations & Physics</h1>
            <p>
                Glass UI features a sophisticated physics engine and animation system that brings
                your interfaces to life. Learn how to leverage spring dynamics, magnetic interactions,
                and fluid animations to create engaging user experiences.
            </p>

            <h2>🎮 Physics Engine Overview</h2>
            <p>
                The Glass UI physics engine provides realistic motion and interactions through:
            </p>
            <ul>
                <li><strong>Spring Dynamics:</strong> Natural, bouncy animations</li>
                <li><strong>Magnetic Fields:</strong> Elements that attract and repel</li>
                <li><strong>Fluid Simulation:</strong> Liquid-like glass effects</li>
                <li><strong>Particle Systems:</strong> Complex animated effects</li>
                <li><strong>Collision Detection:</strong> Interactive element boundaries</li>
            </ul>

            <h2>🌊 Basic Animation Concepts</h2>

            <h3>Spring Animations</h3>
            <div className="component-preview">
                <div className="flex gap-4">
                    <button className="liquid-glass liquid-glass-interactive px-6 py-3 rounded-xl font-medium border border-white/20 text-gray-300 transform transition-transform duration-300 hover:scale-105 active:scale-95">
                        Spring Button
                    </button>
                    <div className="liquid-glass p-4 rounded-xl border border-white/20 transform transition-transform duration-500 hover:rotate-3 hover:scale-105">
                        Hover to rotate
                    </div>
                </div>
            </div>

            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">Spring Animation Configuration</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`import { useSpring, useGlassPhysics } from 'glass-ui';

function SpringButton() {
  const [isPressed, setIsPressed] = useState(false);
  
  const springProps = useSpring({
    scale: isPressed ? 0.95 : 1,
    rotate: isPressed ? 2 : 0,
    config: {
      tension: 300,
      friction: 25,
      mass: 1,
    },
  });
  
  return (
    <animated.button
      style={springProps}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className="liquid-glass px-6 py-3 rounded-xl"
    >
      Spring Animation
    </animated.button>
  );
}`}</code></pre>
            </div>

            <h3>Magnetic Hover Effects</h3>
            <div className="component-preview">
                <div className="flex gap-4 justify-center">
                    <div className="liquid-glass p-6 rounded-xl border border-white/20 cursor-pointer transform transition-transform duration-200 hover:scale-110 hover:-translate-y-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2"></div>
                        <p className="text-sm text-center">Magnetic Card</p>
                    </div>
                    <div className="liquid-glass p-6 rounded-xl border border-white/20 cursor-pointer transform transition-transform duration-200 hover:scale-110 hover:-translate-y-2">
                        <div className="w-8 h-8 bg-purple-500 rounded-full mx-auto mb-2"></div>
                        <p className="text-sm text-center">Magnetic Card</p>
                    </div>
                </div>
            </div>

            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">Magnetic Hover Implementation</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`import { useMagneticHover } from 'glass-ui';

function MagneticCard({ children }) {
  const { elementRef, transform, isHovered } = useMagneticHover(0.3, 120);
  
  return (
    <div
      ref={elementRef}
      className={cn(
        "liquid-glass p-6 rounded-xl cursor-pointer transition-all duration-300",
        isHovered && "shadow-2xl shadow-blue-500/25"
      )}
      style={{ transform }}
    >
      {children}
    </div>
  );
}

// Usage with custom magnetic strength
<MagneticCard>
  <h3>Hover me!</h3>
  <p>I'll follow your cursor with magnetic attraction</p>
</MagneticCard>`}</code></pre>
            </div>

            <h2>🎨 Advanced Animation Patterns</h2>

            <h3>Ripple Effects</h3>
            <div className="api-section">
                <p>Create touch-responsive ripple animations that emanate from interaction points:</p>

                <div className="code-block">
                    <pre className="p-4 m-0"><code>{`import { createGlassRipple, useRippleEffect } from 'glass-ui';

function RippleButton({ children, onClick, ...props }) {
  const buttonRef = useRef(null);
  
  const handleClick = (e) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      createGlassRipple(
        buttonRef.current, 
        x, 
        y, 
        'rgba(255, 255, 255, 0.3)'
      );
    }
    
    onClick?.(e);
  };
  
  return (
    <button
      ref={buttonRef}
      className="liquid-glass relative overflow-hidden px-6 py-3 rounded-xl"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

// Auto-ripple hook
function AutoRippleComponent() {
  const { rippleProps } = useRippleEffect({
    color: 'rgba(59, 130, 246, 0.3)',
    duration: 600,
  });
  
  return <div {...rippleProps}>Click anywhere for ripples</div>;
}`}</code></pre>
                </div>
            </div>

            <h2>⚙️ Animation Configuration</h2>

            <h3>Global Animation Settings</h3>
            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">Animation Provider Setup</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`import { AnimationProvider } from 'glass-ui';

function App() {
  return (
    <AnimationProvider
      config={{
        // Global animation settings
        reducedMotion: false,
        performanceMode: 'auto',
        
        // Spring configuration
        spring: {
          tension: 280,
          friction: 25,
          mass: 1,
        },
        
        // Magnetic settings
        magnetic: {
          strength: 0.3,
          distance: 120,
          smoothing: 0.1,
        },
      }}
    >
      <YourApp />
    </AnimationProvider>
  );
}`}</code></pre>
            </div>

            <h2>🎯 Animation Best Practices</h2>

            <div className="api-section">
                <h3>Performance Guidelines</h3>
                <ul>
                    <li><strong>Use GPU acceleration:</strong> Prefer <code>transform</code> and <code>opacity</code> for animations</li>
                    <li><strong>Respect user preferences:</strong> Check for <code>prefers-reduced-motion</code></li>
                    <li><strong>Batch animations:</strong> Use <code>requestAnimationFrame</code> for smooth performance</li>
                    <li><strong>Limit particle count:</strong> Keep particle systems under 100 elements on mobile</li>
                </ul>

                <h3>Accessibility Considerations</h3>
                <ul>
                    <li><strong>Reduced motion:</strong> Provide alternatives for users with vestibular disorders</li>
                    <li><strong>Focus indicators:</strong> Ensure animations don't interfere with focus states</li>
                    <li><strong>Screen readers:</strong> Use <code>aria-live</code> for important animation state changes</li>
                </ul>
            </div>

            <h2>🧪 Advanced Examples</h2>
            <div className="grid md:grid-cols-2 gap-4 not-prose mt-6">
                <a href="/examples/animations" className="liquid-glass rounded-lg p-4 border border-white/10 hover:border-blue-400/30 transition-colors no-underline">
                    <h4 className="font-semibold text-white mb-2">Animation Playground</h4>
                    <p className="text-gray-400 text-sm">Interactive examples of all animation features</p>
                </a>
                <a href="/examples/physics" className="liquid-glass rounded-lg p-4 border border-white/10 hover:border-purple-400/30 transition-colors no-underline">
                    <h4 className="font-semibold text-white mb-2">Physics Demos</h4>
                    <p className="text-gray-400 text-sm">Explore the physics engine capabilities</p>
                </a>
            </div>
        </div>
    );
} 