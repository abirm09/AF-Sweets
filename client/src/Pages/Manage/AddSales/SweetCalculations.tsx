import { Input } from "@material-tailwind/react";

const SweetCalculations = ({
  total,
  handlePriceChange,
  amount,
  isDisabled,
}: {
  total: number;
  handlePriceChange: any;
  amount: number;
  isDisabled: boolean;
}) => {
  return (
    <div className="flex justify-end">
      <div className="space-y-2">
        <div className="grid grid-cols-2 items-center">
          <p className="font-bold">total :</p>
          <div>
            {" "}
            <Input crossOrigin={undefined} value={total} disabled />
          </div>
        </div>
        <div className="grid grid-cols-2 items-center">
          <p className="font-bold">min :</p>
          <div>
            {" "}
            <Input
              crossOrigin={undefined}
              value={total - (total * 5) / 100}
              disabled
            />
          </div>
        </div>
        <div className="grid grid-cols-2 items-center">
          <p className="font-bold">amount :</p>
          <div>
            {" "}
            <Input
              type="number"
              crossOrigin={undefined}
              label="Amount"
              onChange={handlePriceChange}
              value={amount ? amount : 0}
              disabled={isDisabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SweetCalculations;
