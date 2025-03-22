import { cva } from "cva";
import type { Table } from "@repo/api";

type Status = Table<"orders">["status"];

const statuses = {
  checking: "Checking",
  with_gp: "Sent to GP",
  preparing: "Preparing",
  ready: "Ready to collect",
  collected: "Collected",
} satisfies Record<Status, string>;

const statusTag = cva({
  base: "rounded px-2 py-1.5 text-sm font-semibold leading-none",
  variants: {
    status: {
      checking: "bg-amber-200 text-amber-700",
      with_gp: "bg-amber-200 text-amber-700",
      preparing: "bg-blue-200 text-blue-700",
      ready: "bg-emerald-200 text-emerald-700",
      collected: "bg-gray-200 text-gray-800",
    } satisfies Record<Status, string>,
  },
});

export default function StatusTag({
  status,
  className,
}: {
  status: Status;
  className?: string;
}) {
  return (
    <span className={statusTag({ status, className })}>{statuses[status]}</span>
  );
}
