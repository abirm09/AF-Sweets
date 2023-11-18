import react from "react";
interface IContainerMax {
  children: react.ReactNode;
  className?: string;
}
export const ContainerMax = ({ className, children }: IContainerMax) => {
  return (
    <div className={`max-w-7xl mx-auto px-2 md:px-5  ${className}`}>
      {children}
    </div>
  );
};
