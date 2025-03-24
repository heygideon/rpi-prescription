import { Outlet } from "react-router";

export default function LoginLayout() {
  return (
    <div className="relative isolate h-full overflow-y-auto bg-gradient-to-br from-cyan-600 to-cyan-800 p-12">
      <div className="bg-noise absolute inset-0 -z-10 invert"></div>
      <div className="mx-auto max-w-lg rounded-xl bg-white p-1.5 shadow-lg">
        <div className="rounded-lg border-2 border-dashed border-gray-200 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
