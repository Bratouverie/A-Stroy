import React, { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { crm_auth } from "@/lib/crm-auth";
import CRMSidebar from "@/components/crm/CRMSidebar";
import CRMHeader from "@/components/crm/CRMHeader";

export default function CRMLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const crmUser = crm_auth.getCurrentUser();

  if (!crmUser) {
    return <Navigate to="/crm-login" replace state={{ from: location }} />;
  }

  const user = {
    id: crmUser.userId,
    full_name: crmUser.name,
    email: "",
    role: crmUser.role
  };

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