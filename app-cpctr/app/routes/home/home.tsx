export default function Home() {
  return (
    <>
      <div className="bg-white p-6 shadow-md sticky top-0">
        <h1 className="text-3xl font-bold tracking-tight">Welcome Gideon!</h1>
      </div>
      <div className="p-6 space-y-6">
        <section>
          <h2 className="text-xl font-bold tracking-tight">
            Your prescriptions
          </h2>
          <div className="mt-3 space-y-3">
            <div className="bg-white border border-gray-300 rounded-md shadow-sm p-4">
              <h3 className="text-lg font-bold tracking-tight">
                #4855 / Mr John Doe
              </h3>
              <p className="text-gray-600 text-base">
                Paracetamol 500mg capsules + 2
              </p>
              <div className="mt-2 flex items-baseline">
                <span className="px-2 leading-none py-1.5 bg-emerald-200 text-emerald-800 text-sm font-semibold rounded">
                  Ready to collect
                </span>
                <div className="flex-1"></div>
                <span className="text-red-700 text-sm">expires in 2 days</span>
              </div>
            </div>
            <div className="bg-white border border-gray-300 rounded-md shadow-sm p-4">
              <h3 className="text-lg font-bold tracking-tight">
                #4857 / Mrs Jane Doe
              </h3>
              <p className="text-gray-600 text-base">
                Paracetamol 500mg capsules + 2
              </p>
              <div className="mt-2 flex items-baseline">
                <span className="px-2 leading-none py-1.5 bg-blue-200 text-blue-800 text-sm font-semibold rounded">
                  Packing order
                </span>
              </div>
            </div>
            <div className="bg-white border border-gray-300 rounded-md shadow-sm p-4">
              <h3 className="text-lg font-bold tracking-tight">
                #4863 / Mr John Doe
              </h3>
              <p className="text-gray-600 text-base">
                Paracetamol 500mg capsules + 2
              </p>
              <div className="mt-2 flex items-baseline">
                <span className="px-2 leading-none py-1.5 bg-amber-200 text-amber-800 text-sm font-semibold rounded">
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
