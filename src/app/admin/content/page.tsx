"use client";

import { useState, useEffect } from "react";
import type { SiteContent } from "@/types";

export default function AdminContentPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content").then((r) => r.json()).then(setContent);
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (!content) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Edit Content</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-brand text-white rounded-lg font-medium hover:bg-brand-dark transition-colors disabled:opacity-50 cursor-pointer"
        >
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="space-y-8">
        {/* Homepage */}
        <fieldset className="border border-gray-200 rounded-xl p-6">
          <legend className="text-lg font-bold px-2">Homepage</legend>
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">Hero Headline</label>
              <input
                type="text"
                value={content.homepage.heroHeadline}
                onChange={(e) => setContent({
                  ...content,
                  homepage: { ...content.homepage, heroHeadline: e.target.value },
                })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-brand focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hero Subheadline</label>
              <textarea
                value={content.homepage.heroSubheadline}
                onChange={(e) => setContent({
                  ...content,
                  homepage: { ...content.homepage, heroSubheadline: e.target.value },
                })}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-brand focus:outline-none resize-y"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">CTA Button Text</label>
                <input
                  type="text"
                  value={content.homepage.heroCtaText}
                  onChange={(e) => setContent({
                    ...content,
                    homepage: { ...content.homepage, heroCtaText: e.target.value },
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-brand focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Clients Count</label>
                <input
                  type="number"
                  value={content.homepage.statsSection.clients}
                  onChange={(e) => setContent({
                    ...content,
                    homepage: {
                      ...content.homepage,
                      statsSection: { ...content.homepage.statsSection, clients: +e.target.value },
                    },
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-brand focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CTA Section Headline</label>
              <input
                type="text"
                value={content.homepage.ctaHeadline}
                onChange={(e) => setContent({
                  ...content,
                  homepage: { ...content.homepage, ctaHeadline: e.target.value },
                })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-brand focus:outline-none"
              />
            </div>
          </div>
        </fieldset>

        {/* About */}
        <fieldset className="border border-gray-200 rounded-xl p-6">
          <legend className="text-lg font-bold px-2">About Page</legend>
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">Headline</label>
              <input
                type="text"
                value={content.about.headline}
                onChange={(e) => setContent({
                  ...content,
                  about: { ...content.about, headline: e.target.value },
                })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-brand focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Founder Story</label>
              <textarea
                value={content.about.founderStory}
                onChange={(e) => setContent({
                  ...content,
                  about: { ...content.about, founderStory: e.target.value },
                })}
                rows={5}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-brand focus:outline-none resize-y"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mission</label>
              <textarea
                value={content.about.mission}
                onChange={(e) => setContent({
                  ...content,
                  about: { ...content.about, mission: e.target.value },
                })}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-brand focus:outline-none resize-y"
              />
            </div>
          </div>
        </fieldset>

        {/* Contact */}
        <fieldset className="border border-gray-200 rounded-xl p-6">
          <legend className="text-lg font-bold px-2">Contact Page</legend>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                value={content.contact.phone}
                onChange={(e) => setContent({
                  ...content,
                  contact: { ...content.contact, phone: e.target.value },
                })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-brand focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={content.contact.email}
                onChange={(e) => setContent({
                  ...content,
                  contact: { ...content.contact, email: e.target.value },
                })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-brand focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                value={content.contact.address}
                onChange={(e) => setContent({
                  ...content,
                  contact: { ...content.contact, address: e.target.value },
                })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-brand focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hours</label>
              <input
                type="text"
                value={content.contact.hours}
                onChange={(e) => setContent({
                  ...content,
                  contact: { ...content.contact, hours: e.target.value },
                })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-brand focus:outline-none"
              />
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
