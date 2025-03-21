import type { Route } from "./+types/order";
import paracetamolSrc from "@/assets/paracetamol.png";

export default function CounterUserOrder({ params }: Route.ComponentProps) {
  return (
    <>
      <div className="p-8">
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-4xl font-bold tracking-tight">
              {"#" + params.orderId}
            </h2>
            <p className="mt-0.5 text-lg text-gray-600">for Mr John Doe</p>
          </div>
          <span className="rounded bg-emerald-200 px-2 py-1.5 font-semibold leading-none text-emerald-700">
            Ready to collect
          </span>
        </div>
        <div className="mt-4 space-y-4">
          <div className="flex rounded-md border border-gray-300 p-2 shadow-sm">
            <img
              src={paracetamolSrc}
              alt="Paracetamol"
              className="size-20 flex-none"
            />
            <div className="ml-2 flex min-w-0 flex-1 flex-col justify-center">
              <h3 className="truncate text-xl font-bold tracking-tight">
                <span className="text-lg font-medium text-gray-500">1x</span>{" "}
                Paracetamol
              </h3>
              <p className="truncate text-gray-600">500mg capsules</p>
            </div>
          </div>
          <div className="flex rounded-md border border-gray-300 p-2 shadow-sm">
            <img
              src={paracetamolSrc}
              alt="Paracetamol"
              className="size-20 flex-none"
            />
            <div className="ml-2 flex min-w-0 flex-1 flex-col justify-center">
              <h3 className="truncate text-xl font-bold tracking-tight">
                <span className="text-lg font-medium text-amber-700">2x</span>{" "}
                Paracetamol
              </h3>
              <p className="truncate text-gray-600">500mg capsules</p>
            </div>
          </div>
        </div>

        <h3 className="mt-8 text-lg font-semibold tracking-tight">Timeline</h3>
        <div className="-mx-2 mt-4 divide-y divide-gray-300 border-b border-gray-300">
          <div className="flex gap-4 px-2 pb-2">
            <span className="w-32 flex-none font-medium text-gray-600">
              Date
            </span>
            <span className="min-w-0 flex-1 font-medium text-gray-600">
              Event
            </span>
          </div>
          <div className="flex gap-4 px-2 py-3">
            <span className="w-32 flex-none text-gray-600">24/1, 15:11</span>
            <p className="min-w-0 flex-1">Prescription ready in locker 23</p>
            <p className="w-fit flex-none font-medium text-emerald-700">
              Ready
            </p>
          </div>
          <div className="flex gap-4 px-2 py-3">
            <span className="w-32 flex-none text-gray-600">24/1, 15:10</span>
            <p className="min-w-0 flex-1">Assigned to locker 23</p>
          </div>
          <div className="flex gap-4 px-2 py-3">
            <span className="w-32 flex-none text-gray-600">24/1, 14:58</span>
            <p className="min-w-0 flex-1">Jane started preparing this order</p>
          </div>
          <div className="flex gap-4 px-2 py-3">
            <span className="w-32 flex-none text-gray-600">22/1, 13:54</span>
            <p className="min-w-0 flex-1">Approved by Local Medical Centre</p>
            <p className="w-fit flex-none font-medium text-blue-700">
              Preparing
            </p>
          </div>
          <div className="flex gap-4 px-2 py-3">
            <span className="w-32 flex-none text-gray-600">20/1, 15:10</span>
            <p className="min-w-0 flex-1">Sent to Local Medical Centre</p>
            <p className="w-fit flex-none font-medium text-amber-700">
              Sent to GP
            </p>
          </div>
          <div className="flex gap-4 px-2 py-3">
            <span className="w-32 flex-none text-gray-600">20/1, 15:10</span>
            <p className="min-w-0 flex-1">Approved by this pharmacy</p>
          </div>
          <div className="flex gap-4 px-2 py-3">
            <span className="w-32 flex-none text-gray-600">19/1, 11:12</span>
            <p className="min-w-0 flex-1">Requested in-store</p>
            <p className="w-fit flex-none font-medium text-amber-700">
              Checking
            </p>
          </div>
        </div>
      </div>
      <div className="h-20"></div>
      <div className="absolute inset-x-0 bottom-0 flex h-20 justify-end gap-4 bg-gradient-to-t from-white via-white/75 px-8 pb-8">
        <button className="flex h-full items-center rounded-full border border-gray-400 bg-white px-6 text-gray-700 shadow transition hover:bg-gray-200 active:scale-95">
          <span className="text-lg font-semibold">Open locker</span>
        </button>
        <button className="flex h-full items-center rounded-full bg-emerald-700 px-6 text-white shadow transition hover:bg-emerald-800 active:scale-95">
          <span className="text-lg font-semibold">Dispense</span>
        </button>
      </div>
    </>
  );
}
