import background from "@/assets/pexels-olly-3769022.jpg";
import { SafeArea } from "@capacitor-community/safe-area";
import { HandWaving, Pill } from "@phosphor-icons/react";
import { useEffect } from "react";
import { Link, href } from "react-router";

export default function AuthHome() {
  useEffect(() => {
    SafeArea.enable({
      config: {
        customColorsForSystemBars: true,
        statusBarColor: "#00000000",
        statusBarContent: "light",
        navigationBarColor: "#00000000",
        navigationBarContent: "light",
      },
    });

    return () => {
      SafeArea.enable({
        config: {
          customColorsForSystemBars: true,
          statusBarColor: "#00000000",
          statusBarContent: "dark",
          navigationBarColor: "#00000000",
          navigationBarContent: "dark",
        },
      });
    };
  });

  return (
    <>
      <div className="relative isolate h-full">
        <img
          src={background}
          alt=""
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="flex h-full flex-col bg-gradient-to-t from-black/75 p-6 text-white">
          <div className="h-safe-area-t"></div>
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
            to={href("/auth/signup")}
            className="mt-8 flex h-14 w-full items-center justify-center rounded-full bg-emerald-700 text-lg font-medium text-white shadow-md transition active:scale-95 active:bg-emerald-900"
          >
            Get started
          </Link>
          <Link
            to={href("/auth/login")}
            className="mt-3 flex h-14 w-full items-center justify-center rounded-full border border-white/40 bg-white/10 text-lg font-medium text-white shadow-md transition active:scale-95 active:opacity-75"
          >
            Login
          </Link>
          <div className="h-safe-area-b"></div>
        </div>
      </div>
    </>
  );
}
