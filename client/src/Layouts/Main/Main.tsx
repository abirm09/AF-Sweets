import { Outlet } from "react-router-dom";
import { Header } from "../../Components/Shared/Header/Header";
import { Helmet } from "react-helmet-async";

const Main = () => {
  return (
    <>
      <Helmet>
        <title>AF-Sweets | Home </title>
      </Helmet>
      <Header />
      <div className="w-full min-height-cs">
        <Outlet />
      </div>
    </>
  );
};

export default Main;
