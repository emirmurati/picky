import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

function CreateRestaurant({ user }) {
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (obj) => {
      const res = await axios.post(
        `http://localhost:8000/api/v1/restaurant`,
        obj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    },
    onSuccess: () => {
      toast.success("Restaurant successfully added!");
      queryClient.invalidateQueries({
        queryKey: ["restaurants"],
      });
      navigate("/");
    },
    onError: () => {
      toast.error("Something went wrong :(");
    },
  });

  function onSubmit(data) {
    // mutate({ ...data, image: data?.image[0] });
    mutate(data);
  }
  if (isPending) return <Loader />;
  return (
    <>
      <div className="flex flex-col items-center justify-start pt-16">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-20 grid w-1/2 grid-cols-3 gap-x-4 space-y-6"
        >
          <h2 className="bg-slate-150 w-fit border-b-2 border-solid border-orange-500 text-3xl">
            CREATE RESTAURANT
          </h2>

          <div className="w-full place-self-end justify-self-start">
            <Input htmlFor="name" type="text" register={register} name="name">
              Name *
            </Input>
          </div>

          <Input
            htmlFor="country"
            type="text"
            register={register}
            name="country"
          >
            Country *
          </Input>

          <Input htmlFor="street" type="text" register={register} name="street">
            Street *
          </Input>
          <Input htmlFor="city" type="text" register={register} name="city">
            City *
          </Input>
          <Input htmlFor="zip" type="number" register={register} name="zip">
            Zip
          </Input>

          <Input
            htmlFor="website"
            type="text"
            register={register}
            name="website"
          >
            Website
          </Input>
          <Input
            htmlFor="phone"
            type="number"
            register={register}
            name="phoneNumber"
          >
            Phone *
          </Input>
          <Input htmlFor="email" type="text" register={register} name="email">
            Email address
          </Input>

          <Input
            htmlFor="openingHours"
            type="text"
            register={register}
            name="openingHours"
          >
            Opening Hours *
          </Input>
          <Input
            htmlFor="priceLevel"
            type="text"
            register={register}
            name="priceLevel"
          >
            Price level
          </Input>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Image
            </label>
            <div className="mt-2 w-36">
              <input
                {...register("image")}
                type="file"
                className="block w-fit text-sm file:mr-4 file:rounded-md file:border-0 file:bg-amber-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:cursor-pointer hover:file:bg-amber-600"
              />
            </div>
          </div>
          <button className="col-span-3 cursor-pointer place-self-center justify-self-center rounded-xl bg-amber-500 px-8 py-2 text-white hover:bg-amber-600">
            SUBMIT
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateRestaurant;
