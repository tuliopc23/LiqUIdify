import { css } from "../../../../styled-system/css";

export function SkipToContentLink() {
  const skipLinkClass = css({
    position: "absolute",
    top: "-40px",
    left: "6px",
    background: "white",
    color: "black",
    padding: "8px",
    textDecoration: "none",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "bold",
    zIndex: 1000,
    border: "2px solid #0066cc",
    transition: "top 0.3s",
    
    "&:focus": {
      top: "6px",
    },
    
    "&:focus-visible": {
      outline: "2px solid #0066cc",
      outlineOffset: "2px",
    }
  });

  return (
    <a 
      href="#main-content" 
      className={skipLinkClass}
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  );
}
