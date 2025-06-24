import { useRef, useState, useCallback, useEffect } from 'react';

/**
 * Glass Physics - Physics engine for realistic motion
 * Spring physics, fluid dynamics, and particle systems
 */

// Physics constants
export const PHYSICS_CONSTANTS = {
  SPRING_TENSION: 170,
  SPRING_FRICTION: 0.9,
  MAGNETIC_STRENGTH: 0.15,
  MAGNETIC_RADIUS: 150,
  REPULSION_DISTANCE: 100,
  FLUID_TENSION: 0.2
};

// Vector 2D class for physics calculations
export class Vector2D {
  constructor(public x: number = 0, public y: number = 0) {}

  // Static helper methods for backward compatibility
  static distance(a: Vector2D, b: Vector2D): number {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  }

  static normalize(vector: Vector2D): Vector2D {
    const magnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    return magnitude > 0 ? new Vector2D(vector.x / magnitude, vector.y / magnitude) : new Vector2D(0, 0);
  }

  static multiply(vector: Vector2D, scalar: number): Vector2D {
    return new Vector2D(vector.x * scalar, vector.y * scalar);
  }

  static add(a: Vector2D, b: Vector2D): Vector2D {
    return new Vector2D(a.x + b.x, a.y + b.y);
  }
  
  // Instance methods for enhanced functionality
  add(v: Vector2D): Vector2D {
    return new Vector2D(this.x + v.x, this.y + v.y);
  }
  
  subtract(v: Vector2D): Vector2D {
    return new Vector2D(this.x - v.x, this.y - v.y);
  }
  
  multiply(scalar: number): Vector2D {
    return new Vector2D(this.x * scalar, this.y * scalar);
  }
  
  divide(scalar: number): Vector2D {
    return new Vector2D(this.x / scalar, this.y / scalar);
  }
  
  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  
  normalize(): Vector2D {
    const mag = this.magnitude();
    return mag > 0 ? this.divide(mag) : new Vector2D();
  }
  
  dot(v: Vector2D): number {
    return this.x * v.x + this.y * v.y;
  }
  
  distance(v: Vector2D): number {
    return this.subtract(v).magnitude();
  }
  
  angle(): number {
    return Math.atan2(this.y, this.x);
  }
  
  rotate(angle: number): Vector2D {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Vector2D(
      this.x * cos - this.y * sin,
      this.x * sin + this.y * cos
    );
  }
  
  clone(): Vector2D {
    return new Vector2D(this.x, this.y);
  }
}

// Legacy SpringPhysics for compatibility with existing components
class LegacySpringPhysics {
  private velocity: Vector2D = new Vector2D(0, 0);
  private position: Vector2D = new Vector2D(0, 0);
  private target: Vector2D = new Vector2D(0, 0);

  constructor(
    private tension: number = PHYSICS_CONSTANTS.SPRING_TENSION,
    private friction: number = PHYSICS_CONSTANTS.SPRING_FRICTION
  ) {}

  setTarget(x: number, y: number) {
    this.target = new Vector2D(x, y);
  }

  update(): Vector2D {
    const force = Vector2D.multiply(
      new Vector2D(this.target.x - this.position.x, this.target.y - this.position.y),
      this.tension
    );

    this.velocity = Vector2D.add(this.velocity, force);
    this.velocity = Vector2D.multiply(this.velocity, this.friction);
    this.position = Vector2D.add(this.position, this.velocity);

    return this.position;
  }

  getCurrentPosition(): Vector2D {
    return this.position;
  }

  isAtRest(): boolean {
    const velocityThreshold = 0.01;
    const positionThreshold = 0.1;
    
    return (
      Math.abs(this.velocity.x) < velocityThreshold &&
      Math.abs(this.velocity.y) < velocityThreshold &&
      Vector2D.distance(this.position, this.target) < positionThreshold
    );
  }
}

// Spring physics configuration
export interface SpringConfig {
  tension: number;
  friction: number;
  mass?: number;
  velocity?: number;
  precision?: number;
}

// Spring physics defaults
export const SPRING_PRESETS = {
  noWobble: { tension: 170, friction: 26 },
  gentle: { tension: 120, friction: 14 },
  wobbly: { tension: 180, friction: 12 },
  stiff: { tension: 210, friction: 20 },
  slow: { tension: 280, friction: 60 },
  molasses: { tension: 280, friction: 120 }
};

// Enhanced spring physics class
export class SpringPhysics {
  private position: number;
  private velocity: number;
  private tension: number;
  private friction: number;
  private mass: number;
  private precision: number;
  
  constructor(config: SpringConfig) {
    this.position = 0;
    this.velocity = config.velocity || 0;
    this.tension = config.tension;
    this.friction = config.friction;
    this.mass = config.mass || 1;
    this.precision = config.precision || 0.01;
  }
  
  update(target: number, deltaTime: number): number {
    const spring = -this.tension * (this.position - target);
    const damper = -this.friction * this.velocity;
    const acceleration = (spring + damper) / this.mass;
    
    this.velocity += acceleration * deltaTime;
    this.position += this.velocity * deltaTime;
    
    // Check if spring has settled
    if (
      Math.abs(this.velocity) < this.precision &&
      Math.abs(this.position - target) < this.precision
    ) {
      this.position = target;
      this.velocity = 0;
    }
    
    return this.position;
  }
  
  setPosition(position: number) {
    this.position = position;
  }
  
  setVelocity(velocity: number) {
    this.velocity = velocity;
  }
  
  isSettled(target: number): boolean {
    return (
      Math.abs(this.velocity) < this.precision &&
      Math.abs(this.position - target) < this.precision
    );
  }
}

// 2D Spring physics
export class Spring2D {
  private springX: SpringPhysics;
  private springY: SpringPhysics;
  
  constructor(config: SpringConfig) {
    this.springX = new SpringPhysics(config);
    this.springY = new SpringPhysics(config);
  }
  
  update(target: Vector2D, deltaTime: number): Vector2D {
    return new Vector2D(
      this.springX.update(target.x, deltaTime),
      this.springY.update(target.y, deltaTime)
    );
  }
  
  setPosition(position: Vector2D) {
    this.springX.setPosition(position.x);
    this.springY.setPosition(position.y);
  }
  
  setVelocity(velocity: Vector2D) {
    this.springX.setVelocity(velocity.x);
    this.springY.setVelocity(velocity.y);
  }
  
  isSettled(target: Vector2D): boolean {
    return this.springX.isSettled(target.x) && this.springY.isSettled(target.y);
  }
}

// Magnetic hover effect hook
export const useMagneticHover = (
  strength: number = PHYSICS_CONSTANTS.MAGNETIC_STRENGTH,
  radius: number = PHYSICS_CONSTANTS.MAGNETIC_RADIUS
) => {
  const elementRef = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState('translate3d(0px, 0px, 0px) scale(1)');
  const springRef = useRef(new LegacySpringPhysics());
  const animationRef = useRef<number>();

  const animate = useCallback(() => {
    const position = springRef.current.update();
    setTransform(`translate3d(${position.x}px, ${position.y}px, 0px) scale(${1 + Math.abs(position.x + position.y) * 0.0001})`);

    if (!springRef.current.isAtRest()) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const distance = Math.sqrt(
      Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
    );

    if (distance < radius) {
      const force = Math.max(0, 1 - distance / radius);
      const deltaX = (mouseX - centerX) * strength * force;
      const deltaY = (mouseY - centerY) * strength * force;
      
      springRef.current.setTarget(deltaX, deltaY);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [strength, radius, animate]);

  const handleMouseLeave = useCallback(() => {
    springRef.current.setTarget(0, 0);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(animate);
  }, [animate]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleMouseMove, handleMouseLeave]);

  return { elementRef, transform };
};

// Repulsion effect between elements
export const useRepulsionEffect = (
  elements: HTMLElement[],
  repulsionStrength: number = 50
) => {
  const [positions, setPositions] = useState<Vector2D[]>([]);

  useEffect(() => {
    if (elements.length === 0) return;

    const updatePositions = () => {
      const newPositions = elements.map((element, index) => {
        if (!element) return new Vector2D(0, 0);

        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        let totalForceX = 0;
        let totalForceY = 0;

        elements.forEach((otherElement, otherIndex) => {
          if (index === otherIndex || !otherElement) return;

          const otherRect = otherElement.getBoundingClientRect();
          const otherCenterX = otherRect.left + otherRect.width / 2;
          const otherCenterY = otherRect.top + otherRect.height / 2;

          const distance = Math.sqrt(
            Math.pow(centerX - otherCenterX, 2) + Math.pow(centerY - otherCenterY, 2)
          );

          if (distance < PHYSICS_CONSTANTS.REPULSION_DISTANCE && distance > 0) {
            const force = repulsionStrength / (distance * distance);
            const directionX = (centerX - otherCenterX) / distance;
            const directionY = (centerY - otherCenterY) / distance;

            totalForceX += directionX * force;
            totalForceY += directionY * force;
          }
        });

        return new Vector2D(totalForceX, totalForceY);
      });

      setPositions(newPositions);
    };

    const interval = setInterval(updatePositions, 16); // ~60fps
    return () => clearInterval(interval);
  }, [elements, repulsionStrength]);

  return positions;
};

// Fluid morphing transition utility
export const createFluidMorph = (
  fromElement: HTMLElement,
  toElement: HTMLElement,
  duration: number = 500
) => {
  const fromRect = fromElement.getBoundingClientRect();
  const toRect = toElement.getBoundingClientRect();

  const deltaX = toRect.left - fromRect.left;
  const deltaY = toRect.top - fromRect.top;

  return {
    initial: {
      x: 0,
      y: 0,
      width: fromRect.width,
      height: fromRect.height,
      borderRadius: getComputedStyle(fromElement).borderRadius
    },
    animate: {
      x: deltaX,
      y: deltaY,
      width: toRect.width,
      height: toRect.height,
      borderRadius: getComputedStyle(toElement).borderRadius
    },
    transition: {
      duration: duration / 1000,
      ease: [PHYSICS_CONSTANTS.FLUID_TENSION, 0, 1 - PHYSICS_CONSTANTS.FLUID_TENSION, 1]
    }
  };
};

// Glass ripple effect
export const createGlassRipple = (
  element: HTMLElement,
  x: number,
  y: number,
  color: string = 'rgba(255, 255, 255, 0.3)'
) => {
  const ripple = document.createElement('div');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);

  // Set ripple styles
  ripple.style.position = 'absolute';
  ripple.style.borderRadius = '50%';
  ripple.style.background = color;
  ripple.style.pointerEvents = 'none';
  ripple.style.width = '0px';
  ripple.style.height = '0px';
  ripple.style.left = `${x - rect.left}px`;
  ripple.style.top = `${y - rect.top}px`;
  ripple.style.opacity = '1';
  ripple.style.transition = 'width 0.6s ease-out, height 0.6s ease-out, opacity 0.6s ease-out';
  ripple.style.transform = 'translate(-50%, -50%)';

  // Add to element
  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(ripple);

  // Animate
  requestAnimationFrame(() => {
    ripple.style.width = `${size * 2}px`;
    ripple.style.height = `${size * 2}px`;
    ripple.style.opacity = '0';
  });

  // Clean up
  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  }, 600);

  return ripple;
};

// Fluid dynamics configuration
export interface FluidConfig {
  viscosity: number;
  density: number;
  pressure: number;
  temperature?: number;
}

// Fluid particle
export class FluidParticle {
  position: Vector2D;
  velocity: Vector2D;
  density: number;
  pressure: number;
  
  constructor(position: Vector2D) {
    this.position = position;
    this.velocity = new Vector2D();
    this.density = 0;
    this.pressure = 0;
  }
}

// Simplified fluid simulation
export class FluidSimulation {
  private particles: FluidParticle[] = [];
  private config: FluidConfig;
  private smoothingRadius: number;
  private restDensity: number;
  private pressureConstant: number;
  
  constructor(config: FluidConfig, particleCount: number, bounds: { width: number; height: number }) {
    this.config = config;
    this.smoothingRadius = 20;
    this.restDensity = config.density;
    this.pressureConstant = 200;
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const position = new Vector2D(
        Math.random() * bounds.width,
        Math.random() * bounds.height
      );
      this.particles.push(new FluidParticle(position));
    }
  }
  
  update(deltaTime: number, forces: Vector2D[] = []) {
    // Calculate densities and pressures
    this.calculateDensityPressure();
    
    // Calculate forces
    const particleForces = this.particles.map(() => new Vector2D());
    
    // Add pressure forces
    this.calculatePressureForces(particleForces);
    
    // Add viscosity forces
    this.calculateViscosityForces(particleForces);
    
    // Add external forces
    forces.forEach(force => {
      particleForces.forEach(pf => {
        pf.x += force.x;
        pf.y += force.y;
      });
    });
    
    // Update particles
    this.particles.forEach((particle, i) => {
      // Update velocity
      particle.velocity = particle.velocity.add(
        particleForces[i].multiply(deltaTime / particle.density)
      );
      
      // Update position
      particle.position = particle.position.add(
        particle.velocity.multiply(deltaTime)
      );
      
      // Apply boundaries
      this.applyBoundaries(particle);
    });
  }
  
  private calculateDensityPressure() {
    this.particles.forEach(particle => {
      particle.density = 0;
      
      this.particles.forEach(neighbor => {
        const distance = particle.position.distance(neighbor.position);
        
        if (distance < this.smoothingRadius) {
          const influence = this.smoothingKernel(distance);
          particle.density += influence;
        }
      });
      
      particle.pressure = this.pressureConstant * (particle.density - this.restDensity);
    });
  }
  
  private calculatePressureForces(forces: Vector2D[]) {
    this.particles.forEach((particle, i) => {
      const force = new Vector2D();
      
      this.particles.forEach((neighbor, j) => {
        if (i === j) return;
        
        const delta = particle.position.subtract(neighbor.position);
        const distance = delta.magnitude();
        
        if (distance < this.smoothingRadius && distance > 0) {
          const pressure = (particle.pressure + neighbor.pressure) / 2;
          const direction = delta.normalize();
          const gradient = this.smoothingKernelGradient(distance);
          
          force.x += direction.x * pressure * gradient / neighbor.density;
          force.y += direction.y * pressure * gradient / neighbor.density;
        }
      });
      
      forces[i] = forces[i].add(force);
    });
  }
  
  private calculateViscosityForces(forces: Vector2D[]) {
    const viscosity = this.config.viscosity;
    
    this.particles.forEach((particle, i) => {
      const force = new Vector2D();
      
      this.particles.forEach((neighbor, j) => {
        if (i === j) return;
        
        const distance = particle.position.distance(neighbor.position);
        
        if (distance < this.smoothingRadius) {
          const velocityDiff = neighbor.velocity.subtract(particle.velocity);
          const laplacian = this.smoothingKernelLaplacian(distance);
          
          force.x += viscosity * velocityDiff.x * laplacian / neighbor.density;
          force.y += viscosity * velocityDiff.y * laplacian / neighbor.density;
        }
      });
      
      forces[i] = forces[i].add(force);
    });
  }
  
  private smoothingKernel(distance: number): number {
    if (distance >= this.smoothingRadius) return 0;
    
    const x = 1 - distance / this.smoothingRadius;
    return x * x * x;
  }
  
  private smoothingKernelGradient(distance: number): number {
    if (distance >= this.smoothingRadius) return 0;
    
    const x = 1 - distance / this.smoothingRadius;
    return -3 * x * x / this.smoothingRadius;
  }
  
  private smoothingKernelLaplacian(distance: number): number {
    if (distance >= this.smoothingRadius) return 0;
    
    const x = 1 - distance / this.smoothingRadius;
    return 6 * x / (this.smoothingRadius * this.smoothingRadius);
  }
  
  private applyBoundaries(particle: FluidParticle) {
    const damping = 0.8;
    const margin = 10;
    
    // Implement boundary conditions (example with window bounds)
    if (particle.position.x < margin) {
      particle.position.x = margin;
      particle.velocity.x *= -damping;
    }
    if (particle.position.y < margin) {
      particle.position.y = margin;
      particle.velocity.y *= -damping;
    }
    
    // Add max bounds based on container
  }
  
  getParticles(): FluidParticle[] {
    return this.particles;
  }
}

// Particle system configuration
export interface ParticleConfig {
  position: Vector2D;
  velocity?: Vector2D;
  acceleration?: Vector2D;
  lifespan?: number;
  size?: number;
  color?: string;
  mass?: number;
}

// Particle class
export class Particle {
  position: Vector2D;
  velocity: Vector2D;
  acceleration: Vector2D;
  lifespan: number;
  maxLifespan: number;
  size: number;
  color: string;
  mass: number;
  
  constructor(config: ParticleConfig) {
    this.position = config.position.clone();
    this.velocity = config.velocity?.clone() || new Vector2D();
    this.acceleration = config.acceleration?.clone() || new Vector2D();
    this.lifespan = config.lifespan || 1000;
    this.maxLifespan = this.lifespan;
    this.size = config.size || 5;
    this.color = config.color || '#ffffff';
    this.mass = config.mass || 1;
  }
  
  update(deltaTime: number) {
    // Update velocity
    this.velocity = this.velocity.add(this.acceleration.multiply(deltaTime));
    
    // Update position
    this.position = this.position.add(this.velocity.multiply(deltaTime));
    
    // Update lifespan
    this.lifespan -= deltaTime * 1000;
  }
  
  applyForce(force: Vector2D) {
    const f = force.divide(this.mass);
    this.acceleration = this.acceleration.add(f);
  }
  
  isDead(): boolean {
    return this.lifespan <= 0;
  }
  
  getOpacity(): number {
    return Math.max(0, this.lifespan / this.maxLifespan);
  }
}

// Particle emitter configuration
export interface EmitterConfig {
  position: Vector2D;
  rate: number;
  particleConfig: Partial<ParticleConfig>;
  spread?: number;
  emitDirection?: Vector2D;
  emitSpeed?: number;
  emitSpeedVariance?: number;
}

// Particle emitter
export class ParticleEmitter {
  private config: EmitterConfig;
  private particles: Particle[] = [];
  private emitAccumulator: number = 0;
  private forces: Vector2D[] = [];
  
  constructor(config: EmitterConfig) {
    this.config = config;
  }
  
  update(deltaTime: number) {
    // Emit new particles
    this.emitAccumulator += deltaTime * this.config.rate;
    
    while (this.emitAccumulator >= 1) {
      this.emit();
      this.emitAccumulator -= 1;
    }
    
    // Update existing particles
    this.particles = this.particles.filter(particle => {
      // Reset acceleration
      particle.acceleration = new Vector2D();
      
      // Apply forces
      this.forces.forEach(force => particle.applyForce(force));
      
      // Update particle
      particle.update(deltaTime);
      
      // Remove dead particles
      return !particle.isDead();
    });
  }
  
  private emit() {
    const spread = this.config.spread || Math.PI / 4;
    const direction = this.config.emitDirection || new Vector2D(0, -1);
    const speed = this.config.emitSpeed || 100;
    const speedVariance = this.config.emitSpeedVariance || speed * 0.2;
    
    // Calculate emission angle
    const angle = direction.angle() + (Math.random() - 0.5) * spread;
    
    // Calculate emission speed
    const emitSpeed = speed + (Math.random() - 0.5) * speedVariance;
    
    // Create velocity vector
    const velocity = new Vector2D(
      Math.cos(angle) * emitSpeed,
      Math.sin(angle) * emitSpeed
    );
    
    // Create particle
    const particle = new Particle({
      ...this.config.particleConfig,
      position: this.config.position.clone(),
      velocity
    });
    
    this.particles.push(particle);
  }
  
  addForce(force: Vector2D) {
    this.forces.push(force);
  }
  
  removeForce(force: Vector2D) {
    const index = this.forces.indexOf(force);
    if (index > -1) {
      this.forces.splice(index, 1);
    }
  }
  
  getParticles(): Particle[] {
    return this.particles;
  }
  
  setPosition(position: Vector2D) {
    this.config.position = position;
  }
  
  setRate(rate: number) {
    this.config.rate = rate;
  }
}

// Physics world for managing multiple systems
export class PhysicsWorld {
  private springs: Map<string, SpringPhysics | Spring2D> = new Map();
  private emitters: Map<string, ParticleEmitter> = new Map();
  private fluids: Map<string, FluidSimulation> = new Map();
  private lastTime: number = 0;
  private running: boolean = false;
  private rafId: number | null = null;
  
  // Global forces
  gravity: Vector2D = new Vector2D(0, 98);
  wind: Vector2D = new Vector2D(0, 0);
  
  addSpring(id: string, spring: SpringPhysics | Spring2D) {
    this.springs.set(id, spring);
  }
  
  addEmitter(id: string, emitter: ParticleEmitter) {
    this.emitters.set(id, emitter);
  }
  
  addFluid(id: string, fluid: FluidSimulation) {
    this.fluids.set(id, fluid);
  }
  
  remove(id: string) {
    this.springs.delete(id);
    this.emitters.delete(id);
    this.fluids.delete(id);
  }
  
  start() {
    if (this.running) return;
    
    this.running = true;
    this.lastTime = performance.now();
    this.update();
  }
  
  stop() {
    this.running = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
  
  private update() {
    if (!this.running) return;
    
    const currentTime = performance.now();
    const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.1); // Cap at 100ms
    this.lastTime = currentTime;
    
    // Update all systems
    this.emitters.forEach(emitter => {
      emitter.addForce(this.gravity);
      emitter.addForce(this.wind);
      emitter.update(deltaTime);
      emitter.removeForce(this.gravity);
      emitter.removeForce(this.wind);
    });
    
    this.fluids.forEach(fluid => {
      fluid.update(deltaTime, [this.gravity, this.wind]);
    });
    
    // Springs update themselves based on target
    
    this.rafId = requestAnimationFrame(() => this.update());
  }
  
  getSpring(id: string): SpringPhysics | Spring2D | undefined {
    return this.springs.get(id);
  }
  
  getEmitter(id: string): ParticleEmitter | undefined {
    return this.emitters.get(id);
  }
  
  getFluid(id: string): FluidSimulation | undefined {
    return this.fluids.get(id);
  }
}

// Global physics world instance
export const physicsWorld = new PhysicsWorld();
