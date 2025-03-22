export default function UserAbout() {
  return (
    <div className="space-y-6 p-8 pt-6">
      <section>
        <h3 className="text-lg font-bold tracking-tight">Customer info</h3>
        <div className="mt-2 divide-y divide-gray-300 border-y border-gray-300">
          <div className="flex gap-3 py-3">
            <p className="w-1/2 min-w-0 flex-auto font-medium">Date of birth</p>
            <p className="w-1/2 min-w-0 flex-auto text-gray-700">
              17th August 1982
            </p>
          </div>
          <div className="flex gap-3 py-3">
            <p className="w-1/2 min-w-0 flex-auto font-medium">Mobile phone</p>
            <p className="w-1/2 min-w-0 flex-auto text-gray-700">
              07700 900908
            </p>
          </div>
          <div className="flex gap-3 py-3">
            <p className="w-1/2 min-w-0 flex-auto font-medium">Home phone</p>
            <p className="w-1/2 min-w-0 flex-auto text-gray-700">
              01632 960123
            </p>
          </div>
          <div className="flex gap-3 py-3">
            <p className="w-1/2 min-w-0 flex-auto font-medium">Email</p>
            <p className="w-1/2 min-w-0 flex-auto text-gray-700">
              joe.bloggs@example.com
            </p>
          </div>
          <div className="flex gap-3 py-3">
            <p className="w-1/2 min-w-0 flex-auto font-medium">Address</p>
            <p className="w-1/2 min-w-0 flex-auto leading-relaxed text-gray-700">
              4 Privet Drive
              <br />
              Little Whinging
              <br />
              Surrey
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold tracking-tight">GP</h3>
        <div className="mt-2 divide-y divide-gray-300 border-y border-gray-300">
          <div className="flex gap-3 py-3">
            <p className="w-1/2 min-w-0 flex-auto font-medium">Name</p>
            <p className="w-1/2 min-w-0 flex-auto text-gray-700">
              Milky Way Medical Centre
            </p>
          </div>
          <div className="flex gap-3 py-3">
            <p className="w-1/2 min-w-0 flex-auto font-medium">Phone</p>
            <p className="w-1/2 min-w-0 flex-auto text-gray-700">
              01632 960456
            </p>
          </div>
          <div className="flex gap-3 py-3">
            <p className="w-1/2 min-w-0 flex-auto font-medium">Email</p>
            <p className="w-1/2 min-w-0 flex-auto text-gray-700">
              milky.way@nhs.uk
            </p>
          </div>
          <div className="flex gap-3 py-3">
            <p className="w-1/2 min-w-0 flex-auto font-medium">Address</p>
            <p className="w-1/2 min-w-0 flex-auto leading-relaxed text-gray-700">
              5 Milky Way
              <br />
              Little Whinging
              <br />
              Surrey
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold tracking-tight">Family members</h3>
        <p className="text-sm font-medium text-emerald-700">
          &ndash; people who can collect prescriptions for Joe
        </p>
        <div className="mt-2 divide-y divide-gray-300 border-y border-gray-300">
          <p className="py-3 text-sm text-gray-600">No users</p>
        </div>
      </section>
    </div>
  );
}
