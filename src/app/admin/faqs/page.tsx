"use client";

import { useState, useEffect } from "react";
import type { FAQ } from "@/types";

const categories: FAQ["category"][] = ["booking", "setup", "technical", "pricing"];

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/faqs").then((r) => r.json()).then(setFaqs);
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/faqs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(faqs),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function addFAQ() {
    setFaqs([
      ...faqs,
      {
        id: String(Date.now()),
        question: "",
        answer: "",
        category: "booking",
      },
    ]);
  }

  function updateFAQ(index: number, field: keyof FAQ, value: string) {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: value };
    setFaqs(updated);
  }

  function removeFAQ(index: number) {
    setFaqs(faqs.filter((_, i) => i !== index));
  }

  if (!faqs.length && faqs !== null)
    return (
      <div>
        <button onClick={addFAQ} className="text-brand underline cursor-pointer">
          Add first FAQ
        </button>
      </div>
    );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Edit FAQs</h2>
        <div className="flex gap-3">
          <button
            onClick={addFAQ}
            className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer"
          >
            + Add FAQ
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-brand text-white rounded-lg font-medium hover:bg-brand-dark transition-colors disabled:opacity-50 cursor-pointer"
          >
            {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={faq.id} className="border border-gray-200 rounded-xl p-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1 space-y-3">
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => updateFAQ(i, "question", e.target.value)}
                  placeholder="Question"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-brand focus:outline-none font-medium"
                />
                <textarea
                  value={faq.answer}
                  onChange={(e) => updateFAQ(i, "answer", e.target.value)}
                  placeholder="Answer"
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-brand focus:outline-none resize-y text-sm"
                />
                <select
                  value={faq.category}
                  onChange={(e) => updateFAQ(i, "category", e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-gray-300 focus:border-brand focus:outline-none text-sm bg-white"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => removeFAQ(i)}
                className="text-red-400 hover:text-red-600 shrink-0 cursor-pointer"
                title="Delete FAQ"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
