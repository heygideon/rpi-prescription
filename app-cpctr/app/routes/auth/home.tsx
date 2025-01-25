import background from "@/assets/pexels-olly-3769022.jpg";
import {
  HandWaving,
  Pill,
  ShootingStar,
  Smiley,
  Star,
} from "@phosphor-icons/react";
import { Link } from "react-router";

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
          <Link
            to="/auth/signup"
            className="mt-8 flex h-14 w-full items-center justify-center rounded-full bg-emerald-700 text-lg font-medium text-white shadow-md transition active:scale-95 active:bg-emerald-900"
          >
            Get started
          </Link>
          <Link
            to="/auth/login"
            className="mt-3 flex h-14 w-full items-center justify-center rounded-full border border-white/40 bg-white/10 text-lg font-medium text-white shadow-md transition active:scale-95 active:opacity-75"
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
