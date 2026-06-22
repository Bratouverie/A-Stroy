import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import CRMSidebar from "@/components/crm/CRMSidebar";
import CRMHeader from "@/components/crm/CRMHeader";

export default function CRMLayout() {
  const { user, isLoadingAuth } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0F1419]">
        <div className="w-8 h-8 border-4 border-[#1A1F2E] border-t-[#D4AF37] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#0F1419]">
      <CRMSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className={`transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
        <CRMHeader user={user} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}