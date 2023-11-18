import { Button, Spinner } from "@material-tailwind/react";
import {
  size,
  variant,
} from "@material-tailwind/react/types/components/button";
import react from "react";
interface ICustomButtons {
  children: react.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset" | undefined;
  variant?: variant | undefined;
  size?: size | undefined;
  isLoading?: boolean;
}

export const BtnPrimary = ({
  children,
  onClick,
  type,
  variant,
  size,
}: ICustomButtons) => {
  return (
    <Button
      className="bg-red-500"
      onClick={onClick}
      type={type}
      variant={variant}
      size={size}
    >
      {children}
    </Button>
  );
};

export const BtnSecondary = ({
  children,
  onClick,
  type,
  variant,
  size,
}: ICustomButtons) => {
  return (
    <Button
      className="bg-teal-600"
      onClick={onClick}
      type={type}
      variant={variant}
      size={size}
    >
      {children}
    </Button>
  );
};

export const BtnSecondaryLoading = ({
  children,
  onClick,
  type,
  variant,
  size,
  isLoading,
}: ICustomButtons) => {
  if (isLoading) {
    return (
      <Button className="flex justify-center items-center gap-3" disabled>
        <Spinner className="h-5 w-5" /> <span>Please wait...</span>
      </Button>
    );
  }
  return (
    <Button
      className="bg-teal-600"
      onClick={onClick}
      type={type}
      variant={variant}
      size={size}
    >
      {children}
    </Button>
  );
};
