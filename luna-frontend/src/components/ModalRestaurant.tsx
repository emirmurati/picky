"use client";

import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import AddRestaurantForm from "./AddRestaurantForm";

interface ModalRestaurantProps {
  user: { id: string };
  setCreateClicked: (arg: boolean) => void;
}

function ModalRestaurant({ setCreateClicked, user }: ModalRestaurantProps) {
  const [open, setOpen] = useState(true);

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        setCreateClicked(false);
      }}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <AddRestaurantForm
              user={user}
              setOpen={setOpen}
              open={open}
              setCreateClicked={setCreateClicked}
            />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ModalRestaurant;
