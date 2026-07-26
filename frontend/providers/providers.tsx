"use client";

import { useEffect } from "react";
import { Toaster, toast } from "sonner";
import { useDemoStore } from "@/store/demo-store";

export function Providers({ children }: { children: React.ReactNode }) {
  const message = useDemoStore((s) => s.addToastMessage);
  const setToastMessage = useDemoStore((s) => s.setToastMessage);

  useEffect(() => {
    if (message) {
      toast(message);
      setToastMessage(null);
    }
  }, [message, setToastMessage]);

  return (
    <>
      {children}
      <Toaster position="top-right" toastOptions={{ className: "border border-black" }} />
    </>
  );
}
