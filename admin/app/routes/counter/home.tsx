import { ArrowRight, Lock, MagnifyingGlass } from "@phosphor-icons/react";
import { useDate } from "~/lib/dayjs";

function DateLine() {
  const date = useDate();
  return (
    <>
      {date.format("HH:mm")} &middot; {date.format("dddd Do MMMM")} &middot;
      Jane Doe
    </>
  );
}

export default function Counter() {
  return (
    <div className="flex size-full flex-col items-center p-8 text-center">
      <div className="h-6">
        <p className="text-lg leading-tight text-gray-600">
          <DateLine />
        </p>
      </div>
      <div className="min-h-0 flex-1"></div>
      <h2 className="text-3xl font-bold tracking-tight">Look up a customer</h2>
      <div className="mt-4 flex w-full max-w-md gap-4">
        <div className="relative min-w-0 flex-1">
          <MagnifyingGlass className="absolute inset-y-0 left-0 m-4 size-6 text-gray-500" />
          <input
            type="text"
            className="!h-14 !pl-12 text-lg"
            placeholder="Search by surname..."
          />
        </div>
        <button className="grid size-14 place-items-center rounded-md bg-emerald-700 shadow-sm transition hover:bg-emerald-800 active:scale-95">
          <ArrowRight weight="bold" className="size-6 text-white" />
        </button>
      </div>
      <div className="min-h-0 flex-1"></div>
      <div className="flex h-6 items-center justify-center">
        <button className="-m-2 flex items-center gap-1.5 rounded-md p-2 text-amber-700 transition hover:bg-gray-200 hover:text-amber-800 active:scale-95">
          <Lock weight="bold" className="size-4" />
          <span className="font-medium leading-tight">Lock</span>
        </button>
      </div>
    </div>
  );
}
