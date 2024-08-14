"use client";

import { useState } from "react";
import {
  ChatBubbleBottomCenterIcon,
  UserIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import BetterEditProfile from "./BetterEditProfile";
import RestaurantCard from "./RestaurantCard";
import ReviewCard from "./ReviewCard";
import ModalRestaurant from "./ModalRestaurant";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BetterProfile({
  user,
  setCurrentProfilePage,
  currentProfilePage,
  restaurants,
  reviews,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [createClicked, setCreateClicked] = useState(false);

  return (
    <>
      <div className="mx-auto max-w-7xl lg:pt-2 pt-2 lg:flex lg:gap-x-16 lg:px-8">
        <h1 className="sr-only">General Settings</h1>

        <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
          <nav className="flex-none px-4 sm:px-6 lg:px-0">
            <ul
              role="list"
              className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col"
            >
              <li
                className="cursor-pointer"
                onClick={() => setCurrentProfilePage(<ReviewCard />)}
              >
                <a
                  className={classNames(
                    currentProfilePage.type.name === "ReviewCard"
                      ? "bg-gray-50 text-amber-500"
                      : "text-gray-700 hover:bg-gray-50 hover:text-amber-500",
                    "group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6"
                  )}
                >
                  <ChatBubbleBottomCenterIcon
                    aria-hidden="true"
                    className={classNames(
                      currentProfilePage.type.name === "ReviewCard"
                        ? "text-amber-500"
                        : "text-gray-400 group-hover:text-amber-600",
                      "h-6 w-6 shrink-0"
                    )}
                  />
                  Reviews
                </a>
              </li>
              <li
                className="cursor-pointer"
                onClick={() => setCurrentProfilePage(<RestaurantCard />)}
              >
                <a
                  className={classNames(
                    currentProfilePage.type.name === "RestaurantCard"
                      ? "bg-gray-50 text-amber-500"
                      : "text-gray-700 hover:bg-gray-50 hover:text-amber-500",
                    "group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6"
                  )}
                >
                  <BuildingStorefrontIcon
                    aria-hidden="true"
                    className={classNames(
                      currentProfilePage.type.name === "RestaurantCard"
                        ? "text-amber-500"
                        : "text-gray-400 group-hover:text-amber-600",
                      "h-6 w-6 shrink-0"
                    )}
                  />
                  Restaurants
                </a>
              </li>
              <li
                className="cursor-pointer"
                onClick={() => setCurrentProfilePage(<BetterEditProfile />)}
              >
                <a
                  className={classNames(
                    currentProfilePage.type.name === "BetterEditProfile"
                      ? "bg-gray-50 text-amber-500"
                      : "text-gray-700 hover:bg-gray-50 hover:text-amber-500",
                    "group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6"
                  )}
                >
                  <UserIcon
                    aria-hidden="true"
                    className={classNames(
                      currentProfilePage.type.name === "BetterEditProfile"
                        ? "text-amber-500"
                        : "text-gray-400 group-hover:text-amber-600",
                      "h-6 w-6 shrink-0"
                    )}
                  />
                  Edit profile
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
          {currentProfilePage.type.name === "RestaurantCard" && (
            <>
              {createClicked && (
                <ModalRestaurant
                  user={user}
                  setCreateClicked={setCreateClicked}
                />
              )}
              <div className="bg-white lg:py-10 md:py-6 py-3">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                      My Restaurants
                    </h2>
                    <button
                      onClick={() => setCreateClicked(true)}
                      className="bg-amber-500 text-white py-2 px-4 mt-4 rounded-lg hover:bg-amber-600"
                    >
                      Create one
                    </button>
                  </div>
                  <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    {restaurants?.map((restaurant, index) => (
                      <RestaurantCard restaurant={restaurant} />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
          {currentProfilePage.type.name === "ReviewCard" && (
            <div className="bg-white lg:py-10 md:py-6 py-3">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-4xl">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
                    Reviews
                  </h2>
                  <p className="mt-2 text-lg leading-8 text-gray-600 text-center">
                    Reviews on restaurants
                  </p>
                  <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
                    {reviews?.map((review, index) => (
                      <ReviewCard review={review} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}{" "}
          {currentProfilePage.type.name === "BetterEditProfile" && (
            <BetterEditProfile user={user} />
          )}
        </main>
      </div>
    </>
  );
}
