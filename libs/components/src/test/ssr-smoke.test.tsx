import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Button } from "../components/button";

describe("SSR smoke", () => {
  it("renders Button on the server", () => {
    const html = renderToString(<Button>Test</Button>);
    expect(html).toContain("Test");
  });
});
