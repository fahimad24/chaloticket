import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";


export default function DashboardLayout({ children }) {
    return (
        <TooltipProvider>
            <SidebarProvider>
                <div className="flex min-h-screen w-full bg-slate-50/50">

                    <AppSidebar />
                    <main className="flex-1 p-4 md:p-8 w-full transition-all duration-300 bg-background">
                        <div className="flex items-center mb-6 ">
                            <SidebarTrigger className="p-2 rounded-lg border border-slate-200 dark:border-slate-500 dark:bg-slate-800 shadow-sm" />
                        </div>
                        <div className="w-full ">
                            {children}
                        </div>
                    </main>
                </div>
            </SidebarProvider>
        </TooltipProvider>
    );
}