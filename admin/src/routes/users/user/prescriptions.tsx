import paracetamolSrc from "@/assets/paracetamol.png";
import ibuprofenSrc from "@/assets/ibuprofen.png";
import { CaretDown, Funnel, MagnifyingGlass } from "@phosphor-icons/react";

export default function UserPrescriptions() {
  return (
    <div className="p-8 pt-6">
      <div className="flex flex-wrap gap-4">
        <button className="flex h-10 items-center gap-1.5 rounded-md border border-gray-400 px-4 shadow-sm transition hover:bg-gray-200">
          <Funnel weight="bold" className="size-4 text-gray-600" />
          <span className="font-medium text-gray-700">
            Last issued, descending
          </span>
          <CaretDown weight="bold" className="ml-1 size-3 text-gray-500" />
        </button>
        <div className="relative h-10 w-64">
          <MagnifyingGlass
            weight="bold"
            className="absolute left-3 top-3 size-4 text-gray-600"
          />
          <input
            type="text"
            placeholder="Search..."
            id=""
            className="!size-full !pl-8"
          />
        </div>
      </div>

      <div className="mt-6 divide-y divide-gray-300 border-y border-gray-300">
        <div className="py-4">
          <div className="flex items-center gap-3">
            <img
              src={paracetamolSrc}
              alt=""
              className="size-24 object-contain"
            />
            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-bold tracking-tight">Paracetamol</h3>
              <p>500mg capsules</p>
              <p className="mt-px text-sm text-gray-600">
                Last issued 20th January 2025
              </p>
            </div>
          </div>
          <div className="mt-2 border-l-2 border-amber-500 bg-amber-100 p-2 px-3">
            <p className="mb-1 text-sm font-medium text-amber-700">
              Milky Way Medical Centre
            </p>
            <p className="">Take 1 capsule as needed</p>
          </div>
        </div>
        <div className="py-4">
          <div className="flex items-center gap-3">
            <img src={ibuprofenSrc} alt="" className="size-24 object-contain" />
            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-bold tracking-tight">Ibuprofen</h3>
              <p>200mg capsules</p>
              <p className="mt-px text-sm text-gray-600">
                Last issued 20th January 2025
              </p>
            </div>
          </div>
          <div className="mt-2 border-l-2 border-amber-500 bg-amber-100 p-2 px-3">
            <p className="mb-1 text-sm font-medium text-amber-700">
              Milky Way Medical Centre
            </p>
            <p className="">Take 1 capsule as needed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
