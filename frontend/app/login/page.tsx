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

const ROLES: { value: UserRole; label: string; desc: string }[] = [
  { value: "student", label: "Student", desc: "Browse events, register, tickets & certificates" },
  { value: "organizer", label: "Organizer", desc: "Create events, manage registrations & attendance" },
  { value: "admin", label: "Admin", desc: "Approve events, manage users & organizations" },
  { value: "super_admin", label: "Super Admin", desc: "Full platform control & system settings" },
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
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="mt-2 text-neutral-600">
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
              <Link href="/forgot-password" className="text-sm underline">
                Forgot password?
              </Link>
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <p className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Register
            </Link>
          </p>
        </div>

        <div className="flex-1 space-y-3">
          <p className="text-sm font-medium">Quick role preview</p>
          {ROLES.map((r) => (
            <Card
              key={r.value}
              onClick={() => {
                setRole(r.value);
              }}
              className={role === r.value ? "ring-2 ring-black" : ""}
            >
              <p className="font-semibold">{r.label}</p>
              <p className="text-sm text-neutral-600">{r.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </PublicShell>
  );
}
