/**
 * Enhanced Apple Liquid Glass SVG Filters Component
 * Advanced SVG filter definitions for pixel-perfect liquid glass distortion effects
 * Requirements: 6.1, 6.3 - Advanced SVG filters for authentic liquid glass distortion
 */

import { memo } from "react";

export interface LiquidGlassSvgFiltersProps {
	className?: string;
	enableAdvancedFilters?: boolean;
}

/**
 * Enhanced SVG filter definitions for liquid glass effects
 * Pixel-perfect distortion effects with Apple-quality visual fidelity
 */
export const LiquidGlassSvgFilters = memo(function LiquidGlassSvgFilters({
	className = "enhanced-liquid-svg-defs",
	enableAdvancedFilters = true,
}: LiquidGlassSvgFiltersProps) {
	return (
		<svg
			className={className}
			style={{
				position: "absolute",
				width: 0,
				height: 0,
				overflow: "hidden",
			}}
			aria-hidden="true"
		>
			<defs>
				{/* Liquid Lens Filter - Creates distortion effect */}
				<filter id="liquid-lens" x="-50%" y="-50%" width="200%" height="200%">
					<feImage
						x="0"
						y="0"
						result="normalMap"
						xlinkHref="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><radialGradient id='nmap' cx='50%' cy='50%' r='50%'><stop offset='0%' stop-color='rgb(128,128,255)'/><stop offset='100%' stop-color='rgb(255,255,255)'/></radialGradient><rect width='100%' height='100%' fill='url(%23nmap)'/></svg>"
					/>
					<feDisplacementMap
						in="SourceGraphic"
						in2="normalMap"
						scale="60"
						xChannelSelector="R"
						yChannelSelector="G"
						result="displaced"
					/>
					<feMerge>
						<feMergeNode in="displaced" />
					</feMerge>
				</filter>

				{/* Liquid Distortion Filter - Creates turbulence effect */}
				<filter id="liquid-distortion" x="0%" y="0%" width="100%" height="100%">
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.008 0.008"
						numOctaves="2"
						seed="92"
						result="noise"
					/>
					<feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
					<feDisplacementMap
						in="SourceGraphic"
						in2="blurred"
						scale="70"
						xChannelSelector="R"
						yChannelSelector="G"
					/>
				</filter>

				{/* Subtle Liquid Effect - Light distortion */}
				<filter id="liquid-subtle" x="0%" y="0%" width="100%" height="100%">
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.004 0.004"
						numOctaves="1"
						seed="42"
						result="noise"
					/>
					<feGaussianBlur in="noise" stdDeviation="1" result="blurred" />
					<feDisplacementMap
						in="SourceGraphic"
						in2="blurred"
						scale="30"
						xChannelSelector="R"
						yChannelSelector="G"
					/>
				</filter>

				{/* Strong Liquid Effect - Heavy distortion */}
				<filter id="liquid-strong" x="0%" y="0%" width="100%" height="100%">
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.012 0.012"
						numOctaves="3"
						seed="123"
						result="noise"
					/>
					<feGaussianBlur in="noise" stdDeviation="3" result="blurred" />
					<feDisplacementMap
						in="SourceGraphic"
						in2="blurred"
						scale="100"
						xChannelSelector="R"
						yChannelSelector="G"
					/>
				</filter>

				{/* Liquid Glow Filter - Adds luminous effect */}
				<filter id="liquid-glow" x="-50%" y="-50%" width="200%" height="200%">
					<feGaussianBlur stdDeviation="3" result="coloredBlur" />
					<feMerge>
						<feMergeNode in="coloredBlur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>

				{/* Liquid Shimmer Filter - Animated highlight effect */}
				<filter
					id="liquid-shimmer"
					x="-50%"
					y="-50%"
					width="200%"
					height="200%"
				>
					<feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
					<feSpecularLighting
						in="blur"
						specularConstant="1.5"
						specularExponent="20"
						lighting-color="white"
						result="specOut"
					>
						<fePointLight x="50" y="50" z="100" />
					</feSpecularLighting>
					<feComposite
						in="specOut"
						in2="SourceAlpha"
						operator="in"
						result="specOut2"
					/>
					<feComposite
						in="SourceGraphic"
						in2="specOut2"
						operator="arithmetic"
						k1="0"
						k2="1"
						k3="1"
						k4="0"
					/>
				</filter>

				{enableAdvancedFilters && (
					<>
						{/* Enhanced Liquid Lens - Pixel-perfect distortion with depth */}
						<filter
							id="enhanced-liquid-lens"
							x="-100%"
							y="-100%"
							width="300%"
							height="300%"
						>
							<feImage
								x="0"
								y="0"
								result="depthMap"
								xlinkHref="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><defs><radialGradient id='depth' cx='50%' cy='50%' r='50%'><stop offset='0%' stop-color='rgb(100,100,255)'/><stop offset='30%' stop-color='rgb(128,128,255)'/><stop offset='70%' stop-color='rgb(200,200,255)'/><stop offset='100%' stop-color='rgb(255,255,255)'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23depth)'/></svg>"
							/>
							<feDisplacementMap
								in="SourceGraphic"
								in2="depthMap"
								scale="80"
								xChannelSelector="R"
								yChannelSelector="G"
								result="displaced"
							/>
							<feGaussianBlur
								in="displaced"
								stdDeviation="0.5"
								result="softened"
							/>
							<feMerge>
								<feMergeNode in="softened" />
							</feMerge>
						</filter>

						{/* Liquid Refraction - Advanced light bending effect */}
						<filter
							id="liquid-refraction"
							x="-50%"
							y="-50%"
							width="200%"
							height="200%"
						>
							<feTurbulence
								type="fractalNoise"
								baseFrequency="0.006 0.006"
								numOctaves="4"
								seed="156"
								result="refractNoise"
							/>
							<feDisplacementMap
								in="SourceGraphic"
								in2="refractNoise"
								scale="45"
								xChannelSelector="R"
								yChannelSelector="G"
								result="refracted"
							/>
							<feGaussianBlur
								in="refracted"
								stdDeviation="0.8"
								result="blurredRefract"
							/>
							<feColorMatrix
								in="blurredRefract"
								type="matrix"
								values="1.1 0 0 0 0.05
                        0 1.1 0 0 0.05
                        0 0 1.2 0 0.1
                        0 0 0 1 0"
								result="enhanced"
							/>
							<feMerge>
								<feMergeNode in="enhanced" />
							</feMerge>
						</filter>

						{/* Liquid Caustics - Realistic water caustic patterns */}
						<filter
							id="liquid-caustics"
							x="-50%"
							y="-50%"
							width="200%"
							height="200%"
						>
							<feTurbulence
								type="turbulence"
								baseFrequency="0.02 0.02"
								numOctaves="3"
								seed="789"
								result="causticNoise"
							/>
							<feColorMatrix
								in="causticNoise"
								type="matrix"
								values="0 0 0 0 0
                        0 0 0 0 0
                        0 0 0 0 0
                        0 0 0 1 0"
								result="alpha"
							/>
							<feComponentTransfer in="alpha" result="causticPattern">
								<feFuncA
									type="discrete"
									tableValues="0 0.2 0.5 0.8 1 0.8 0.5 0.2 0"
								/>
							</feComponentTransfer>
							<feComposite
								in="SourceGraphic"
								in2="causticPattern"
								operator="screen"
								result="causticEffect"
							/>
							<feGaussianBlur in="causticEffect" stdDeviation="1" />
						</filter>

						{/* Liquid Depth - Multi-layer depth perception */}
						<filter
							id="liquid-depth"
							x="-50%"
							y="-50%"
							width="200%"
							height="200%"
						>
							<feGaussianBlur
								in="SourceGraphic"
								stdDeviation="2"
								result="layer1"
							/>
							<feOffset in="layer1" dx="1" dy="1" result="offset1" />
							<feGaussianBlur
								in="SourceGraphic"
								stdDeviation="4"
								result="layer2"
							/>
							<feOffset in="layer2" dx="2" dy="2" result="offset2" />
							<feGaussianBlur
								in="SourceGraphic"
								stdDeviation="6"
								result="layer3"
							/>
							<feOffset in="layer3" dx="3" dy="3" result="offset3" />
							<feMerge>
								<feMergeNode in="offset3" />
								<feMergeNode in="offset2" />
								<feMergeNode in="offset1" />
								<feMergeNode in="SourceGraphic" />
							</feMerge>
						</filter>

						{/* Liquid Prism - Chromatic aberration effect */}
						<filter
							id="liquid-prism"
							x="-50%"
							y="-50%"
							width="200%"
							height="200%"
						>
							<feOffset in="SourceGraphic" dx="1" dy="0" result="redShift" />
							<feOffset in="SourceGraphic" dx="-1" dy="0" result="blueShift" />
							<feComponentTransfer in="redShift" result="red">
								<feFuncR type="identity" />
								<feFuncG type="discrete" tableValues="0" />
								<feFuncB type="discrete" tableValues="0" />
								<feFuncA type="identity" />
							</feComponentTransfer>
							<feComponentTransfer in="blueShift" result="blue">
								<feFuncR type="discrete" tableValues="0" />
								<feFuncG type="discrete" tableValues="0" />
								<feFuncB type="identity" />
								<feFuncA type="identity" />
							</feComponentTransfer>
							<feComponentTransfer in="SourceGraphic" result="green">
								<feFuncR type="discrete" tableValues="0" />
								<feFuncG type="identity" />
								<feFuncB type="discrete" tableValues="0" />
								<feFuncA type="identity" />
							</feComponentTransfer>
							<feMerge>
								<feMergeNode in="red" />
								<feMergeNode in="green" />
								<feMergeNode in="blue" />
							</feMerge>
						</filter>

						{/* Liquid Surface - Realistic surface tension effect */}
						<filter
							id="liquid-surface"
							x="-50%"
							y="-50%"
							width="200%"
							height="200%"
						>
							<feTurbulence
								type="fractalNoise"
								baseFrequency="0.01 0.01"
								numOctaves="2"
								seed="321"
								result="surfaceNoise"
							/>
							<feDisplacementMap
								in="SourceGraphic"
								in2="surfaceNoise"
								scale="25"
								xChannelSelector="R"
								yChannelSelector="G"
								result="surfaceDistort"
							/>
							<feSpecularLighting
								in="surfaceDistort"
								specularConstant="2"
								specularExponent="30"
								lighting-color="rgba(255,255,255,0.8)"
								result="surfaceHighlight"
							>
								<fePointLight x="100" y="100" z="200" />
							</feSpecularLighting>
							<feComposite
								in="surfaceDistort"
								in2="surfaceHighlight"
								operator="screen"
							/>
						</filter>

						{/* Extreme Liquid Effect - Maximum distortion for dramatic effect */}
						<filter
							id="liquid-extreme"
							x="-100%"
							y="-100%"
							width="300%"
							height="300%"
						>
							<feTurbulence
								type="fractalNoise"
								baseFrequency="0.015 0.015"
								numOctaves="4"
								seed="999"
								result="extremeNoise"
							/>
							<feGaussianBlur
								in="extremeNoise"
								stdDeviation="4"
								result="extremeBlurred"
							/>
							<feDisplacementMap
								in="SourceGraphic"
								in2="extremeBlurred"
								scale="120"
								xChannelSelector="R"
								yChannelSelector="G"
								result="extremeDistorted"
							/>
							<feColorMatrix
								in="extremeDistorted"
								type="matrix"
								values="1.2 0 0 0 0.1
                        0 1.2 0 0 0.1
                        0 0 1.3 0 0.15
                        0 0 0 1 0"
							/>
						</filter>
					</>
				)}
			</defs>
		</svg>
	);
});

export default LiquidGlassSvgFilters;
