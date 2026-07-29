"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PublicShell } from "@/components/layouts/public-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ROLE_HOME } from "@/constants/navigation";
import { useDemoStore } from "@/store/demo-store";
import type { UserRole } from "@/types";
import { useState } from "react";

const ROLES: { value: UserRole; label: string; desc: string; color: string }[] = [
  { value: "student", label: "Student", desc: "Browse events, register, tickets & certificates", color: "var(--role-student)" },
  { value: "admin", label: "Admin", desc: "Create events, manage registrations & attendance", color: "var(--role-admin)" },
  { value: "super_admin", label: "Super Admin", desc: "Approve events, manage users & organizations", color: "var(--role-super)" },
  { value: "platform_admin", label: "Platform Admin", desc: "Full platform control & system settings", color: "var(--role-platform)" },
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
    <PublicShell>
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-12 lg:flex-row">
        <div className="flex-1">
          <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] text-[var(--ink-1)]">
            Login
          </h1>
          <p className="mt-2 text-[var(--ink-2)]">
            Demo login — pick a role to explore that user journey.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <Input
              label="Email"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Select
              label="Login as (Demo Role)"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              options={ROLES.map((r) => ({ value: r.value, label: r.label }))}
            />
            <div className="flex items-center justify-between">
              <Link href="/forgot-password" className="text-sm text-[var(--ink-3)] hover:text-[var(--accent-500)]">
                Forgot password?
              </Link>
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-[var(--ink-3)]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[var(--accent-500)] hover:text-[var(--accent-400)]">
              Register
            </Link>
          </p>
        </div>

        <div className="flex-1 space-y-3">
          <p className="text-sm font-medium text-[var(--ink-2)]">Quick role preview</p>
          {ROLES.map((r) => (
            <Card
              key={r.value}
              onClick={() => setRole(r.value)}
              className={
                role === r.value
                  ? "!border-[var(--accent-500)] shadow-[0_0_0_1px_var(--accent-glow)]"
                  : ""
              }
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-[35%] flex items-center justify-center text-white text-xs font-semibold flex-none"
                  style={{ background: `linear-gradient(135deg, ${r.color}, ${r.color}cc)` }}
                >
                  {r.label[0]}
                </div>
                <div>
                  <p className="font-semibold text-[var(--ink-1)]">{r.label}</p>
                  <p className="text-sm text-[var(--ink-2)]">{r.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PublicShell>
  );
}
