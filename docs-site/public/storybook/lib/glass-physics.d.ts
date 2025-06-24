/**
 * Glass Physics - Physics engine for realistic motion
 * Spring physics, fluid dynamics, and particle systems
 */
export declare const PHYSICS_CONSTANTS: {
    SPRING_TENSION: number;
    SPRING_FRICTION: number;
    MAGNETIC_STRENGTH: number;
    MAGNETIC_RADIUS: number;
    REPULSION_DISTANCE: number;
    FLUID_TENSION: number;
};
export declare class Vector2D {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    static distance(a: Vector2D, b: Vector2D): number;
    static normalize(vector: Vector2D): Vector2D;
    static multiply(vector: Vector2D, scalar: number): Vector2D;
    static add(a: Vector2D, b: Vector2D): Vector2D;
    add(v: Vector2D): Vector2D;
    subtract(v: Vector2D): Vector2D;
    multiply(scalar: number): Vector2D;
    divide(scalar: number): Vector2D;
    magnitude(): number;
    normalize(): Vector2D;
    dot(v: Vector2D): number;
    distance(v: Vector2D): number;
    angle(): number;
    rotate(angle: number): Vector2D;
    clone(): Vector2D;
}
export interface SpringConfig {
    tension: number;
    friction: number;
    mass?: number;
    velocity?: number;
    precision?: number;
}
export declare const SPRING_PRESETS: {
    noWobble: {
        tension: number;
        friction: number;
    };
    gentle: {
        tension: number;
        friction: number;
    };
    wobbly: {
        tension: number;
        friction: number;
    };
    stiff: {
        tension: number;
        friction: number;
    };
    slow: {
        tension: number;
        friction: number;
    };
    molasses: {
        tension: number;
        friction: number;
    };
};
export declare class SpringPhysics {
    private position;
    private velocity;
    private tension;
    private friction;
    private mass;
    private precision;
    constructor(config: SpringConfig);
    update(target: number, deltaTime: number): number;
    setPosition(position: number): void;
    setVelocity(velocity: number): void;
    isSettled(target: number): boolean;
}
export declare class Spring2D {
    private springX;
    private springY;
    constructor(config: SpringConfig);
    update(target: Vector2D, deltaTime: number): Vector2D;
    setPosition(position: Vector2D): void;
    setVelocity(velocity: Vector2D): void;
    isSettled(target: Vector2D): boolean;
}
export declare const useMagneticHover: (strength?: number, radius?: number) => {
    elementRef: import('../../node_modules/react').RefObject<HTMLElement>;
    transform: string;
};
export declare const useRepulsionEffect: (elements: HTMLElement[], repulsionStrength?: number) => Vector2D[];
export declare const createFluidMorph: (fromElement: HTMLElement, toElement: HTMLElement, duration?: number) => {
    initial: {
        x: number;
        y: number;
        width: number;
        height: number;
        borderRadius: string;
    };
    animate: {
        x: number;
        y: number;
        width: number;
        height: number;
        borderRadius: string;
    };
    transition: {
        duration: number;
        ease: number[];
    };
};
export declare const createGlassRipple: (element: HTMLElement, x: number, y: number, color?: string) => HTMLDivElement;
export interface FluidConfig {
    viscosity: number;
    density: number;
    pressure: number;
    temperature?: number;
}
export declare class FluidParticle {
    position: Vector2D;
    velocity: Vector2D;
    density: number;
    pressure: number;
    constructor(position: Vector2D);
}
export declare class FluidSimulation {
    private particles;
    private config;
    private smoothingRadius;
    private restDensity;
    private pressureConstant;
    constructor(config: FluidConfig, particleCount: number, bounds: {
        width: number;
        height: number;
    });
    update(deltaTime: number, forces?: Vector2D[]): void;
    private calculateDensityPressure;
    private calculatePressureForces;
    private calculateViscosityForces;
    private smoothingKernel;
    private smoothingKernelGradient;
    private smoothingKernelLaplacian;
    private applyBoundaries;
    getParticles(): FluidParticle[];
}
export interface ParticleConfig {
    position: Vector2D;
    velocity?: Vector2D;
    acceleration?: Vector2D;
    lifespan?: number;
    size?: number;
    color?: string;
    mass?: number;
}
export declare class Particle {
    position: Vector2D;
    velocity: Vector2D;
    acceleration: Vector2D;
    lifespan: number;
    maxLifespan: number;
    size: number;
    color: string;
    mass: number;
    constructor(config: ParticleConfig);
    update(deltaTime: number): void;
    applyForce(force: Vector2D): void;
    isDead(): boolean;
    getOpacity(): number;
}
export interface EmitterConfig {
    position: Vector2D;
    rate: number;
    particleConfig: Partial<ParticleConfig>;
    spread?: number;
    emitDirection?: Vector2D;
    emitSpeed?: number;
    emitSpeedVariance?: number;
}
export declare class ParticleEmitter {
    private config;
    private particles;
    private emitAccumulator;
    private forces;
    constructor(config: EmitterConfig);
    update(deltaTime: number): void;
    private emit;
    addForce(force: Vector2D): void;
    removeForce(force: Vector2D): void;
    getParticles(): Particle[];
    setPosition(position: Vector2D): void;
    setRate(rate: number): void;
}
export declare class PhysicsWorld {
    private springs;
    private emitters;
    private fluids;
    private lastTime;
    private running;
    private rafId;
    gravity: Vector2D;
    wind: Vector2D;
    addSpring(id: string, spring: SpringPhysics | Spring2D): void;
    addEmitter(id: string, emitter: ParticleEmitter): void;
    addFluid(id: string, fluid: FluidSimulation): void;
    remove(id: string): void;
    start(): void;
    stop(): void;
    private update;
    getSpring(id: string): SpringPhysics | Spring2D | undefined;
    getEmitter(id: string): ParticleEmitter | undefined;
    getFluid(id: string): FluidSimulation | undefined;
}
export declare const physicsWorld: PhysicsWorld;
//# sourceMappingURL=glass-physics.d.ts.map