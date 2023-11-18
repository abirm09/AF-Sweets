import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import CustomBreadcrumbs from "../../../Components/CustomBreadcrumbs/CustomBreadcrumbs";
import { Input, Navbar, Typography } from "@material-tailwind/react";
import InputValidationError from "../../../Components/InputValidationError/InputValidationError";
import { useForm } from "react-hook-form";
import { BtnSecondaryLoading } from "../../../Components/Buttons/Buttons";
import { TitlePrimary } from "../../../Components/Titles/Titles";
import axios from "axios";
import { useAddNewSweetMutation } from "../../../Redux/Features/Api/sweetsApi";
import toast from "react-hot-toast";

interface Inputs {
  name: string;
  image: string;
  price: number;
}

const AddNewSweet = () => {
  const [loading, setLoading] = useState(false);
  const [addNewSweet, { isLoading, data: result, isError, isSuccess }] =
    useAddNewSweetMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const handleAddSweets = async (data: Inputs) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);
      const imageUrl = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB}`,
        formData
      );
      data.image = imageUrl.data.data.display_url;
      addNewSweet(data);
      setLoading(isLoading);
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(result?.message);
      reset();
    }
    if (isError) {
      toast.error("Something went wrong.");
    }
  }, [isSuccess, isError]);
  return (
    <>
      <Helmet>
        <title>Add new sweet | AF-Sweets</title>
      </Helmet>
      <CustomBreadcrumbs />
      <Navbar className="text-black p-3 md:p-5 mt-5">
        <TitlePrimary>Add New sweets</TitlePrimary>
        <form
          onSubmit={handleSubmit(handleAddSweets)}
          className="space-y-5 max-w-lg"
        >
          <div>
            <Typography variant="h6" color="blue-gray" className="text-md">
              Sweet name
            </Typography>
            <Input
              placeholder="Kacha golla"
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
            <Typography variant="h6" color="blue-gray" className="text-md">
              Price
            </Typography>
            <Input
              placeholder="200"
              type="number"
              crossOrigin={undefined}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mt-2"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("price", { required: true })}
            />
            {errors.price && (
              <InputValidationError message="This field is required" />
            )}
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" className="  ">
              Profile picture
            </Typography>
            <input
              type="file"
              accept="image/*"
              className="input-file"
              {...register("image", { required: true })}
            />
            {errors.image && (
              <InputValidationError message="This field is required" />
            )}
          </div>
          <BtnSecondaryLoading type="submit" isLoading={loading}>
            Add
          </BtnSecondaryLoading>
        </form>
      </Navbar>
    </>
  );
};

export default AddNewSweet;
