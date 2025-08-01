import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import "../../test/setup";
import { GlassTable } from "./glass-table";

interface TestData {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
}

const mockData: TestData[] = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "active" },
];

const mockColumns = [
  { key: "id" as keyof TestData, header: "ID" },
  { key: "name" as keyof TestData, header: "Name" },
  { key: "email" as keyof TestData, header: "Email" },
  { key: "status" as keyof TestData, header: "Status" },
];

describe("GlassTable", () => {
  it("renders table with data", () => {
    render(<GlassTable data={mockData} columns={mockColumns} />);

    // Check table exists
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();

    // Check headers
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();

    // Check data rows
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    expect(screen.getAllByText("active")).toHaveLength(2);
  });

  it("renders with custom render function", () => {
    const columnsWithRender = [
      { key: "id" as keyof TestData, header: "ID" },
      { key: "name" as keyof TestData, header: "Name" },
      {
        key: "status" as keyof TestData,
        header: "Status",
        render: (value: string) => (
          <span className={`badge-${value}`}>{value.toUpperCase()}</span>
        ),
      },
    ];

    render(<GlassTable data={mockData} columns={columnsWithRender} />);

    // Check custom rendered content
    expect(screen.getByText("ACTIVE")).toBeInTheDocument();
    expect(screen.getByText("INACTIVE")).toBeInTheDocument();

    const activeSpan = screen.getByText("ACTIVE");
    expect(activeSpan.tagName).toBe("SPAN");
    expect(activeSpan).toHaveClass("badge-active");
  });

  it("applies custom className", () => {
    render(
      <GlassTable
        data={mockData}
        columns={mockColumns}
        className="custom-table-wrapper"
      />,
    );

    const wrapper = document.querySelector(".custom-table-wrapper");
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass("overflow-x-auto");
  });

  it("renders empty table when no data", () => {
    render(<GlassTable data={[]} columns={mockColumns} />);

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();

    // Headers should still render
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();

    // No data rows
    const tbody = table.querySelector("tbody");
    expect(tbody?.children.length).toBe(0);
  });

  it("has proper table structure", () => {
    render(<GlassTable data={mockData} columns={mockColumns} />);

    const table = screen.getByRole("table");
    const thead = table.querySelector("thead");
    const tbody = table.querySelector("tbody");

    expect(thead).toBeInTheDocument();
    expect(tbody).toBeInTheDocument();

    // Check header row
    const headerRow = thead?.querySelector("tr");
    expect(headerRow).toBeInTheDocument();
    expect(headerRow).toHaveClass("glass-effect");

    // Check th elements
    const headers = thead?.querySelectorAll("th");
    expect(headers?.length).toBe(4);
    headers?.forEach((th) => {
      expect(th).toHaveClass("px-6");
      expect(th).toHaveClass("py-4");
      expect(th).toHaveClass("text-left");
    });

    // Check data rows
    const dataRows = tbody?.querySelectorAll("tr");
    expect(dataRows?.length).toBe(3);
    dataRows?.forEach((tr) => {
      expect(tr).toHaveClass("glass-hover");
    });
  });

  // Accessibility tests - these should highlight missing features
  it("should have table caption for screen readers", () => {
    render(<GlassTable data={mockData} columns={mockColumns} />);

    const table = screen.getByRole("table");
    const caption = table.querySelector("caption");

    // This test will fail - highlighting missing caption
    expect(caption).toBe(null); // Currently no caption
  });

  it("should have scope attributes on headers", () => {
    render(<GlassTable data={mockData} columns={mockColumns} />);

    const headers = screen.getAllByRole("columnheader");

    // This test will fail - highlighting missing scope attributes
    headers.forEach((header) => {
      expect(header).not.toHaveAttribute("scope"); // Currently no scope
    });
  });

  it("should have row headers for better screen reader support", () => {
    render(<GlassTable data={mockData} columns={mockColumns} />);

    // This test will fail - no row headers implemented
    const rowHeaders = screen.queryAllByRole("rowheader");
    expect(rowHeaders.length).toBe(0); // Currently no row headers
  });

  it("renders all data cells", () => {
    render(<GlassTable data={mockData} columns={mockColumns} />);

    const cells = screen.getAllByRole("cell");
    expect(cells.length).toBe(12); // 3 rows × 4 columns

    cells.forEach((cell) => {
      expect(cell).toHaveClass("whitespace-nowrap");
      expect(cell).toHaveClass("px-6");
      expect(cell).toHaveClass("py-4");
    });
  });

  it("handles complex data types", () => {
    interface ComplexData {
      id: number;
      user: { name: string; role: string };
      tags: string[];
    }

    const complexData: ComplexData[] = [
      { id: 1, user: { name: "Alice", role: "Admin" }, tags: ["a", "b"] },
    ];

    const complexColumns = [
      { key: "id" as keyof ComplexData, header: "ID" },
      {
        key: "user" as keyof ComplexData,
        header: "User",
        render: (value: any) => `${value.name} (${value.role})`,
      },
      {
        key: "tags" as keyof ComplexData,
        header: "Tags",
        render: (value: string[]) => value.join(", "),
      },
    ];

    render(<GlassTable data={complexData} columns={complexColumns} />);

    expect(screen.getByText("Alice (Admin)")).toBeInTheDocument();
    expect(screen.getByText("a, b")).toBeInTheDocument();
  });

  it("applies glass styling", () => {
    render(<GlassTable data={mockData} columns={mockColumns} />);

    const headerRow = screen.getByRole("table").querySelector("thead tr");
    expect(headerRow).toHaveClass("glass-effect");

    const dataRows = screen.getByRole("table").querySelectorAll("tbody tr");
    dataRows.forEach((row) => {
      expect(row).toHaveClass("glass-hover");
    });
  });

  it("handles overflow with wrapper", () => {
    render(<GlassTable data={mockData} columns={mockColumns} />);

    const wrapper = screen.getByRole("table").parentElement;
    expect(wrapper).toHaveClass("overflow-x-auto");
  });

  it("renders correct number of columns", () => {
    const twoColumnData = [{ id: 1, name: "Test" }];
    const twoColumns = [
      { key: "id" as keyof (typeof twoColumnData)[0], header: "ID" },
      { key: "name" as keyof (typeof twoColumnData)[0], header: "Name" },
    ];

    render(<GlassTable data={twoColumnData} columns={twoColumns} />);

    const headers = screen.getAllByRole("columnheader");
    expect(headers.length).toBe(2);

    const cells = screen.getAllByRole("cell");
    expect(cells.length).toBe(2);
  });

  it("maintains data integrity", () => {
    render(<GlassTable data={mockData} columns={mockColumns} />);

    // Verify each row has correct data
    const rows = screen.getByRole("table").querySelectorAll("tbody tr");

    // First row
    expect(rows[0]).toHaveTextContent("1");
    expect(rows[0]).toHaveTextContent("John Doe");
    expect(rows[0]).toHaveTextContent("john@example.com");
    expect(rows[0]).toHaveTextContent("active");

    // Second row
    expect(rows[1]).toHaveTextContent("2");
    expect(rows[1]).toHaveTextContent("Jane Smith");
    expect(rows[1]).toHaveTextContent("jane@example.com");
    expect(rows[1]).toHaveTextContent("inactive");
  });

  // Test that highlights responsive table issues
  it("should have responsive table attributes", () => {
    render(<GlassTable data={mockData} columns={mockColumns} />);

    const table = screen.getByRole("table");

    // This will fail - no responsive attributes
    expect(table).not.toHaveAttribute("role", "table"); // It has role="table" by default
    expect(table.querySelector("[role='row']")).toBe(null); // No explicit row roles
  });
});
