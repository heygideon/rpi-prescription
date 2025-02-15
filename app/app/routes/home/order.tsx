import paracetamolSrc from "@/assets/paracetamol.png";
import { MinusCircle, PlusCircle } from "@phosphor-icons/react";

export default function Home() {
  return (
    <>
      <div className="-mb-6 bg-white p-6 pb-12">
        <h1 className="text-3xl font-bold tracking-tight">Order</h1>
      </div>
      <div className="relative isolate overflow-clip rounded-t-xl border-t border-gray-200 bg-gray-100 p-6">
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-bold tracking-tight">
              Your medication
            </h2>
            <div className="mt-3 space-y-3">
              <div className="flex gap-3 rounded-md border border-gray-300 bg-white p-2 shadow-sm">
                <img
                  src={paracetamolSrc}
                  alt="Paracetamol"
                  className="size-24"
                />
                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <h3 className="truncate text-lg font-bold tracking-tight">
                    Paracetamol
                  </h3>
                  <p className="truncate text-sm text-gray-600">
                    500mg capsules
                  </p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <MinusCircle className="size-6 text-gray-400 transition active:scale-95 active:opacity-75" />
                    <span className="text-lg font-semibold leading-none">
                      0
                    </span>
                    <PlusCircle className="size-6 text-emerald-600 transition active:scale-95 active:opacity-75" />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 rounded-md border border-gray-300 bg-white p-2 shadow-sm">
                <img
                  src={paracetamolSrc}
                  alt="Paracetamol"
                  className="size-24"
                />
                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <h3 className="truncate text-lg font-bold tracking-tight">
                    Paracetamol
                  </h3>
                  <p className="truncate text-sm text-gray-600">
                    500mg capsules
                  </p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <MinusCircle className="size-6 text-emerald-600 transition active:scale-95 active:opacity-75" />
                    <span className="text-lg font-semibold leading-none">
                      3
                    </span>
                    <PlusCircle className="size-6 text-emerald-600 transition active:scale-95 active:opacity-75" />
                  </div>
                  {/* <p className="mt-1.5 text-sm text-gray-600">
                  last ordered on 4/12
                </p> */}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="pointer-events-none fixed inset-x-0 bottom-16 isolate p-6 pt-0">
        <div className="mask-gradient absolute inset-0 -z-10 bg-gray-100/50 backdrop-blur"></div>

        <button className="pointer-events-auto flex h-14 w-full items-center justify-center gap-1.5 rounded-full bg-emerald-700 font-medium text-white shadow-md transition active:scale-95 active:bg-emerald-900">
          <span>Request 3 items</span>
          <span className="font-normal">£29.70</span>
        </button>
      </div>
    </>
  );
}
