"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { Table, TableRow, TableCell } from "@/components/ui/table";
import { Modal, ConfirmModal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ALL_USERS } from "@/constants/mock-data";
import { ROLE_LABELS } from "@/constants/navigation";
import type { User } from "@/types";

export default function PlatformAdminUsersPage() {
  const [users, setUsers] = useState(ALL_USERS);
  const [showAdd, setShowAdd] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? users : users.filter((u) => u.role === filter);

  return (
    <div>
      <PageHeader
        title="User Management"
        description="Full user control — create, edit, assign roles, or remove users."
        action={<Button onClick={() => setShowAdd(true)}>Add User</Button>}
      />

      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm font-medium">Filter by role:</span>
        {["all", "student", "admin", "super_admin", "platform_admin"].map((r) => (
          <Button
            key={r}
            variant={filter === r ? "primary" : "outline"}
            size="sm"
            onClick={() => setFilter(r)}
          >
            {r === "all" ? "All" : ROLE_LABELS[r as keyof typeof ROLE_LABELS]}
          </Button>
        ))}
      </div>

      <Table headers={["Name", "Email", "Role", "Department / Org", "Actions"]}>
        {filtered.map((u) => (
          <TableRow key={u.id}>
            <TableCell className="font-medium">{u.name}</TableCell>
            <TableCell>{u.email}</TableCell>
            <TableCell><StatusBadge status={u.role} /></TableCell>
            <TableCell>{u.department ?? u.organization ?? "—"}</TableCell>
            <TableCell>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => setEditUser(u)}>Edit</Button>
                <Button variant="ghost" size="sm" onClick={() => setDeleteUser(u)}>Remove</Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </Table>

      <Modal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        title="Add User"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button
              onClick={() => {
                setUsers([
                  ...users,
                  {
                    id: `u-${Date.now()}`,
                    name: "New User",
                    email: "newuser@pu.ac.in",
                    role: "student",
                    department: "CSE",
                  },
                ]);
                setShowAdd(false);
              }}
            >
              Add
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Full Name" defaultValue="New User" />
          <Input label="Email" type="email" defaultValue="newuser@pu.ac.in" />
          <Select
            label="Role"
            options={Object.entries(ROLE_LABELS).map(([v, l]) => ({ value: v, label: l }))}
          />
          <Input label="Department" placeholder="e.g. CSE, ECE" />
        </div>
      </Modal>

      <Modal
        open={!!editUser}
        onClose={() => setEditUser(null)}
        title="Edit User"
        footer={
          <>
            <Button variant="outline" onClick={() => setEditUser(null)}>Cancel</Button>
            <Button
              onClick={() => {
                setEditUser(null);
                alert("User updated (demo)");
              }}
            >
              Save
            </Button>
          </>
        }
      >
        {editUser && (
          <div className="space-y-4">
            <Input label="Full Name" defaultValue={editUser.name} />
            <Input label="Email" defaultValue={editUser.email} />
            <Select
              label="Role"
              defaultValue={editUser.role}
              options={Object.entries(ROLE_LABELS).map(([v, l]) => ({ value: v, label: l }))}
            />
            <Input label="Department" defaultValue={editUser.department ?? ""} />
          </div>
        )}
      </Modal>

      <ConfirmModal
        open={!!deleteUser}
        onClose={() => setDeleteUser(null)}
        onConfirm={() => {
          if (deleteUser) setUsers(users.filter((u) => u.id !== deleteUser.id));
        }}
        title="Remove User"
        message={`Are you sure you want to remove ${deleteUser?.name}? This action cannot be undone.`}
        confirmLabel="Remove"
      />
    </div>
  );
}
