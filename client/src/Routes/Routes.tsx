import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main/Main";
import Manage from "../Layouts/Manage/Manage";
import SignUp from "../Components/Shared/SignUp/SignUp";
import SignIn from "../Components/Shared/SignIn/SignIn";
import PrivateRoute from "../Layouts/PrivateRoute/PrivateRoute";
import StaffOrOwnerRoute from "../Layouts/PrivateRoute/StaffOrOwnerRoute";
import Analytics from "../Pages/Manage/Analytics/Analytics";
import AddSales from "../Pages/Manage/AddSales/AddSales";
import AddNewSweet from "../Pages/Manage/AddNewSweet/AddNewSweet";
import LoginActivity from "../Pages/Main/LoginActivity/LoginActivity";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "login-activity",
        element: <LoginActivity />,
      },
    ],
  },
  {
    path: "/manage",
    element: (
      <PrivateRoute>
        <StaffOrOwnerRoute>
          <Manage />
        </StaffOrOwnerRoute>
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <h2>ok</h2>,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "add-sales",
        element: <AddSales />,
      },
      {
        path: "add-new-sweet",
        element: <AddNewSweet />,
      },
    ],
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "*",
    element: <h2>Not found</h2>,
  },
]);
