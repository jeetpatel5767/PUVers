"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { Table, TableRow, TableCell } from "@/components/ui/table";
import { Modal, ConfirmModal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ORGANIZATIONS } from "@/constants/mock-data";

export default function PlatformAdminOrganizationsPage() {
  const [orgs, setOrgs] = useState(ORGANIZATIONS);
  const [showAdd, setShowAdd] = useState(false);
  const [editOrg, setEditOrg] = useState<(typeof ORGANIZATIONS)[0] | null>(null);
  const [deleteOrg, setDeleteOrg] = useState<(typeof ORGANIZATIONS)[0] | null>(null);

  return (
    <div>
      <PageHeader
        title="Organizations"
        description="Oversee all campus organizations, clubs, and committees."
        action={<Button onClick={() => setShowAdd(true)}>Add Organization</Button>}
      />

      <div className="mb-4 border border-black bg-neutral-50 px-4 py-2 text-sm">
        {orgs.filter((o) => o.status === "active").length} active &middot;{" "}
        {orgs.filter((o) => o.status === "inactive").length} inactive &middot;{" "}
        {orgs.reduce((s, o) => s + o.members, 0)} total members
      </div>

      <Table headers={["Name", "Type", "Members", "Events", "Status", "Actions"]}>
        {orgs.map((org) => (
          <TableRow key={org.id}>
            <TableCell className="font-medium">{org.name}</TableCell>
            <TableCell>{org.type}</TableCell>
            <TableCell>{org.members}</TableCell>
            <TableCell>{org.events}</TableCell>
            <TableCell><StatusBadge status={org.status} /></TableCell>
            <TableCell>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setOrgs(
                      orgs.map((o) =>
                        o.id === org.id
                          ? { ...o, status: o.status === "active" ? "inactive" as const : "active" as const }
                          : o,
                      ),
                    )
                  }
                >
                  Toggle
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setEditOrg(org)}>Edit</Button>
                <Button variant="ghost" size="sm" onClick={() => setDeleteOrg(org)}>Remove</Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </Table>

      <Modal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        title="Add Organization"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button
              onClick={() => {
                setOrgs([
                  ...orgs,
                  {
                    id: `org-${Date.now()}`,
                    name: "New Organization",
                    type: "Club",
                    members: 0,
                    events: 0,
                    status: "active",
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
          <Input label="Organization Name" placeholder="e.g. Robotics Club" />
          <Select
            label="Type"
            options={[
              { value: "Club", label: "Club" },
              { value: "Committee", label: "Committee" },
              { value: "Cell", label: "Cell" },
              { value: "Department", label: "Department" },
            ]}
          />
          <Input label="Faculty Advisor" placeholder="e.g. Dr. Sharma" />
        </div>
      </Modal>

      <Modal
        open={!!editOrg}
        onClose={() => setEditOrg(null)}
        title="Edit Organization"
        footer={
          <>
            <Button variant="outline" onClick={() => setEditOrg(null)}>Cancel</Button>
            <Button onClick={() => { setEditOrg(null); alert("Organization updated (demo)"); }}>Save</Button>
          </>
        }
      >
        {editOrg && (
          <div className="space-y-4">
            <Input label="Name" defaultValue={editOrg.name} />
            <Select
              label="Type"
              defaultValue={editOrg.type}
              options={[
                { value: "Club", label: "Club" },
                { value: "Committee", label: "Committee" },
                { value: "Cell", label: "Cell" },
                { value: "Department", label: "Department" },
              ]}
            />
          </div>
        )}
      </Modal>

      <ConfirmModal
        open={!!deleteOrg}
        onClose={() => setDeleteOrg(null)}
        onConfirm={() => {
          if (deleteOrg) setOrgs(orgs.filter((o) => o.id !== deleteOrg.id));
        }}
        title="Remove Organization"
        message={`Are you sure you want to remove ${deleteOrg?.name}? All associated events will also be removed.`}
        confirmLabel="Remove"
      />
    </div>
  );
}
