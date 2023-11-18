import { useSelector } from "react-redux";
import react from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }: { children: react.ReactNode }) => {
  const { user, isLoading } = useSelector((state: any) => state.user);
  const location = useLocation();
  if (isLoading) {
    return;
  }
  if (!user) {
    return <Navigate to={`/sign-in`} state={{ from: location.pathname }} />;
  }
  return children;
};

export default PrivateRoute;
