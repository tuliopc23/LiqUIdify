import { Button } from "./Button";

function App() {
  const handleClick = (variant: string) => {
    console.log(`${variant} button clicked!`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "32px",
        padding: "40px",
      }}
    >
      <h1
        style={{
          color: "white",
          fontSize: "32px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Liquid Glass Button Test
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          alignItems: "center",
          justifyItems: "center",
          width: "100%",
          maxWidth: "800px",
        }}
      >
        <h2
          style={{
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "24px",
            gridColumn: "1 / -1",
            textAlign: "center",
            margin: "20px 0",
          }}
        >
          Variants
        </h2>

        <Button variant="primary" onClick={() => handleClick("primary")}>
          Primary
        </Button>

        <Button variant="secondary" onClick={() => handleClick("secondary")}>
          Secondary
        </Button>

        <Button variant="ghost" onClick={() => handleClick("ghost")}>
          Ghost
        </Button>

        <Button variant="danger" onClick={() => handleClick("danger")}>
          Danger
        </Button>

        <h2
          style={{
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "24px",
            gridColumn: "1 / -1",
            textAlign: "center",
            margin: "20px 0",
          }}
        >
          Sizes
        </h2>

        <Button variant="primary" size="sm" onClick={() => handleClick("small")}>
          Small
        </Button>

        <Button variant="primary" size="md" onClick={() => handleClick("medium")}>
          Medium
        </Button>

        <Button variant="primary" size="lg" onClick={() => handleClick("large")}>
          Large
        </Button>

        <Button variant="primary" size="xl" onClick={() => handleClick("extra large")}>
          Extra Large
        </Button>

        <h2
          style={{
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "24px",
            gridColumn: "1 / -1",
            textAlign: "center",
            margin: "20px 0",
          }}
        >
          States
        </h2>

        <Button variant="primary" onClick={() => handleClick("normal")}>
          Normal
        </Button>

        <Button variant="primary" loading={true} onClick={() => handleClick("loading")}>
          Loading
        </Button>

        <Button variant="primary" disabled={true} onClick={() => handleClick("disabled")}>
          Disabled
        </Button>

        <h2
          style={{
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "24px",
            gridColumn: "1 / -1",
            textAlign: "center",
            margin: "20px 0",
          }}
        >
          Effects
        </h2>

        <Button
          variant="primary"
          size="lg"
          rippleEffect={true}
          onClick={() => handleClick("ripple")}
        >
          With Ripple
        </Button>

        <Button
          variant="primary"
          size="lg"
          rippleEffect={false}
          onClick={() => handleClick("no ripple")}
        >
          No Ripple
        </Button>
      </div>

      <p
        style={{
          color: "rgba(255, 255, 255, 0.6)",
          textAlign: "center",
          marginTop: "40px",
          fontSize: "16px",
        }}
      >
        Click buttons to test interactions. Check console for click events.
      </p>
    </div>
  );
}

export default App;
