import { Check, Info, Warning } from "@phosphor-icons/react";

export default function LockersHome() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold tracking-tight">Lockers</h1>
      <div className="mt-6 divide-y divide-gray-300 border-t border-gray-300">
        <div className="py-6">
          <h2 className="text-2xl font-semibold tracking-tight">finch</h2>
          <div className="mt-0.5 flex items-center gap-1.5">
            <Check weight="bold" className="size-4 text-emerald-700" />
            <span className="font-medium text-emerald-700">Looking good</span>
          </div>
          <div className="mt-4 grid w-full max-w-lg grid-cols-4 gap-4">
            <div className="bg-stripes-used flex flex-col items-center justify-center rounded-md border border-gray-400 bg-gray-100 p-4 text-center shadow-sm">
              <p className="text-lg font-semibold">A1</p>
              <p className="text-sm font-medium text-gray-700">#16</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md bg-emerald-700 p-4 text-center text-white shadow-sm">
              <p className="text-lg font-semibold">A2</p>
              <p className="text-sm font-medium text-white/75">Available</p>
            </div>
            <div className="bg-stripes-used flex flex-col items-center justify-center rounded-md border border-gray-400 bg-gray-100 p-4 text-center shadow-sm">
              <p className="text-lg font-semibold">A3</p>
              <p className="text-sm font-medium text-gray-700">#15</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md bg-emerald-700 p-4 text-center text-white shadow-sm">
              <p className="text-lg font-semibold">A4</p>
              <p className="text-sm font-medium text-white/75">Available</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md bg-emerald-700 p-4 text-center text-white shadow-sm">
              <p className="text-lg font-semibold">B1</p>
              <p className="text-sm font-medium text-white/75">Available</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md bg-emerald-700 p-4 text-center text-white shadow-sm">
              <p className="text-lg font-semibold">B2</p>
              <p className="text-sm font-medium text-white/75">Available</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md bg-emerald-700 p-4 text-center text-white shadow-sm">
              <p className="text-lg font-semibold">B3</p>
              <p className="text-sm font-medium text-white/75">Available</p>
            </div>
            <div className="bg-stripes-used flex flex-col items-center justify-center rounded-md border border-gray-400 bg-gray-100 p-4 text-center shadow-sm">
              <p className="text-lg font-semibold">B4</p>
              <p className="text-sm font-medium text-gray-700">#14</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md bg-emerald-700 p-4 text-center text-white shadow-sm">
              <p className="text-lg font-semibold">C1</p>
              <p className="text-sm font-medium text-white/75">Available</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md bg-emerald-700 p-4 text-center text-white shadow-sm">
              <p className="text-lg font-semibold">C2</p>
              <p className="text-sm font-medium text-white/75">Available</p>
            </div>
            <div className="bg-stripes-used flex flex-col items-center justify-center rounded-md border border-gray-400 bg-gray-100 p-4 text-center shadow-sm">
              <p className="text-lg font-semibold">C3</p>
              <p className="text-sm font-medium text-gray-700">#13</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md bg-emerald-700 p-4 text-center text-white shadow-sm">
              <p className="text-lg font-semibold">C4</p>
              <p className="text-sm font-medium text-white/75">Available</p>
            </div>
          </div>
        </div>
        <div className="py-6">
          <h2 className="text-2xl font-semibold tracking-tight">avocet</h2>
          <div className="mt-0.5 flex items-center gap-1.5">
            <Warning weight="bold" className="size-4 text-amber-700" />
            <span className="font-medium text-amber-700">Almost full</span>
          </div>
          <div className="mt-4 grid w-full max-w-lg grid-cols-4 gap-4">
            <div className="bg-stripes-used flex flex-col items-center justify-center rounded-md border border-gray-400 bg-gray-100 p-4 text-center shadow-sm">
              <p className="text-lg font-semibold">A1</p>
              <p className="text-sm font-medium text-gray-700">#16</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md bg-amber-700 p-4 text-center text-white shadow-sm">
              <p className="text-lg font-semibold">A2</p>
              <p className="text-sm font-medium text-white/75">Available</p>
            </div>
            <div className="bg-stripes-used flex flex-col items-center justify-center rounded-md border border-gray-400 bg-gray-100 p-4 text-center shadow-sm">
              <p className="text-lg font-semibold">A3</p>
              <p className="text-sm font-medium text-gray-700">#15</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md bg-amber-700 p-4 text-center text-white shadow-sm">
              <p className="text-lg font-semibold">A4</p>
              <p className="text-sm font-medium text-white/75">Available</p>
            </div>
            <div className="bg-stripes-used flex flex-col items-center justify-center rounded-md border border-gray-400 bg-gray-100 p-4 text-center shadow-sm">
              <p className="text-lg font-semibold">B1</p>
              <p className="text-sm font-medium text-gray-700">#14</p>
            </div>
            <div className="bg-stripes-used flex flex-col items-center justify-center rounded-md border border-gray-400 bg-gray-100 p-4 text-center shadow-sm">
              <p className="text-lg font-semibold">B2</p>
              <p className="text-sm font-medium text-gray-700">#12</p>
            </div>
            <div className="bg-stripes-used flex flex-col items-center justify-center rounded-md border border-gray-400 bg-gray-100 p-4 text-center shadow-sm">
              <p className="text-lg font-semibold">B3</p>
              <p className="text-sm font-medium text-gray-700">#11</p>
            </div>
            <div className="bg-stripes-used flex flex-col items-center justify-center rounded-md border border-gray-400 bg-gray-100 p-4 text-center shadow-sm">
              <p className="text-lg font-semibold">B4</p>
              <p className="text-sm font-medium text-gray-700">#9</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md bg-amber-700 p-4 text-center text-white shadow-sm">
              <p className="text-lg font-semibold">C1</p>
              <p className="text-sm font-medium text-white/75">Available</p>
            </div>
            <div className="bg-stripes-used flex flex-col items-center justify-center rounded-md border border-gray-400 bg-gray-100 p-4 text-center shadow-sm">
              <p className="text-lg font-semibold">C2</p>
              <p className="text-sm font-medium text-gray-700">#13</p>
            </div>
            <div className="bg-stripes-used flex flex-col items-center justify-center rounded-md border border-gray-400 bg-gray-100 p-4 text-center shadow-sm">
              <p className="text-lg font-semibold">C3</p>
              <p className="text-sm font-medium text-gray-700">#10</p>
            </div>
            <div className="bg-stripes-used flex flex-col items-center justify-center rounded-md border border-gray-400 bg-gray-100 p-4 text-center shadow-sm">
              <p className="text-lg font-semibold">C4</p>
              <p className="text-sm font-medium text-gray-700">#8</p>
            </div>
          </div>
        </div>
        <div className="py-6">
          <h2 className="text-2xl font-semibold tracking-tight">pintail</h2>
          <div className="mt-0.5 flex items-center gap-1.5">
            <Info weight="bold" className="size-4 text-blue-700" />
            <span className="font-medium text-blue-700">
              Software update available
            </span>
            <span className="text-gray-600">&middot;</span>
            <span className="text-gray-600">Installs tonight at 3am</span>
          </div>
          <div className="mt-4 grid w-full max-w-lg grid-cols-4 gap-4">
            <div className="bg-stripes-used flex flex-col items-center justify-center rounded-md border border-gray-400 bg-gray-100 p-4 text-center shadow-sm">
              <p className="text-lg font-semibold">A1</p>
              <p className="text-sm font-medium text-gray-700">#16</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md bg-emerald-700 p-4 text-center text-white shadow-sm">
              <p className="text-lg font-semibold">A2</p>
              <p className="text-sm font-medium text-white/75">Available</p>
            </div>
            <div className="bg-stripes-used flex flex-col items-center justify-center rounded-md border border-gray-400 bg-gray-100 p-4 text-center shadow-sm">
              <p className="text-lg font-semibold">A3</p>
              <p className="text-sm font-medium text-gray-700">#15</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md bg-emerald-700 p-4 text-center text-white shadow-sm">
              <p className="text-lg font-semibold">A4</p>
              <p className="text-sm font-medium text-white/75">Available</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md bg-emerald-700 p-4 text-center text-white shadow-sm">
              <p className="text-lg font-semibold">B1</p>
              <p className="text-sm font-medium text-white/75">Available</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md bg-emerald-700 p-4 text-center text-white shadow-sm">
              <p className="text-lg font-semibold">B2</p>
              <p className="text-sm font-medium text-white/75">Available</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md bg-emerald-700 p-4 text-center text-white shadow-sm">
              <p className="text-lg font-semibold">B3</p>
              <p className="text-sm font-medium text-white/75">Available</p>
            </div>
            <div className="bg-stripes-used flex flex-col items-center justify-center rounded-md border border-gray-400 bg-gray-100 p-4 text-center shadow-sm">
              <p className="text-lg font-semibold">B4</p>
              <p className="text-sm font-medium text-gray-700">#14</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md bg-emerald-700 p-4 text-center text-white shadow-sm">
              <p className="text-lg font-semibold">C1</p>
              <p className="text-sm font-medium text-white/75">Available</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md bg-emerald-700 p-4 text-center text-white shadow-sm">
              <p className="text-lg font-semibold">C2</p>
              <p className="text-sm font-medium text-white/75">Available</p>
            </div>
            <div className="bg-stripes-used flex flex-col items-center justify-center rounded-md border border-gray-400 bg-gray-100 p-4 text-center shadow-sm">
              <p className="text-lg font-semibold">C3</p>
              <p className="text-sm font-medium text-gray-700">#13</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md bg-emerald-700 p-4 text-center text-white shadow-sm">
              <p className="text-lg font-semibold">C4</p>
              <p className="text-sm font-medium text-white/75">Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
