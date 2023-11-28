import { useEffect, useState, ChangeEvent } from "react";
import { IconButton } from "@material-tailwind/react";
import { useAllSweetsQuery } from "../../../Redux/Features/Api/sweetsApi";
import SelectSingleSweet from "./SelectSingleSweet";
import { MdOutlineAdd } from "react-icons/md";
import { BtnPrimary } from "../../../Components/Buttons/Buttons";
import SweetCalculations from "./SweetCalculations";
import { useSelector } from "react-redux";
export interface IAddedSweet {
  _id: string | undefined;
  name: string;
  unit: number;
  cost: number;
  order: number;
}

const SelectSweets = ({
  handleAddSale,
  ab,
  setAddedSweets,
  addedSweets,
}: {
  handleAddSale: any;
  ab: IAddedSweet;
  setAddedSweets: any;
  addedSweets: IAddedSweet[];
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLessThan5, setIsLessThan5] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const { data: sweetsInfo } = useAllSweetsQuery({});
  const { user } = useSelector((state: any) => state.user);

  const allSweetsInfo = sweetsInfo?.payload?.sweets;

  const handleAddNewSweet = () => {
    ab.order = addedSweets[addedSweets.length - 1]
      ? addedSweets[addedSweets.length - 1].order + 1
      : 1;
    setAddedSweets([...addedSweets, ab]);
  };
  useEffect(() => {
    const totalCost: number = addedSweets.reduce(
      (prev, current) => prev + current.cost,
      0
    );
    setIsDisabled(
      addedSweets.reduce((prev, current) => prev * current.cost, 1)
        ? false
        : true
    );
    setTotal(totalCost);
    setAmount(totalCost);
  }, [addedSweets]);
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value) ? parseInt(e.target.value) : 0;
    setIsLessThan5(value < total - (total * user.max_discount) / 100);
    setAmount(value);
  };

  return (
    <div className="space-y-2">
      {addedSweets
        .sort((a, b) => a.order - b.order)
        .map((sweet, index) => (
          <SelectSingleSweet
            key={index}
            index={index}
            sweet={sweet}
            allSweetsInfo={allSweetsInfo}
            setAddedSweets={setAddedSweets}
            addedSweets={addedSweets}
          />
        ))}
      <IconButton
        variant="gradient"
        className="!rounded-full"
        onClick={handleAddNewSweet}
      >
        <MdOutlineAdd />
      </IconButton>
      <hr className="border-b-[.5px] border-gray-400" />
      <div>
        <SweetCalculations
          handlePriceChange={handlePriceChange}
          amount={amount}
          total={total}
          isDisabled={isDisabled}
        />
      </div>
      <BtnPrimary
        onClick={() => handleAddSale(addedSweets, amount)}
        disabled={isDisabled || isLessThan5}
      >
        Add sale
      </BtnPrimary>
    </div>
  );
};

export default SelectSweets;
