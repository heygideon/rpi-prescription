import { Link } from "react-router";

export default function Home() {
  return (
    <>
      <div className="sticky top-0 bg-white p-6 shadow-md">
        <h1 className="text-3xl font-bold tracking-tight">Hey Gideon!</h1>
      </div>
      <div className="space-y-6 p-6">
        <section>
          <h2 className="text-xl font-bold tracking-tight">
            Your prescriptions
          </h2>
          <div className="mt-3 space-y-3">
            <Link
              to="/prescription/4855"
              className="block rounded-md border border-gray-300 bg-white p-4 shadow-sm transition active:scale-95 active:opacity-75"
            >
              <h3 className="text-lg font-bold tracking-tight">
                #4855 / Mr John Doe
              </h3>
              <p className="text-sm text-gray-600">
                Paracetamol 500mg capsules + 2
              </p>
              <div className="mt-1.5 flex items-baseline">
                <span className="rounded bg-emerald-200 px-2 py-1.5 text-sm font-semibold leading-none text-emerald-800">
                  Ready to collect
                </span>
                <div className="flex-1"></div>
                <span className="text-sm text-red-700">expires in 2 days</span>
              </div>
            </Link>
            <div className="rounded-md border border-gray-300 bg-white p-4 shadow-sm transition active:scale-95 active:opacity-75">
              <h3 className="text-lg font-bold tracking-tight">
                #4857 / Mrs Jane Doe
              </h3>
              <p className="text-sm text-gray-600">
                Paracetamol 500mg capsules + 2
              </p>
              <div className="mt-1.5 flex items-baseline">
                <span className="rounded bg-blue-200 px-2 py-1.5 text-sm font-semibold leading-none text-blue-800">
                  Packing order
                </span>
              </div>
            </div>
            <div className="rounded-md border border-gray-300 bg-white p-4 shadow-sm transition active:scale-95 active:opacity-75">
              <h3 className="text-lg font-bold tracking-tight">
                #4863 / Mr John Doe
              </h3>
              <p className="text-sm text-gray-600">
                Paracetamol 500mg capsules + 2
              </p>
              <div className="mt-1.5 flex items-baseline">
                <span className="rounded bg-amber-200 px-2 py-1.5 text-sm font-semibold leading-none text-amber-800">
                  Sent to GP
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
