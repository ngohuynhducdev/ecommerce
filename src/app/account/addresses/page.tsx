function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

interface Address {
  title: string;
  name: string;
  phone: string;
  line: string;
}

const ADDRESSES: Address[] = [
  {
    title: "Billing Address",
    name: "Sofia Havertz",
    phone: "(+1) 234 567 890",
    line: "345 Long Island, NewYork, United States",
  },
  {
    title: "Shipping Address",
    name: "Sofia Havertz",
    phone: "(+1) 234 567 890",
    line: "345 Long Island, NewYork, United States",
  },
];

export default function AddressesPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-ink mb-6">Address</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {ADDRESSES.map((addr) => (
          <div key={addr.title} className="border border-line rounded-xl p-6">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-ink">{addr.title}</h3>
              <button className="flex items-center gap-1 text-sm text-subtle hover:text-ink transition-colors cursor-pointer">
                <EditIcon />
                Edit
              </button>
            </div>
            <div className="mt-4 space-y-1 text-sm text-subtle">
              <p className="font-medium text-ink">{addr.name}</p>
              <p>{addr.phone}</p>
              <p>{addr.line}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
