import {
  ArrowLeft,
  ArrowRight,
  DeviceMobile,
  Envelope,
  Key,
  ShootingStar,
} from "@phosphor-icons/react";
import { href, Link } from "react-router";

export default function Signup() {
  return (
    <div className="h-full pb-safe-area-b pt-safe-area-t">
      <div className="relative flex h-full flex-col justify-center p-6 text-center">
        <Link to={href("/auth")} className="absolute left-4 top-4 p-2">
          <ArrowLeft weight="bold" className="size-5" />
        </Link>

        <ShootingStar
          weight="duotone"
          className="mx-auto size-8 text-blue-700"
        />
        <h1 className="text-3xl font-bold tracking-tight">Nice to meet you!</h1>
        <p className="mt-0.5 text-sm text-gray-600">
          Welcome to PharmaPoint - we're the easy and secure way to request and
          collect your prescriptions, right from your phone.
        </p>
        <p className="mt-3 font-bold">Make sure you've got ready:</p>
        <div className="mt-2 space-y-3 text-left">
          <div className="flex items-center gap-2">
            <div className="grid size-12 flex-none place-items-center">
              <div className="col-start-1 row-start-1 h-4 w-10 -rotate-3 rounded-[100%] bg-sky-200"></div>
              <DeviceMobile className="col-start-1 row-start-1 size-8 rotate-2 text-sky-700" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium leading-snug">
                Your email and mobile phone
              </p>
              <p className="text-xs text-gray-600">
                This is how you'll log in.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="grid size-12 flex-none place-items-center">
              <div className="col-start-1 row-start-1 h-4 w-10 rotate-3 rounded-[100%] bg-indigo-200"></div>
              <Key className="col-start-1 row-start-1 size-8 -rotate-2 text-indigo-700" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium leading-snug">
                A super-secret password
              </p>
              <p className="text-xs text-gray-600">
                Make sure you don't re-use this on other apps.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="grid size-12 flex-none place-items-center">
              <div className="col-start-1 row-start-1 h-4 w-10 -rotate-3 rounded-[100%] bg-violet-200"></div>
              <Envelope className="col-start-1 row-start-1 size-8 rotate-2 text-violet-700" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium leading-snug">Your magic invite code</p>
              <p className="text-xs text-gray-600">
                This is from your GP, so check your texts or emails.
              </p>
            </div>
          </div>
        </div>
        <button className="mt-4 flex h-12 w-full items-center justify-center gap-1.5 rounded-md bg-emerald-700 font-medium text-white shadow-sm transition active:scale-95 active:bg-emerald-900">
          <span>Continue</span>
          <ArrowRight weight="bold" className="size-4" />
        </button>
      </div>
    </div>
  );
}
