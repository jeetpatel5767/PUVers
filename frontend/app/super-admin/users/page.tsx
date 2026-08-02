"use client";

import { useState } from "react";
import { Squircle } from "@squircle-js/react";
import { ALL_USERS } from "@/constants/mock-data";
import { ROLE_LABELS } from "@/constants/navigation";
import type { UserRole } from "@/types";
import {
  Users,
  Search,
  UserPlus,
  Pencil,
  Mail,
  GraduationCap,
  Shield,
  Building2,
  Check,
  X,
} from "lucide-react";

const roleBadge: Record<string, { bg: string; text: string }> = {
  student: { bg: "hsl(200 80% 55% / 0.1)", text: "hsl(200 70% 40%)" },
  admin: { bg: "hsl(270 60% 65% / 0.1)", text: "hsl(270 50% 45%)" },
  super_admin: { bg: "hsl(25 80% 50% / 0.1)", text: "hsl(25 70% 40%)" },
  platform_admin: { bg: "hsl(0 60% 55% / 0.1)", text: "hsl(0 50% 45%)" },
};

const roleIcon: Record<string, typeof GraduationCap> = {
  student: GraduationCap,
  admin: Building2,
  super_admin: Shield,
  platform_admin: Shield,
};

type FilterRole = "all" | UserRole;

export default function SuperAdminUsersPage() {
  const [filter, setFilter] = useState<FilterRole>("all");
  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState<(typeof ALL_USERS)[0] | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showSuccess, setShowSuccess] = useState("");

  const filtered = ALL_USERS.filter((u) => {
    if (filter !== "all" && u.role !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    }
    return true;
  });

  const roleFilters: { label: string; value: FilterRole }[] = [
    { label: "All", value: "all" },
    { label: "Students", value: "student" },
    { label: "Admins", value: "admin" },
    { label: "Super Admins", value: "super_admin" },
    { label: "Platform Admins", value: "platform_admin" },
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

  const selectStyle = {
    ...inputStyle,
    appearance: "none" as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 14px center",
    paddingRight: "36px",
  };

  const inputClass =
    "w-full px-4 py-3 text-[0.84rem] text-[var(--col-primary)] font-[family-name:var(--font-ui)] outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-30";

  const labelClass =
    "block text-[0.68rem] uppercase tracking-[0.14em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-2";

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[clamp(1.4rem,2.5vw,1.8rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--col-primary)] font-[family-name:var(--font-display)]">
            Users
            <span className="text-[var(--accent)] font-[family-name:var(--font-cursive)] font-normal text-[0.7em]"> .</span>
          </h1>
          <p className="mt-2 text-[0.84rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">
            {ALL_USERS.length} users &middot; {ALL_USERS.filter((u) => u.role === "student").length} students &middot; {ALL_USERS.filter((u) => u.role === "admin").length} admins
          </p>
        </div>

        <Squircle
          cornerRadius={16}
          cornerSmoothing={1}
          className="group inline-flex items-center gap-2.5 text-[0.82rem] font-medium tracking-[0.04em] pl-5 pr-[5px] py-[5px] bg-[var(--col-primary)] text-[var(--bg)] transition-all duration-300 hover:opacity-80 font-[family-name:var(--font-display)] cursor-pointer"
          style={{ boxShadow: "0 2px 16px var(--shadow-lg)" }}
          asChild
        >
          <button onClick={() => setShowAdd(true)}>
            Add User
            <Squircle cornerRadius={12} cornerSmoothing={1} className="w-[34px] h-[34px] border border-white/70 flex items-center justify-center flex-shrink-0">
              <UserPlus className="w-[13px] h-[13px]" strokeWidth={2} />
            </Squircle>
          </button>
        </Squircle>
      </div>

      {/* Search + Filter row */}
      <div className="flex items-center gap-4 mb-7">
        <div className="relative flex-1 max-w-[320px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[var(--col-dim)]" strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-[9px] text-[0.78rem] text-[var(--col-primary)] font-[family-name:var(--font-ui)] outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--accent)] focus:ring-opacity-30"
            style={inputStyle}
          />
        </div>
        <div className="flex items-center gap-2">
          {roleFilters.map((f) => {
            const count = f.value === "all" ? ALL_USERS.length : ALL_USERS.filter((u) => u.role === f.value).length;
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
          <p className="text-[0.88rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">No users match this filter.</p>
        </Squircle>
      ) : (
        <Squircle cornerRadius={24} cornerSmoothing={1} className="overflow-hidden" style={glassStyle}>
          {/* Column headers */}
          <div
            className="grid items-center gap-4 px-6 py-3.5"
            style={{
              gridTemplateColumns: "1fr 180px 130px 120px 72px",
              borderBottom: "1px solid hsl(0 0% 85% / 0.3)",
            }}
          >
            <span className="text-[0.6rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">User</span>
            <span className="text-[0.6rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">Email</span>
            <span className="text-[0.6rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">Role</span>
            <span className="text-[0.6rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">Dept / Org</span>
            <span className="text-[0.6rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] text-right">Edit</span>
          </div>

          {/* Rows */}
          {filtered.map((user, i) => {
            const badge = roleBadge[user.role] || roleBadge.student;
            const RoleIcon = roleIcon[user.role] || GraduationCap;
            const isLast = i === filtered.length - 1;
            const initials = user.name.split(" ").map((w) => w[0]).join("").slice(0, 2);

            return (
              <div
                key={user.id}
                className="group grid items-center gap-4 px-6 py-4 transition-colors duration-200 hover:bg-[hsl(0_0%_100%_/_0.25)]"
                style={{
                  gridTemplateColumns: "1fr 180px 130px 120px 72px",
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
                    {user.year && (
                      <p className="text-[0.64rem] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">{user.year}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-1.5 min-w-0">
                  <Mail className="w-[10px] h-[10px] text-[var(--col-dim)] flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-[0.76rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)] truncate">{user.email}</span>
                </div>

                {/* Role badge */}
                <Squircle
                  cornerRadius={8}
                  cornerSmoothing={1}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 w-fit"
                  style={{ background: badge.bg }}
                >
                  <RoleIcon className="w-[10px] h-[10px]" style={{ color: badge.text }} strokeWidth={1.5} />
                  <span className="text-[0.64rem] font-medium font-[family-name:var(--font-mono)] uppercase tracking-[0.08em]" style={{ color: badge.text }}>
                    {ROLE_LABELS[user.role]}
                  </span>
                </Squircle>

                {/* Dept / Org */}
                <span className="text-[0.76rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)] truncate">
                  {user.department || user.organization || "—"}
                </span>

                {/* Edit */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setEditUser(user)}
                    className="w-8 h-8 rounded-full border border-[var(--line-soft)] flex items-center justify-center hover:border-[var(--col-primary)] hover:text-[var(--col-primary)] transition-colors duration-200 text-[var(--col-dim)] cursor-pointer"
                  >
                    <Pencil className="w-[12px] h-[12px]" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            );
          })}
        </Squircle>
      )}

      {/* Add User Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[hsl(0_0%_10%_/_0.4)] backdrop-blur-sm animate-fade-in" onClick={() => setShowAdd(false)} />
          <Squircle
            cornerRadius={24}
            cornerSmoothing={1}
            className="relative z-10 w-full max-w-md p-7 animate-scale-in"
            style={{ background: "hsl(0 0% 96% / 0.9)", backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)", boxShadow: "0 8px 40px var(--shadow-lg), inset 0 1px 0 hsl(0 0% 100% / 0.6)" }}
          >
            <h3 className="text-[1rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)] mb-5">
              Add User
              <span className="text-[var(--accent)] font-[family-name:var(--font-cursive)] font-normal text-[0.7em]"> .</span>
            </h3>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Full Name</label>
                <input type="text" defaultValue="" placeholder="Enter name" className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" defaultValue="" placeholder="user@pu.ac.in" className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className={labelClass}>Role</label>
                <select className={`${inputClass} cursor-pointer`} style={selectStyle}>
                  {Object.entries(ROLE_LABELS).map(([v, l]) => (
                    <option key={v} value={v}>{l}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Department <span className="normal-case tracking-normal text-[var(--col-dim)]">(optional)</span></label>
                <input type="text" placeholder="e.g. CSE, ECE" className={inputClass} style={inputStyle} />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <Squircle
                cornerRadius={16}
                cornerSmoothing={1}
                className="group inline-flex items-center justify-between text-[0.82rem] font-medium tracking-[0.04em] pl-5 pr-[5px] py-[5px] bg-[var(--col-primary)] text-[var(--bg)] transition-all duration-300 hover:opacity-80 font-[family-name:var(--font-display)] cursor-pointer"
                style={{ boxShadow: "0 2px 16px var(--shadow-lg)" }}
                asChild
              >
                <button onClick={() => { setShowAdd(false); setShowSuccess("User added successfully (demo)."); }}>
                  Add User
                  <Squircle cornerRadius={12} cornerSmoothing={1} className="w-[34px] h-[34px] border border-white/70 flex items-center justify-center flex-shrink-0">
                    <UserPlus className="w-[12px] h-[12px]" strokeWidth={2} />
                  </Squircle>
                </button>
              </Squircle>
              <button
                onClick={() => setShowAdd(false)}
                className="text-[0.82rem] font-medium px-5 py-[10px] transition-all duration-300 hover:bg-[hsl(0_0%_92%)] font-[family-name:var(--font-display)] cursor-pointer text-[var(--col-secondary)]"
                style={{ background: "hsl(0 0% 100% / 0.5)", border: "1px solid hsl(0 0% 85% / 0.4)", borderRadius: "16px" }}
              >
                Cancel
              </button>
            </div>
          </Squircle>
        </div>
      )}

      {/* Edit User Modal */}
      {editUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[hsl(0_0%_10%_/_0.4)] backdrop-blur-sm animate-fade-in" onClick={() => setEditUser(null)} />
          <Squircle
            cornerRadius={24}
            cornerSmoothing={1}
            className="relative z-10 w-full max-w-md p-7 animate-scale-in"
            style={{ background: "hsl(0 0% 96% / 0.9)", backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)", boxShadow: "0 8px 40px var(--shadow-lg), inset 0 1px 0 hsl(0 0% 100% / 0.6)" }}
          >
            <h3 className="text-[1rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)] mb-5">
              Edit User
              <span className="text-[var(--accent)] font-[family-name:var(--font-cursive)] font-normal text-[0.7em]"> .</span>
            </h3>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Full Name</label>
                <input type="text" defaultValue={editUser.name} className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" defaultValue={editUser.email} className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className={labelClass}>Role</label>
                <select defaultValue={editUser.role} className={`${inputClass} cursor-pointer`} style={selectStyle}>
                  {Object.entries(ROLE_LABELS).map(([v, l]) => (
                    <option key={v} value={v}>{l}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Department <span className="normal-case tracking-normal text-[var(--col-dim)]">(optional)</span></label>
                <input type="text" defaultValue={editUser.department || ""} placeholder="e.g. CSE, ECE" className={inputClass} style={inputStyle} />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <Squircle
                cornerRadius={16}
                cornerSmoothing={1}
                className="group inline-flex items-center justify-between text-[0.82rem] font-medium tracking-[0.04em] pl-5 pr-[5px] py-[5px] bg-[var(--col-primary)] text-[var(--bg)] transition-all duration-300 hover:opacity-80 font-[family-name:var(--font-display)] cursor-pointer"
                style={{ boxShadow: "0 2px 16px var(--shadow-lg)" }}
                asChild
              >
                <button onClick={() => { setEditUser(null); setShowSuccess("User updated successfully (demo)."); }}>
                  Save Changes
                  <Squircle cornerRadius={12} cornerSmoothing={1} className="w-[34px] h-[34px] border border-white/70 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-[12px] h-[12px] stroke-current fill-none stroke-2 transition-transform duration-300 -rotate-45 group-hover:rotate-0" strokeLinecap="round">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Squircle>
                </button>
              </Squircle>
              <button
                onClick={() => setEditUser(null)}
                className="text-[0.82rem] font-medium px-5 py-[10px] transition-all duration-300 hover:bg-[hsl(0_0%_92%)] font-[family-name:var(--font-display)] cursor-pointer text-[var(--col-secondary)]"
                style={{ background: "hsl(0 0% 100% / 0.5)", border: "1px solid hsl(0 0% 85% / 0.4)", borderRadius: "16px" }}
              >
                Cancel
              </button>
            </div>
          </Squircle>
        </div>
      )}

      {/* Success toast */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[hsl(0_0%_10%_/_0.4)] backdrop-blur-sm animate-fade-in" onClick={() => setShowSuccess("")} />
          <Squircle
            cornerRadius={24}
            cornerSmoothing={1}
            className="relative z-10 w-full max-w-sm p-7 animate-scale-in text-center"
            style={{ background: "hsl(0 0% 96% / 0.9)", backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)", boxShadow: "0 8px 40px var(--shadow-lg), inset 0 1px 0 hsl(0 0% 100% / 0.6)" }}
          >
            <div className="w-12 h-12 rounded-full bg-[hsl(142_50%_45%_/_0.12)] flex items-center justify-center mx-auto mb-4">
              <Check className="w-5 h-5 text-[hsl(142,50%,35%)]" strokeWidth={2} />
            </div>
            <h3 className="text-[1rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)] mb-1">Done</h3>
            <p className="text-[0.82rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)] mb-5">{showSuccess}</p>
            <Squircle
              cornerRadius={14}
              cornerSmoothing={1}
              className="w-full text-center text-[0.8rem] font-medium py-[11px] bg-[var(--col-primary)] text-[var(--bg)] transition-all duration-300 hover:opacity-80 font-[family-name:var(--font-display)] cursor-pointer"
              style={{ boxShadow: "0 2px 12px var(--shadow-lg)" }}
              asChild
            >
              <button onClick={() => setShowSuccess("")}>OK</button>
            </Squircle>
          </Squircle>
        </div>
      )}
    </div>
  );
}
