import { useSelector } from "react-redux";
import react from "react";
import { Navigate, useLocation } from "react-router-dom";
const OwnerRoute = ({ children }: { children: react.ReactNode }) => {
  const { user } = useSelector((state: any) => state.user);
  const location = useLocation();
  if (!user) {
    return <Navigate to={`/sign-in`} state={{ from: location.pathname }} />;
  } else if (user.user_role !== "owner") {
    return <Navigate to={`/`} />;
  }
  return children;
};

export default OwnerRoute;
