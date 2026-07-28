"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { Table, TableRow, TableCell } from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ORGANIZATIONS } from "@/constants/mock-data";

export default function SuperAdminOrganizationsPage() {
  const [orgs, setOrgs] = useState(ORGANIZATIONS);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div>
      <PageHeader
        title="Organizations"
        description="Manage clubs, committees, and campus organizations."
        action={<Button onClick={() => setShowAdd(true)}>Add Organization</Button>}
      />

      <Table headers={["Name", "Type", "Members", "Events", "Status", "Actions"]}>
        {orgs.map((org) => (
          <TableRow key={org.id}>
            <TableCell className="font-medium">{org.name}</TableCell>
            <TableCell>{org.type}</TableCell>
            <TableCell>{org.members}</TableCell>
            <TableCell>{org.events}</TableCell>
            <TableCell><StatusBadge status={org.status} /></TableCell>
            <TableCell>
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
                Toggle Status
              </Button>
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
                setOrgs([...orgs, { id: `org-${Date.now()}`, name: "New Org", type: "Club", members: 0, events: 0, status: "active" }]);
                setShowAdd(false);
              }}
            >
              Add
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Organization Name" defaultValue="New Organization" />
          <Select
            label="Type"
            options={[
              { value: "Club", label: "Club" },
              { value: "Committee", label: "Committee" },
              { value: "Cell", label: "Cell" },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
}
