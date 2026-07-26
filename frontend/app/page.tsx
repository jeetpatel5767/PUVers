import Link from "next/link";
import { PublicShell } from "@/components/layouts/public-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EVENTS } from "@/constants/mock-data";

export default function LandingPage() {
  const featured = EVENTS.filter((e) => e.status === "published").slice(0, 3);

  return (
    <PublicShell>
      <section className="border-b border-black">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Your Campus. One Platform.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-600">
            Discover events, register instantly, get QR tickets, mark attendance, and receive
            certificates — all in PUVerse.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/student/events">
              <Button variant="outline" size="lg">
                Browse Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold">How It Works</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { step: "01", title: "Discover Events", desc: "Browse campus events by category, date, and organization." },
            { step: "02", title: "Register & Get Ticket", desc: "One-click registration with instant QR ticket generation." },
            { step: "03", title: "Attend & Certify", desc: "Scan QR at venue, attendance tracked, certificate auto-issued." },
          ].map((item) => (
            <Card key={item.step}>
              <p className="text-3xl font-bold text-neutral-300">{item.step}</p>
              <h3 className="mt-2 font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-neutral-600">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-black bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-8 text-center text-2xl font-bold">Featured Events</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {featured.map((event) => (
              <Card key={event.id}>
                <p className="text-xs uppercase text-neutral-500">{event.category}</p>
                <h3 className="mt-1 font-semibold">{event.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 line-clamp-2">{event.description}</p>
                <Link href={`/student/events/${event.id}`} className="mt-4 inline-block">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">Built for Everyone on Campus</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          {["Students", "Organizers", "Admins", "Super Admins"].map((role) => (
            <Card key={role}>
              <p className="font-semibold">{role}</p>
              <p className="mt-1 text-xs text-neutral-500">Dedicated dashboard & tools</p>
            </Card>
          ))}
        </div>
        <Link href="/login" className="mt-8 inline-block">
          <Button>Login to Demo</Button>
        </Link>
      </section>
    </PublicShell>
  );
}
