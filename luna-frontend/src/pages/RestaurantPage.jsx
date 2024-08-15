import { useState } from "react";
import WriteReview from "../components/WriteReview";
import { Fragment } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import API from "../../axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function RestaurantPage() {
  const token = window.localStorage.getItem("token");
  const { restaurantId } = useParams();
  const [isClicked, setIsClicked] = useState(false);
  const [isReviewButtonClicked, setIsReviewButtonClicked] = useState(false);
  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["restaurant"],
    queryFn: async () => {
      const res = await API.get(`/restaurant/${restaurantId}`);

      return res.data.data.data;
    },
  });
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await API.get(`/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.data.data;
    },
  });
  const { data: reviewss } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await API.get(`/review`);

      return res.data.data.data;
    },
  });

  let average = reviewss
    ?.filter((revie) => revie?.restaurant?._id === restaurantId)
    .map((review) => review.rating);

  const newAvg = average?.length
    ? average.reduce((a, b) => a + b) / average.length
    : null;

  return (
    <div className="bg-white">
      {isReviewButtonClicked && (
        <WriteReview
          setIsReviewButtonClicked={setIsReviewButtonClicked}
          userId={user?._id}
          restaurantId={restaurantId}
        />
      )}
      <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* Product */}
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          {/* Product image */}
          <div className="lg:col-span-4 lg:row-end-1 md:flex md:justify-center">
            <div className="aspect-h-4 aspect-w-5 overflow-hidden rounded-lg bg-gray-100 md:w-fit md:place-content-centercenter">
              <img
                src={`https://picky-70o0.onrender.com/${restaurant?.image}`}
                className="object-cover  w-full "
              />
            </div>
          </div>

          {/* Product details */}
          <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
            <div className="flex flex-col-reverse">
              <div className="mt-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {restaurant?.name}
                </h1>
              </div>

              <div>
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        newAvg > rating ? "text-yellow-400" : "text-gray-300",
                        "h-5 w-5 flex-shrink-0"
                      )}
                    />
                  ))}
                </div>
                <p className="text-slate-500">
                  {newAvg?.toFixed(1)} out of 5 stars
                </p>
              </div>
            </div>

            <p className="mt-6 text-gray-500">
              Category: {restaurant?.category}
            </p>
            <p className="mt-6 text-gray-500">
              Opening hours: {restaurant?.openingHours}
            </p>
            <p className="mt-6 text-gray-500">
              Price level: {restaurant?.priceLevel}
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              {user?._id === restaurant?.user?._id || !token ? null : (
                <button
                  onClick={() => setIsReviewButtonClicked((prev) => !prev)}
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-amber-500 px-8 py-3 text-base font-medium text-white hover:bg-amber-600 "
                >
                  Write review
                </button>
              )}
            </div>
          </div>

          <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
            <TabGroup>
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8">
                  <Tab className="whitespace-nowrap border-b-2 border-transparent py-6 text-sm font-medium text-gray-700 hover:border-gray-300 hover:text-gray-800 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600">
                    Customer Reviews
                  </Tab>
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                <TabPanel className="-mb-10">
                  <h3 className="sr-only">Customer Reviews</h3>

                  {reviewss
                    ?.filter((revie) => revie?.restaurant?._id === restaurantId)
                    .map((review, reviewIdx) => (
                      <div
                        key={review._id}
                        className="flex space-x-4 text-sm text-gray-500"
                      >
                        <div className="flex-none py-10">
                          <img
                            alt=""
                            src={`https://picky-70o0.onrender.com/${review?.user?.avatar}`}
                            className="h-10 w-10 rounded-full bg-gray-100"
                          />
                        </div>
                        <div
                          className={classNames(
                            reviewIdx === 0 ? "" : "border-t border-gray-200",
                            "py-10"
                          )}
                        >
                          <h3 className="font-medium text-gray-900">
                            {review?.user?.firstName} {review?.user?.lastName}
                          </h3>
                          <p>
                            <time dateTime={review?.createdAt}>
                              {review?.createdAt}
                            </time>
                          </p>

                          <div className="mt-4 flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <StarIcon
                                key={rating}
                                aria-hidden="true"
                                className={classNames(
                                  review?.rating > rating
                                    ? "text-yellow-400"
                                    : "text-gray-300",
                                  "h-5 w-5 flex-shrink-0"
                                )}
                              />
                            ))}
                          </div>
                          <p className="sr-only">
                            {review?.rating} out of 5 stars
                          </p>

                          <div
                            dangerouslySetInnerHTML={{
                              __html: review?.content,
                            }}
                            className="prose prose-sm mt-4 max-w-none text-gray-500"
                          />
                        </div>
                      </div>
                    ))}
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantPage;
