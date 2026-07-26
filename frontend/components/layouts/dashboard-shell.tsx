"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useDemoStore } from "@/store/demo-store";
import { ROLE_LABELS } from "@/constants/navigation";
import type { NavItem } from "@/types";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

interface DashboardShellProps {
  children: React.ReactNode;
  navItems: NavItem[];
  roleLabel: string;
}

export function DashboardShell({ children, navItems, roleLabel }: DashboardShellProps) {
  const pathname = usePathname();
  const user = useDemoStore((s) => s.user);
  const logout = useDemoStore((s) => s.logout);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-black bg-white transition-transform lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-black px-4 py-4">
          <Link href="/" className="font-bold tracking-tight">
            PUVerse
          </Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-neutral-200 px-4 py-3">
          <p className="text-xs uppercase text-neutral-500">{roleLabel}</p>
          <p className="font-medium">{user?.name}</p>
          <p className="text-xs text-neutral-500">{user?.email}</p>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "block px-3 py-2 text-sm transition-colors",
                  active ? "bg-black text-white" : "hover:bg-neutral-100",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-black p-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              logout();
              window.location.href = "/login";
            }}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-black px-4 py-3 lg:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-bold">PUVerse</span>
          <Badge role={user?.role} />
        </header>

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

function Badge({ role }: { role?: string }) {
  if (!role) return null;
  return (
    <span className="border border-black px-2 py-0.5 text-xs">
      {ROLE_LABELS[role as keyof typeof ROLE_LABELS] ?? role}
    </span>
  );
}
