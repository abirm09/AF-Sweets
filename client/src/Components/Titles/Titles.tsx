import { Typography } from "@material-tailwind/react";
import react from "react";

export const TitlePrimary = ({ children }: { children: react.ReactNode }) => {
  return (
    <Typography
      variant="h2"
      className="text-xl font-inter font-semibold relative my-2 pb-2"
    >
      {children}
      <span className="absolute w-24 h-[2px] bg-teal-600 bottom-0 left-0"></span>
    </Typography>
  );
};
