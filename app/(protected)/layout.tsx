import { sidebarLinks } from "@/config/dashboard";
import { SearchCommand } from "@/components/dashboard/search-command";
import {
  DashboardSidebar,
  MobileSheetSidebar,
} from "@/components/layout/dashboard-sidebar";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { UserAccountNav } from "@/components/layout/user-account-nav";
import { Toaster } from "@/components/ui/toaster";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function Dashboard({ children }: ProtectedLayoutProps) {
  const filteredLinks = sidebarLinks;

  return (
    <div className="relative flex min-h-screen w-full">
      <DashboardSidebar links={filteredLinks} />

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-50 flex h-14 bg-background px-4 lg:h-[60px] xl:px-8">
          <div className="flex w-full items-center gap-x-3">
            <MobileSheetSidebar links={filteredLinks} />

            <div className="w-full flex-1">
              <SearchCommand links={filteredLinks} />
            </div>

            <ModeToggle />
            <UserAccountNav />
          </div>
        </header>

        <main className="flex-1 p-4 xl:px-8">
          <div className="flex h-full w-full flex-col gap-4 lg:gap-6">
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}
