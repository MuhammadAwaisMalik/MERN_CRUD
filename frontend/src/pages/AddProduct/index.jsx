import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { PostData } from "data/apiService";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import InputField from "components/inputField";
import Button from "components/button";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setLoader } from "store/slices/loaderSlice";

const baseSchema = yup.object().shape({
  name: yup.string().required("product name is required"),
  price: yup.string().required("price is required."),
  image: yup.string().required("image url is required."),
});

const AddProduct = ({ fetchProducts }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(baseSchema),
  });

  const onSubmit = async (payload) => {
    dispatch(setLoader(true));
    PostData("/products", payload)
      .then((res) => {
        toast.success(res?.message);
        fetchProducts();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      })
      .finally(() => {
        navigate("/");
        dispatch(setLoader(false));
      });
  };

  return (
    <div className="flex justify-center mt-5 flex-col items-center">
      <h1 className="font-bold text-[24px]">Add Product</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex  flex-col xs:w-full md:w-3/5 lg:w-[35%]"
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <InputField
              label="Enter Name"
              type="text"
              placeholder="Enter Name"
              value={field.value}
              onChange={(e) => field.onChange(e)}
              error={errors?.name?.message}
            />
          )}
        />

        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <InputField
              label="Enter Price"
              type="number"
              placeholder="Enter Price Here"
              value={field.value}
              onChange={(e) => field.onChange(e)}
              error={errors?.price?.message}
            />
          )}
        />
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <InputField
              type="text"
              maxLength={5000}
              label="Enter Image URL"
              placeholder="https://www.google.com"
              value={field.value}
              onChange={(e) => field.onChange(e)}
              error={errors?.image?.message}
            />
          )}
        />

        <div className="flex items-center gap-2">
          <Button
            type="reset"
            title={"Back"}
            variant="secondary"
            className="flex-1"
            onClick={() => navigate("/")}
          />
          <Button
            type="submit"
            variant="success"
            title={"Add"}
            className="flex-1"
          />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
