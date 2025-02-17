import { Switch } from "@headlessui/react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import clsx from "clsx";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="pt-safe-area-t pb-safe-area-b h-full">
      <div className="relative flex h-full flex-col justify-center p-6 text-center">
        <div className="mx-auto mb-2 grid size-12 place-items-center rounded-full bg-yellow-700 text-white shadow">
          <span className="text-xl font-medium leading-none">JB</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">You're logged in</h1>
        <p className="mt-1 leading-snug text-gray-600">
          Before you finish, here are some extra features. If you need these
          later, they're in{" "}
          <strong className="font-bold text-black">You &gt; Settings</strong>.
        </p>
        <div className="mt-4 space-y-4 text-left">
          <div className="flex">
            <div className="min-w-0 flex-1">
              <p className="font-medium leading-snug">🔒 App lock</p>
              <p className="text-xs text-gray-600">
                Require your fingerprint to open the app
              </p>
            </div>
            <Switch>
              {({ checked }) => (
                <div
                  className={clsx(
                    "group inline-flex h-6 w-11 items-center rounded-full",
                    checked ? "bg-blue-600" : "bg-gray-300",
                  )}
                >
                  <span
                    className={clsx(
                      "size-4 rounded-full bg-white transition",
                      checked ? "translate-x-6" : "translate-x-1",
                    )}
                  />
                </div>
              )}
            </Switch>
          </div>
          <div className="flex">
            <div className="min-w-0 flex-1">
              <p className="font-medium leading-snug">♿ Accessible pick-up</p>
              <p className="text-xs text-gray-600">
                Prefer lockers at wheelchair height
              </p>
            </div>
            <Switch>
              {({ checked }) => (
                <div
                  className={clsx(
                    "group inline-flex h-6 w-11 items-center rounded-full",
                    checked ? "bg-blue-600" : "bg-gray-300",
                  )}
                >
                  <span
                    className={clsx(
                      "size-4 rounded-full bg-white transition",
                      checked ? "translate-x-6" : "translate-x-1",
                    )}
                  />
                </div>
              )}
            </Switch>
          </div>
        </div>
        <button
          onClick={() => navigate("/")}
          className="mt-5 flex h-12 w-full items-center justify-center gap-1.5 rounded-md bg-emerald-700 font-medium text-white shadow-sm transition active:scale-95 active:bg-emerald-900"
        >
          <span>Finish</span>
          <ArrowRight weight="bold" className="size-4" />
        </button>
      </div>
    </div>
  );
}
