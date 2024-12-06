import {
  ArrowLeft,
  Check,
  Package,
  PaperPlaneRight,
  ShoppingBagOpen,
} from "@phosphor-icons/react";
import type { Route } from "./+types/view";
import { useNavigate, useSearchParams } from "react-router";

import paracetamolSrc from "@/assets/paracetamol.png";
import CollectModal from "./collect.modal";

export default function PrescriptionView({ params }: Route.ComponentProps) {
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  return (
    <>
      <div className="sticky top-0 bg-white p-6 shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="-m-2 grid p-2 transition active:scale-95 active:opacity-75"
        >
          <ArrowLeft weight="bold" className="size-5" />
        </button>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">#{params.id}</h1>
        <p className="text-gray-600">Mr John Doe</p>

        <div className="mt-4 flex items-center pb-6">
          <div className="h-0.5 w-8 flex-none bg-emerald-600"></div>
          <div className="grid size-10 place-items-center rounded-full bg-emerald-600">
            <ShoppingBagOpen weight="bold" className="size-5 text-white/90" />
          </div>
          <div className="h-0.5 min-w-0 flex-1 bg-emerald-600"></div>
          <div className="grid size-10 place-items-center rounded-full bg-emerald-600">
            <PaperPlaneRight weight="bold" className="size-5 text-white/90" />
          </div>
          <div className="h-0.5 min-w-0 flex-1 bg-emerald-600"></div>
          <div className="grid size-10 place-items-center rounded-full bg-emerald-600">
            <Package weight="bold" className="size-5 text-white/90" />
          </div>
          <div className="h-0.5 min-w-0 flex-1 bg-emerald-600"></div>
          <div className="relative">
            <div className="grid size-10 place-items-center rounded-full bg-emerald-600">
              <Check weight="bold" className="size-5 text-white/90" />
            </div>
            <span className="absolute left-1/2 top-full mt-1.5 w-max -translate-x-1/2 text-sm font-medium text-emerald-600">
              Ready to collect
            </span>
          </div>
          <div className="h-0.5 w-8 flex-none bg-emerald-600"></div>
        </div>
      </div>
      <div className="space-y-6 p-6 pb-24">
        <section>
          <h2 className="text-xl font-bold tracking-tight">Your pharmacy</h2>
          <div className="mt-3 rounded-md border border-gray-300 bg-white p-4 shadow-sm transition active:scale-95 active:opacity-75">
            <h3 className="text-lg font-bold tracking-tight">Cohens Chemist</h3>
            <p className="truncate text-sm text-gray-600">
              4 Privet Drive, Little Whinging, Surrey GU1 3SX
            </p>
            <div className="mt-1.5 flex items-baseline">
              <span className="text-sm font-semibold text-emerald-700">
                More info
              </span>
              <div className="flex-1"></div>
              <span className="text-xs text-gray-600">
                open today until 6pm
              </span>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-bold tracking-tight">Order details</h2>
          <div className="mt-3 space-y-3">
            <div className="relative flex gap-3 rounded-md border border-gray-300 bg-white p-2 shadow-sm transition active:scale-95 active:opacity-75">
              <span className="absolute left-2 top-2 grid size-8 place-items-center rounded-full bg-gray-300 font-semibold leading-none">
                2
              </span>
              <img src={paracetamolSrc} alt="Paracetamol" className="size-24" />
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <h3 className="truncate text-lg font-bold tracking-tight">
                  Paracetamol
                </h3>
                <p className="truncate text-sm text-gray-600">500mg capsules</p>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-sm font-semibold text-emerald-700">
                    Dosage info
                  </span>
                </div>
              </div>
            </div>
            <div className="relative flex gap-3 rounded-md border border-gray-300 bg-white p-2 shadow-sm transition active:scale-95 active:opacity-75">
              <span className="absolute left-2 top-2 grid size-8 place-items-center rounded-full bg-gray-300 font-semibold leading-none">
                2
              </span>
              <img src={paracetamolSrc} alt="Paracetamol" className="size-24" />
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <h3 className="truncate text-lg font-bold tracking-tight">
                  Paracetamol
                </h3>
                <p className="truncate text-sm text-gray-600">500mg capsules</p>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-sm font-semibold text-emerald-700">
                    Dosage info
                  </span>
                </div>
              </div>
            </div>
            <div className="relative flex gap-3 rounded-md border border-gray-300 bg-white p-2 shadow-sm transition active:scale-95 active:opacity-75">
              <span className="absolute left-2 top-2 grid size-8 place-items-center rounded-full bg-gray-300 font-semibold leading-none">
                2
              </span>
              <img src={paracetamolSrc} alt="Paracetamol" className="size-24" />
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <h3 className="truncate text-lg font-bold tracking-tight">
                  Paracetamol
                </h3>
                <p className="truncate text-sm text-gray-600">500mg capsules</p>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-sm font-semibold text-emerald-700">
                    Dosage info
                  </span>
                </div>
              </div>
            </div>
            <div className="relative flex gap-3 rounded-md border border-gray-300 bg-white p-2 shadow-sm transition active:scale-95 active:opacity-75">
              <span className="absolute left-2 top-2 grid size-8 place-items-center rounded-full bg-gray-300 font-semibold leading-none">
                2
              </span>
              <img src={paracetamolSrc} alt="Paracetamol" className="size-24" />
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <h3 className="truncate text-lg font-bold tracking-tight">
                  Paracetamol
                </h3>
                <p className="truncate text-sm text-gray-600">500mg capsules</p>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-sm font-semibold text-emerald-700">
                    Dosage info
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 isolate p-6 pt-0">
        <div className="mask-gradient absolute inset-0 -z-10 bg-gray-100/50 backdrop-blur"></div>

        <button
          onClick={() => setSearchParams({ collect: "" })}
          className="pointer-events-auto flex h-14 w-full items-center justify-center rounded-full bg-emerald-700 font-medium text-white shadow-md transition active:scale-95 active:bg-emerald-900"
        >
          <span>Collect order</span>
        </button>
      </div>
      <CollectModal params={params} />
    </>
  );
}
