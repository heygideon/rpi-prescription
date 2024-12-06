import {
  Check,
  Package,
  PaperPlaneRight,
  ShoppingBagOpen,
  type Icon,
} from "@phosphor-icons/react";
import type { Table } from "api";

type StatusInfo = {
  text: string;
  color: string;
  bgColor: string;
  textColor: string;
  icon: Icon;
};

const statuses = {
  checking: {
    text: "Checking order",
    color: "#ca8a04",
    bgColor: "#fef08a",
    textColor: "#854d0e",
    icon: ShoppingBagOpen,
  },
  with_gp: {
    text: "Sent to GP",
    color: "#ca8a04",
    bgColor: "#fef08a",
    textColor: "#854d0e",
    icon: PaperPlaneRight,
  },
  preparing: {
    text: "Preparing order",
    color: "#2563eb",
    bgColor: "#bfdbfe",
    textColor: "#1e40af",
    icon: Package,
  },
  ready: {
    text: "Ready to collect",
    color: "#059669",
    bgColor: "#a7f3d0",
    textColor: "#065f46",
    icon: Check,
  },
  collected: {
    text: "Collected",
    color: "#4b5563",
    bgColor: "#e5e7eb",
    textColor: "#1f2937",
    icon: Check,
  },
} satisfies Record<Table<"orders">["status"], StatusInfo>;

export default statuses;

export function StatusTag({ status }: { status: Table<"orders">["status"] }) {
  const { bgColor, textColor, text } = statuses[status];
  return (
    <span
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
      className="rounded px-2 py-1.5 text-sm font-semibold leading-none"
    >
      {text}
    </span>
  );
}
