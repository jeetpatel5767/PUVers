"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Modal } from "@/components/ui/modal";

interface ToggleSettingProps {
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}

function ToggleSetting({ label, description, enabled, onToggle }: ToggleSettingProps) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--hairline)] py-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-[var(--ink-2)]">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative h-6 w-11 border border-[var(--border-card)] transition-colors ${enabled ? "bg-[var(--accent-500)]" : "bg-[var(--bg-card)]"}`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 border border-[var(--border-card)] transition-transform ${
            enabled ? "translate-x-5 bg-white" : "translate-x-0.5 bg-[var(--accent-500)]"
          }`}
        />
      </button>
    </div>
  );
}

export default function PlatformAdminSettingsPage() {
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  const [settings, setSettings] = useState({
    requireApproval: true,
    allowSelfRegistration: true,
    emailNotifications: true,
    maintenanceMode: false,
    auditLogging: true,
    twoFactorRequired: false,
    maxEventsPerOrg: "10",
    maxFileUploadMB: "25",
    sessionTimeoutMin: "60",
    backupFrequency: "daily",
  });

  const toggle = (key: keyof typeof settings) =>
    setSettings((s) => ({ ...s, [key]: !s[key] }));

  const auditLog = [
    { action: "User role changed", user: "Dr. Rajesh Kumar", target: "Sneha Reddy → Admin", time: "2 hours ago" },
    { action: "Event approved", user: "System Administrator", target: "Photography Workshop", time: "5 hours ago" },
    { action: "Organization created", user: "Dr. Rajesh Kumar", target: "AI Research Lab", time: "1 day ago" },
    { action: "Settings updated", user: "System Administrator", target: "Email notifications enabled", time: "2 days ago" },
    { action: "User created", user: "System Administrator", target: "Neha Patel (Student)", time: "3 days ago" },
  ];

  return (
    <div>
      <PageHeader
        title="System Settings"
        description="Platform-wide configuration and system administration."
        action={<Button onClick={() => setShowCreateAdmin(true)}>Create Super Admin Account</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardTitle>Event & Registration</CardTitle>
          <div className="mt-4">
            <ToggleSetting
              label="Require Event Approval"
              description="All events must be approved before publishing."
              enabled={settings.requireApproval as boolean}
              onToggle={() => toggle("requireApproval")}
            />
            <ToggleSetting
              label="Allow Self-Registration"
              description="Students can register without admin approval."
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
            </div>
          </div>
        </Card>

        <Card>
          <CardTitle>Security</CardTitle>
          <div className="mt-4">
            <ToggleSetting
              label="Two-Factor Authentication"
              description="Require 2FA for super admin and platform admin accounts."
              enabled={settings.twoFactorRequired as boolean}
              onToggle={() => toggle("twoFactorRequired")}
            />
            <ToggleSetting
              label="Audit Logging"
              description="Log all administrative actions for compliance."
              enabled={settings.auditLogging as boolean}
              onToggle={() => toggle("auditLogging")}
            />
            <div className="mt-4 space-y-4">
              <Input
                label="Session Timeout (minutes)"
                type="number"
                value={settings.sessionTimeoutMin}
                onChange={(e) => setSettings((s) => ({ ...s, sessionTimeoutMin: e.target.value }))}
              />
            </div>
          </div>
        </Card>

        <Card>
          <CardTitle>Platform</CardTitle>
          <div className="mt-4">
            <ToggleSetting
              label="Maintenance Mode"
              description="Show maintenance page to all non-admin users."
              enabled={settings.maintenanceMode as boolean}
              onToggle={() => toggle("maintenanceMode")}
            />
            <ToggleSetting
              label="Email Notifications"
              description="Send system-wide email notifications."
              enabled={settings.emailNotifications as boolean}
              onToggle={() => toggle("emailNotifications")}
            />
            <div className="mt-4 space-y-4">
              <Input label="Platform Name" defaultValue="PUVerse" />
              <Input label="Support Email" defaultValue="support@pu.ac.in" />
              <Select
                label="Backup Frequency"
                defaultValue={settings.backupFrequency}
                options={[
                  { value: "hourly", label: "Hourly" },
                  { value: "daily", label: "Daily" },
                  { value: "weekly", label: "Weekly" },
                ]}
              />
              <Input
                label="Max File Upload (MB)"
                type="number"
                value={settings.maxFileUploadMB}
                onChange={(e) => setSettings((s) => ({ ...s, maxFileUploadMB: e.target.value }))}
              />
            </div>
          </div>
        </Card>

        <Card>
          <CardTitle>Recent Audit Log</CardTitle>
          <div className="mt-4 space-y-3">
            {auditLog.map((entry, i) => (
              <div key={i} className="border-b border-[var(--hairline)] pb-3">
                <p className="text-sm font-medium">{entry.action}</p>
                <p className="text-xs text-[var(--ink-2)]">{entry.target}</p>
                <div className="mt-1 flex gap-3 text-xs text-[var(--ink-3)]">
                  <span>By: {entry.user}</span>
                  <span>{entry.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <CardTitle>System Actions</CardTitle>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Button className="w-full" onClick={() => alert("Settings saved (demo)")}>Save All Settings</Button>
            <Button variant="outline" className="w-full" onClick={() => alert("Cache cleared (demo)")}>Clear Platform Cache</Button>
            <Button variant="outline" className="w-full" onClick={() => alert("Backup started (demo)")}>Run Manual Backup</Button>
            <Button variant="outline" className="w-full" onClick={() => alert("Export started (demo)")}>Export All Data</Button>
          </div>
        </Card>
      </div>

      <Modal
        open={showCreateAdmin}
        onClose={() => setShowCreateAdmin(false)}
        title="Create Super Admin Account"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowCreateAdmin(false)}>Cancel</Button>
            <Button onClick={() => { setShowCreateAdmin(false); alert("Super Admin account created (demo)"); }}>
              Create Account
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Full Name" placeholder="e.g. Dr. New Admin" />
          <Input label="Email" type="email" placeholder="admin@pu.ac.in" />
          <Select
            label="Role"
            options={[
              { value: "super_admin", label: "Super Admin" },
              { value: "platform_admin", label: "Platform Admin" },
            ]}
          />
          <Input label="Temporary Password" type="password" placeholder="Minimum 8 characters" />
        </div>
      </Modal>
    </div>
  );
}
