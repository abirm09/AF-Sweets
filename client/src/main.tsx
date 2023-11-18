import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/Routes.tsx";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./Redux/store.ts";
import Auth from "./Auth/Auth.tsx";
import { Toaster } from "react-hot-toast";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth>
        <HelmetProvider>
          <ThemeProvider>
            <RouterProvider router={routes} />
            <Toaster position="top-center" reverseOrder={false} />
          </ThemeProvider>
        </HelmetProvider>
      </Auth>
    </Provider>
  </React.StrictMode>
);
