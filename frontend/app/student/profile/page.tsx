"use client";

import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useDemoStore } from "@/store/demo-store";
import { useState } from "react";

export default function StudentProfilePage() {
  const user = useDemoStore((s) => s.user);
  const [showSave, setShowSave] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSave(true);
  };

  return (
    <div>
      <PageHeader title="Profile" description="Manage your account settings." />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="font-semibold">Personal Information</h3>
          <form onSubmit={handleSave} className="mt-4 space-y-4">
            <Input label="Full Name" id="name" defaultValue={user?.name} />
            <Input label="Email" id="email" type="email" defaultValue={user?.email} disabled />
            <Input label="Department" id="dept" defaultValue={user?.department ?? "CSE"} />
            <Input label="Year" id="year" defaultValue={user?.year ?? "3rd Year"} />
            <Input label="Organization" id="org" defaultValue={user?.organization ?? ""} />
            <Button type="submit">Save Changes</Button>
          </form>
        </Card>

        <Card>
          <h3 className="font-semibold">Security</h3>
          <div className="mt-4 space-y-4">
            <Button variant="outline" onClick={() => setShowPassword(true)}>
              Change Password
            </Button>
            <div className="border-t border-neutral-200 pt-4">
              <p className="text-sm font-medium">Account Role</p>
              <p className="mt-1 text-sm text-neutral-600 capitalize">{user?.role?.replace("_", " ")}</p>
            </div>
          </div>
        </Card>
      </div>

      <Modal
        open={showSave}
        onClose={() => setShowSave(false)}
        title="Profile Updated"
        footer={<Button onClick={() => setShowSave(false)}>OK</Button>}
      >
        <p className="text-sm text-neutral-600">Your profile has been saved (demo).</p>
      </Modal>

      <Modal
        open={showPassword}
        onClose={() => setShowPassword(false)}
        title="Change Password"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowPassword(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowPassword(false);
                alert("Password updated (demo)");
              }}
            >
              Update
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Current Password" id="current" type="password" />
          <Input label="New Password" id="new" type="password" />
          <Input label="Confirm Password" id="confirm" type="password" />
        </div>
      </Modal>
    </div>
  );
}
