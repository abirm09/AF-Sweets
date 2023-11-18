const InputValidationError = ({ message }: { message: string }) => {
  if (!message) {
    return "";
  }
  return (
    <p className="text-red-700 text-sm font-inter font-bold mt-3 ml-1">
      {message}
    </p>
  );
};

export default InputValidationError;
