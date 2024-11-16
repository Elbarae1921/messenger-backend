import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import { AppSidebar } from './sidebar';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};
