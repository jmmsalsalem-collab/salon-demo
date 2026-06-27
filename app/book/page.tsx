import { Suspense } from "react";
import BookingFlow from "./BookingFlow";

export const metadata = {
  title: "Book an Appointment | Studio Luxe",
  description:
    "Book your appointment at Studio Luxe — choose your service, stylist, date and time in just a minute.",
};

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-5 py-20 text-center text-charcoal-muted">
          Loading booking…
        </div>
      }
    >
      <BookingFlow />
    </Suspense>
  );
}
