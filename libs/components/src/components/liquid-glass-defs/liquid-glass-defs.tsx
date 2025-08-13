import { useEffect, useId } from "react";

/**
 * LiquidGlassDefs injects SVG filter <defs> once per document.
 * It ensures filters with fixed IDs are available for CSS filter: url(#id).
 */
export function LiquidGlassDefs() {
  const id = useId();

  useEffect(() => {
    if (typeof document === "undefined") return;
    const MARK = "data-liquid-glass-defs";
    if (document.querySelector(`svg[${MARK}]`)) return;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.setAttribute(
      "style",
      "position:absolute;width:0;height:0;overflow:hidden",
    );
    svg.setAttribute(MARK, "");

    // Inline core filters (IDs must match CSS references)
    svg.innerHTML = `
      <defs>
        <filter id="liquid-glass-distortion">
          <feTurbulence type="turbulence" baseFrequency="0.01" numOctaves="2" seed="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="liquid-glass-refraction">
          <feTurbulence type="fractalNoise" baseFrequency="0.002" numOctaves="3" seed="7" result="f" />
          <feDisplacementMap in="SourceGraphic" in2="f" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="liquid-glass-chromatic">
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="orig"/>
          <feGaussianBlur stdDeviation="0.6" in="orig" result="blur"/>
          <feBlend in="orig" in2="blur" mode="screen"/>
        </filter>
        <filter id="liquid-glass-edge">
          <feSpecularLighting result="spec" specularExponent="20" lighting-color="#ffffff">
            <fePointLight x="-5000" y="-10000" z="20000" />
          </feSpecularLighting>
          <feComposite in2="SourceAlpha" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="liquid-glass-mobile">
          <feGaussianBlur stdDeviation="0.8" />
        </filter>
        <filter id="liquid-glass-ripple">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.03" numOctaves="1" seed="3" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3"/>
        </filter>
        <filter id="liquid-glass-depth">
          <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="rgba(0,0,0,0.2)"/>
        </filter>
        <filter id="liquid-glass-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.04"/>
          </feComponentTransfer>
        </filter>
        <filter id="liquid-glass-specular">
          <feSpecularLighting surfaceScale="1" specularConstant="0.75" specularExponent="16" lighting-color="#ffffff">
            <fePointLight x="-200" y="-100" z="200" />
          </feSpecularLighting>
        </filter>
      </defs>`;

    document.body.appendChild(svg);
  }, [id]);

  return null;
}

export default LiquidGlassDefs;
