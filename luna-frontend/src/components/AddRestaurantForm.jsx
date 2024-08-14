/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import Input from "../components/Input";
import API from "../../axios";

function AddRestaurantForm({ setOpen, setCreateClicked, open, user }) {
  const token = window.localStorage.getItem("token");
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (obj) => {
      const res = await API.post(`/restaurant`, obj, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },
    onSuccess: () => {
      toast.success("Restaurant successfully added!");
      queryClient.invalidateQueries({
        queryKey: ["restaurants"],
      });
      setCreateClicked(false);
      setOpen(false);
    },
    onError: () => {
      toast.error("Something went wrong :(");
    },
  });

  function onSubmit(data) {
    mutate({ ...data, image: data?.image[0] });
    // mutate({ ...data, image: data?.image[0] });
    // mutate(data);
  }

  // if (isPending) return <Loader />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12 sm:space-y-16">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Create restaurant
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
            Add a new restaurant in the form below
          </p>

          <div className="grid p-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-1 md:space-y-4 lg:space-y-8  lg:pb-12">
            <div className="self-end">
              <Input htmlFor="name" type="text" register={register} name="name">
                Name *
              </Input>
            </div>

            <div className="w-full place-self-start justify-self-center">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Category *
              </label>
              <div className="mt-2">
                <select
                  {...register("category", {
                    required: true,
                  })}
                >
                  <option value="">Select...</option>
                  <option value="greek">Greek</option>
                  <option value="italian">Italian</option>
                  <option value="american">American</option>
                </select>
              </div>
            </div>
            <input
              type="hidden"
              name="user"
              {...register("user")}
              value={user?.id}
            />

            <Input
              htmlFor="address"
              type="text"
              register={register}
              name="country"
            >
              Country *
            </Input>

            <Input htmlFor="city" type="text" register={register} name="street">
              Street *
            </Input>

            <Input htmlFor="city" type="text" register={register} name="city">
              City *
            </Input>

            <Input htmlFor="zip" type="text" register={register} name="zip">
              Zip
            </Input>
            <Input
              htmlFor="tel"
              type="tel"
              register={register}
              name="phoneNumber"
            >
              Phone number *
            </Input>
            <Input
              htmlFor="group"
              type="text"
              register={register}
              name="openingHours"
            >
              Opening hours
            </Input>
            <Input
              htmlFor="group"
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
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          onClick={() => {
            setOpen(false);
            setCreateClicked(false);
          }}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button className="inline-flex justify-center rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-600 ">
          Add
        </button>
      </div>
    </form>
  );
}

export default AddRestaurantForm;
