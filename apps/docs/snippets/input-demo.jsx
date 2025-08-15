import { useState } from "react";
import { DemoFrame } from "/snippets/DemoFrame.jsx";

function GlassInput({ size = "md", invalid = false, ...props }) {
  const sizes = { sm: "h-8 text-sm px-3", md: "h-9 text-sm px-3", lg: "h-10 text-base px-4" };
  return (
    <input
      {...props}
      className={`rounded-md bg-white/60 dark:bg-white/5 backdrop-blur border ${
        invalid ? "border-rose-500/60" : "border-black/10 dark:border-white/10"
      } focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${sizes[size]}`}
      style={{ WebkitBackdropFilter: "blur(8px)", backdropFilter: "blur(8px)" }}
    />
  );
}

export function InputDemo() {
  const [value, setValue] = useState("");
  const [size, setSize] = useState("md");
  const invalid = value.length > 0 && value.length < 3;

  return (
    <DemoFrame>
      <div className="flex items-center gap-2 flex-wrap">
        {["sm", "md", "lg"].map((s) => (
          <button
            key={s}
            onClick={() => setSize(s)}
            className={`text-xs px-2 py-1 rounded border ${
              size === s ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : ""
            }`}
            aria-pressed={size === s}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="pt-2">
        <GlassInput
          size={size}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type at least 3 chars"
          aria-invalid={invalid}
          invalid={invalid}
        />
      </div>
    </DemoFrame>
  );
}
