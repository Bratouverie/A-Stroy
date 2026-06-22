import { Navigate, useLocation } from "react-router-dom";
import { crm_auth } from "@/lib/crm-auth";

export default function ProtectedCRMRoute({ children, requiredRole }) {
  const user = crm_auth.getCurrentUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/crm-login" replace state={{ from: location }} />;
  }

  if (requiredRole && user.role !== requiredRole && user.role !== "admin") {
    return <Navigate to="/crm" replace />;
  }

  return children;
}