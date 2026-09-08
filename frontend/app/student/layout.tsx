"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Squircle } from "@squircle-js/react";
import { useDemoStore } from "@/store/demo-store";
import {
  LayoutDashboard,
  CalendarSearch,
  ClipboardList,
  Ticket,
  Award,
  Bell,
  User,
  LogOut,
  ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/student", icon: LayoutDashboard },
  { label: "Browse Events", href: "/student/events", icon: CalendarSearch },
  { label: "Registrations", href: "/student/registrations", icon: ClipboardList },
  { label: "My Tickets", href: "/student/tickets", icon: Ticket },
  { label: "Certificates", href: "/student/certificates", icon: Award },
  { label: "Notifications", href: "/student/notifications", icon: Bell },
  { label: "Profile", href: "/student/profile", icon: User },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const user = useDemoStore((s) => s.user);
  const logout = useDemoStore((s) => s.logout);
  const unreadCount = useDemoStore((s) => s.notifications).filter((n) => !n.read).length;

  return (
    <div className="min-h-screen relative">
      {/* Blob background */}
      <div className="blob-container">
        <div className="blob" style={{
          top: "-5%", left: "-5%", width: "55vw", height: "55vw",
          background: "radial-gradient(circle, hsl(25 65% 45% / 0.55) 0%, transparent 70%)",
          animation: "blob-float 25s ease-in-out infinite alternate",
        }} />
        <div className="blob" style={{
          top: "30%", right: "-10%", width: "50vw", height: "50vw",
          background: "radial-gradient(circle, hsl(25 60% 40% / 0.45) 0%, transparent 70%)",
          animation: "blob-float 30s ease-in-out infinite alternate-reverse",
        }} />
        <div className="blob" style={{
          bottom: "-10%", left: "15%", width: "50vw", height: "50vw",
          background: "radial-gradient(circle, hsl(25 65% 42% / 0.50) 0%, transparent 70%)",
          animation: "blob-float 22s ease-in-out infinite alternate-reverse",
        }} />
        <div className="blob" style={{
          top: "6%", right: "4%", width: "28vw", height: "28vw",
          background: "radial-gradient(circle, hsl(25 75% 52% / 0.65) 0%, hsl(25 65% 45% / 0.30) 50%, transparent 75%)",
          animation: "blob-float 18s ease-in-out infinite alternate",
        }} />
        <div className="blob" style={{
          top: "18%", right: "-2%", width: "22vw", height: "22vw",
          background: "radial-gradient(circle, hsl(30 60% 55% / 0.45) 0%, transparent 70%)",
          animation: "blob-float 24s ease-in-out infinite alternate-reverse",
        }} />
      </div>

      {/* ─── Sidebar ─── */}
      <aside
        className="fixed top-0 left-0 h-screen z-[200] flex flex-col w-[260px]"
        style={{
          background: "hsl(0 0% 100% / 0.12)",
          backdropFilter: "blur(50px) saturate(1.6)",
          WebkitBackdropFilter: "blur(50px) saturate(1.6)",
          borderRight: "1px solid hsl(0 0% 100% / 0.35)",
          boxShadow: "4px 0 40px hsl(0 0% 20% / 0.06), inset -1px 0 0 hsl(0 0% 100% / 0.15)",
        }}
      >
        {/* Logo */}
        <div className="px-7 pt-7 pb-6">
          <Link href="/student" className="flex items-center gap-[8px]">
            <div className="w-[8px] h-[8px] rounded-full bg-[var(--accent)] flex-shrink-0 shadow-[0_1px_4px_var(--shadow-lg)]" />
            <div className="text-[1.15rem] leading-none">
              <span className="font-extrabold text-[var(--col-primary)] tracking-[-0.02em] font-[family-name:var(--font-display)]">
                PU
              </span>
              <span className="font-normal text-[var(--col-secondary)] font-[family-name:var(--font-cursive)]">
                verse
              </span>
            </div>
          </Link>
          <p className="mt-3 text-[0.58rem] tracking-[0.2em] uppercase text-[var(--col-dim)] font-[family-name:var(--font-mono)]">
            Student Portal
          </p>
        </div>

        {/* Divider */}
        <div className="mx-5 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(0 0% 80% / 0.4), transparent)" }} />

        {/* Nav items */}
        <nav className="flex-1 px-4 py-5 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            const showBadge = item.label === "Notifications" && unreadCount > 0;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 px-3 py-[10px] transition-all duration-300 font-[family-name:var(--font-ui)] cursor-pointer relative ${
                  isActive
                    ? "text-[var(--bg)]"
                    : "text-[var(--col-secondary)] hover:text-[var(--col-primary)]"
                }`}
                style={{
                  borderRadius: "14px",
                  ...(isActive
                    ? {
                        background: "var(--col-primary)",
                        boxShadow: "0 4px 20px hsl(0 0% 10% / 0.25), inset 0 1px 0 hsl(0 0% 100% / 0.08)",
                      }
                    : {}),
                  ...(!isActive
                    ? { background: "transparent" }
                    : {}),
                }}
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isActive ? "" : "group-hover:scale-110"
                  }`}
                  style={{
                    borderRadius: "10px",
                    ...(isActive
                      ? { background: "hsl(0 0% 100% / 0.15)" }
                      : { background: "hsl(0 0% 0% / 0.03)" }),
                  }}
                >
                  <Icon className="w-[15px] h-[15px]" strokeWidth={1.8} />
                </div>

                <span className="text-[0.78rem] font-medium flex-1">
                  {item.label}
                </span>

                {showBadge && (
                  <span
                    className="w-5 h-5 flex items-center justify-center text-[0.55rem] font-bold text-white rounded-full font-[family-name:var(--font-mono)]"
                    style={{ background: "var(--accent)" }}
                  >
                    {unreadCount}
                  </span>
                )}

                {isActive && (
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="mx-5 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(0 0% 80% / 0.4), transparent)" }} />

        {/* User card at bottom */}
        <div className="px-4 py-5">
          <div
            className="flex items-center gap-3 p-3 transition-all duration-300"
            style={{
              borderRadius: "14px",
              background: "hsl(0 0% 100% / 0.08)",
            }}
          >
            <Squircle
              cornerRadius={11}
              cornerSmoothing={1}
              className="w-9 h-9 flex items-center justify-center text-white text-[0.6rem] font-semibold font-[family-name:var(--font-display)] flex-shrink-0"
              style={{ background: "linear-gradient(135deg, var(--role-student), var(--accent))" }}
            >
              {user?.name?.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </Squircle>
            <div className="flex-1 min-w-0">
              <p className="text-[0.76rem] font-medium text-[var(--col-primary)] truncate font-[family-name:var(--font-display)]">
                {user?.name}
              </p>
              <p className="text-[0.6rem] text-[var(--col-dim)] truncate font-[family-name:var(--font-mono)]">
                Student
              </p>
            </div>
            <button
              onClick={() => { logout(); window.location.href = "/login"; }}
              className="w-8 h-8 flex items-center justify-center text-[var(--col-dim)] hover:text-[var(--col-primary)] transition-all duration-300 hover:bg-[hsl(0_0%_0%_/_0.05)] flex-shrink-0"
              style={{ borderRadius: "10px" }}
            >
              <LogOut className="w-[14px] h-[14px]" />
            </button>
          </div>
        </div>
      </aside>

      {/* ─── Main content area — offset by sidebar width ─── */}
      <main className="relative z-[3] ml-[260px] min-h-screen pt-8 pb-12 px-8">
        <div className="max-w-[1200px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
