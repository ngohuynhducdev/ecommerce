import { MapPin } from "lucide-react";

export default function AddressesPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">My Addresses</h1>
      <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-[#E8ECEF] rounded-2xl">
        <MapPin size={40} className="text-[#E8ECEF] mb-4" />
        <p className="text-base font-medium mb-1">No saved addresses</p>
        <p className="text-sm text-[#807D7E]">
          Addresses you save will appear here
        </p>
      </div>
    </div>
  );
}
