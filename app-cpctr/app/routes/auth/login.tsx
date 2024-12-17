import { ArrowLeft, ArrowRight, HandWaving } from "@phosphor-icons/react";
import { Link } from "react-router";

export default function Login() {
  return (
    <div className="relative flex h-full flex-col justify-center p-6 text-center">
      <Link to="/auth" className="absolute left-4 top-4 p-2">
        <ArrowLeft weight="bold" className="size-5" />
      </Link>

      <HandWaving weight="duotone" className="mx-auto size-8 text-amber-700" />
      <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
      <div className="mt-3 space-y-3 text-left">
        <div>
          <p className="mb-0.5 font-semibold">Email</p>
          <input type="email" placeholder="Enter your email..." />
        </div>
        <div>
          <p className="mb-0.5 font-semibold">Password</p>
          <input type="password" placeholder="Enter your password..." />
        </div>
      </div>
      <button className="mt-4 flex h-12 w-full items-center justify-center gap-1.5 rounded-md bg-emerald-700 font-medium text-white shadow-sm transition active:scale-95 active:bg-emerald-900">
        <span>Continue</span>
        <ArrowRight weight="bold" className="size-4" />
      </button>
      <p className="mt-3 font-medium text-emerald-700 transition active:scale-95 active:text-emerald-900">
        Forgot your password?
      </p>
    </div>
  );
}
