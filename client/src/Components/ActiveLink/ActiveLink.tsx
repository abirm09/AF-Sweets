import { NavLink } from "react-router-dom";
import react from "react";
const ActiveLink = ({
  to,
  children,
}: {
  to: string;
  children: react.ReactNode;
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        (isActive ? "text-teal-600" : "") + " flex items-center"
      }
    >
      {children}
    </NavLink>
  );
};

export default ActiveLink;
