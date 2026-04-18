"use client";

export default function AdminBookingsPage() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Bookings</h2>
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 className="text-lg font-medium text-gray-700 mb-2">No bookings yet</h3>
        <p className="text-gray-500 text-sm">
          Bookings will appear here once customers complete payments through PayPal.
          Configure your PayPal credentials in <code className="bg-gray-100 px-1 rounded">.env.local</code> to start accepting payments.
        </p>
      </div>
    </div>
  );
}
