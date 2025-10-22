import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
    const [topBar, setTopBar] = useState("Analytics")

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AppSidebar setTopBar={setTopBar} />
                <main className="flex-1 w-full">
                    <div className="flex w-full justify-between items-center shadow-xs p-4">
                        <SidebarTrigger />
                        <h2 className="text-xl font-semibold uppercase">{topBar}</h2>
                        <div className="w-8" />
                    </div>
                    <div className="p-4">
                        <Outlet />
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
};

export default AdminDashboard;