/* eslint-disable react/prop-types */
import { useState } from "react";
import CancelAccountModal from "./CancelAccountModal";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loader from "./Loader";
import Input from "./Input";
import toast from "react-hot-toast";

function EditProfile({ user }) {
  const token = window.localStorage.getItem("token");
  const [cancelButton, setCancelButton] = useState(false);
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (obj) => {
      const res = await axios.patch(`/api/v1/users/updateMe`, obj, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },
    onSuccess: () => {
      toast.success("Profile successfully edited!");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: () => {
      toast.error("Something went wrong :(");
    },
  });

  function onSubmit(data) {
    mutate({ ...data, avatar: data?.avatar[0] });
  }
  if (isPending) return <Loader />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-4">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Edit User Profile
          </h2>

          <div className="mt-5 flex-col gap-x-6 gap-y-8">
            <Input
              htmlFor="username"
              type="text"
              register={register}
              name="username"
              defaultValue={user?.username}
            >
              Username
            </Input>
            <Input
              htmlFor="firstName"
              type="text"
              register={register}
              name="firstName"
              defaultValue={user?.firstName}
            >
              First Name
            </Input>
            <Input
              htmlFor="lastName"
              type="text"
              register={register}
              name="lastName"
              defaultValue={user?.lastName}
            >
              Last Name
            </Input>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  required
                  type="email"
                  {...register("email")}
                  value={user?.email}
                  readOnly
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <Input
              htmlFor="location"
              type="text"
              register={register}
              name="location"
              defaultValue={user?.location}
            >
              Location
            </Input>
            <Input
              htmlFor="phoneNumber"
              type="text"
              register={register}
              name="phoneNumber"
              defaultValue={user?.phoneNumber}
            >
              Phone
            </Input>

            <Input
              htmlFor="thingILove"
              type="text"
              register={register}
              name="thingILove"
              defaultValue={user?.thingILove}
            >
              Things I love
            </Input>

            <Input
              htmlFor="description"
              type="text"
              register={register}
              name="description"
              defaultValue={user?.description}
            >
              Description
            </Input>

            <div>
              <label className="block pt-4 text-sm font-medium leading-6 text-gray-900">
                Profile Picture
              </label>
              <div className="mt-4 w-36">
                <input
                  type="file"
                  {...register("avatar")}
                  className="block w-fit text-sm file:mr-4 file:rounded-md file:border-0 file:bg-amber-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:cursor-pointer hover:file:bg-amber-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-x-6">
        <button className="rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500">
          Save
        </button>
        <button
          onClick={() => setCancelButton((prev) => !prev)}
          type="button"
          className="text-sm font-semibold leading-6 text-red-500"
        >
          Delete Account
        </button>
      </div>
      {cancelButton && <CancelAccountModal setCancelButton={setCancelButton} />}
    </form>
  );
}

export default EditProfile;
