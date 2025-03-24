import { Outlet } from "react-router";

export default function LoginLayout() {
  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-cyan-600 to-cyan-700 p-12">
      <div className="mx-auto max-w-lg rounded-xl bg-white p-1.5 shadow-lg">
        <div className="rounded-lg border-2 border-dashed border-gray-200 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
