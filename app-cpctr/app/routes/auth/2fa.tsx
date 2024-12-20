import { trpc } from "@/lib/trpc";
import { ArrowLeft, ArrowRight, Phone } from "@phosphor-icons/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Verify() {
  const navigate = useNavigate();
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const setCodeChar = (index: number, char: string) => {
    setCode((c) => {
      const newCode = [...c];
      newCode[index] = char;
      console.log(newCode);
      return newCode;
    });
  };

  const { data: codeData } = trpc.auth.getVerifyCode.useQuery(undefined, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const { mutate, isPending } = trpc.auth.verify.useMutation({
    onSuccess: async ({ accessToken }) => {
      localStorage.setItem("access_token", accessToken);
      await navigate("/auth/finish");
    },
  });

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
        {codeData && (
          <div className="flex items-center justify-center gap-1 rounded-md border border-gray-400 p-2 px-3 text-gray-600">
            <Phone className="size-4" />
            <span>+44 •••• ••{codeData.phoneNumberPartial}</span>
          </div>
        )}
        <div>
          <p className="mb-0.5 font-semibold">One-time code</p>
          <div className="flex h-16 gap-2">
            <input
              type="text"
              maxLength={1}
              placeholder="-"
              className="!h-full min-w-0 flex-1 text-center text-2xl font-medium uppercase"
              value={code[0]}
              onChange={(e) => setCodeChar(0, e.target.value)}
            />
            <input
              type="text"
              maxLength={1}
              placeholder="-"
              className="!h-full min-w-0 flex-1 text-center text-2xl font-medium uppercase"
              value={code[1]}
              onChange={(e) => setCodeChar(1, e.target.value)}
            />
            <input
              type="text"
              maxLength={1}
              placeholder="-"
              className="!h-full min-w-0 flex-1 text-center text-2xl font-medium uppercase"
              value={code[2]}
              onChange={(e) => setCodeChar(2, e.target.value)}
            />
            <input
              type="text"
              maxLength={1}
              placeholder="-"
              className="!h-full min-w-0 flex-1 text-center text-2xl font-medium uppercase"
              value={code[3]}
              onChange={(e) => setCodeChar(3, e.target.value)}
            />
            <input
              type="text"
              maxLength={1}
              placeholder="-"
              className="!h-full min-w-0 flex-1 text-center text-2xl font-medium uppercase"
              value={code[4]}
              onChange={(e) => setCodeChar(4, e.target.value)}
            />
            <input
              type="text"
              maxLength={1}
              placeholder="-"
              className="!h-full min-w-0 flex-1 text-center text-2xl font-medium uppercase"
              value={code[5]}
              onChange={(e) => setCodeChar(5, e.target.value)}
            />
          </div>
        </div>
      </div>
      <button
        onClick={() => mutate({ code: code.join("") })}
        disabled={isPending || code.some((c) => c.length === 0)}
        className="mt-4 flex h-12 w-full items-center justify-center gap-1.5 rounded-md bg-emerald-700 font-medium text-white shadow-sm transition active:scale-95 active:bg-emerald-900 disabled:bg-gray-400"
      >
        <span>Log in</span>
        <ArrowRight weight="bold" className="size-4" />
      </button>
    </div>
  );
}
