import react from "react";
import { useDispatch } from "react-redux";
import { useProfileQuery } from "../Redux/Features/User/userApi";
import { setUser, toggleLoading } from "../Redux/Features/User/userSlice";

const Auth = ({ children }: { children: react.ReactNode }) => {
  const dispatch = useDispatch();
  const { data: profile, isLoading } = useProfileQuery({});
  const user = profile?.payload?.user;
  react.useEffect(() => {
    dispatch(setUser(user || null));
    dispatch(toggleLoading(isLoading));
  }, [user, isLoading]);
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return children;
};

export default Auth;
