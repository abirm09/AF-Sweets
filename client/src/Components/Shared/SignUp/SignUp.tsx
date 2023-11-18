import { Helmet } from "react-helmet-async";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import InputValidationError from "../../InputValidationError/InputValidationError";
import { useEffect, useState } from "react";
import axios from "axios";
import { BtnSecondaryLoading } from "../../Buttons/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { useSignUpMutation } from "../../../Redux/Features/User/userApi";
import { setUser } from "../../../Redux/Features/User/userSlice";

interface Inputs {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  c_password: string;
  profile_pic: string;
}

const SignUp = () => {
  const [registerError, setRegisterError] = useState("");
  const [passwordMisMatchErr, setPasswordMisMatchErr] = useState("");
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const { user } = useSelector((state: any) => state.user);
  const [
    signUp,
    { isLoading: signUpLoading, isError, error, data: registeredUser },
  ] = useSignUpMutation();
  const redirectedFrom = searchParams.get("redirected_from");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const handleSignUp: SubmitHandler<Inputs> = async (data: any) => {
    setPasswordMisMatchErr("");
    setRegisterError("");
    if (data.password !== data.c_password) {
      return setPasswordMisMatchErr(
        "Password and confirm password did not match."
      );
    }
    try {
      if (data.profile_pic.length) {
        try {
          const formData = new FormData();
          formData.append("image", data.profile_pic[0]);
          const imageUrl = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB}`,
            formData
          );
          data.profile_pic = imageUrl.data.data.display_url;
        } catch (error: any) {
          return setRegisterError("Please try again.");
        }
      } else {
        data.profile_pic = "";
      }
      signUp(data);
    } catch (error: any) {
      setRegisterError(error?.response?.data?.error);
    }
  };
  useEffect(() => {
    if (isError) {
      setRegisterError((error as { data: { error: string } })?.data?.error);
    }
    if (registeredUser?.success) {
      dispatch(setUser(registeredUser?.payload?.user));
      navigate(redirectedFrom ? redirectedFrom : "/");
    }
    if (user) {
      navigate(redirectedFrom ? redirectedFrom : "/");
    }
  }, [isError, error, registeredUser, user]);
  return (
    <>
      <Helmet>
        <title>Sign up | AF-Sweets</title>
      </Helmet>
      <div className="max-w-5xl mx-auto px-3 ms:px-5">
        <div className="w-full mt-10 md:mt-20 grid grid-cols-1 xl:grid-cols-2 rounded-md overflow-hidden shadow-md">
          <div className="bg-red-400 p-2 md:p-10 text-white order-2 xl:order-1 space-y-2">
            <h2 className="text-2xl font-inter font-bold">Sign up</h2>
            <p className="text-sm">
              Do not share your pin to any one. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Reprehenderit expedita quo, enim
              perferendis natus, consequatur consequuntur deleniti fuga ullam,
              culpa maxime officiis placeat labore. Molestias sint cupiditate ea
              possimus repudiandae iusto, architecto nemo veniam?
            </p>
            <p className="text-sm">
              Minima laboriosam est eius architecto molestias doloremque
              aspernatur recusandae, sequi hic tenetur eligendi commodi optio
              illo!
            </p>
            <h2 className="text-2xl font-inter font-bold">Password</h2>
            <p className="text-sm">Don't share your password with any other.</p>
            <Link to="/sign-in" className="inline-block">
              <Button>Have an account</Button>
            </Link>
          </div>
          <div className="bg-gray-100 p-2 md:p-10 order-1 xl:order-2">
            <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
              <div>
                <Typography variant="h6" color="blue-gray" className="  ">
                  Your Name
                </Typography>
                <Input
                  defaultValue="demo user"
                  placeholder="John doe"
                  crossOrigin={undefined}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mt-2"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <InputValidationError message="This field is required" />
                )}
              </div>
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
                <Typography variant="h6" color="blue-gray" className="  ">
                  Mobile number
                </Typography>
                <Input
                  defaultValue="1323232"
                  placeholder="01*********"
                  crossOrigin={undefined}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900 mt-2"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  {...register("phone_number", { required: true })}
                />
                {errors.phone_number && (
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
                  <Popover>
                    <PopoverHandler>
                      <span className="select-none bg-red-50 w-4 h-4 flex justify-center items-center rounded-full cursor-pointer text-xs">
                        ?
                      </span>
                    </PopoverHandler>
                    <PopoverContent>
                      Password must be at least 8 characters long, contain one
                      uppercase letter, one lowercase letter, one special
                      character (@, #, $, %, *, ?), and one number.
                    </PopoverContent>
                  </Popover>
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
                    pattern:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%*?])(?=.*\d).{8,}$/,
                  })}
                />
                {errors?.password?.type === "required" && (
                  <InputValidationError message="This field is required" />
                )}
                {errors?.password?.type === "pattern" && (
                  <InputValidationError
                    message="Password must be at least 8 characters long, contain one
                      uppercase letter, one lowercase letter, one special
                      character (@, #, $, %, *, ?), and one number."
                  />
                )}
              </div>
              <div>
                <Typography variant="h6" color="blue-gray" className="  ">
                  Re-enter Password
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
                  {...register("c_password")}
                />
                <InputValidationError message={passwordMisMatchErr} />
              </div>
              <div>
                <Typography variant="h6" color="blue-gray" className="  ">
                  Profile picture
                </Typography>
                <input
                  type="file"
                  accept="image/*"
                  className="input-file"
                  {...register("profile_pic")}
                />
              </div>
              {registerError ? (
                <InputValidationError message={registerError} />
              ) : (
                ""
              )}
              <BtnSecondaryLoading type="submit" isLoading={signUpLoading}>
                Register
              </BtnSecondaryLoading>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
