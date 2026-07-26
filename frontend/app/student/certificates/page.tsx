"use client";

import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { useDemoStore } from "@/store/demo-store";
import { formatDate } from "@/lib/utils";
import { useState } from "react";

export default function StudentCertificatesPage() {
  const certificates = useDemoStore((s) => s.certificates);
  const [preview, setPreview] = useState<(typeof certificates)[0] | null>(null);

  return (
    <div>
      <PageHeader
        title="My Certificates"
        description="Certificates earned from completed events."
      />

      {certificates.length === 0 ? (
        <EmptyState
          title="No certificates yet"
          description="Attend events to earn certificates automatically."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {certificates.map((cert) => (
            <Card key={cert.id}>
              <div className="border border-black p-6 text-center">
                <p className="text-xs uppercase tracking-widest">Certificate of Participation</p>
                <p className="mt-4 text-lg font-bold">{cert.eventTitle}</p>
                <p className="mt-2 text-sm text-neutral-500">Issued {formatDate(cert.issuedAt)}</p>
                <p className="mt-4 font-serif text-2xl italic">PUVerse</p>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setPreview(cert)}>
                  Preview
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => alert("Certificate download started (demo)")}
                >
                  Download
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={!!preview}
        onClose={() => setPreview(null)}
        title="Certificate Preview"
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setPreview(null)}>
              Close
            </Button>
            <Button onClick={() => alert("Download started (demo)")}>Download PDF</Button>
          </>
        }
      >
        {preview && (
          <div className="border-2 border-black p-8 text-center">
            <p className="text-sm uppercase tracking-widest">Certificate of Participation</p>
            <p className="mt-6 text-2xl font-bold">This certifies that</p>
            <p className="mt-2 text-xl font-semibold">Aarav Sharma</p>
            <p className="mt-4">has successfully participated in</p>
            <p className="mt-2 text-xl font-bold">{preview.eventTitle}</p>
            <p className="mt-6 text-sm text-neutral-500">{formatDate(preview.issuedAt)}</p>
            <div className="mt-8 flex justify-between text-sm">
              <span>Organizer Signature</span>
              <span className="font-serif text-lg">PUVerse</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
