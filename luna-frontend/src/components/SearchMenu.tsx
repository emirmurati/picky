import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  ChatBubbleBottomCenterIcon,
  UsersIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";

interface SearchMenuProp {
  handleReviewsClick: () => void;
  handleUsersClick: () => void;
  handleRestaurantClick: () => void;
}

export default function SearchMenu({
  handleReviewsClick,
  handleUsersClick,
  handleRestaurantClick,
}: SearchMenuProp) {
  return (
    <Popover className="relative flex justify-center">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        <span>Search</span>
        <ChevronDownIcon aria-hidden="true" className="h-5 w-5" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
          <div className="p-4 text-start">
            <>
              <div
                onClick={() => handleRestaurantClick()}
                className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
              >
                <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <BuildingStorefrontIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-gray-600 group-hover:text-amber-500"
                  />
                </div>
                <div>
                  <a className="font-semibold text-gray-900">
                    Restaurants
                    <span className="absolute inset-0" />
                  </a>
                  <p className="mt-1 text-gray-600">
                    Search for all the restaurants
                  </p>
                </div>
              </div>
              <div
                onClick={() => handleReviewsClick()}
                className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 cursor-pointer "
              >
                <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <ChatBubbleBottomCenterIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-gray-600 group-hover:text-amber-500"
                  />
                </div>
                <div>
                  <a className="font-semibold text-gray-900">
                    Reviews
                    <span className="absolute inset-0" />
                  </a>
                  <p className="mt-1 text-gray-600">Search for reviews</p>
                </div>
              </div>
              <div
                onClick={() => handleUsersClick()}
                className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 cursor-pointer "
              >
                <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <UsersIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-gray-600 group-hover:text-amber-500"
                  />
                </div>
                <div>
                  <a className="font-semibold text-gray-900">
                    Users
                    <span className="absolute inset-0" />
                  </a>
                  <p className="mt-1 text-gray-600">
                    Search for all active users
                  </p>
                </div>
              </div>
            </>
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
