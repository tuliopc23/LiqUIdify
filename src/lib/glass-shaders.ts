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

// Vertex shader for all effects
const VERTEX_SHADER = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  
  varying vec2 v_texCoord;
  
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`;

// Fragment shaders for different effects
export const GLASS_SHADERS = {
	// Liquid distortion effect
	liquidDistortion: `
    precision mediump float;
    
    uniform sampler2D u_texture;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_distortion;
    uniform float u_liquidness;
    
    varying vec2 v_texCoord;
    
    vec2 liquidDistort(vec2 uv, float time) {
      float dist = length(uv - u_mouse);
      float ripple = sin(dist * 20.0 - time * 4.0) * 0.02;
      ripple *= smoothstep(0.5, 0.0, dist) * u_liquidness;
      
      vec2 offset = vec2(
        sin(uv.y * 10.0 + time) * 0.01,
        cos(uv.x * 10.0 + time) * 0.01
      ) * u_distortion;
      
      return uv + offset + ripple * (uv - u_mouse);
    }
    
    void main() {
      vec2 uv = liquidDistort(v_texCoord, u_time);
      gl_FragColor = texture2D(u_texture, uv);
    }
  `,

	// Chromatic aberration effect
	chromaticAberration: `
    precision mediump float;
    
    uniform sampler2D u_texture;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform float u_chromaticAberration;
    
    varying vec2 v_texCoord;
    
    void main() {
      vec2 uv = v_texCoord;
      vec2 center = vec2(0.5, 0.5);
      vec2 offset = (uv - center) * u_chromaticAberration;
      
      float r = texture2D(u_texture, uv - offset).r;
      float g = texture2D(u_texture, uv).g;
      float b = texture2D(u_texture, uv + offset).b;
      float a = texture2D(u_texture, uv).a;
      
      gl_FragColor = vec4(r, g, b, a);
    }
  `,

	// Refraction effect
	refraction: `
    precision mediump float;
    
    uniform sampler2D u_texture;
    uniform sampler2D u_normalMap;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform float u_refraction;
    
    varying vec2 v_texCoord;
    
    void main() {
      vec2 uv = v_texCoord;
      vec3 normal = texture2D(u_normalMap, uv + u_time * 0.01).rgb * 2.0 - 1.0;
      
      vec2 refractedUV = uv + normal.xy * u_refraction;
      vec4 color = texture2D(u_texture, refractedUV);
      
      // Add glass tint
      color.rgb *= vec3(0.95, 0.97, 1.0);
      
      gl_FragColor = color;
    }
  `,

	// Holographic effect
	holographic: `
    precision mediump float;
    
    uniform sampler2D u_texture;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    
    varying vec2 v_texCoord;
    
    vec3 hueShift(vec3 color, float shift) {
      const vec3 k = vec3(0.57735, 0.57735, 0.57735);
      float cosAngle = cos(shift);
      return vec3(color * cosAngle + cross(k, color) * sin(shift) + k * dot(k, color) * (1.0 - cosAngle));
    }
    
    void main() {
      vec2 uv = v_texCoord;
      vec4 color = texture2D(u_texture, uv);
      
      // Holographic rainbow effect
      float angle = atan(uv.y - 0.5, uv.x - 0.5);
      float dist = length(uv - vec2(0.5));
      float holo = sin(angle * 10.0 + u_time * 2.0 + dist * 20.0) * 0.5 + 0.5;
      
      color.rgb = hueShift(color.rgb, holo * 6.28318);
      color.rgb += vec3(holo * 0.2);
      
      gl_FragColor = color;
    }
  `,

	// Frosted glass effect
	frostedGlass: `
    precision mediump float;
    
    uniform sampler2D u_texture;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform float u_noiseScale;
    
    varying vec2 v_texCoord;
    
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }
    
    void main() {
      vec2 uv = v_texCoord;
      vec4 color = vec4(0.0);
      
      // Multi-sample blur with noise
      const int samples = 9;
      float blur = u_noiseScale * 0.01;
      
      for(int i = 0; i < samples; i++) {
        vec2 offset = vec2(
          random(uv + float(i)) - 0.5,
          random(uv + float(i) + 100.0) - 0.5
        ) * blur;
        
        color += texture2D(u_texture, uv + offset);
      }
      
      color /= float(samples);
      
      // Add frost overlay
      float frost = random(uv * 100.0) * 0.05;
      color.rgb += vec3(frost);
      
      gl_FragColor = color;
    }
  `,

	// Iridescent effect
	iridescent: `
    precision mediump float;
    
    uniform sampler2D u_texture;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    
    varying vec2 v_texCoord;
    
    vec3 iridescence(float angle) {
      vec3 col;
      col.r = sin(angle * 2.0) * 0.5 + 0.5;
      col.g = sin(angle * 2.0 + 2.094) * 0.5 + 0.5;
      col.b = sin(angle * 2.0 + 4.188) * 0.5 + 0.5;
      return col;
    }
    
    void main() {
      vec2 uv = v_texCoord;
      vec4 color = texture2D(u_texture, uv);
      
      // Calculate view angle
      vec3 viewDir = normalize(vec3(u_mouse - uv, 1.0));
      vec3 normal = normalize(vec3(uv - 0.5, 0.5));
      float angle = dot(viewDir, normal);
      
      // Apply iridescence
      vec3 iriColor = iridescence(angle * 10.0 + u_time);
      color.rgb = mix(color.rgb, color.rgb * iriColor, 0.5);
      
      gl_FragColor = color;
    }
  `,

	// Parallax depth effect
	parallaxDepth: `
    precision mediump float;
    
    uniform sampler2D u_texture;
    uniform sampler2D u_depthMap;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    
    varying vec2 v_texCoord;
    
    void main() {
      vec2 uv = v_texCoord;
      float depth = texture2D(u_depthMap, uv).r;
      
      // Parallax offset based on mouse position
      vec2 parallax = (u_mouse - vec2(0.5)) * depth * 0.1;
      vec2 offsetUV = uv + parallax;
      
      vec4 color = texture2D(u_texture, offsetUV);
      
      // Add depth fog
      color.rgb = mix(color.rgb, vec3(0.9, 0.95, 1.0), depth * 0.3);
      
      gl_FragColor = color;
    }
  `,
};

// WebGL shader effect class
export class GlassShaderEffect {
	private gl: WebGLRenderingContext;
	private program: WebGLProgram | null = undefined;
	private uniforms: Map<string, WebGLUniformLocation> = new Map();
	private textures: Map<string, WebGLTexture> = new Map();
	private frameBuffer: WebGLFramebuffer | null = undefined;
	private renderTexture: WebGLTexture | null = undefined;
	private startTime: number;
	private animationId: number | null = undefined;

	constructor(
		private canvas: HTMLCanvasElement,
		private shaderType: keyof typeof GLASS_SHADERS,
	) {
		// SSR safety check
		if ("undefined" === typeof window) {
			throw new TypeError("GlassShaderEffect cannot be used during SSR");
		}

		const gl = canvas.getContext("webgl", {
			alpha: true,
			premultipliedAlpha: true,
			preserveDrawingBuffer: true,
		});

		if (!gl) {
			throw new Error("WebGL not supported");
		}

		this.gl = gl;
		this.startTime = Date.now();
		this.init();
	}

	private init() {
		// Create shader program
		const vertexShader = this.createShader(
			this.gl.VERTEX_SHADER,
			VERTEX_SHADER,
		);
		const fragmentShader = this.createShader(
			this.gl.FRAGMENT_SHADER,
			GLASS_SHADERS[this.shaderType],
		);

		if (!vertexShader || !fragmentShader) {
			throw new Error("Failed to create shaders");
		}

		this.program = this.createProgram(vertexShader, fragmentShader);
		if (!this.program) {
			throw new Error("Failed to create shader program");
		}

		// Set up geometry
		this.setupGeometry();

		// Get uniform locations
		this.setupUniforms();

		// Set up framebuffer for post-processing
		this.setupFramebuffer();
	}

	private createShader(type: number, source: string): WebGLShader | null {
		const shader = this.gl.createShader(type);
		if (!shader) {
			return;
		}

		this.gl.shaderSource(shader, source);
		this.gl.compileShader(shader);

		if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
			console.error(
				"Shader compilation error:",
				this.gl.getShaderInfoLog(shader),
			);
			this.gl.deleteShader(shader);
			return;
		}

		return shader;
	}

	private createProgram(
		vertexShader: WebGLShader,
		fragmentShader: WebGLShader,
	): WebGLProgram | null {
		const program = this.gl.createProgram();
		if (!program) {
			return;
		}

		this.gl.attachShader(program, vertexShader);
		this.gl.attachShader(program, fragmentShader);
		this.gl.linkProgram(program);

		if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
			console.error(
				"Program linking error:",
				this.gl.getProgramInfoLog(program),
			);
			this.gl.deleteProgram(program);
			return;
		}

		return program;
	}

	private setupGeometry() {
		if (!this.program) {
			return;
		}

		// Create a quad that covers the entire canvas
		const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);

		const texCoords = new Float32Array([0, 1, 1, 1, 0, 0, 1, 0]);

		// Position buffer
		const positionBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);

		const positionLoc = this.gl.getAttribLocation(this.program, "a_position");
		this.gl.enableVertexAttribArray(positionLoc);
		this.gl.vertexAttribPointer(positionLoc, 2, this.gl.FLOAT, false, 0, 0);

		// Texture coordinate buffer
		const texCoordBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, texCoordBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, texCoords, this.gl.STATIC_DRAW);

		const texCoordLoc = this.gl.getAttribLocation(this.program, "a_texCoord");
		this.gl.enableVertexAttribArray(texCoordLoc);
		this.gl.vertexAttribPointer(texCoordLoc, 2, this.gl.FLOAT, false, 0, 0);
	}

	private setupUniforms() {
		if (!this.program) {
			return;
		}

		const uniformNames = [
			"u_texture",
			"u_normalMap",
			"u_depthMap",
			"u_time",
			"u_resolution",
			"u_mouse",
			"u_distortion",
			"u_chromaticAberration",
			"u_refraction",
			"u_noiseScale",
			"u_liquidness",
		];

		uniformNames.forEach((name) => {
			const location = this.gl.getUniformLocation(this.program!, name);
			if (location) {
				this.uniforms.set(name, location);
			}
		});
	}

	private setupFramebuffer() {
		// Create framebuffer for rendering
		this.frameBuffer = this.gl.createFramebuffer();
		this.renderTexture = this.gl.createTexture();

		this.gl.bindTexture(this.gl.TEXTURE_2D, this.renderTexture);
		this.gl.texImage2D(
			this.gl.TEXTURE_2D,
			0,
			this.gl.RGBA,
			this.canvas.width,
			this.canvas.height,
			0,
			this.gl.RGBA,
			this.gl.UNSIGNED_BYTE,
			undefined,
		);

		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_MIN_FILTER,
			this.gl.LINEAR,
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_MAG_FILTER,
			this.gl.LINEAR,
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_WRAP_S,
			this.gl.CLAMP_TO_EDGE,
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_WRAP_T,
			this.gl.CLAMP_TO_EDGE,
		);

		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.frameBuffer);
		this.gl.framebufferTexture2D(
			this.gl.FRAMEBUFFER,
			this.gl.COLOR_ATTACHMENT0,
			this.gl.TEXTURE_2D,
			this.renderTexture,
			0,
		);
	}

	// Load texture from image or canvas
	loadTexture(
		name: string,
		source: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
	): void {
		const texture = this.gl.createTexture();
		if (!texture) {
			return;
		}

		this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
		this.gl.texImage2D(
			this.gl.TEXTURE_2D,
			0,
			this.gl.RGBA,
			this.gl.RGBA,
			this.gl.UNSIGNED_BYTE,
			source,
		);

		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_MIN_FILTER,
			this.gl.LINEAR,
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_MAG_FILTER,
			this.gl.LINEAR,
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_WRAP_S,
			this.gl.CLAMP_TO_EDGE,
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_WRAP_T,
			this.gl.CLAMP_TO_EDGE,
		);

		this.textures.set(name, texture);
	}

	// Update uniforms
	setUniforms(uniforms: Partial<ShaderUniforms>): void {
		if (!this.program) {
			return;
		}

		this.gl.useProgram(this.program);

		Object.entries(uniforms).forEach(([key, value]) => {
			const location = this.uniforms.get(`u_${key}`);
			if (!location) {
				return;
			}

			if ("number" === typeof value) {
				this.gl.uniform1f(location, value);
			} else if (Array.isArray(value) && 2 === value.length) {
				this.gl.uniform2fv(location, value);
			}
		});
	}

	// Render the effect
	render(uniforms?: Partial<ShaderUniforms>): void {
		if (!this.program) {
			return;
		}

		this.gl.useProgram(this.program);

		// Update time uniform
		const time = (Date.now() - this.startTime) / 1000;
		this.setUniforms({
			time,
			resolution: [this.canvas.width, this.canvas.height],
			...uniforms,
		});

		// Bind textures
		let textureUnit = 0;
		this.textures.forEach((texture, name) => {
			const location = this.uniforms.get(`u_${name}`);
			if (location) {
				this.gl.activeTexture(this.gl.TEXTURE0 + textureUnit);
				this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
				this.gl.uniform1i(location, textureUnit);
				textureUnit++;
			}
		});

		// Clear and draw
		this.gl.clearColor(0, 0, 0, 0);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
	}

	// Start animation loop
	animate(uniforms?: Partial<ShaderUniforms>): void {
		const loop = () => {
			this.render(uniforms);
			this.animationId = requestAnimationFrame(loop);
		};
		loop();
	}

	// Stop animation
	stop(): void {
		if (this.animationId) {
			cancelAnimationFrame(this.animationId);
			this.animationId = undefined;
		}
	}

	// Clean up resources
	destroy(): void {
		this.stop();

		if (this.program) {
			this.gl.deleteProgram(this.program);
		}

		this.textures.forEach((texture) => {
			this.gl.deleteTexture(texture);
		});

		if (this.frameBuffer) {
			this.gl.deleteFramebuffer(this.frameBuffer);
		}

		if (this.renderTexture) {
			this.gl.deleteTexture(this.renderTexture);
		}
	}
}

// Utility function to apply shader effect to an element
export function applyGlassShader(
	element: HTMLElement,
	shaderType: keyof typeof GLASS_SHADERS,
	config?: Partial<ShaderUniforms>,
): GlassShaderEffect | null {
	// SSR safety check
	if ("undefined" === typeof window || "undefined" === typeof document) {
		return;
	}

	// Create canvas overlay
	const canvas = document.createElement("canvas");
	const rect = element.getBoundingClientRect();

	canvas.width = rect.width * (window.devicePixelRatio || 1);
	canvas.height = rect.height * (window.devicePixelRatio || 1);
	canvas.style.position = "absolute";
	canvas.style.top = "0";
	canvas.style.left = "0";
	canvas.style.width = "100%";
	canvas.style.height = "100%";
	canvas.style.pointerEvents = "none";
	canvas.style.zIndex = "1";

	element.style.position = "relative";
	element.appendChild(canvas);

	try {
		const shader = new GlassShaderEffect(canvas, shaderType);

		// Capture element as texture
		const elementCanvas = document.createElement("canvas");
		elementCanvas.width = canvas.width;
		elementCanvas.height = canvas.height;
		const ctx = elementCanvas.getContext("2d");

		if (ctx) {
			// This is a simplified version - in production, you'd use html2canvas or similar
			ctx.fillStyle = getComputedStyle(element).backgroundColor || "white";
			ctx.fillRect(0, 0, elementCanvas.width, elementCanvas.height);
			shader.loadTexture("texture", elementCanvas);
		}

		shader.animate(config);
		return shader;
	} catch (error) {
		console.error("Failed to create shader effect:", error);
		canvas.remove();
		return;
	}
}

// Preset shader configurations
export const SHADER_PRESETS = {
	subtle: {
		distortion: 0.02,
		chromaticAberration: 0.005,
		refraction: 0.01,
		noiseScale: 5,
		liquidness: 0.3,
	},
	medium: {
		distortion: 0.05,
		chromaticAberration: 0.01,
		refraction: 0.02,
		noiseScale: 10,
		liquidness: 0.5,
	},
	intense: {
		distortion: 0.1,
		chromaticAberration: 0.02,
		refraction: 0.04,
		noiseScale: 20,
		liquidness: 0.8,
	},
	extreme: {
		distortion: 0.2,
		chromaticAberration: 0.04,
		refraction: 0.08,
		noiseScale: 40,
		liquidness: 1,
	},
};
