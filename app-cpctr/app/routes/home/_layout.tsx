import { Outlet } from "react-router";

export default function HomeLayout() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <Outlet />
      </div>
      <div className="h-16 flex bg-white shadow-lg"></div>
    </div>
  );
}
