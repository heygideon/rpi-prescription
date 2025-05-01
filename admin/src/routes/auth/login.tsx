import { trpc } from "@repo/trpc";
import {
  ArrowLeft,
  ArrowRight,
  HandWaving,
  Warning,
} from "@phosphor-icons/react";
import clsx from "clsx";
import {
  OTPInput,
  REGEXP_ONLY_DIGITS_AND_CHARS,
  type SlotProps,
} from "input-otp";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { auth } from "@/lib/auth";

function OTPSlot({ char, hasFakeCaret, isActive }: SlotProps) {
  return (
    <div
      className={clsx(
        "flex h-16 min-w-0 flex-1 items-center justify-center text-2xl outline-2 outline-emerald-600 first:rounded-l-md last:rounded-r-md",
        isActive && "!border-transparent outline",
      )}
    >
      {char ? (
        <span className="font-medium uppercase">{char}</span>
      ) : hasFakeCaret ? (
        <span className="animate-caret-blink col-start-1 row-start-1 text-gray-800">
          |
        </span>
      ) : (
        <span className="text-gray-300">-</span>
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

  const login = useMutation({
    mutationFn: (data: Parameters<typeof auth.login>[0]) => auth.login(data),
  });

  const verify = useMutation({
    mutationFn: (data: Parameters<typeof auth.verify>[0]) => auth.verify(data),
    onSuccess: async () => {
      await queryUtils.auth.me.invalidate();
      await navigate("/");
    },
  });

  if (login.data) {
    return (
      <div className="">
        <button
          onClick={() => {
            setVerifyCode("");
            login.reset();
          }}
          className="-m-2 p-2"
        >
          <ArrowLeft weight="bold" className="size-5" />
        </button>

        <div className="mt-4 flex items-center gap-1.5">
          <div className="grid size-7 place-items-center rounded-full bg-yellow-700 text-white shadow">
            <span className="text-xs font-medium leading-none">
              {login.data.user.firstName[0].toUpperCase() +
                login.data.user.lastName[0].toUpperCase()}
            </span>
          </div>
          <span>
            <span className="font-medium">{login.data.user.firstName}</span>{" "}
            <span className="text-gray-600">
              &middot; {login.data.user.email}
            </span>
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Check your phone
        </h1>
        <p className="mt-1 leading-snug text-gray-600">
          We've sent a code to your mobile phone, ending&nbsp;
          <strong className="font-bold text-black">
            {login.data.user.phoneNumberPartial}
          </strong>
          .
        </p>
        <div className="mt-3 border border-gray-300 p-2 text-gray-600">
          For this demo, the code is&nbsp;
          <strong className="font-bold text-black">
            {login.data.unsafe_code}
          </strong>
          .
        </div>
        <div className="mt-4 space-y-3 text-left">
          {verify.error && (
            <div className="flex gap-2 border-l-2 border-l-red-500 bg-red-100 p-2 px-3">
              <Warning weight="bold" className="mt-1 size-4 text-red-600" />
              <p className="text-red-700">{verify.error.message}</p>
            </div>
          )}
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
                  <div className="flex min-w-0 flex-1 gap-2">
                    {slots.slice(0, 3).map((slot, i) => (
                      <div
                        key={i}
                        className="min-w-0 flex-1 rounded-md border border-gray-400 bg-white shadow-sm"
                      >
                        <OTPSlot {...slot} />
                      </div>
                    ))}
                  </div>
                  {/* <p className="mx-1 text-3xl font-medium text-gray-400">-</p> */}
                  {/* <div className="flex min-w-0 flex-1 gap-px divide-x divide-gray-400 rounded-md border border-gray-400 bg-white shadow-sm">
                      {slots.slice(3).map((slot, i) => (
                        <OTPSlot key={i} {...slot} />
                      ))}
                    </div> */}
                  <div className="flex min-w-0 flex-1 gap-2">
                    {slots.slice(3).map((slot, i) => (
                      <div
                        key={i}
                        className="min-w-0 flex-1 rounded-md border border-gray-400 bg-white shadow-sm"
                      >
                        <OTPSlot {...slot} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            />
          </div>
        </div>
        <button
          onClick={() =>
            verify.mutate({
              sessionId: login.data.sessionId,
              code: verifyCode,
            })
          }
          disabled={verify.isPending || verifyCode.length !== 6}
          className="mt-4 flex h-12 w-full items-center justify-center gap-1.5 rounded-md bg-emerald-700 font-medium text-white shadow-sm transition active:scale-95 active:bg-emerald-900 disabled:bg-gray-400"
        >
          <span>Log in</span>
          <ArrowRight weight="bold" className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        login.mutate({
          email,
          password,
        });
      }}
    >
      <p className="text-center text-xl font-bold tracking-tight text-emerald-700">
        PharmaPoint <span className="font-medium text-gray-600">Admin</span>
      </p>

      <h1 className="mt-4 text-3xl font-bold tracking-tight">Welcome back!</h1>
      {login.error && (
        <div className="mt-3 flex gap-2 border-l-2 border-l-red-500 bg-red-100 p-2 px-3">
          <Warning weight="bold" className="mt-1 size-4 text-red-600" />
          <p className="text-red-700">{login.error.message}</p>
        </div>
      )}
      <div className="mt-4 space-y-4 text-left">
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
        type="submit"
        disabled={login.isPending || !email || !password}
        className="mt-4 flex h-12 w-full items-center justify-center gap-1.5 rounded-md bg-emerald-700 font-medium text-white shadow-sm transition active:scale-95 active:bg-emerald-900 disabled:bg-gray-400"
      >
        <span>Continue</span>
        <ArrowRight weight="bold" className="size-4" />
      </button>
      <p className="mt-3 font-medium text-emerald-700 transition active:scale-95 active:text-emerald-900">
        Forgot your password?
      </p>
    </form>
  );
}
