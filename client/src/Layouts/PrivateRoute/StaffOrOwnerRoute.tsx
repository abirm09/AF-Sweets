import { useSelector } from "react-redux";
import react from "react";
import { Navigate, useLocation } from "react-router-dom";

const StaffOrOwnerRoute = ({ children }: { children: react.ReactNode }) => {
  const { user } = useSelector((state: any) => state.user);
  const location = useLocation();
  if (!user) {
    return <Navigate to={`/sign-in`} state={{ from: location.pathname }} />;
  }
  if (user.user_role === "staff" || user.user_role === "owner") return children;
  return <Navigate to={`/`} state={{ from: location.pathname }} />;
};

export default StaffOrOwnerRoute;
