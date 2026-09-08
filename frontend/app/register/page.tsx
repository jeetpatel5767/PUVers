"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Squircle } from "@squircle-js/react";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError(null);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12">
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
      <div className="relative z-10 w-full max-w-[560px] mx-auto px-6 md:px-10">
        <p className="flex items-center gap-[10px] text-[0.68rem] tracking-[0.22em] uppercase text-[var(--col-dim)] mb-3 font-[family-name:var(--font-mono)]">
          <span className="inline-block w-5 h-px bg-[var(--accent)] flex-shrink-0" />
          Screen 01 — Registration
        </p>
        <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--col-primary)] mb-2 font-[family-name:var(--font-display)]">
          Create Account
          <span className="text-[var(--accent)] font-[family-name:var(--font-cursive)] font-normal text-[0.7em]">
            {" "}.
          </span>
        </h1>
        <p className="text-[0.88rem] text-[var(--col-secondary)] leading-[1.6] mb-7 font-[family-name:var(--font-ui)]">
          Register with your university credentials to participate in events.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="firstName" className="block text-[0.62rem] font-medium uppercase tracking-[0.18em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">
                First Name *
              </label>
              <Squircle cornerRadius={16} cornerSmoothing={1} className="w-full flex items-center bg-[hsl(0_0%_96%_/_0.55)] border border-[hsl(0_0%_85%_/_0.5)] pr-[5px] py-[4px] transition-all duration-200 focus-within:border-[var(--accent)] focus-within:shadow-[0_0_0_3px_hsl(25_65%_45%_/_0.1)]">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  placeholder="e.g. Aarav"
                  defaultValue="Aarav"
                  className="flex-1 h-10 px-4 text-[0.85rem] bg-transparent text-[var(--col-primary)] font-[family-name:var(--font-ui)] outline-none placeholder:text-[var(--col-dim)]"
                />
              </Squircle>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="lastName" className="block text-[0.62rem] font-medium uppercase tracking-[0.18em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">
                Last Name *
              </label>
              <Squircle cornerRadius={16} cornerSmoothing={1} className="w-full flex items-center bg-[hsl(0_0%_96%_/_0.55)] border border-[hsl(0_0%_85%_/_0.5)] pr-[5px] py-[4px] transition-all duration-200 focus-within:border-[var(--accent)] focus-within:shadow-[0_0_0_3px_hsl(25_65%_45%_/_0.1)]">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  placeholder="e.g. Sharma"
                  defaultValue="Sharma"
                  className="flex-1 h-10 px-4 text-[0.85rem] bg-transparent text-[var(--col-primary)] font-[family-name:var(--font-ui)] outline-none placeholder:text-[var(--col-dim)]"
                />
              </Squircle>
            </div>
          </div>

          {/* University ID */}
          <div className="space-y-1.5">
            <label htmlFor="universityId" className="block text-[0.62rem] font-medium uppercase tracking-[0.18em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">
              University ID *
            </label>
            <Squircle cornerRadius={16} cornerSmoothing={1} className="w-full flex items-center bg-[hsl(0_0%_96%_/_0.55)] border border-[hsl(0_0%_85%_/_0.5)] pr-[5px] py-[4px] transition-all duration-200 focus-within:border-[var(--accent)] focus-within:shadow-[0_0_0_3px_hsl(25_65%_45%_/_0.1)]">
              <input
                id="universityId"
                name="universityId"
                type="text"
                required
                placeholder="e.g. PU2023-CS-042"
                defaultValue="PU2023-CS-042"
                className="flex-1 h-10 px-4 text-[0.85rem] bg-transparent text-[var(--col-primary)] font-[family-name:var(--font-mono)] outline-none placeholder:text-[var(--col-dim)]"
              />
            </Squircle>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-[0.62rem] font-medium uppercase tracking-[0.18em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">
              Email Address *
            </label>
            <Squircle cornerRadius={16} cornerSmoothing={1} className="w-full flex items-center bg-[hsl(0_0%_96%_/_0.55)] border border-[hsl(0_0%_85%_/_0.5)] pr-[5px] py-[4px] transition-all duration-200 focus-within:border-[var(--accent)] focus-within:shadow-[0_0_0_3px_hsl(25_65%_45%_/_0.1)]">
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="aarav@pu.ac.in"
                defaultValue="aarav@pu.ac.in"
                className="flex-1 h-10 px-4 text-[0.85rem] bg-transparent text-[var(--col-primary)] font-[family-name:var(--font-ui)] outline-none placeholder:text-[var(--col-dim)]"
              />
            </Squircle>
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-[0.62rem] font-medium uppercase tracking-[0.18em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">
                Password *
              </label>
              <Squircle cornerRadius={16} cornerSmoothing={1} className="w-full flex items-center bg-[hsl(0_0%_96%_/_0.55)] border border-[hsl(0_0%_85%_/_0.5)] pr-[5px] py-[4px] transition-all duration-200 focus-within:border-[var(--accent)] focus-within:shadow-[0_0_0_3px_hsl(25_65%_45%_/_0.1)]">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="flex-1 h-10 px-4 text-[0.85rem] bg-transparent text-[var(--col-primary)] font-[family-name:var(--font-ui)] outline-none placeholder:text-[var(--col-dim)]"
                />
              </Squircle>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="confirmPassword" className="block text-[0.62rem] font-medium uppercase tracking-[0.18em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">
                Confirm Password *
              </label>
              <Squircle cornerRadius={16} cornerSmoothing={1} className="w-full flex items-center bg-[hsl(0_0%_96%_/_0.55)] border border-[hsl(0_0%_85%_/_0.5)] pr-[5px] py-[4px] transition-all duration-200 focus-within:border-[var(--accent)] focus-within:shadow-[0_0_0_3px_hsl(25_65%_45%_/_0.1)]">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="flex-1 h-10 px-4 text-[0.85rem] bg-transparent text-[var(--col-primary)] font-[family-name:var(--font-ui)] outline-none placeholder:text-[var(--col-dim)]"
                />
              </Squircle>
            </div>
          </div>

          {/* Department & Course */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="department" className="block text-[0.62rem] font-medium uppercase tracking-[0.18em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">
                Department *
              </label>
              <Squircle cornerRadius={16} cornerSmoothing={1} className="w-full flex items-center bg-[hsl(0_0%_96%_/_0.55)] border border-[hsl(0_0%_85%_/_0.5)] pr-[5px] py-[4px] transition-all duration-200 focus-within:border-[var(--accent)] focus-within:shadow-[0_0_0_3px_hsl(25_65%_45%_/_0.1)]">
                <select
                  id="department"
                  name="department"
                  required
                  className="flex-1 h-10 px-4 text-[0.85rem] bg-transparent text-[var(--col-primary)] font-[family-name:var(--font-ui)] outline-none appearance-none cursor-pointer"
                >
                  <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics & Communication">Electronics & Communication</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Management Studies">Management Studies</option>
                </select>
              </Squircle>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="course" className="block text-[0.62rem] font-medium uppercase tracking-[0.18em] text-[var(--col-dim)] font-[family-name:var(--font-mono)]">
                Course *
              </label>
              <Squircle cornerRadius={16} cornerSmoothing={1} className="w-full flex items-center bg-[hsl(0_0%_96%_/_0.55)] border border-[hsl(0_0%_85%_/_0.5)] pr-[5px] py-[4px] transition-all duration-200 focus-within:border-[var(--accent)] focus-within:shadow-[0_0_0_3px_hsl(25_65%_45%_/_0.1)]">
                <input
                  id="course"
                  name="course"
                  type="text"
                  required
                  placeholder="e.g. B.Tech CSE"
                  defaultValue="B.Tech CSE"
                  className="flex-1 h-10 px-4 text-[0.85rem] bg-transparent text-[var(--col-primary)] font-[family-name:var(--font-ui)] outline-none placeholder:text-[var(--col-dim)]"
                />
              </Squircle>
            </div>
          </div>

          {/* Submit button */}
          <div className="pt-2">
            <Squircle
              cornerRadius={20}
              cornerSmoothing={1}
              className="group w-full inline-flex items-center justify-between text-[0.92rem] font-medium tracking-[0.04em] pl-7 pr-[6px] py-[6px] bg-[var(--col-primary)] text-[var(--bg)] transition-all duration-300 hover:opacity-80 font-[family-name:var(--font-display)] cursor-pointer"
              style={{ boxShadow: "0 2px 16px var(--shadow-lg)" }}
              asChild
            >
              <button type="submit">
                Register
                <Squircle
                  cornerRadius={16}
                  cornerSmoothing={1}
                  className="w-[42px] h-[42px] border border-white/70 flex items-center justify-center flex-shrink-0"
                >
                  <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] stroke-current fill-none stroke-2 transition-transform duration-300 -rotate-45 group-hover:rotate-0" strokeLinecap="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Squircle>
              </button>
            </Squircle>
          </div>
        </form>

        <p className="mt-6 text-center text-[0.8rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">
          Already registered?{" "}
          <Link href="/login" className="text-[var(--accent)] hover:text-[var(--accent-dark)] font-medium transition-colors duration-200">
            Login
          </Link>
        </p>
      </div>

      {/* Success modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-[hsl(0_0%_10%_/_0.4)] backdrop-blur-sm animate-fade-in"
            onClick={() => setShowSuccess(false)}
          />
          <Squircle
            cornerRadius={22}
            cornerSmoothing={1}
            className="relative z-10 w-full max-w-sm p-8 animate-scale-in text-center"
            style={{
              background: "hsl(0 0% 96% / 0.9)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow: "0 8px 40px var(--shadow-lg), inset 0 1px 0 var(--glow)",
            }}
          >
            <div className="w-12 h-12 rounded-full bg-[hsl(142_50%_45%_/_0.12)] flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-[hsl(142,50%,35%)] fill-none stroke-2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-[1.15rem] font-semibold text-[var(--col-primary)] mb-2 font-[family-name:var(--font-display)]">
              Registration Successful
            </h2>
            <p className="text-[0.84rem] text-[var(--col-secondary)] mb-6 font-[family-name:var(--font-ui)]">
              Your participant account has been registered. You can now login.
            </p>
            <Squircle
              cornerRadius={16}
              cornerSmoothing={1}
              className="group w-full inline-flex items-center justify-center gap-[10px] text-[0.82rem] font-medium tracking-[0.04em] px-5 py-[12px] bg-[var(--col-primary)] text-[var(--bg)] transition-all duration-300 hover:opacity-80 font-[family-name:var(--font-display)] cursor-pointer"
              style={{ boxShadow: "0 2px 16px var(--shadow-lg)" }}
              asChild
            >
              <button
                onClick={() => {
                  setShowSuccess(false);
                  router.push("/login");
                }}
              >
                Go to Login
              </button>
            </Squircle>
          </Squircle>
        </div>
      )}
    </div>
  );
}
