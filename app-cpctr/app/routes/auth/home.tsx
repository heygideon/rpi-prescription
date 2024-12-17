import background from "@/assets/pexels-olly-3769022.jpg";
import { HandWaving, Pill, ShootingStar, Smiley } from "@phosphor-icons/react";

export default function AuthHome() {
  return (
    <>
      <div className="relative isolate h-full">
        <img
          src={background}
          alt=""
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="flex h-full flex-col bg-gradient-to-t from-black/75 p-6 text-white">
          <h1 className="text-center text-3xl font-light tracking-tighter">
            SuperCoolApp
          </h1>
          <div className="min-h-0 flex-1"></div>
          <div className="mx-auto w-full max-w-sm space-y-2 text-[56px] font-bold leading-none">
            <h2>Your</h2>
            <div className="flex items-center justify-end gap-2 pr-6 text-emerald-300">
              <Pill weight="duotone" className="size-10" />
              <h2>pharmacy</h2>
            </div>
            <h2 className="pl-6">in your</h2>
            <div className="flex items-center justify-end gap-2 text-amber-300">
              <HandWaving weight="duotone" className="size-10" />
              <h2>pocket.</h2>
            </div>
          </div>
          <button className="mt-8 flex h-14 w-full items-center justify-center rounded-full bg-emerald-700 text-lg font-medium text-white shadow-md transition active:scale-95 active:bg-emerald-900">
            Get started
          </button>
          <button className="mt-3 flex h-14 w-full items-center justify-center rounded-full border border-white/40 bg-white/10 text-lg font-medium text-white shadow-md transition active:scale-95 active:opacity-75">
            Login
          </button>
          <div className="mt-3 hidden w-full space-y-3 text-black">
            <div className="flex items-center gap-3 rounded-md bg-white p-3 shadow-sm transition active:scale-95 active:opacity-75">
              <div className="grid size-12 flex-none place-items-center rounded bg-blue-200">
                <ShootingStar weight="fill" className="size-8 text-blue-700" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <h3 className="text-lg font-semibold tracking-tight">
                  Create account
                </h3>
                <p className="-mt-px text-sm text-gray-600">
                  Save time & collect your medicine faster
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-md bg-white p-3 shadow-sm transition active:scale-95 active:opacity-75">
              <div className="grid size-12 flex-none place-items-center rounded bg-emerald-200">
                <Smiley weight="fill" className="size-8 text-emerald-700" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <h3 className="text-lg font-semibold tracking-tight">Log in</h3>
                <p className="-mt-px text-sm text-gray-600">
                  Link your existing account to this phone
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
