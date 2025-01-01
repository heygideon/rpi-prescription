import { trpc } from "@/lib/trpc";
import {
  ArrowLeft,
  ArrowRight,
  HandWaving,
  Phone,
} from "@phosphor-icons/react";
import clsx from "clsx";
import {
  OTPInput,
  REGEXP_ONLY_DIGITS_AND_CHARS,
  type SlotProps,
} from "input-otp";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

function OTPSlot({ char, hasFakeCaret, isActive }: SlotProps) {
  return (
    <div
      className={clsx(
        "flex h-16 min-w-0 flex-1 items-center justify-center text-3xl outline-2 outline-emerald-600 first:rounded-l-md last:rounded-r-md",
        isActive && "!border-transparent outline",
      )}
    >
      {char !== null && <span className="font-medium uppercase">{char}</span>}
      {hasFakeCaret && (
        <span className="animate-caret-blink text-gray-500">|</span>
      )}
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyCode, setVerifyCode] = useState("");

  const queryUtils = trpc.useUtils();

  const {
    data,
    mutate: login,
    isPending: loginIsPending,
    reset: resetLogin,
  } = trpc.auth.login.useMutation({
    onSuccess: () => {
      setPassword("");
    },
  });
  const { mutate: verify, isPending: verifyIsPending } =
    trpc.auth.verify.useMutation({
      onSuccess: async ({ accessToken, refreshToken }) => {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        queryUtils.auth.me.invalidate();
        await navigate("/auth/finish");
      },
    });

  return (
    <div className="relative h-full text-center">
      {!data ? (
        <div className="flex h-full flex-col justify-center p-6">
          <Link to="/auth" className="absolute left-4 top-4 p-2">
            <ArrowLeft weight="bold" className="size-5" />
          </Link>

          <HandWaving
            weight="duotone"
            className="mx-auto size-8 text-amber-700"
          />
          <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
          <div className="mt-3 space-y-3 text-left">
            <div>
              <p className="mb-0.5 font-semibold">Email</p>
              <input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <p className="mb-0.5 font-semibold">Password</p>
              <input
                type="password"
                placeholder="Enter your password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            disabled={loginIsPending || !email || !password}
            onClick={() =>
              login({
                email,
                password,
              })
            }
            className="mt-4 flex h-12 w-full items-center justify-center gap-1.5 rounded-md bg-emerald-700 font-medium text-white shadow-sm transition active:scale-95 active:bg-emerald-900 disabled:bg-gray-400"
          >
            <span>Continue</span>
            <ArrowRight weight="bold" className="size-4" />
          </button>
          <p className="mt-3 font-medium text-emerald-700 transition active:scale-95 active:text-emerald-900">
            Forgot your password?
          </p>
        </div>
      ) : (
        <div className="flex h-full flex-col justify-center p-6">
          <button
            onClick={() => {
              setVerifyCode("");
              resetLogin();
            }}
            className="absolute left-4 top-4 p-2"
          >
            <ArrowLeft weight="bold" className="size-5" />
          </button>

          <div className="mx-auto mb-1 grid size-12 place-items-center rounded-full bg-yellow-700 text-white shadow">
            <span className="text-xl font-medium leading-none">
              {data.user.firstName[0].toUpperCase() +
                data.user.lastName[0].toUpperCase()}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Hey {data.user.firstName}!
          </h1>
          <p className="mt-0.5 text-sm text-gray-600">
            We've sent a code to your phone, to check it's really you.
          </p>
          <div className="mt-3 space-y-3 text-left">
            <div className="flex items-center justify-center gap-1 rounded-md border border-gray-400 p-2 px-3 text-gray-600">
              <Phone className="size-4" />
              <span>+44 •••• ••{data.user.phoneNumberPartial}</span>
            </div>
            <div>
              <p className="mb-0.5 font-semibold">One-time code</p>
              <OTPInput
                maxLength={6}
                pasteTransformer={(value) => value.replace("-", "")}
                inputMode="text"
                containerClassName="flex items-center gap-2"
                value={verifyCode}
                onChange={setVerifyCode}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                autoFocus={true}
                render={({ slots }) => (
                  <>
                    <div className="flex min-w-0 flex-1 gap-px divide-x divide-gray-400 rounded-md border border-gray-400 bg-white shadow-sm">
                      {slots.slice(0, 3).map((slot, i) => (
                        <OTPSlot key={i} {...slot} />
                      ))}
                    </div>
                    <p className="text-3xl font-medium text-gray-400">-</p>
                    <div className="flex min-w-0 flex-1 gap-px divide-x divide-gray-400 rounded-md border border-gray-400 bg-white shadow-sm">
                      {slots.slice(3).map((slot, i) => (
                        <OTPSlot key={i} {...slot} />
                      ))}
                    </div>
                  </>
                )}
              />
            </div>
          </div>
          <button
            onClick={() =>
              verify({ sessionId: data.sessionId, code: verifyCode })
            }
            disabled={verifyIsPending || verifyCode.length !== 6}
            className="mt-4 flex h-12 w-full items-center justify-center gap-1.5 rounded-md bg-emerald-700 font-medium text-white shadow-sm transition active:scale-95 active:bg-emerald-900 disabled:bg-gray-400"
          >
            <span>Log in</span>
            <ArrowRight weight="bold" className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
