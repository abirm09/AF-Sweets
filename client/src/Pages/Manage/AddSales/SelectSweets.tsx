import { useEffect, useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { useAllSweetsQuery } from "../../../Redux/Features/Api/sweetsApi";
import SelectSingleSweet from "./SelectSingleSweet";
import { MdOutlineAdd } from "react-icons/md";

export interface IAddedSweet {
  _id: string | undefined;
  name: string;
  unit: number;
  cost: number;
}

const SelectSweets = () => {
  const { data: sweetsInfo } = useAllSweetsQuery({});
  const allSweetsInfo = sweetsInfo?.payload?.sweets;
  const ab: IAddedSweet = {
    _id: "",
    name: "",
    unit: 0,
    cost: 0,
  };
  const [addedSweets, setAddedSweets] = useState<IAddedSweet[]>([ab]);
  console.log(addedSweets);
  const handleAddNewSweet = () => {
    setAddedSweets([...addedSweets, ab]);
  };
  useEffect(() => {
    const totalCost = addedSweets.reduce(
      (prev, current) => prev + current.cost,
      0
    );
    console.log("Total cost", totalCost);
  }, [addedSweets]);
  return (
    <div className="space-y-2">
      {addedSweets.map((sweet, index) => (
        <SelectSingleSweet
          key={index}
          index={index}
          sweet={sweet}
          allSweetsInfo={allSweetsInfo}
          setAddedSweets={setAddedSweets}
          addedSweets={addedSweets}
        />
      ))}
      <IconButton variant="gradient" onClick={handleAddNewSweet}>
        <MdOutlineAdd />
      </IconButton>
    </div>
  );
};

export default SelectSweets;
