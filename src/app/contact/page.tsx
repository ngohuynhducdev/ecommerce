import { MapPin, Phone, Clock } from "lucide-react";
import { ContactForm } from "@/features/contact/components/contact-form";

const INFO_CARDS = [
  {
    icon: MapPin,
    title: "Our Address",
    value: "123 Furniture Lane, New York, NY 10001",
  },
  {
    icon: Phone,
    title: "Phone Number",
    value: "+1 (555) 000-0000",
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "Mon – Fri: 9am – 6pm\nSat: 10am – 4pm",
  },
];

export default function ContactPage() {
  return (
    <div className="px-8 lg:px-20 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-semibold mb-3">Contact Us</h1>
        <p className="text-[#807D7E] max-w-md mx-auto">
          Have a question or need help? We&apos;d love to hear from you. Send us a
          message and we&apos;ll respond as soon as possible.
        </p>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {INFO_CARDS.map(({ icon: Icon, title, value }) => (
          <div
            key={title}
            className="bg-[#F3F5F7] rounded-2xl p-8 text-center"
          >
            <Icon size={32} className="mx-auto mb-4 text-[#1C1C1C]" />
            <p className="font-semibold mb-2">{title}</p>
            <p className="text-[#807D7E] text-sm whitespace-pre-line">{value}</p>
          </div>
        ))}
      </div>

      {/* Form + Map */}
      <div className="lg:grid lg:grid-cols-2 gap-16">
        {/* Contact form */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
          <ContactForm />
        </div>

        {/* Map placeholder */}
        <div className="mt-10 lg:mt-0 bg-[#F3F5F7] min-h-[400px] rounded-2xl flex flex-col items-center justify-center">
          <MapPin size={48} className="text-[#807D7E]" />
          <p className="text-[#807D7E] mt-3 font-medium">Our Location</p>
          <p className="text-[#807D7E] text-sm mt-1">123 Furniture Lane, New York, NY</p>
        </div>
      </div>
    </div>
  );
}
