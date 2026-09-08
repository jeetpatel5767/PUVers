"use client";

import { useState } from "react";
import { Squircle } from "@squircle-js/react";
import { useDemoStore } from "@/store/demo-store";
import { ROLE_LABELS } from "@/constants/navigation";
import type { UserRole, User } from "@/types";
import {
  Users,
  Search,
  Mail,
  GraduationCap,
  Shield,
  Building2,
  Check,
  X,
  UserCheck,
  UserX,
} from "lucide-react";

const roleBadge: Record<string, { bg: string; text: string }> = {
  participant: { bg: "hsl(200 80% 55% / 0.1)", text: "hsl(200 70% 40%)" },
  student: { bg: "hsl(200 80% 55% / 0.1)", text: "hsl(200 70% 40%)" },
  event_admin: { bg: "hsl(270 60% 65% / 0.1)", text: "hsl(270 50% 45%)" },
  admin: { bg: "hsl(270 60% 65% / 0.1)", text: "hsl(270 50% 45%)" },
  super_admin: { bg: "hsl(25 80% 50% / 0.1)", text: "hsl(25 70% 40%)" },
  platform_admin: { bg: "hsl(0 60% 55% / 0.1)", text: "hsl(0 50% 45%)" },
};

type FilterRole = "all" | "participant" | "event_admin" | "super_admin";

export default function SuperAdminUsersPage() {
  const users = useDemoStore((s) => s.users);
  const assignEventAdmin = useDemoStore((s) => s.assignEventAdmin);
  const removeEventAdmin = useDemoStore((s) => s.removeEventAdmin);

  const [filter, setFilter] = useState<FilterRole>("all");
  const [search, setSearch] = useState("");
  const [selectedUserForAdmin, setSelectedUserForAdmin] = useState<User | null>(null);
  const [adminRemark, setAdminRemark] = useState("");
  const [showSuccess, setShowSuccess] = useState("");

  const filtered = users.filter((u) => {
    if (filter === "participant" && u.role !== "participant" && u.role !== "student") return false;
    if (filter === "event_admin" && u.role !== "event_admin" && u.role !== "admin") return false;
    if (filter === "super_admin" && u.role !== "super_admin") return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.universityId && u.universityId.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const roleFilters: { label: string; value: FilterRole }[] = [
    { label: "All Users", value: "all" },
    { label: "Participants", value: "participant" },
    { label: "Event Admins", value: "event_admin" },
    { label: "Super Admins", value: "super_admin" },
  ];

  const glassStyle = {
    background: "hsl(0 0% 96% / 0.42)",
    backdropFilter: "blur(24px) saturate(1.4)",
    WebkitBackdropFilter: "blur(24px) saturate(1.4)",
    boxShadow: "0 2px 20px var(--shadow), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
  };

  const inputStyle = {
    background: "hsl(0 0% 100% / 0.55)",
    border: "1px solid hsl(0 0% 85% / 0.5)",
    borderRadius: "14px",
  };

  const handleAssignRole = () => {
    if (!selectedUserForAdmin) return;
    assignEventAdmin(selectedUserForAdmin.id, adminRemark);
    setShowSuccess(`Granted EVENT_ADMIN role to ${selectedUserForAdmin.name}.`);
    setSelectedUserForAdmin(null);
    setAdminRemark("");
  };

  const handleRemoveRole = (user: User) => {
    removeEventAdmin(user.id);
    setShowSuccess(`Removed EVENT_ADMIN role from ${user.name}. (Historical events retained)`);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="flex items-center gap-[10px] text-[0.68rem] tracking-[0.22em] uppercase text-[var(--col-dim)] mb-2 font-[family-name:var(--font-mono)]">
            <span className="inline-block w-5 h-px bg-[var(--accent)] flex-shrink-0" />
            Screen 04 — Super Admin → Users
          </p>
          <h1 className="text-[clamp(1.4rem,2.5vw,1.8rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--col-primary)] font-[family-name:var(--font-display)]">
            User Management
            <span className="text-[var(--accent)] font-[family-name:var(--font-cursive)] font-normal text-[0.7em]"> .</span>
          </h1>
          <p className="mt-2 text-[0.84rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">
            Assign or remove <code className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 text-[0.75rem] font-mono">EVENT_ADMIN</code> permissions to campus members.
          </p>
        </div>
      </div>

      {/* Search + Filter row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-7">
        <div className="relative flex-1 max-w-[340px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[var(--col-dim)]" strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Search by name, ID or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-[9px] text-[0.78rem] text-[var(--col-primary)] font-[family-name:var(--font-ui)] outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-30"
            style={inputStyle}
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {roleFilters.map((f) => {
            const count =
              f.value === "all"
                ? users.length
                : users.filter((u) => {
                  if (f.value === "participant") return u.role === "participant" || u.role === "student";
                  if (f.value === "event_admin") return u.role === "event_admin" || u.role === "admin";
                  return u.role === f.value;
                }).length;
            const active = filter === f.value;
            return (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className="text-[0.74rem] font-medium px-3.5 py-[7px] transition-all duration-300 font-[family-name:var(--font-ui)] cursor-pointer"
                style={{
                  borderRadius: "12px",
                  ...(active
                    ? { background: "var(--col-primary)", color: "var(--bg)", boxShadow: "0 2px 12px hsl(0 0% 10% / 0.2)" }
                    : { background: "hsl(0 0% 100% / 0.4)", color: "var(--col-secondary)", border: "1px solid hsl(0 0% 85% / 0.4)" }),
                }}
              >
                {f.label}
                <span className="ml-1.5 text-[0.6rem] font-[family-name:var(--font-mono)]" style={{ opacity: 0.7 }}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Users table */}
      {filtered.length === 0 ? (
        <Squircle cornerRadius={22} cornerSmoothing={1} className="p-14 text-center" style={glassStyle}>
          <Users className="w-10 h-10 text-[var(--col-dim)] mx-auto mb-3 opacity-40" strokeWidth={1} />
          <p className="text-[0.88rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">No users found.</p>
        </Squircle>
      ) : (
        <Squircle cornerRadius={24} cornerSmoothing={1} className="overflow-hidden" style={glassStyle}>
          {/* Column headers */}
          <div
            className="grid items-center gap-4 px-6 py-3.5"
            style={{
              gridTemplateColumns: "1.2fr 1.2fr 130px 100px 160px",
              borderBottom: "1px solid hsl(0 0% 85% / 0.3)",
            }}
          >
            <span className="text-[0.6rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">Name / University ID</span>
            <span className="text-[0.6rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">Email</span>
            <span className="text-[0.6rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">Current Role</span>
            <span className="text-[0.6rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">Status</span>
            <span className="text-[0.6rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] text-right">Role Actions</span>
          </div>

          {/* Rows */}
          {filtered.map((user, i) => {
            const isEventAdmin = user.role === "event_admin" || user.role === "admin";
            const isSuperAdmin = user.role === "super_admin";
            const badge = roleBadge[user.role] || roleBadge.participant;
            const isLast = i === filtered.length - 1;
            const initials = user.name.split(" ").map((w) => w[0]).join("").slice(0, 2);

            return (
              <div
                key={user.id}
                className="group grid items-center gap-4 px-6 py-4 transition-colors duration-200 hover:bg-[hsl(0_0%_100%_/_0.25)]"
                style={{
                  gridTemplateColumns: "1.2fr 1.2fr 130px 100px 160px",
                  ...(!isLast ? { borderBottom: "1px solid hsl(0 0% 88% / 0.25)" } : {}),
                }}
              >
                {/* User info */}
                <div className="flex items-center gap-3 min-w-0">
                  <Squircle
                    cornerRadius={11}
                    cornerSmoothing={1}
                    className="w-9 h-9 flex items-center justify-center text-white text-[0.5rem] font-bold font-[family-name:var(--font-display)] flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${badge.text}, var(--col-primary))` }}
                  >
                    {initials}
                  </Squircle>
                  <div className="min-w-0">
                    <p className="text-[0.84rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)] truncate">
                      {user.name}
                    </p>
                    <p className="text-[0.64rem] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">
                      {user.universityId || user.department || "PU Member"}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-1.5 min-w-0">
                  <Mail className="w-[10px] h-[10px] text-[var(--col-dim)] flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-[0.76rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)] truncate">{user.email}</span>
                </div>

                {/* Current Role badge */}
                <div>
                  <Squircle
                    cornerRadius={8}
                    cornerSmoothing={1}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 w-fit"
                    style={{ background: badge.bg }}
                  >
                    <span className="text-[0.62rem] font-medium font-[family-name:var(--font-mono)] uppercase tracking-[0.08em]" style={{ color: badge.text }}>
                      {isEventAdmin ? "EVENT_ADMIN" : isSuperAdmin ? "SUPER_ADMIN" : "PARTICIPANT"}
                    </span>
                  </Squircle>
                </div>

                {/* Status */}
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[0.72rem] text-[hsl(142,50%,35%)] font-[family-name:var(--font-mono)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(142,50%,45%)]" />
                    Active
                  </span>
                </div>

                {/* Role Actions */}
                <div className="flex items-center justify-end gap-2">
                  {isSuperAdmin ? (
                    <span className="text-[0.64rem] text-[var(--col-dim)] font-[family-name:var(--font-mono)] italic">Root Authority</span>
                  ) : isEventAdmin ? (
                    <button
                      onClick={() => handleRemoveRole(user)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-[0.68rem] font-medium text-red-600 bg-red-500/10 hover:bg-red-500/20 transition-colors rounded-lg font-[family-name:var(--font-ui)] cursor-pointer"
                    >
                      <UserX className="w-3 h-3" />
                      Remove Event Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedUserForAdmin(user)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-[0.68rem] font-medium text-[var(--col-primary)] bg-[hsl(0_0%_100%_/_0.6)] hover:bg-[hsl(0_0%_100%)] border border-[hsl(0_0%_85%_/_0.5)] transition-all rounded-lg font-[family-name:var(--font-ui)] cursor-pointer shadow-sm"
                    >
                      <UserCheck className="w-3 h-3 text-[var(--accent)]" />
                      Make Event Admin
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </Squircle>
      )}

      {/* Screen 05 — Assign EVENT_ADMIN Modal */}
      {selectedUserForAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[hsl(0_0%_10%_/_0.4)] backdrop-blur-sm animate-fade-in" onClick={() => setSelectedUserForAdmin(null)} />
          <Squircle
            cornerRadius={24}
            cornerSmoothing={1}
            className="relative z-10 w-full max-w-md p-7 animate-scale-in"
            style={{ background: "hsl(0 0% 96% / 0.95)", backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)", boxShadow: "0 8px 40px var(--shadow-lg), inset 0 1px 0 hsl(0 0% 100% / 0.6)" }}
          >
            <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-1">
              Screen 05 — Assign EVENT_ADMIN
            </p>
            <h3 className="text-[1.1rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)] mb-4">
              Assign Event Admin Role
            </h3>

            <div className="space-y-4 text-[0.82rem]">
              <div className="p-3.5 rounded-xl bg-white/60 border border-black/5 space-y-1">
                <p className="text-[0.65rem] text-[var(--col-dim)] uppercase tracking-wider font-mono">Selected User</p>
                <p className="font-semibold text-[var(--col-primary)]">{selectedUserForAdmin.name}</p>
                <p className="text-xs text-[var(--col-secondary)]">{selectedUserForAdmin.email} &middot; {selectedUserForAdmin.universityId || "PU"}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/40 border border-black/5">
                  <p className="text-[0.62rem] text-[var(--col-dim)] uppercase tracking-wider font-mono">Current Role</p>
                  <p className="font-medium text-[var(--col-primary)] mt-0.5">PARTICIPANT</p>
                </div>
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <p className="text-[0.62rem] text-purple-700 uppercase tracking-wider font-mono">New Role</p>
                  <p className="font-bold text-purple-900 mt-0.5">EVENT_ADMIN</p>
                </div>
              </div>

              <div>
                <label className="block text-[0.68rem] uppercase tracking-[0.14em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-1.5">
                  Optional Remark
                </label>
                <textarea
                  rows={3}
                  value={adminRemark}
                  onChange={(e) => setAdminRemark(e.target.value)}
                  placeholder="e.g. Appointed as student coordinator for Tech Fest 2026..."
                  className="w-full px-4 py-2.5 text-[0.82rem] text-[var(--col-primary)] font-[family-name:var(--font-ui)] outline-none bg-white/70 border border-black/10 rounded-xl focus:border-[var(--accent)]"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setSelectedUserForAdmin(null)}
                className="flex-1 text-[0.82rem] font-medium py-2.5 transition-all duration-300 hover:bg-[hsl(0_0%_92%)] font-[family-name:var(--font-display)] cursor-pointer text-[var(--col-secondary)] bg-white/60 border border-black/10 rounded-xl"
              >
                Cancel
              </button>
              <Squircle
                cornerRadius={14}
                cornerSmoothing={1}
                className="flex-1 inline-flex items-center justify-center text-[0.82rem] font-medium tracking-[0.02em] py-2.5 bg-[var(--col-primary)] text-[var(--bg)] transition-all duration-300 hover:opacity-85 font-[family-name:var(--font-display)] cursor-pointer"
                asChild
              >
                <button onClick={handleAssignRole}>
                  Assign Role
                </button>
              </Squircle>
            </div>
          </Squircle>
        </div>
      )}

      {/* Success notification */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[hsl(0_0%_10%_/_0.4)] backdrop-blur-sm animate-fade-in" onClick={() => setShowSuccess("")} />
          <Squircle
            cornerRadius={24}
            cornerSmoothing={1}
            className="relative z-10 w-full max-w-sm p-7 animate-scale-in text-center"
            style={{ background: "hsl(0 0% 96% / 0.95)", backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)", boxShadow: "0 8px 40px var(--shadow-lg), inset 0 1px 0 hsl(0 0% 100% / 0.6)" }}
          >
            <div className="w-12 h-12 rounded-full bg-[hsl(142_50%_45%_/_0.12)] flex items-center justify-center mx-auto mb-4">
              <Check className="w-5 h-5 text-[hsl(142,50%,35%)]" strokeWidth={2} />
            </div>
            <h3 className="text-[1rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)] mb-1">Role Updated</h3>
            <p className="text-[0.82rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)] mb-5">{showSuccess}</p>
            <Squircle
              cornerRadius={14}
              cornerSmoothing={1}
              className="w-full text-center text-[0.8rem] font-medium py-[11px] bg-[var(--col-primary)] text-[var(--bg)] transition-all duration-300 hover:opacity-80 font-[family-name:var(--font-display)] cursor-pointer"
              asChild
            >
              <button onClick={() => setShowSuccess("")}>Done</button>
            </Squircle>
          </Squircle>
        </div>
      )}
    </div>
  );
}
