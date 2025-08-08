import Link from 'next/link'

export default function Home() {
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Welcome</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="font-medium mb-2">Manage your events</h2>
          <p className="text-sm text-gray-600 mb-4">Create, edit, and delete events easily.</p>
          <Link href="/events" className="inline-block px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">View Events</Link>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="font-medium mb-2">Create a new event</h2>
          <p className="text-sm text-gray-600 mb-4">Add title, date, time, venue, and description.</p>
          <Link href="/create" className="inline-block px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700">Create Event</Link>
        </div>
      </div>
    </div>
  )
}
