import { Outlet } from "react-router";

export default function CounterUserLayout() {
  return (
    <div className="flex h-full">
      <div className="w-1/3 flex-auto overflow-y-auto border-r border-gray-300 p-8">
        <div className="text-center">
          <div className="mx-auto grid size-20 place-items-center rounded-full bg-gradient-to-br from-red-600 to-amber-600 text-white shadow">
            <span className="text-4xl font-medium leading-none">JD</span>
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">John Doe</h1>
        </div>
        <div className="mt-4 divide-y divide-gray-300 border-y border-gray-300">
          <div className="flex py-3">
            <div className="w-2/5 flex-auto text-gray-600">Date of birth</div>
            <div className="w-3/5 flex-auto">1st January 1970</div>
          </div>
          <div className="flex py-3">
            <div className="w-2/5 flex-auto text-gray-600">Home address</div>
            <div className="w-3/5 flex-auto">4 Privet Drive, L22 9ED</div>
          </div>
          <div className="flex py-3">
            <div className="w-2/5 flex-auto text-gray-600">Mobile phone</div>
            <div className="w-3/5 flex-auto">01234 567890</div>
          </div>
          <div className="flex py-3">
            <div className="w-2/5 flex-auto text-gray-600">Home phone</div>
            <div className="w-3/5 flex-auto">0152 123 4567</div>
          </div>
          <div className="flex py-3">
            <div className="w-2/5 flex-auto text-gray-600">Email</div>
            <div className="w-3/5 flex-auto">john.doe@email.com</div>
          </div>
          <div className="flex py-3">
            <div className="w-2/5 flex-auto text-gray-600">Family members</div>
            <div className="w-3/5 flex-auto">1 nominated</div>
          </div>
        </div>
      </div>
      <div className="relative w-2/3 flex-auto">
        <div className="size-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
