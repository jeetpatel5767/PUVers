"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface ToggleSettingProps {
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}

function ToggleSetting({ label, description, enabled, onToggle }: ToggleSettingProps) {
  return (
    <div className="flex items-center justify-between border-b border-neutral-100 py-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-neutral-500">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative h-6 w-11 border border-black transition-colors ${enabled ? "bg-black" : "bg-white"}`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 border border-black transition-transform ${
            enabled ? "translate-x-5 bg-white" : "translate-x-0.5 bg-black"
          }`}
        />
      </button>
    </div>
  );
}

export default function SuperAdminSettingsPage() {
  const [settings, setSettings] = useState({
    requireApproval: true,
    allowSelfRegistration: true,
    emailNotifications: true,
    maintenanceMode: false,
    maxEventsPerOrg: "10",
    defaultCapacity: "100",
    timezone: "Asia/Kolkata",
  });

  const toggle = (key: keyof typeof settings) =>
    setSettings((s) => ({ ...s, [key]: !s[key] }));

  return (
    <div>
      <PageHeader title="Platform Settings" description="Configure platform behavior and defaults." />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardTitle>Event Settings</CardTitle>
          <div className="mt-4">
            <ToggleSetting
              label="Require Event Approval"
              description="All new events must be approved by a super admin before publishing."
              enabled={settings.requireApproval as boolean}
              onToggle={() => toggle("requireApproval")}
            />
            <ToggleSetting
              label="Allow Self-Registration"
              description="Students can register for events without approval."
              enabled={settings.allowSelfRegistration as boolean}
              onToggle={() => toggle("allowSelfRegistration")}
            />
            <div className="mt-4 space-y-4">
              <Input
                label="Max Events Per Organization"
                type="number"
                value={settings.maxEventsPerOrg}
                onChange={(e) => setSettings((s) => ({ ...s, maxEventsPerOrg: e.target.value }))}
              />
              <Input
                label="Default Event Capacity"
                type="number"
                value={settings.defaultCapacity}
                onChange={(e) => setSettings((s) => ({ ...s, defaultCapacity: e.target.value }))}
              />
            </div>
          </div>
        </Card>

        <Card>
          <CardTitle>Notification Settings</CardTitle>
          <div className="mt-4">
            <ToggleSetting
              label="Email Notifications"
              description="Send email notifications for event updates and registrations."
              enabled={settings.emailNotifications as boolean}
              onToggle={() => toggle("emailNotifications")}
            />
            <ToggleSetting
              label="Maintenance Mode"
              description="Show maintenance page to all users except super admins."
              enabled={settings.maintenanceMode as boolean}
              onToggle={() => toggle("maintenanceMode")}
            />
          </div>
        </Card>

        <Card>
          <CardTitle>General</CardTitle>
          <div className="mt-4 space-y-4">
            <Input label="Platform Name" defaultValue="PUVerse" />
            <Input label="Support Email" defaultValue="support@pu.ac.in" />
            <Select
              label="Timezone"
              defaultValue={settings.timezone}
              options={[
                { value: "Asia/Kolkata", label: "Asia/Kolkata (IST)" },
                { value: "UTC", label: "UTC" },
                { value: "America/New_York", label: "America/New_York (EST)" },
              ]}
            />
          </div>
        </Card>

        <Card>
          <CardTitle>Actions</CardTitle>
          <div className="mt-4 space-y-3">
            <Button className="w-full" onClick={() => alert("Settings saved (demo)")}>
              Save All Settings
            </Button>
            <Button variant="outline" className="w-full" onClick={() => alert("Cache cleared (demo)")}>
              Clear Platform Cache
            </Button>
            <Button variant="outline" className="w-full" onClick={() => alert("Export started (demo)")}>
              Export Platform Data
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
