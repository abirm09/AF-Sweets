import React from "react";
import { IconButton, Input, Option, Select } from "@material-tailwind/react";
import { IAddedSweet } from "./SelectSweets";
import { FaXmark } from "react-icons/fa6";

interface ISelectSingleSweet {
  index: number;
  sweet: IAddedSweet;
  allSweetsInfo: {
    price_info: {
      price: number;
    };
    _id: string;
    name: string;
    image: string;
  }[];
  addedSweets: IAddedSweet[];
  setAddedSweets: any;
}
interface ISweetInfo {
  name?: string;
  price_info?: { price: number };
  _id?: string;
}
const SelectSingleSweet = ({
  sweet,
  allSweetsInfo,
  addedSweets,
  setAddedSweets,
}: ISelectSingleSweet) => {
  const [selectedSweet, setSelectedSweet] = React.useState<ISweetInfo>({});
  const [unit, setUnit] = React.useState(1);

  //handle sweet change
  const handleSweetChange = (e: string | undefined) => {
    const findSelectedSweet = allSweetsInfo.find(item => item?._id === e);
    const exceptCurrent = addedSweets.filter(item => item._id !== sweet._id);
    sweet.unit = 1;
    sweet.cost = findSelectedSweet?.price_info?.price ?? 0;
    sweet._id = e;
    sweet.name = findSelectedSweet?.name as string;
    setUnit(1);
    setAddedSweets([...exceptCurrent, sweet]);
    setSelectedSweet(findSelectedSweet as ISweetInfo);
  };

  // init all inputs
  React.useEffect(() => {
    const findSelectedSweet = allSweetsInfo?.find(
      item => item._id === sweet?._id
    );
    setSelectedSweet(findSelectedSweet as ISweetInfo);
  }, [sweet, allSweetsInfo]);

  // handle unit change
  const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const exceptCurrent = addedSweets.filter(item => item._id !== sweet._id);
    sweet.unit = parseFloat(e.target.value);
    sweet.cost =
      (selectedSweet?.price_info?.price ?? 0) * parseFloat(e.target.value);
    setAddedSweets([...exceptCurrent, sweet]);
    setUnit(parseFloat(e.target.value));
  };

  // handle remove a sweet
  const handleRemoveSweet = () => {
    const exceptCurrent = addedSweets.filter(item => item._id !== sweet._id);
    setAddedSweets(exceptCurrent);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="flex">
        {allSweetsInfo ? (
          <Select
            label="Select sweet"
            onChange={handleSweetChange}
            value={selectedSweet?._id || undefined}
          >
            {allSweetsInfo?.map((sweet, index) => (
              <Option value={sweet?._id} key={index}>
                {sweet?.name}
              </Option>
            ))}
          </Select>
        ) : (
          ""
        )}
      </div>
      <div className="col-span-1 md:col-span-2 flex gap-2 md:gap-5 justify-end items-center flex-wrap">
        <div className="flex-1">
          <Input
            crossOrigin={undefined}
            value={
              selectedSweet?.price_info?.price
                ? selectedSweet?.price_info?.price
                : 0
            }
            disabled
            label="Unit Price (kg)"
          />
        </div>
        <div className="flex-1">
          <Input
            type="number"
            disabled={!selectedSweet?.price_info?.price ? true : false}
            crossOrigin={undefined}
            value={sweet?.unit ? sweet?.unit : 0}
            onChange={handleUnitChange}
            label="Quantity (kg)"
          />
          {!unit ? (
            <h2 className="text-xs font-bold text-red-600">
              Quantity can't be empty
            </h2>
          ) : null}
        </div>
        <div className="flex-1">
          <Input
            crossOrigin={undefined}
            label="Cost (Taka)"
            disabled
            value={sweet?.cost ? sweet?.cost : 0}
          />
        </div>
        <div className="flex-1">
          <IconButton variant="gradient" onClick={handleRemoveSweet}>
            <FaXmark />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
export default SelectSingleSweet;
