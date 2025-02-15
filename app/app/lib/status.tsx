import {
  Check,
  Package,
  PaperPlaneRight,
  ShoppingBagOpen,
  type Icon,
} from "@phosphor-icons/react";
import type { Table } from "@repo/api";
import clsx from "clsx";

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

const statusKeys = Object.keys(statuses) as Table<"orders">["status"][];

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

function StatusProgressStep({
  step,
  status,
}: {
  step: Table<"orders">["status"];
  status: Table<"orders">["status"];
}) {
  const { color, text } = statuses[status];
  const { icon: Icon } = statuses[step];

  const stepIndex = step ? statusKeys.indexOf(step) : -1;
  const statusIndex = statusKeys.indexOf(status);

  return (
    <div className="relative">
      <div
        style={
          statusIndex >= stepIndex
            ? {
                backgroundColor: color,
              }
            : {}
        }
        className={clsx(
          "grid size-10 place-items-center rounded-full",
          statusIndex >= stepIndex
            ? "text-white/90"
            : "border-2 border-gray-300 text-gray-300",
        )}
      >
        <Icon weight="bold" className="size-5" />
      </div>
      {(statusIndex === stepIndex ||
        (status === "collected" && step === "ready")) && (
        <span
          style={{
            color: color,
          }}
          className="absolute left-1/2 top-full mt-1.5 w-max -translate-x-1/2 text-sm font-medium text-emerald-600"
        >
          {text}
        </span>
      )}
    </div>
  );
}
function StatusProgressSeparator({
  step,
  status,
  start = false,
  end = false,
}: {
  step?: Table<"orders">["status"];
  status: Table<"orders">["status"];
  start?: boolean;
  end?: boolean;
}) {
  const { color } = statuses[status];
  const stepIndex = step ? statusKeys.indexOf(step) : -1;
  const statusIndex = statusKeys.indexOf(status);

  return (
    <div
      className={clsx(
        "h-0.5 overflow-clip bg-gray-300",
        start || end ? "w-8 flex-none" : "min-w-0 flex-1",
        start && "rounded-l-full",
        end && "rounded-r-full",
      )}
    >
      <div
        className={clsx(
          "h-full",
          statusIndex === stepIndex && "rounded-r-full",
        )}
        style={{
          backgroundColor: color,
          width:
            statusIndex < stepIndex
              ? "0%"
              : statusIndex === stepIndex
                ? "50%"
                : "100%",
        }}
      ></div>
    </div>
  );
}

export function StatusProgress({
  status,
}: {
  status: Table<"orders">["status"];
}) {
  return (
    <div className="flex items-center">
      <StatusProgressSeparator status={status} start={true} />
      <StatusProgressStep step="checking" status={status} />
      <StatusProgressSeparator step="checking" status={status} />
      <StatusProgressStep step="with_gp" status={status} />
      <StatusProgressSeparator step="with_gp" status={status} />
      <StatusProgressStep step="preparing" status={status} />
      <StatusProgressSeparator step="preparing" status={status} />
      <StatusProgressStep step="ready" status={status} />
      <StatusProgressSeparator step="ready" status={status} end={true} />
    </div>
  );
}
