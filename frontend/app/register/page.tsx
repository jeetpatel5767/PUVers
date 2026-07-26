"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PublicShell } from "@/components/layouts/public-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  return (
    <PublicShell>
      <div className="mx-auto max-w-md px-4 py-12">
        <h1 className="text-3xl font-bold">Register</h1>
        <p className="mt-2 text-neutral-600">Create your PUVerse account (demo).</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <Input label="Full Name" id="name" defaultValue="New Student" required />
          <Input label="Email" id="email" type="email" defaultValue="new@pu.ac.in" required />
          <Input label="Password" id="password" type="password" defaultValue="demo123" required />
          <Select
            label="Department"
            id="dept"
            options={[
              { value: "cse", label: "Computer Science" },
              { value: "ece", label: "Electronics" },
              { value: "me", label: "Mechanical" },
            ]}
          />
          <Select
            label="Year"
            id="year"
            options={[
              { value: "1", label: "1st Year" },
              { value: "2", label: "2nd Year" },
              { value: "3", label: "3rd Year" },
              { value: "4", label: "4th Year" },
            ]}
          />
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </p>
      </div>

      <Modal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Registration Successful"
        footer={
          <Button
            onClick={() => {
              setShowSuccess(false);
              router.push("/login");
            }}
          >
            Go to Login
          </Button>
        }
      >
        <p className="text-sm text-neutral-600">
          Your account has been created. Please login to continue exploring PUVerse.
        </p>
      </Modal>
    </PublicShell>
  );
}
