"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Squircle } from "@squircle-js/react";
import { ROLE_HOME } from "@/constants/navigation";
import { useDemoStore } from "@/store/demo-store";
import type { UserRole } from "@/types";
import { useState } from "react";

const ROLES: { value: UserRole; label: string; desc: string; color: string }[] = [
  { value: "student", label: "Student", desc: "Browse events, register & get certificates", color: "var(--role-student)" },
  { value: "admin", label: "Admin", desc: "Create events, manage registrations", color: "var(--role-admin)" },
  { value: "super_admin", label: "Super Admin", desc: "Approve events, manage users", color: "var(--role-super)" },
  { value: "platform_admin", label: "Platform Admin", desc: "Full platform control & settings", color: "var(--role-platform)" },
];

export default function LoginPage() {
  const router = useRouter();
  const login = useDemoStore((s) => s.login);
  const [role, setRole] = useState<UserRole>("student");
  const [email, setEmail] = useState("demo@pu.ac.in");
  const [password, setPassword] = useState("demo123");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
    router.push(ROLE_HOME[role]);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Blob background */}
      <div className="blob-container">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* Back to home */}
      <Link
        href="/"
        className="fixed top-6 left-6 md:left-12 flex items-center gap-[7px] z-[201]"
      >
        <div className="w-[7px] h-[7px] rounded-full bg-[var(--accent)] flex-shrink-0 shadow-[0_1px_4px_var(--shadow-lg)]" />
        <div className="text-[1.1rem] leading-none">
          <span className="font-extrabold text-[var(--col-primary)] tracking-[-0.02em] font-[family-name:var(--font-display)]">
            PU
          </span>
          <span className="font-normal text-[var(--col-secondary)] font-[family-name:var(--font-cursive)]">
            verse
          </span>
        </div>
      </Link>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-[960px] mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left — Login form */}
          <div>
            <p className="flex items-center gap-[10px] text-[0.68rem] tracking-[0.22em] uppercase text-[var(--col-dim)] mb-4 font-[family-name:var(--font-mono)]">
              <span className="inline-block w-5 h-px bg-[var(--accent)] flex-shrink-0" />
              Welcome back
            </p>
            <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--col-primary)] mb-2 font-[family-name:var(--font-display)]">
              Login
              <span className="text-[var(--accent)] font-[family-name:var(--font-cursive)] font-normal text-[0.7em]">
                {" "}.
              </span>
            </h1>
            <p className="text-[0.88rem] text-[var(--col-secondary)] leading-[1.6] mb-8 font-[family-name:var(--font-ui)]">
              Demo login — pick a role to explore that dashboard.
            </p>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-[0.62rem] font-medium uppercase tracking-[0.18em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">
                  Email
                </label>
                <Squircle cornerRadius={12} cornerSmoothing={1} className="w-full">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 px-4 text-[0.85rem] bg-[hsl(0_0%_96%_/_0.55)] border border-[hsl(0_0%_85%_/_0.5)] text-[var(--col-primary)] font-[family-name:var(--font-ui)] outline-none transition-all duration-200 focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_hsl(25_65%_45%_/_0.1)]"
                    style={{ borderRadius: "inherit" }}
                  />
                </Squircle>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-[0.62rem] font-medium uppercase tracking-[0.18em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">
                  Password
                </label>
                <Squircle cornerRadius={12} cornerSmoothing={1} className="w-full">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-11 px-4 text-[0.85rem] bg-[hsl(0_0%_96%_/_0.55)] border border-[hsl(0_0%_85%_/_0.5)] text-[var(--col-primary)] font-[family-name:var(--font-ui)] outline-none transition-all duration-200 focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_hsl(25_65%_45%_/_0.1)]"
                    style={{ borderRadius: "inherit" }}
                  />
                </Squircle>
              </div>

              {/* Role select */}
              <div className="space-y-1.5">
                <label htmlFor="role" className="block text-[0.62rem] font-medium uppercase tracking-[0.18em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">
                  Login as
                </label>
                <Squircle cornerRadius={12} cornerSmoothing={1} className="w-full">
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full h-11 px-4 text-[0.85rem] bg-[hsl(0_0%_96%_/_0.55)] border border-[hsl(0_0%_85%_/_0.5)] text-[var(--col-primary)] font-[family-name:var(--font-ui)] outline-none transition-all duration-200 focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_hsl(25_65%_45%_/_0.1)] appearance-none cursor-pointer"
                    style={{ borderRadius: "inherit" }}
                  >
                    {ROLES.map((r) => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                </Squircle>
              </div>

              {/* Forgot password */}
              <div className="flex justify-end">
                <Link href="/forgot-password" className="text-[0.76rem] text-[var(--col-secondary)] hover:text-[var(--col-primary)] transition-colors duration-200 font-[family-name:var(--font-ui)]">
                  Forgot password?
                </Link>
              </div>

              {/* Submit button */}
              <Squircle
                cornerRadius={18}
                cornerSmoothing={1}
                className="group w-full inline-flex items-center justify-center gap-[10px] text-[0.82rem] font-medium tracking-[0.04em] px-5 py-[12px] bg-[var(--col-primary)] text-[var(--bg)] transition-all duration-300 hover:opacity-80 font-[family-name:var(--font-display)] cursor-pointer"
                style={{ boxShadow: "0 2px 16px var(--shadow-lg)" }}
                asChild
              >
                <button type="submit">
                  Login
                  <Squircle
                    cornerRadius={12}
                    cornerSmoothing={1}
                    className="w-[30px] h-[30px] border border-white/70 flex items-center justify-center flex-shrink-0"
                  >
                    <svg viewBox="0 0 24 24" className="w-[11px] h-[11px] stroke-current fill-none stroke-2 transition-transform duration-300 -rotate-45 group-hover:rotate-0" strokeLinecap="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Squircle>
                </button>
              </Squircle>
            </form>

            <p className="mt-6 text-center text-[0.8rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-[var(--accent)] hover:text-[var(--accent-dark)] font-medium transition-colors duration-200">
                Register
              </Link>
            </p>
          </div>

          {/* Right — Role cards */}
          <div className="hidden lg:block">
            <p className="text-[0.68rem] tracking-[0.22em] uppercase text-[var(--col-dim)] mb-4 font-[family-name:var(--font-mono)]">
              Quick role preview
            </p>
            <div className="space-y-3">
              {ROLES.map((r) => (
                <Squircle
                  key={r.value}
                  cornerRadius={16}
                  cornerSmoothing={1}
                  onClick={() => setRole(r.value)}
                  className={`p-4 cursor-pointer transition-all duration-300 ${
                    role === r.value
                      ? "bg-[hsl(0_0%_96%_/_0.75)] shadow-[0_4px_24px_var(--shadow)]"
                      : "bg-[hsl(0_0%_96%_/_0.45)] hover:bg-[hsl(0_0%_96%_/_0.65)]"
                  }`}
                  style={{
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Squircle
                      cornerRadius={10}
                      cornerSmoothing={1}
                      className="w-10 h-10 flex items-center justify-center text-white text-[0.7rem] font-semibold flex-shrink-0 font-[family-name:var(--font-display)]"
                      style={{ background: `linear-gradient(135deg, ${r.color}, ${r.color}cc)` }}
                    >
                      {r.label[0]}
                    </Squircle>
                    <div>
                      <p className="text-[0.84rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)]">{r.label}</p>
                      <p className="text-[0.74rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">{r.desc}</p>
                    </div>
                  </div>
                </Squircle>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
