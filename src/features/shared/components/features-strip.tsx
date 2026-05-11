function TruckIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 4v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="15" rx="3" />
      <circle cx="8.5" cy="13" r="2" />
      <circle cx="15.5" cy="13" r="2" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.5 19.79 19.79 0 0 1 1.61 2.84 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.59a16 16 0 0 0 6.5 6.5l.95-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

const features = [
  { icon: <TruckIcon />, label: "Free Shipping", description: "Order above $200" },
  { icon: <WalletIcon />, label: "Money-back", description: "30 days guarantee" },
  { icon: <LockIcon />, label: "Secure Payments", description: "Secured by Stripe" },
  { icon: <PhoneIcon />, label: "24/7 Support", description: "Phone and Email support" },
];

export function FeaturesStrip() {
  return (
    <section className="py-12 px-8 lg:px-20 bg-white">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div key={feature.label} className="bg-[#F3F5F7] rounded-2xl p-8 flex flex-col">
            <span className="text-[#1C1C1C] mb-6">{feature.icon}</span>
            <p className="font-semibold text-base text-[#1C1C1C]">{feature.label}</p>
            <p className="text-sm text-[#807D7E] mt-1.5">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
