"use client";

import { useState } from "react";
import { Squircle } from "@squircle-js/react";
import { ORGANIZATIONS } from "@/constants/mock-data";
import type { Organization } from "@/types";
import {
  Building2,
  Users,
  CalendarDays,
  Plus,
  Check,
  Power,
} from "lucide-react";

const typeColors: Record<string, string> = {
  Committee: "var(--accent)",
  Club: "var(--info)",
  Cell: "var(--positive)",
};

export default function SuperAdminOrganizationsPage() {
  const [orgs, setOrgs] = useState(ORGANIZATIONS);
  const [showAdd, setShowAdd] = useState(false);
  const [showSuccess, setShowSuccess] = useState("");

  const totalMembers = orgs.reduce((s, o) => s + o.members, 0);
  const totalEvents = orgs.reduce((s, o) => s + o.events, 0);
  const activeCount = orgs.filter((o) => o.status === "active").length;
  const maxMembers = Math.max(...orgs.map((o) => o.members));

  const toggleStatus = (id: string) => {
    setOrgs(orgs.map((o) =>
      o.id === id ? { ...o, status: o.status === "active" ? "inactive" as const : "active" as const } : o
    ));
  };

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
            Organizations
            <span className="text-[var(--accent)] font-[family-name:var(--font-cursive)] font-normal text-[0.7em]"> .</span>
          </h1>
          <p className="mt-2 text-[0.84rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">
            {orgs.length} organizations &middot; {totalMembers} members &middot; {totalEvents} events hosted
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
            Add Organization
            <Squircle cornerRadius={12} cornerSmoothing={1} className="w-[34px] h-[34px] border border-white/70 flex items-center justify-center flex-shrink-0">
              <Plus className="w-[13px] h-[13px]" strokeWidth={2} />
            </Squircle>
          </button>
        </Squircle>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Active", value: activeCount, icon: Building2, color: "var(--positive)" },
          { label: "Total Members", value: totalMembers, icon: Users, color: "var(--info)" },
          { label: "Events Hosted", value: totalEvents, icon: CalendarDays, color: "var(--accent)" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Squircle key={s.label} cornerRadius={22} cornerSmoothing={1} className="p-5" style={glassStyle}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border flex items-center justify-center" style={{ borderColor: s.color }}>
                  <Icon className="w-[15px] h-[15px]" style={{ color: s.color }} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[1.4rem] font-semibold tracking-[-0.03em] leading-none text-[var(--col-primary)] font-[family-name:var(--font-mono)] tabular-nums">
                    {s.value}
                  </p>
                  <p className="text-[0.64rem] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mt-1 uppercase tracking-[0.1em]">
                    {s.label}
                  </p>
                </div>
              </div>
            </Squircle>
          );
        })}
      </div>

      {/* Org cards grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {orgs.map((org) => {
          const initials = org.name.split(" ").map((w) => w[0]).join("").slice(0, 2);
          const memberPct = Math.round((org.members / maxMembers) * 100);
          const color = typeColors[org.type] || "var(--col-primary)";
          const isActive = org.status === "active";

          return (
            <Squircle
              key={org.id}
              cornerRadius={24}
              cornerSmoothing={1}
              className={`p-6 transition-all duration-300 hover:-translate-y-[2px] ${!isActive ? "opacity-60" : ""}`}
              style={{
                ...glassStyle,
                borderTop: `2px solid ${color}`,
              }}
            >
              {/* Top: initials + name + status */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <Squircle
                    cornerRadius={14}
                    cornerSmoothing={1}
                    className="w-12 h-12 flex items-center justify-center text-white text-[0.6rem] font-bold font-[family-name:var(--font-display)]"
                    style={{ background: `linear-gradient(135deg, ${color}, var(--col-primary))` }}
                  >
                    {initials}
                  </Squircle>
                  <div>
                    <p className="text-[0.9rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)] leading-tight">
                      {org.name}
                    </p>
                    <Squircle
                      cornerRadius={6}
                      cornerSmoothing={1}
                      className="inline-block px-2 py-0.5 text-[0.52rem] uppercase tracking-[0.1em] font-medium font-[family-name:var(--font-mono)] mt-1"
                      style={{ background: `${color}15`, color }}
                    >
                      {org.type}
                    </Squircle>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <div
                    className="w-[6px] h-[6px] rounded-full"
                    style={{ background: isActive ? "var(--positive)" : "var(--col-dim)" }}
                  />
                  <span className="text-[0.6rem] font-[family-name:var(--font-mono)]" style={{ color: isActive ? "var(--positive)" : "var(--col-dim)" }}>
                    {isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-6 mb-5">
                <div className="flex-1">
                  <div className="flex items-baseline gap-1.5 mb-1.5">
                    <Users className="w-[10px] h-[10px] text-[var(--col-dim)]" strokeWidth={1.5} />
                    <span className="text-[1.1rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-mono)] tabular-nums leading-none">
                      {org.members}
                    </span>
                    <span className="text-[0.6rem] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">members</span>
                  </div>
                  <div className="h-[3px] rounded-full bg-[hsl(0_0%_85%_/_0.4)] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${memberPct}%`, background: color }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="relative w-11 h-11">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(0 0% 85% / 0.4)" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="14" fill="none"
                        stroke={color}
                        strokeWidth="3"
                        strokeDasharray={`${(org.events / 15) * 88} 88`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[0.52rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-mono)]">
                      {org.events}
                    </span>
                  </div>
                  <span className="text-[0.6rem] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">events</span>
                </div>
              </div>

              {/* Toggle button */}
              <button
                onClick={() => toggleStatus(org.id)}
                className="w-full flex items-center justify-center gap-2 py-[9px] text-[0.74rem] font-medium transition-all duration-300 cursor-pointer font-[family-name:var(--font-ui)]"
                style={{
                  borderRadius: "12px",
                  background: isActive ? "hsl(0 0% 100% / 0.5)" : "hsl(142 50% 45% / 0.1)",
                  border: `1px solid ${isActive ? "hsl(0 0% 85% / 0.4)" : "hsl(142 50% 45% / 0.3)"}`,
                  color: isActive ? "var(--col-secondary)" : "hsl(142 50% 35%)",
                }}
              >
                <Power className="w-[12px] h-[12px]" strokeWidth={1.5} />
                {isActive ? "Deactivate" : "Activate"}
              </button>
            </Squircle>
          );
        })}
      </div>

      {/* Add Organization Modal */}
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
              Add Organization
              <span className="text-[var(--accent)] font-[family-name:var(--font-cursive)] font-normal text-[0.7em]"> .</span>
            </h3>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Organization Name</label>
                <input type="text" placeholder="Enter name" className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className={labelClass}>Type</label>
                <select className={`${inputClass} cursor-pointer`} style={selectStyle}>
                  <option value="Club">Club</option>
                  <option value="Committee">Committee</option>
                  <option value="Cell">Cell</option>
                </select>
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
                <button onClick={() => {
                  setOrgs([...orgs, { id: `org-${Date.now()}`, name: "New Organization", type: "Club", members: 0, events: 0, status: "active" }]);
                  setShowAdd(false);
                  setShowSuccess("Organization added successfully (demo).");
                }}>
                  Add
                  <Squircle cornerRadius={12} cornerSmoothing={1} className="w-[34px] h-[34px] border border-white/70 flex items-center justify-center flex-shrink-0">
                    <Plus className="w-[12px] h-[12px]" strokeWidth={2} />
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
