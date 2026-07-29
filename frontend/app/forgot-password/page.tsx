"use client";

import Link from "next/link";
import { PublicShell } from "@/components/layouts/public-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [showSent, setShowSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSent(true);
  };

  return (
    <PublicShell>
      <div className="mx-auto max-w-md px-4 py-12">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] text-[var(--ink-1)]">
          Forgot Password
        </h1>
        <p className="mt-2 text-[var(--ink-2)]">
          Enter your email and we&apos;ll send a reset link (demo).
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <Input label="Email" id="email" type="email" defaultValue="demo@pu.ac.in" required />
          <Button type="submit" className="w-full">
            Send Reset Link
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-[var(--ink-3)]">
          <Link href="/login" className="text-[var(--accent-500)] hover:text-[var(--accent-400)]">
            Back to Login
          </Link>
        </p>
      </div>

      <Modal
        open={showSent}
        onClose={() => setShowSent(false)}
        title="Reset Link Sent"
        footer={<Button onClick={() => setShowSent(false)}>OK</Button>}
      >
        <p className="text-sm text-[var(--ink-2)]">
          If an account exists for that email, a password reset link has been sent.
        </p>
      </Modal>
    </PublicShell>
  );
}
