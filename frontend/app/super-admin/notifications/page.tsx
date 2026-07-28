"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { StatusBadge } from "@/components/ui/badge";
import { NOTIFICATIONS } from "@/constants/mock-data";
import { formatDateTime } from "@/lib/utils";

interface BroadcastNotification {
  id: string;
  title: string;
  message: string;
  audience: string;
  sentAt: string;
  status: string;
}

const SENT_BROADCASTS: BroadcastNotification[] = [
  {
    id: "b1",
    title: "Platform Maintenance Notice",
    message: "PUVerse will be under maintenance on Aug 10, 2026 from 2:00 AM to 5:00 AM IST.",
    audience: "All Users",
    sentAt: "2026-07-20T10:00:00",
    status: "delivered",
  },
  {
    id: "b2",
    title: "New Feature: Certificate Downloads",
    message: "Students can now download certificates directly from the Certificates page.",
    audience: "Students",
    sentAt: "2026-07-15T14:30:00",
    status: "delivered",
  },
  {
    id: "b3",
    title: "Event Submission Deadline",
    message: "All events for August must be submitted for approval by July 30.",
    audience: "Admins",
    sentAt: "2026-07-18T09:00:00",
    status: "delivered",
  },
];

export default function SuperAdminNotificationsPage() {
  const [showCompose, setShowCompose] = useState(false);
  const [broadcasts, setBroadcasts] = useState(SENT_BROADCASTS);

  return (
    <div>
      <PageHeader
        title="Notifications"
        description="Send broadcast notifications and manage alerts."
        action={<Button onClick={() => setShowCompose(true)}>Compose Broadcast</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardTitle>Sent Broadcasts</CardTitle>
          <div className="mt-4 space-y-3">
            {broadcasts.map((b) => (
              <div key={b.id} className="border-b border-neutral-100 pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{b.title}</p>
                    <p className="mt-1 text-xs text-neutral-500">{b.message}</p>
                  </div>
                  <StatusBadge status={b.status} />
                </div>
                <div className="mt-2 flex gap-3 text-xs text-neutral-500">
                  <span>To: {b.audience}</span>
                  <span>{formatDateTime(b.sentAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle>Recent System Notifications</CardTitle>
          <div className="mt-4 space-y-3">
            {NOTIFICATIONS.map((n) => (
              <div key={n.id} className="flex items-start gap-3 border-b border-neutral-100 pb-3">
                <div
                  className={`mt-1 h-2 w-2 shrink-0 ${
                    n.type === "success"
                      ? "bg-black"
                      : n.type === "warning"
                        ? "bg-neutral-400"
                        : "bg-neutral-200"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="text-xs text-neutral-500">{n.message}</p>
                  <p className="mt-1 text-xs text-neutral-400">{formatDateTime(n.createdAt)}</p>
                </div>
                <span className="text-xs text-neutral-400">{n.read ? "Read" : "Unread"}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Modal
        open={showCompose}
        onClose={() => setShowCompose(false)}
        title="Compose Broadcast"
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowCompose(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setBroadcasts([
                  {
                    id: `b-${Date.now()}`,
                    title: "New Broadcast",
                    message: "This is a new broadcast notification.",
                    audience: "All Users",
                    sentAt: new Date().toISOString(),
                    status: "delivered",
                  },
                  ...broadcasts,
                ]);
                setShowCompose(false);
              }}
            >
              Send Broadcast
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Subject" defaultValue="" placeholder="Notification title" />
          <Textarea label="Message" rows={4} placeholder="Write your broadcast message..." />
          <Select
            label="Target Audience"
            options={[
              { value: "all", label: "All Users" },
              { value: "students", label: "Students" },
              { value: "admins", label: "Admins" },
              { value: "super_admins", label: "Super Admins" },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
}
