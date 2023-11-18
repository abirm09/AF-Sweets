import { Input, Navbar } from "@material-tailwind/react";
import CustomBreadcrumbs from "../../../Components/CustomBreadcrumbs/CustomBreadcrumbs";
import { TitlePrimary } from "../../../Components/Titles/Titles";
import SelectSweets from "./SelectSweets";

const AddSales = () => {
  return (
    <>
      <CustomBreadcrumbs />
      <Navbar className="text-black p-3 md:p-5">
        <TitlePrimary>Add Sell</TitlePrimary>
        <div className="max-w-md mt-5">
          <Input crossOrigin={undefined} label="Customer name" />
        </div>
        <div className="mt-5">
          <SelectSweets />
        </div>
      </Navbar>
    </>
  );
};

export default AddSales;
