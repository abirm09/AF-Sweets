import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const useHandleQuery = (queryName: any) => {
  const navigate = useNavigate();
  const { data, isError, isLoading, error } = queryName({});
  useEffect(() => {
    if (isError) {
      if ((error.response === 401, error.response === 403)) {
        return navigate(`/sign-in?redirected_from=${undefined}`);
      }
      if (error?.data?.error === "Device limit.") {
        return navigate("/signed-in-devices");
      }
    }
  }, [isError, error]);
  return { data, isLoading, error };
};

export default useHandleQuery;
