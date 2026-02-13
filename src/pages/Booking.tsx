import { useState } from "react";
import { createBooking } from "@/services/bookingService";

const samplePackages = [
  { id: "pkg-1", title: "Classic Masai Mara Safari", price: 2500 },
  { id: "pkg-2", title: "Amboseli & Kilimanjaro Views", price: 1800 },
  { id: "pkg-3", title: "Diani Beach & Coastal Escape", price: 1400 },
];

const Booking = () => {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(samplePackages[0].id);
  const [details, setDetails] = useState({ name: "", email: "", phone: "", guests: 2 });
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const next = async () => {
    if (step === 2) {
      setLoading(true);
      const res = await createBooking({
        packageId: selected,
        name: details.name,
        email: details.email,
        phone: details.phone,
        guests: details.guests,
      } as any);
      setLoading(false);
      setConfirmation(res.bookingId);
      setStep(3);
      return;
    }
    setStep((s) => s + 1);
  };

  return (
    <div className="safari-container py-16">
      <h1 className="safari-heading mb-6">Booking (Mock Flow)</h1>

      {step === 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">Select Package</h2>
          <div className="flex flex-col gap-3">
            {samplePackages.map((p) => (
              <label key={p.id} className="p-4 border rounded flex items-center justify-between">
                <div>
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-sm text-muted-foreground">${p.price} per person</div>
                </div>
                <input type="radio" name="pkg" checked={selected === p.id} onChange={() => setSelected(p.id)} />
              </label>
            ))}
          </div>
          <div className="mt-6">
            <button onClick={next} className="bg-primary text-primary-foreground px-4 py-2 rounded">Next</button>
          </div>
        </section>
      )}

      {step === 1 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">Enter Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Full name" value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })} className="p-3 border rounded" />
            <input placeholder="Email" value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} className="p-3 border rounded" />
            <input placeholder="Phone" value={details.phone} onChange={(e) => setDetails({ ...details, phone: e.target.value })} className="p-3 border rounded" />
            <input type="number" min={1} value={details.guests} onChange={(e) => setDetails({ ...details, guests: Number(e.target.value) })} className="p-3 border rounded" />
          </div>
          <div className="mt-6 flex gap-3">
            <button onClick={() => setStep(0)} className="px-4 py-2 border rounded">Back</button>
            <button onClick={next} className="bg-primary text-primary-foreground px-4 py-2 rounded">Next</button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">Review & Mock Payment</h2>
          <div className="p-4 border rounded mb-4">
            <div className="font-semibold">Package:</div>
            <div className="mb-2">{samplePackages.find((p) => p.id === selected)?.title}</div>
            <div className="font-semibold">Name:</div>
            <div className="mb-2">{details.name}</div>
            <div className="font-semibold">Email:</div>
            <div className="mb-2">{details.email}</div>
            <div className="text-sm text-muted-foreground">Proceeding to payment is currently a mock action.</div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="px-4 py-2 border rounded">Back</button>
            <button disabled={loading} onClick={next} className="bg-accent text-accent-foreground px-4 py-2 rounded">
              {loading ? "Processing..." : "Confirm & Continue to Payment (Mock)"}
            </button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">Booking Confirmed (Mock)</h2>
          <div className="p-4 border rounded">
            <p>Booking reference: <strong>{confirmation}</strong></p>
            <p className="mt-2 text-sm text-muted-foreground">Payment step is disabled in this phase. Integrate Stripe / M-Pesa in the next phase.</p>
          </div>
        </section>
      )}
    </div>
  );
};

export default Booking;
