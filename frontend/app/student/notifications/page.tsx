"use client";

import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDemoStore } from "@/store/demo-store";
import { formatDate } from "@/lib/utils";

export default function StudentNotificationsPage() {
  const notifications = useDemoStore((s) => s.notifications);
  const markRead = useDemoStore((s) => s.markNotificationRead);
  const markAllRead = useDemoStore((s) => s.markAllNotificationsRead);

  return (
    <div>
      <PageHeader
        title="Notifications"
        description="Stay updated on registrations, events, and certificates."
        action={
          <Button variant="outline" onClick={markAllRead}>
            Mark All Read
          </Button>
        }
      />

      <div className="space-y-3">
        {notifications.map((n) => (
          <Card
            key={n.id}
            className={n.read ? "opacity-60" : ""}
            onClick={() => !n.read && markRead(n.id)}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{n.title}</p>
                  {!n.read && (
                    <span className="h-2 w-2 rounded-full bg-[var(--accent-500)]" aria-label="Unread" />
                  )}
                </div>
                <p className="mt-1 text-sm text-[var(--ink-2)]">{n.message}</p>
                <p className="mt-2 text-xs text-[var(--ink-3)]">{formatDate(n.createdAt)}</p>
              </div>
              {!n.read && (
                <Button variant="ghost" size="sm" onClick={() => markRead(n.id)}>
                  Mark read
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
