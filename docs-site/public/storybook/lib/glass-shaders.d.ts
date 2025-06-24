/**
 * Glass Shaders - WebGL shader effects for Glass UI
 * Advanced visual effects including refraction, chromatic aberration, and liquid distortion
 */
export interface ShaderConfig {
    canvas?: HTMLCanvasElement;
    resolution?: [number, number];
    dpr?: number;
}
export interface ShaderUniforms {
    time: number;
    resolution: [number, number];
    mouse: [number, number];
    distortion?: number;
    chromaticAberration?: number;
    refraction?: number;
    noiseScale?: number;
    liquidness?: number;
}
export declare const GLASS_SHADERS: {
    liquidDistortion: string;
    chromaticAberration: string;
    refraction: string;
    holographic: string;
    frostedGlass: string;
    iridescent: string;
    parallaxDepth: string;
};
export declare class GlassShaderEffect {
    private canvas;
    private shaderType;
    private gl;
    private program;
    private uniforms;
    private attributes;
    private textures;
    private frameBuffer;
    private renderTexture;
    private startTime;
    private animationId;
    constructor(canvas: HTMLCanvasElement, shaderType: keyof typeof GLASS_SHADERS);
    private init;
    private createShader;
    private createProgram;
    private setupGeometry;
    private setupUniforms;
    private setupFramebuffer;
    loadTexture(name: string, source: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement): void;
    setUniforms(uniforms: Partial<ShaderUniforms>): void;
    render(uniforms?: Partial<ShaderUniforms>): void;
    animate(uniforms?: Partial<ShaderUniforms>): void;
    stop(): void;
    destroy(): void;
}
export declare function applyGlassShader(element: HTMLElement, shaderType: keyof typeof GLASS_SHADERS, config?: Partial<ShaderUniforms>): GlassShaderEffect | null;
export declare const SHADER_PRESETS: {
    subtle: {
        distortion: number;
        chromaticAberration: number;
        refraction: number;
        noiseScale: number;
        liquidness: number;
    };
    medium: {
        distortion: number;
        chromaticAberration: number;
        refraction: number;
        noiseScale: number;
        liquidness: number;
    };
    intense: {
        distortion: number;
        chromaticAberration: number;
        refraction: number;
        noiseScale: number;
        liquidness: number;
    };
    extreme: {
        distortion: number;
        chromaticAberration: number;
        refraction: number;
        noiseScale: number;
        liquidness: number;
    };
};
//# sourceMappingURL=glass-shaders.d.ts.map