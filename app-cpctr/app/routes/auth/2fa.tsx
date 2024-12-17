import { ArrowLeft, ArrowRight, Phone } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router";

export default function Verify() {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-full flex-col justify-center p-6 text-center">
      <Link to="/auth/login" className="absolute left-4 top-4 p-2">
        <ArrowLeft weight="bold" className="size-5" />
      </Link>

      <div className="mx-auto mb-1 grid size-12 place-items-center rounded-full bg-yellow-700 text-white shadow">
        <span className="text-xl font-medium leading-none">JB</span>
      </div>
      <h1 className="text-3xl font-bold tracking-tight">Hey Joe!</h1>
      <p className="mt-0.5 text-sm text-gray-600">
        We've sent a code to your phone, to check it's really you.
      </p>
      <div className="mt-3 space-y-3 text-left">
        <div className="flex items-center justify-center gap-1 rounded-md border border-gray-400 p-2 px-3 text-gray-600">
          <Phone className="size-4" />
          <span>+44 •••• ••1123</span>
        </div>
        <div>
          <p className="mb-0.5 font-semibold">One-time code</p>
          <div className="flex h-16 gap-2">
            <input
              type="text"
              maxLength={1}
              placeholder="-"
              className="!h-full min-w-0 flex-1 text-center text-2xl font-medium uppercase"
            />
            <input
              type="text"
              maxLength={1}
              placeholder="-"
              className="!h-full min-w-0 flex-1 text-center text-2xl font-medium uppercase"
            />
            <input
              type="text"
              maxLength={1}
              placeholder="-"
              className="!h-full min-w-0 flex-1 text-center text-2xl font-medium uppercase"
            />
            <input
              type="text"
              maxLength={1}
              placeholder="-"
              className="!h-full min-w-0 flex-1 text-center text-2xl font-medium uppercase"
            />
            <input
              type="text"
              maxLength={1}
              placeholder="-"
              className="!h-full min-w-0 flex-1 text-center text-2xl font-medium uppercase"
            />
            <input
              type="text"
              maxLength={1}
              placeholder="-"
              className="!h-full min-w-0 flex-1 text-center text-2xl font-medium uppercase"
            />
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate("/auth/finish")}
        className="mt-4 flex h-12 w-full items-center justify-center gap-1.5 rounded-md bg-emerald-700 font-medium text-white shadow-sm transition active:scale-95 active:bg-emerald-900"
      >
        <span>Log in</span>
        <ArrowRight weight="bold" className="size-4" />
      </button>
    </div>
  );
}
