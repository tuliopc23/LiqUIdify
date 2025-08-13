import type React from "react";

interface TableColumn<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

interface GlassTableProps<T> {
  data: Array<T>;
  columns: Array<TableColumn<T>>;
  className?: string;
}

const GlassTable = <T,>({ data, columns, className }: GlassTableProps<T>) => {
  return (
    <div className={`overflow-x-auto ${className || ""}`}>
      <table className="w-full">
        <thead>
          <tr className="liquid-glass">
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="px-6 py-4 text-left font-medium text-secondary text-xs uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y border-[var(--liquid-glass-border)]">
          {data.map((item, index) => (
            <tr key={index} className="liquid-glass-interactive">
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className="whitespace-nowrap px-6 py-4"
                >
                  {column.render
                    ? column.render(item[column.key], item)
                    : String(item[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { GlassTable };
