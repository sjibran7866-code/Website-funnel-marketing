"use client";

export default function NewsletterForm() {
  return (
    <form
      className="flex w-full md:w-auto gap-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Your email address"
        className="px-4 py-2.5 rounded-lg bg-gray-800 text-white placeholder:text-gray-500 border border-gray-700 focus:border-brand focus:outline-none w-full md:w-64"
      />
      <button
        type="submit"
        className="bg-brand text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-brand-dark transition-colors whitespace-nowrap cursor-pointer"
      >
        Subscribe
      </button>
    </form>
  );
}
