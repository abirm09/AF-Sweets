import React, { useEffect, useState } from "react";
import { Input, Navbar } from "@material-tailwind/react";
import CustomBreadcrumbs from "../../../Components/CustomBreadcrumbs/CustomBreadcrumbs";
import { TitlePrimary } from "../../../Components/Titles/Titles";
import SelectSweets, { IAddedSweet } from "./SelectSweets";
import { useAddSaleMutation } from "../../../Redux/Features/Api/sweetsApi";
import toast from "react-hot-toast";

const AddSales = () => {
  const [customerName, setCustomerName] = useState<string>("");
  const ab: IAddedSweet = {
    _id: "",
    name: "",
    unit: 0,
    cost: 0,
    order: 1,
  };
  const [addedSweets, setAddedSweets] = useState<IAddedSweet[]>([ab]);
  const [addSale, { error, data: response }] = useAddSaleMutation();
  const handleAddSale = (addedSweets: IAddedSweet[], amount: number) => {
    const sweetInfo = addedSweets.map(item => {
      return {
        sweet_id: item._id,
        name: item.name,
        unit: item.unit,
      };
    });
    const saleInfo = {
      customerName,
      sweetInfo,
      amount,
    };
    if (sweetInfo.length) {
      addSale(saleInfo);
    } else {
      toast.error("Please add sales info.");
    }
    setAddedSweets([ab]);
  };

  useEffect(() => {
    if (response?.success) {
      toast.success("Sale added successfully.");
    }
    if (error) {
      toast.error("Something went wrong.");
    }
  }, [response, error]);
  return (
    <>
      <CustomBreadcrumbs />
      <Navbar className="text-black p-3 md:p-5 mt-5">
        <TitlePrimary>Add Sell</TitlePrimary>
        <div className="max-w-md mt-5">
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCustomerName(e.target.value)
            }
            crossOrigin={undefined}
            label="Customer name"
          />
        </div>
        <div className="mt-5">
          <SelectSweets
            ab={ab}
            setAddedSweets={setAddedSweets}
            addedSweets={addedSweets}
            handleAddSale={handleAddSale}
          />
        </div>
      </Navbar>
    </>
  );
};

export default AddSales;
