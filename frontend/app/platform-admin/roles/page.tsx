"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { ROLE_PERMISSIONS } from "@/constants/mock-data";

export default function PlatformAdminRolesPage() {
  const [roles, setRoles] = useState(ROLE_PERMISSIONS);
  const [editRole, setEditRole] = useState<(typeof ROLE_PERMISSIONS)[0] | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const allPermissions = [
    "events.read",
    "events.create",
    "events.update",
    "events.approve",
    "registrations.create",
    "registrations.read",
    "tickets.read",
    "certificates.read",
    "attendance.manage",
    "staff.assign",
    "users.manage",
    "organizations.manage",
    "analytics.read",
    "roles.manage",
    "settings.manage",
    "*",
  ];

  const togglePermission = (perm: string) => {
    if (!editRole) return;
    const has = editRole.permissions.includes(perm);
    setEditRole({
      ...editRole,
      permissions: has
        ? editRole.permissions.filter((p) => p !== perm)
        : [...editRole.permissions, perm],
    });
  };

  return (
    <div>
      <PageHeader
        title="Roles & Permissions"
        description="Manage user roles and their platform permissions."
        action={<Button onClick={() => setShowAdd(true)}>Add Custom Role</Button>}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {roles.map((role) => (
          <Card key={role.id}>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{role.name}</CardTitle>
                <p className="mt-1 text-sm text-[var(--ink-2)]">{role.description}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setEditRole(role)}>
                Edit
              </Button>
            </div>
            <div className="mt-4">
              <p className="font-[family-name:var(--font-mono)] uppercase tracking-[0.08em] text-[11px] text-[var(--ink-3)]">Permissions</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {role.permissions.map((p) => (
                  <span key={p} className="border border-[var(--border-card)] px-2 py-0.5 text-xs">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        open={!!editRole}
        onClose={() => setEditRole(null)}
        title={`Edit Role: ${editRole?.name ?? ""}`}
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setEditRole(null)}>Cancel</Button>
            <Button
              onClick={() => {
                if (!editRole) return;
                setRoles(roles.map((r) => (r.id === editRole.id ? editRole : r)));
                setEditRole(null);
              }}
            >
              Save Changes
            </Button>
          </>
        }
      >
        {editRole && (
          <div className="space-y-4">
            <Input label="Role Name" defaultValue={editRole.name} />
            <Input label="Description" defaultValue={editRole.description} />
            <div>
              <p className="text-sm font-medium">Permissions</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {allPermissions.map((perm) => (
                  <label key={perm} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={editRole.permissions.includes(perm)}
                      onChange={() => togglePermission(perm)}
                      className="h-4 w-4 border-[var(--border-card)] accent-[var(--accent-500)]"
                    />
                    {perm}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        title="Add Custom Role"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button
              onClick={() => {
                setRoles([
                  ...roles,
                  {
                    id: `r-${Date.now()}`,
                    name: "Custom Role",
                    description: "A custom role with selected permissions",
                    permissions: ["events.read"],
                  },
                ]);
                setShowAdd(false);
              }}
            >
              Add Role
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Role Name" placeholder="e.g. Moderator" />
          <Input label="Description" placeholder="What this role can do" />
        </div>
      </Modal>
    </div>
  );
}
