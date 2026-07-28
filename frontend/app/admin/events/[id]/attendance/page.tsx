"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { QRDisplay } from "@/components/shared/qr-display";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Table, TableRow, TableCell } from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { ATTENDANCE } from "@/constants/mock-data";
import { formatDate } from "@/lib/utils";

export default function EventAttendancePage() {
  const params = useParams();
  const id = params.id as string;
  const [scanMode, setScanMode] = useState(false);
  const [manualEmail, setManualEmail] = useState("");
  const [attendance, setAttendance] = useState(ATTENDANCE);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleManualCheckIn = () => {
    if (!manualEmail) return;
    setAttendance([
      {
        id: `att-${Date.now()}`,
        studentName: manualEmail.split("@")[0],
        studentEmail: manualEmail,
        checkedInAt: new Date().toISOString(),
        method: "manual",
      },
      ...attendance,
    ]);
    setManualEmail("");
    setShowSuccess(true);
  };

  const handleQRScan = () => {
    setAttendance([
      {
        id: `att-${Date.now()}`,
        studentName: "Scanned Student",
        studentEmail: "scanned@pu.ac.in",
        checkedInAt: new Date().toISOString(),
        method: "qr",
      },
      ...attendance,
    ]);
    setScanMode(false);
    setShowSuccess(true);
  };

  return (
    <div>
      <PageHeader
        title="Attendance Scanner"
        action={
          <div className="flex gap-2">
            <Button onClick={() => setScanMode(true)}>Open QR Scanner</Button>
            <Link href={`/admin/events/${id}`}>
              <Button variant="outline" size="sm">
                Back
              </Button>
            </Link>
          </div>
        }
      />

      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="font-semibold">Manual Check-in</h3>
          <div className="mt-4 flex gap-2">
            <Input
              placeholder="Student email"
              value={manualEmail}
              onChange={(e) => setManualEmail(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleManualCheckIn}>Check In</Button>
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold">Stats</h3>
          <p className="mt-2 text-3xl font-bold">{attendance.length}</p>
          <p className="text-sm text-neutral-500">Total check-ins</p>
        </Card>
      </div>

      <Table headers={["Student", "Email", "Checked In", "Method"]}>
        {attendance.map((a) => (
          <TableRow key={a.id}>
            <TableCell>{a.studentName}</TableCell>
            <TableCell>{a.studentEmail}</TableCell>
            <TableCell>{formatDate(a.checkedInAt)}</TableCell>
            <TableCell className="uppercase text-xs">{a.method}</TableCell>
          </TableRow>
        ))}
      </Table>

      <Modal
        open={scanMode}
        onClose={() => setScanMode(false)}
        title="QR Scanner"
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setScanMode(false)}>
              Cancel
            </Button>
            <Button onClick={handleQRScan}>Simulate Scan</Button>
          </>
        }
      >
        <div className="flex flex-col items-center py-4">
          <div className="border-2 border-dashed border-black p-8">
            <QRDisplay code="SCAN-AREA" size={140} />
          </div>
          <p className="mt-4 text-sm text-neutral-500">Point camera at student ticket QR</p>
        </div>
      </Modal>

      <Modal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Check-in Successful"
        footer={<Button onClick={() => setShowSuccess(false)}>OK</Button>}
      >
        <p className="text-sm text-neutral-600">Student checked in successfully (demo).</p>
      </Modal>
    </div>
  );
}
