import {
  CaretDown,
  Check,
  FirstAid,
  Funnel,
  MagnifyingGlass,
  X,
} from "@phosphor-icons/react";

export default function UsersHome() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold tracking-tight">Users</h1>
      <div className="mt-4 flex flex-wrap gap-4">
        <button className="flex h-10 items-center gap-1.5 rounded-md border border-gray-400 px-4 shadow-sm transition hover:bg-gray-200">
          <Funnel weight="bold" className="size-4 text-gray-600" />
          <span className="font-medium text-gray-700">Surname, descending</span>
          <CaretDown weight="bold" className="ml-1 size-3 text-gray-500" />
        </button>
        <button className="flex h-10 items-center gap-1.5 rounded-md border border-gray-400 px-4 shadow-sm transition hover:bg-gray-200">
          <FirstAid weight="bold" className="size-4 text-gray-600" />
          <span className="font-medium text-gray-700">All GPs</span>
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
      <div className="-mx-2 mt-6 divide-y divide-gray-300">
        <div className="flex gap-4 px-2 pb-2">
          <span className="w-2/5 flex-auto font-medium text-gray-600">
            Name
          </span>
          <span className="w-2/5 flex-auto font-medium text-gray-600">
            Phone number
          </span>
          <span className="w-3/5 flex-auto font-medium text-gray-600">GP</span>
          <span className="w-12 flex-none text-right font-medium text-gray-600">
            App
          </span>
        </div>
        <div className="flex gap-4 px-2 py-3 transition hover:bg-gray-200">
          <span className="flex w-2/5 flex-auto gap-2">
            <div className="size-6 flex-none rounded-full bg-gradient-to-br from-red-600 to-amber-600"></div>
            <span className="min-w-0 flex-1">Mr Joe Bloggs</span>
          </span>
          <span className="w-2/5 flex-auto">01234 567890</span>
          <span className="w-3/5 flex-auto">Milky Way Medical Centre</span>
          <div className="flex w-12 flex-none items-center justify-end">
            <Check className="size-4 text-green-700" />
          </div>
        </div>
        <div className="flex gap-4 px-2 py-3 transition hover:bg-gray-200">
          <span className="flex w-2/5 flex-auto gap-2">
            <div className="size-6 flex-none rounded-full bg-gradient-to-br from-lime-600 to-emerald-600"></div>
            <span className="min-w-0 flex-1">Mr John Doe</span>
          </span>
          <span className="w-2/5 flex-auto">01234 567890</span>
          <span className="w-3/5 flex-auto">Milky Way Medical Centre</span>
          <div className="flex w-12 flex-none items-center justify-end">
            <X className="size-4 text-red-700" />
          </div>
        </div>
        <div className="flex gap-4 px-2 py-3 transition hover:bg-gray-200">
          <span className="flex w-2/5 flex-auto gap-2">
            <div className="size-6 flex-none rounded-full bg-gradient-to-br from-cyan-600 to-blue-600"></div>
            <span className="min-w-0 flex-1">Mrs Jane Doe</span>
          </span>
          <span className="w-2/5 flex-auto">01234 567890</span>
          <span className="w-3/5 flex-auto">Milky Way Medical Centre</span>
          <div className="flex w-12 flex-none items-center justify-end">
            <Check className="size-4 text-green-700" />
          </div>
        </div>
        <div className="flex gap-4 px-2 py-3 transition hover:bg-gray-200">
          <span className="flex w-2/5 flex-auto gap-2">
            <div className="size-6 flex-none rounded-full bg-gradient-to-br from-indigo-600 to-violet-600"></div>
            <span className="min-w-0 flex-1">Mrs Jane Appleseed</span>
          </span>
          <span className="w-2/5 flex-auto">01234 567890</span>
          <span className="w-3/5 flex-auto">Milky Way Medical Centre</span>
          <div className="flex w-12 flex-none items-center justify-end">
            <X className="size-4 text-red-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
