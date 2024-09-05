/* eslint-disable react/prop-types */
"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import StarRating from "./StarRating";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Loader from "./Loader";
import toast from "react-hot-toast";
import API from "../../axios";

interface WriteReviewProp {
  setIsReviewButtonClicked: (arg: boolean) => void;
  restaurantId: string | undefined;
  userId: string;
}

interface WriteReviewAction {
  content: string;
  rating: number;
  user: string;
  restaurant: string;
}

function WriteReview({
  setIsReviewButtonClicked,
  restaurantId,
  userId,
}: WriteReviewProp) {
  const { register, handleSubmit, setValue } = useForm<WriteReviewAction>();

  const [open, setOpen] = useState(true);
  const [rating, setRating] = useState(5);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (obj: WriteReviewAction) => {
      const res = await API.post(`/review`, obj);

      return res.data;
    },
    onSuccess: () => {
      toast.success("Review successfully added!");
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
      setIsReviewButtonClicked(false);
      setOpen(false);
    },
    onError: () => {
      toast.error("Something went wrong :(");
    },
  });

  const onSubmit: SubmitHandler<WriteReviewAction> = function (data) {
    mutate(data);
  };

  useEffect(() => {
    setValue("rating", rating);
  }, [rating, setValue]);
  if (isPending) return <Loader />;

  return (
    <Dialog
      open={open}
      onClose={() => {
        setIsReviewButtonClicked(false);
        setOpen;
      }}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500">
                  <ChatBubbleBottomCenterIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-white"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Write a review
                  </DialogTitle>

                  <div className="flex items-center gap-x-3 mt-2">
                    <StarRating
                      maxRating={5}
                      rating={rating}
                      onSetRating={setRating}
                    />
                    <input
                      type="hidden"
                      {...register("rating", { required: true })}
                      value={rating}
                      name="rating"
                      readOnly
                    />

                    <p className="text-slate-600">Select your rating</p>
                  </div>

                  <div className="mt-2">
                    <textarea
                      {...register("content")}
                      className="block w-full p-4 text-lg"
                      placeholder="Your review helps others learn about great local businesses.
            Please don't review this business if you received a freebie for writing this review, or if you are connected in any way to the owner or employees."
                      name="content"
                      id=""
                    ></textarea>
                    <input
                      type="hidden"
                      value={restaurantId}
                      {...register("restaurant")}
                      name="restaurant"
                    />
                    <input
                      type="hidden"
                      value={userId}
                      {...register("user")}
                      name="user"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button className="inline-flex w-full justify-center rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-600  sm:col-start-2">
                  Submit review
                </button>
                <button
                  onClick={() => {
                    setOpen(false);
                    setIsReviewButtonClicked(false);
                  }}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default WriteReview;
