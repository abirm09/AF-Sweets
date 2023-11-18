import { Typography } from "@material-tailwind/react";

const Stats = ({
  title,
  amount,
  className,
  image,
}: {
  title: string;
  amount: number;
  className?: string;
  image: any;
}) => {
  return (
    <div
      className={`bg-teal-600 w-56 rounded-md px-3 py-2 shadow-md select-none text-white relative ${className}`}
    >
      <Typography as="h3" className="font-semibold text-inter">
        {title}
      </Typography>
      <Typography as="h3" className="font-semibold text-inter">
        <span>&#2547; </span>
        {amount}
      </Typography>
      <img src={image} alt="" className="absolute bottom-0 right-0 w-14 h-14" />
    </div>
  );
};

export default Stats;
