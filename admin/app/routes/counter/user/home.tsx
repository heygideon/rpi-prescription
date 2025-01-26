export default function CounterUserHome() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
      <div className="-mx-2 mt-4 divide-y divide-gray-300 border-b border-gray-300">
        <div className="flex gap-4 px-2 pb-2">
          <span className="w-24 flex-none font-medium text-gray-600">
            Order no
          </span>
          <span className="w-3/5 flex-auto font-medium text-gray-600">
            Info
          </span>
          <span className="w-40 flex-none text-right font-medium text-gray-600">
            Status
          </span>
        </div>
        <div className="flex gap-4 px-2 py-4 transition hover:bg-gray-200">
          <span className="w-24 flex-none text-lg">#16</span>
          <div className="w-full flex-auto text-lg">
            <p>Paracetamol 500mg capsules + 1</p>
          </div>
          <div className="flex h-7 w-40 flex-none items-center justify-end">
            <span className="-my-1.5 rounded bg-emerald-200 px-2 py-1.5 font-semibold leading-none text-emerald-700">
              Ready to collect
            </span>
          </div>
        </div>
        <div className="flex gap-4 px-2 py-4 transition hover:bg-gray-200">
          <span className="w-24 flex-none text-lg">#13</span>
          <div className="w-full flex-auto text-lg">
            <p>Paracetamol 500mg capsules + 1</p>
            <p className="text-sm text-gray-600">for Jane Doe</p>
          </div>
          <div className="flex h-7 w-40 flex-none items-center justify-end">
            <span className="-my-1.5 rounded bg-blue-200 px-2 py-1.5 font-semibold leading-none text-blue-700">
              For preparation
            </span>
          </div>
        </div>
        <div className="flex gap-4 px-2 py-4 transition hover:bg-gray-200">
          <span className="w-24 flex-none text-lg">#11</span>
          <div className="w-full flex-auto text-lg">
            <p>Paracetamol 500mg capsules + 1</p>
          </div>
          <div className="flex h-7 w-40 flex-none items-center justify-end">
            <span className="-my-1.5 rounded bg-amber-200 px-2 py-1.5 font-semibold leading-none text-amber-700">
              Sent to GP
            </span>
          </div>
        </div>
      </div>

      <h3 className="mt-8 text-lg font-semibold tracking-tight">Past orders</h3>
      <div className="-mx-2 mt-4 divide-y divide-gray-300 border-b border-gray-300">
        <div className="flex gap-4 px-2 pb-2">
          <span className="w-24 flex-none font-medium text-gray-600">
            Order no
          </span>
          <span className="w-3/5 flex-auto font-medium text-gray-600">
            Info
          </span>
          <span className="w-40 flex-none text-right font-medium text-gray-600">
            Status
          </span>
        </div>
        <div className="flex gap-4 px-2 py-4 transition hover:bg-gray-200">
          <span className="w-24 flex-none text-lg">#9</span>
          <div className="w-full flex-auto text-lg">
            <p>Paracetamol 500mg capsules + 1</p>
          </div>
          <div className="flex h-7 w-40 flex-none items-center justify-end">
            <span className="-my-1.5 rounded bg-gray-300 px-2 py-1.5 font-semibold leading-none text-gray-700">
              Collected 24/1
            </span>
          </div>
        </div>
        <div className="flex gap-4 px-2 py-4 transition hover:bg-gray-200">
          <span className="w-24 flex-none text-lg">#6</span>
          <div className="w-full flex-auto text-lg">
            <p>Paracetamol 500mg capsules + 1</p>
            <p className="text-sm text-gray-600">for Jane Doe</p>
          </div>
          <div className="flex h-7 w-40 flex-none items-center justify-end">
            <span className="-my-1.5 rounded bg-gray-300 px-2 py-1.5 font-semibold leading-none text-gray-700">
              Collected 17/12
            </span>
          </div>
        </div>
        <div className="flex gap-4 px-2 py-4 transition hover:bg-gray-200">
          <span className="w-24 flex-none text-lg">#2</span>
          <div className="w-full flex-auto text-lg">
            <p>Paracetamol 500mg capsules + 1</p>
          </div>
          <div className="flex h-7 w-40 flex-none items-center justify-end">
            <span className="-my-1.5 rounded bg-gray-300 px-2 py-1.5 font-semibold leading-none text-gray-700">
              Collected 4/12
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
