"use client";

import { useState, useMemo } from "react";
import type { Booth, AddOn } from "@/types";
import PayPalCheckout from "./PayPalCheckout";

type BookingWizardProps = {
  booths: Booth[];
  addOns: AddOn[];
};

const steps = ["Select Booth", "Event Details", "Add-Ons", "Review & Pay"];

const eventTypes = [
  "Wedding", "Birthday Party", "Corporate Event", "Brand Activation",
  "Baby Shower", "Bar/Bat Mitzvah", "Quinceañera", "Graduation", "Holiday Party", "Other",
];

export default function BookingWizard({ booths, addOns }: BookingWizardProps) {
  const [step, setStep] = useState(0);
  const [stepKey, setStepKey] = useState(0);
  const [selectedBooth, setSelectedBooth] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<number>(0);
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());
  const [eventDetails, setEventDetails] = useState({
    name: "", email: "", phone: "", eventDate: "", eventTime: "", eventType: "", location: "", message: "",
  });

  const booth = booths.find((b) => b.id === selectedBooth);
  const pricingTier = booth?.pricing[selectedDuration];

  const addOnTotal = useMemo(() => {
    return addOns.filter((a) => selectedAddOns.has(a.id)).reduce((sum, a) => sum + a.price, 0);
  }, [addOns, selectedAddOns]);

  const total = (pricingTier?.price ?? 0) + addOnTotal;

  function toggleAddOn(id: string) {
    setSelectedAddOns((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function canProceed(): boolean {
    if (step === 0) return !!selectedBooth;
    if (step === 1) return !!(eventDetails.name && eventDetails.email && eventDetails.phone && eventDetails.eventDate);
    return true;
  }

  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center justify-between mb-10">
        {steps.map((label, i) => (
          <div key={label} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  i <= step ? "bg-brand text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {i < step ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span className={`mt-2 text-xs font-medium hidden sm:block ${i <= step ? "text-brand" : "text-gray-400"}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-0.5 flex-1 mx-2 ${i < step ? "bg-brand" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Select Booth */}
      {step === 0 && (
        <div key={stepKey} className="step-content">
          <h2 className="text-2xl font-bold mb-6">Choose Your Photo Booth</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {booths.map((b) => (
              <button
                key={b.id}
                onClick={() => { setSelectedBooth(b.id); setSelectedDuration(0); }}
                className={`text-left p-6 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedBooth === b.id
                    ? "border-brand bg-brand/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <h3 className="font-bold text-foreground">{b.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{b.tagline}</p>
                <p className="text-brand font-bold mt-3">From ${b.startingPrice}</p>
              </button>
            ))}
          </div>

          {/* Duration selector */}
          {booth && (
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4">Select Duration</h3>
              <div className="flex flex-wrap gap-3">
                {booth.pricing.map((tier, i) => (
                  <button
                    key={tier.duration}
                    onClick={() => setSelectedDuration(i)}
                    className={`px-5 py-3 rounded-lg border-2 font-medium transition-all cursor-pointer ${
                      selectedDuration === i
                        ? "border-brand bg-brand text-white"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {tier.duration} — ${tier.price}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 2: Event Details */}
      {step === 1 && (
        <div key={stepKey} className="step-content">
          <h2 className="text-2xl font-bold mb-6">Event Details</h2>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={eventDetails.name}
                  onChange={(e) => setEventDetails({ ...eventDetails, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={eventDetails.email}
                  onChange={(e) => setEventDetails({ ...eventDetails, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Phone *</label>
                <input
                  type="tel"
                  required
                  value={eventDetails.phone}
                  onChange={(e) => setEventDetails({ ...eventDetails, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Event Date *</label>
                <input
                  type="date"
                  required
                  value={eventDetails.eventDate}
                  onChange={(e) => setEventDetails({ ...eventDetails, eventDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Event Time</label>
                <input
                  type="time"
                  value={eventDetails.eventTime}
                  onChange={(e) => setEventDetails({ ...eventDetails, eventTime: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Event Type</label>
                <select
                  value={eventDetails.eventType}
                  onChange={(e) => setEventDetails({ ...eventDetails, eventType: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none bg-white"
                >
                  <option value="">Select...</option>
                  {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Venue / Location</label>
              <input
                type="text"
                value={eventDetails.location}
                onChange={(e) => setEventDetails({ ...eventDetails, location: e.target.value })}
                placeholder="Venue name and address"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Special Requests</label>
              <textarea
                value={eventDetails.message}
                onChange={(e) => setEventDetails({ ...eventDetails, message: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none resize-y"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Add-Ons */}
      {step === 2 && (
        <div key={stepKey} className="step-content">
          <h2 className="text-2xl font-bold mb-6">Enhance Your Experience</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {addOns.map((addon) => (
              <button
                key={addon.id}
                onClick={() => toggleAddOn(addon.id)}
                className={`text-left p-5 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedAddOns.has(addon.id)
                    ? "border-brand bg-brand/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-foreground">{addon.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{addon.description}</p>
                  </div>
                  <div className="shrink-0 ml-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAddOns.has(addon.id) ? "border-brand bg-brand" : "border-gray-300"
                    }`}>
                      {selectedAddOns.has(addon.id) && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-brand font-bold mt-2">+${addon.price}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Review & Pay */}
      {step === 3 && booth && pricingTier && (
        <div key={stepKey} className="step-content">
          <h2 className="text-2xl font-bold mb-6">Review Your Order</h2>

          <div className="bg-gray-50 rounded-xl p-6 space-y-4 mb-8">
            <div className="flex justify-between">
              <div>
                <p className="font-bold text-foreground">{booth.name}</p>
                <p className="text-sm text-gray-600">{pricingTier.duration}</p>
              </div>
              <p className="font-bold">${pricingTier.price}</p>
            </div>

            {addOns.filter((a) => selectedAddOns.has(a.id)).map((addon) => (
              <div key={addon.id} className="flex justify-between text-sm">
                <p className="text-gray-600">{addon.name}</p>
                <p className="font-medium">${addon.price}</p>
              </div>
            ))}

            <div className="border-t border-gray-200 pt-4 flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <p className="text-lg font-bold text-brand">${total}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="font-bold mb-3">Event Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p className="text-gray-500">Name:</p><p>{eventDetails.name}</p>
              <p className="text-gray-500">Email:</p><p>{eventDetails.email}</p>
              <p className="text-gray-500">Phone:</p><p>{eventDetails.phone}</p>
              <p className="text-gray-500">Date:</p><p>{eventDetails.eventDate}</p>
              {eventDetails.eventTime && <><p className="text-gray-500">Time:</p><p>{eventDetails.eventTime}</p></>}
              {eventDetails.eventType && <><p className="text-gray-500">Type:</p><p>{eventDetails.eventType}</p></>}
              {eventDetails.location && <><p className="text-gray-500">Location:</p><p>{eventDetails.location}</p></>}
            </div>
          </div>

          {/* PayPal */}
          <PayPalCheckout
            amount={total}
            description={`${booth.name} - ${pricingTier.duration}`}
          />
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
        {step > 0 ? (
          <button
            onClick={() => { setStep(step - 1); setStepKey((k) => k + 1); }}
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Back
          </button>
        ) : (
          <div />
        )}
        {step < 3 && (
          <button
            onClick={() => { setStep(step + 1); setStepKey((k) => k + 1); }}
            disabled={!canProceed()}
            className="px-8 py-3 bg-brand text-white rounded-lg font-semibold hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}
