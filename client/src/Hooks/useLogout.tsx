import { useDispatch } from "react-redux";
import { useLogoutQuery } from "../Redux/Features/User/userApi";
import { setUser } from "../Redux/Features/User/userSlice";

const useLogout = () => {
  const dispatch = useDispatch();
  const logout = () => {
    const { data } = useLogoutQuery({});
    if (data?.success) {
      dispatch(setUser(null));
    }
  };
  return logout;
};

export default useLogout;
