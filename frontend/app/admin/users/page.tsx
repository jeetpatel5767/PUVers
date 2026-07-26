"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { Table, TableRow, TableCell } from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ALL_USERS } from "@/constants/mock-data";
import { ROLE_LABELS } from "@/constants/navigation";

export default function AdminUsersPage() {
  const [users, setUsers] = useState(ALL_USERS);
  const [showAdd, setShowAdd] = useState(false);
  const [editUser, setEditUser] = useState<(typeof ALL_USERS)[0] | null>(null);

  return (
    <div>
      <PageHeader
        title="User Management"
        description="Manage platform users and roles."
        action={<Button onClick={() => setShowAdd(true)}>Add User</Button>}
      />

      <Table headers={["Name", "Email", "Role", "Department", "Actions"]}>
        {users.map((u) => (
          <TableRow key={u.id}>
            <TableCell>{u.name}</TableCell>
            <TableCell>{u.email}</TableCell>
            <TableCell>
              <StatusBadge status={u.role} />
            </TableCell>
            <TableCell>{u.department ?? u.organization ?? "—"}</TableCell>
            <TableCell>
              <Button variant="ghost" size="sm" onClick={() => setEditUser(u)}>
                Edit
              </Button>
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
            <Button onClick={() => { setShowAdd(false); alert("User added (demo)"); }}>Add</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Name" defaultValue="New User" />
          <Input label="Email" type="email" defaultValue="user@pu.ac.in" />
          <Select label="Role" options={Object.entries(ROLE_LABELS).map(([v, l]) => ({ value: v, label: l }))} />
        </div>
      </Modal>

      <Modal
        open={!!editUser}
        onClose={() => setEditUser(null)}
        title="Edit User"
        footer={
          <>
            <Button variant="outline" onClick={() => setEditUser(null)}>Cancel</Button>
            <Button onClick={() => { setEditUser(null); alert("User updated (demo)"); }}>Save</Button>
          </>
        }
      >
        {editUser && (
          <div className="space-y-4">
            <Input label="Name" defaultValue={editUser.name} />
            <Input label="Email" defaultValue={editUser.email} />
            <Select
              label="Role"
              defaultValue={editUser.role}
              options={Object.entries(ROLE_LABELS).map(([v, l]) => ({ value: v, label: l }))}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
