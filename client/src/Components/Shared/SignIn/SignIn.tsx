import { Helmet } from "react-helmet-async";
import { Button, Input, Typography } from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import InputValidationError from "../../InputValidationError/InputValidationError";
import { useState } from "react";
import { useEffect } from "react";
import { BtnSecondaryLoading } from "../../Buttons/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../Redux/Features/User/userSlice";
import { useSignInMutation } from "../../../Redux/Features/User/userApi";

interface Inputs {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  c_password: string;
  profile_pic: string;
}

const SignIn = () => {
  const [loginError, setLoginError] = useState("");
  const [loginUser, { isLoading, data: loggedInUserData, error, isError }] =
    useSignInMutation({});
  const { user } = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectedFrom = location?.state?.from;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const handleSignUp: SubmitHandler<Inputs> = async data => {
    setLoginError("");
    try {
      loginUser(data);
    } catch (error: any) {
      setLoginError(error?.response?.data?.error);
      console.log(error);
    }
  };
  useEffect(() => {
    if (isError) {
      setLoginError((error as { data: { error: string } })?.data?.error);
    }
    if (loggedInUserData?.success) {
      dispatch(setUser(loggedInUserData?.payload?.user));
      navigate(redirectedFrom ? redirectedFrom : "/");
    }
    if (user) {
      navigate(redirectedFrom ? redirectedFrom : "/");
    }
  }, [isError, loggedInUserData, isLoading, user, redirectedFrom]);
  return (
    <>
      <Helmet>
        <title>Sign up | AF-Sweets</title>
      </Helmet>
      <div className="max-w-5xl mx-auto px-3 ms:px-5">
        <div className="w-full mt-10 md:mt-20 grid grid-cols-1 xl:grid-cols-2 rounded-md overflow-hidden shadow-md">
          <div className="bg-red-400 p-2 md:p-10 text-white order-2 space-y-2">
            <h2 className="text-2xl font-inter font-bold">Sign In</h2>
            <p className="text-sm">
              Do not share your pin to any one. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Reprehenderit expedita quo
            </p>
            <p className="text-sm">
              Minima laboriosam est eius architecto molestias doloremque
              aspernatur recusandae, sequi hic tenetur eligendi commodi optio
              illo!
            </p>
            <h2 className="text-2xl font-inter font-bold">Password</h2>
            <p className="text-sm">Don't share your password with any other.</p>
            <Link to="/sign-up" className="inline-block">
              <Button>New in AW-Sweets</Button>
            </Link>
          </div>
          <div className="bg-gray-100 p-2 md:p-10 order-1">
            <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
              <div>
                <Typography variant="h6" color="blue-gray" className="  ">
                  Your Email
                </Typography>
                <Input
                  defaultValue="example@yourdomain.com"
                  placeholder="example@yourdomain.com"
                  crossOrigin={undefined}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900 mt-2"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <InputValidationError message="This field is required" />
                )}
              </div>

              <div>
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="flex gap-2"
                >
                  Password{" "}
                </Typography>
                <Input
                  defaultValue="Md@@2247"
                  type="password"
                  placeholder="*******"
                  crossOrigin={undefined}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900 mt-2"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  {...register("password", {
                    required: true,
                  })}
                />
                {errors?.password?.type === "required" && (
                  <InputValidationError message="This field is required" />
                )}
              </div>
              {loginError ? <InputValidationError message={loginError} /> : ""}
              <BtnSecondaryLoading type="submit" isLoading={isLoading}>
                Login
              </BtnSecondaryLoading>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
