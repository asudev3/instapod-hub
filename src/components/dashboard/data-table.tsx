import type { ReactNode } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
  align?: "left" | "right";
}

export function DataTable<T>({
  columns,
  rows,
  getRowId,
  onRowClick,
  caption,
  footer,
}: {
  columns: Column<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  onRowClick?: (row: T) => void;
  caption?: string;
  footer?: ReactNode;
}) {
  return (
    <div className="panel overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <TableHeader>
            <TableRow className="bg-surface/60 hover:bg-surface/60">
              {columns.map((c) => (
                <TableHead
                  key={c.key}
                  className={cn(
                    "whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                    c.align === "right" && "text-right",
                    c.className,
                  )}
                >
                  {c.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={getRowId(row)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(onRowClick && "cursor-pointer")}
              >
                {columns.map((c) => (
                  <TableCell
                    key={c.key}
                    className={cn("whitespace-nowrap py-3 text-sm", c.align === "right" && "text-right tabular-nums")}
                  >
                    {c.cell(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {footer ? <div className="border-t bg-surface/40 px-4 py-3 text-xs text-muted-foreground">{footer}</div> : null}
    </div>
  );
}
