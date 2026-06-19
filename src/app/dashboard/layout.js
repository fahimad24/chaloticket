import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";


export default function DashboardLayout({ children }) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-slate-50/50">
                <AppSidebar />
                <main className="flex-1 p-4 md:p-8 w-full transition-all duration-300">
                    <div className="flex items-center mb-6 md:hidden">
                        <SidebarTrigger className="p-2 rounded-lg border border-slate-200 bg-white shadow-sm" />
                    </div>
                    <div className="w-full">
                        {children}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}