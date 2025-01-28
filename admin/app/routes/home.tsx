import { useMemo } from "react";
import { useDate } from "@/lib/dayjs";

function Greeting() {
  const date = useDate(1000 * 60 * 5);

  const greeting = useMemo(() => {
    const hours = date.hour();
    if (hours >= 6 && hours < 12) {
      return "Good morning";
    } else if (hours >= 12 && hours < 18) {
      return "Good afternoon";
    } else if (hours >= 18 && hours < 22) {
      return "Good evening";
    } else {
      return "Good night";
    }
  }, [date]);

  return greeting;
}

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl p-8">
      <h1 className="text-3xl font-bold tracking-tight">
        <Greeting />, John
      </h1>
      <div className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">Overview</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="border-y border-gray-300 py-4">
            <p className="text-gray-600">
              Orders{" "}
              <span className="font-medium text-blue-700">for preparation</span>
            </p>
            <p className="mt-1 text-3xl font-medium">12</p>
          </div>
          <div className="border-y border-gray-300 py-4">
            <p className="text-gray-600">Orders this week</p>
            <p className="mt-1 text-3xl font-medium">25</p>
          </div>
          <div className="border-y border-gray-300 py-4">
            <p className="text-gray-600">Lockers in use</p>
            <p className="mt-1 text-3xl font-medium">
              8 <span className="text-xl text-gray-600">/ 24</span>
            </p>
          </div>
          <div className="border-y border-gray-300 py-4">
            <p className="text-gray-600">Customers</p>
            <p className="mt-1 text-3xl font-medium">234</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">Recent orders</h2>
        <div className="mt-4 divide-y divide-gray-300">
          <div className="flex gap-4 px-2 pb-2">
            <span className="w-24 flex-none font-medium text-gray-600">
              Order no
            </span>
            <span className="w-24 flex-none font-medium text-gray-600">
              Date
            </span>
            <span className="w-2/5 flex-auto font-medium text-gray-600">
              User
            </span>
            <span className="w-3/5 flex-auto font-medium text-gray-600">
              Info
            </span>
            <span className="w-32 flex-none text-right font-medium text-gray-600">
              Status
            </span>
          </div>
          <div className="flex gap-4 px-2 py-3 transition hover:bg-gray-200">
            <span className="w-24 flex-none">#16</span>
            <span className="w-24 flex-none text-gray-600">24/1/25</span>
            <span className="w-2/5 flex-auto">Mr Joe Bloggs</span>
            <span className="w-3/5 flex-auto">
              Paracetamol 500mg capsules + 1
            </span>
            <div className="flex w-32 flex-none items-center justify-end">
              <span className="-my-1.5 rounded bg-amber-200 px-2 py-1.5 text-sm font-semibold leading-none text-amber-700">
                Sent to GP
              </span>
            </div>
          </div>
          <div className="flex gap-4 px-2 py-3 transition hover:bg-gray-200">
            <span className="w-24 flex-none">#15</span>
            <span className="w-24 flex-none text-gray-600">22/1/25</span>
            <span className="w-2/5 flex-auto">Mrs Jane Doe</span>
            <span className="w-3/5 flex-auto">
              Paracetamol 500mg capsules + 1
            </span>
            <div className="flex w-32 flex-none items-center justify-end">
              <span className="-my-1.5 rounded bg-blue-200 px-2 py-1.5 text-sm font-semibold leading-none text-blue-700">
                For preparation
              </span>
            </div>
          </div>
          <div className="flex gap-4 px-2 py-3 transition hover:bg-gray-200">
            <span className="w-24 flex-none">#14</span>
            <span className="w-24 flex-none text-gray-600">16/1/25</span>
            <span className="w-2/5 flex-auto">Mr John Doe</span>
            <span className="w-3/5 flex-auto">
              Paracetamol 500mg capsules + 1
            </span>
            <div className="flex w-32 flex-none items-center justify-end">
              <span className="-my-1.5 rounded bg-emerald-200 px-2 py-1.5 text-sm font-semibold leading-none text-emerald-700">
                Ready to collect
              </span>
            </div>
          </div>
          <div className="flex gap-4 px-2 py-3 transition hover:bg-gray-200">
            <span className="w-24 flex-none">#13</span>
            <span className="w-24 flex-none text-gray-600">8/1/25</span>
            <span className="w-2/5 flex-auto">Mr Joe Bloggs</span>
            <span className="w-3/5 flex-auto">
              Paracetamol 500mg capsules + 1
            </span>
            <div className="flex w-32 flex-none items-center justify-end">
              <span className="-my-1.5 rounded bg-gray-300 px-2 py-1.5 text-sm font-semibold leading-none text-gray-700">
                Collected 19/1
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
