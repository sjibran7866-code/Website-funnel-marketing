"use client";

import { useState, useEffect } from "react";
import type { Booth } from "@/types";

export default function AdminPricingPage() {
  const [booths, setBooths] = useState<Booth[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/pricing").then((r) => r.json()).then(setBooths);
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/pricing", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booths),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function updateBoothPrice(boothIdx: number, tierIdx: number, price: number) {
    const updated = [...booths];
    updated[boothIdx] = {
      ...updated[boothIdx],
      pricing: updated[boothIdx].pricing.map((t, i) =>
        i === tierIdx ? { ...t, price } : t
      ),
    };
    updated[boothIdx].startingPrice = updated[boothIdx].pricing[0]?.price ?? 0;
    setBooths(updated);
  }

  if (!booths.length) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Edit Pricing</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-brand text-white rounded-lg font-medium hover:bg-brand-dark transition-colors disabled:opacity-50 cursor-pointer"
        >
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="space-y-6">
        {booths.map((booth, bi) => (
          <div key={booth.id} className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-4">{booth.name}</h3>
            <div className="space-y-3">
              {booth.pricing.map((tier, ti) => (
                <div key={tier.duration} className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 w-24">{tier.duration}</span>
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-1">$</span>
                    <input
                      type="number"
                      value={tier.price}
                      onChange={(e) => updateBoothPrice(bi, ti, +e.target.value)}
                      className="w-28 px-3 py-2 rounded-lg border border-gray-300 focus:border-brand focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
