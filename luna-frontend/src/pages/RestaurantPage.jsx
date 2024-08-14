import { useState } from "react";
import WriteReview from "../components/WriteReview";
import { Fragment } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
      const res = await axios.get(
        `http://localhost:8000/api/v1/restaurant/${restaurantId}`
      );

      return res.data.data.data;
    },
  });
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:8000/api/v1/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.data.data;
    },
  });
  const { data: reviewss } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:8000/api/v1/review`);

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
                src={`http://localhost:8000/${restaurant?.image}`}
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
              {user?._id === restaurant?.user?._id ? null : (
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
                            src={`http://localhost:8000/${review?.user?.avatar}`}
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
    // <>
    //   <div className="relative isolate h-2/6 w-full overflow-hidden bg-gradient-to-b from-black to-[#000000] py-24 sm:py-32">
    //     <img
    //       src="https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg"
    //       alt=""
    //       className="absolute inset-0 -z-10 h-full w-full object-cover object-right opacity-30 md:object-center"
    //     />
    //     <div>
    //       <div className="mx-auto max-w-7xl px-6 lg:px-8">
    //         <div className="mx-auto max-w-2xl lg:mx-0"></div>
    //         <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none"></div>
    //       </div>
    //     </div>
    //     <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform">
    //       <div className="flex items-center justify-around">
    //         <div>
    //           <h2 className="pb-3 text-3xl text-white">%RESTAURANT NAME%</h2>
    //           <p className="text-md pb-2 text-white">%RESTAURANT PRODUCT%</p>
    //           <div className="flex gap-4">
    //             <p className="text-white">%STAR% </p>
    //             <p className="italic text-white">%NUMBER REVIEWS% reviews</p>
    //           </div>
    //         </div>
    //         <div className="w-64">
    //           <img src="https://mtec.ethz.ch/the-department/how-to-find-us/_jcr_content/par/fullwidthimage/image.imageformat.930.73662141.png" />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   {isReviewButtonClicked ? (
    //     <WriteReview setIsReviewButtonClicked={setIsReviewButtonClicked} />
    //   ) : (
    //     <div className="mt-8 flex justify-center">
    //       <div className="flex w-5/6 justify-between gap-24">
    //         <div className="flex justify-end">
    //           <div className="w-1/2">
    //             <div className="flex-col">
    //               <div className="mb-8 flex w-full text-3xl">
    //                 <input
    //                   className="h-8 w-full rounded-md px-2 text-base"
    //                   type="text"
    //                   placeholder="Filter List..."
    //                 />
    //                 <button className="rounded-md bg-amber-500 px-6 py-1 text-base text-gray-50 hover:bg-amber-600">
    //                   Filter
    //                 </button>
    //               </div>
    //             </div>
    //             <div className="group w-full border-t-4 border-amber-500 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
    //               <div className="flex justify-between border-b-2 border-b-slate-200">
    //                 <div className="flex gap-4">
    //                   <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-28 overflow-hidden bg-gray-200">
    //                     <img
    //                       src="src/assets/img/244b33a5c8d738c298296d73d0d840348799e37f.png"
    //                       className="h-full w-full object-cover object-center lg:h-full lg:w-full"
    //                     />
    //                   </div>
    //                   <div>
    //                     <div className="flex-col py-2">
    //                       <h3 className="text-sm text-amber-500">Name</h3>
    //                       <p>Total REviews Total Reviews</p>
    //                     </div>
    //                   </div>
    //                   <div className="flex items-center">
    //                     <button>
    //                       <img src="src/assets/svg/star.svg" />
    //                     </button>
    //                   </div>
    //                 </div>
    //                 <p className="px-8">DATE</p>
    //               </div>
    //               <div className="p-2">
    //                 <p className="mt-1 text-sm text-amber-500">Restaurant</p>
    //                 <p className="mb-2">
    //                   Lorem, ipsum dolor sit amet consectetur adipisicing elit.
    //                   Distinctio totam obcaecati doloremque ipsam. Iusto
    //                   quisquam dolores, explicabo sed soluta nostrum dolor
    //                   ratione omnis corrupti ea!
    //                 </p>
    //                 <div className="flex items-center justify-between">
    //                   <div className="flex">
    //                     <button className="flex items-center gap-2 rounded-l-lg border-r-2 border-r-white bg-slate-400 px-3 py-0.5 text-white hover:bg-slate-500">
    //                       <img src="src/assets/svg/money.svg" />
    //                       <p>Total Likes Likes</p>
    //                     </button>

    //                     <button className="flex items-center gap-2 rounded-r-lg bg-slate-400 px-3 py-0.5 text-white hover:bg-slate-500">
    //                       <p>Comments Total comments</p>
    //                     </button>
    //                   </div>
    //                   <button
    //                     onClick={() => setIsClicked((prev) => !prev)}
    //                     className="cursor-pointer text-amber-500 hover:text-amber-600"
    //                   >
    //                     {isClicked ? 'Hide' : 'View all comments'}
    //                   </button>
    //                 </div>
    //                 {isClicked && (
    //                   <>
    //                     <p className="text-amber-500">Cristiano Ronaldo</p>
    //                     <p>I love it</p>
    //                     <p className="text-amber-500">Ruben Villalon</p>
    //                     <p>Crazyyyy</p>
    //                   </>
    //                 )}
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="w-1/2">
    //           <div className="flex border-b-2 border-b-slate-200 pb-4">
    //             <img src="src/assets/svg/clock.svg" className="pr-3" />
    //             <p>Monday Friday 8 am to 9 pm</p>
    //           </div>
    //           <div className="flex pt-4">
    //             <img src="src/assets/svg/money.svg" className="pr-3" />
    //             <p>Price level: $$$</p>
    //           </div>
    //           <div className="flex justify-center gap-3 pt-8">
    //             <button
    //               onClick={() => setIsReviewButtonClicked((prev) => !prev)}
    //               className="cursor-pointer rounded-xl bg-amber-500 px-4 py-2 text-white hover:bg-amber-600"
    //             >
    //               WRITE A REVIEW
    //             </button>
    //             <button className="cursor-pointer rounded-xl bg-amber-500 px-4 py-2 text-white hover:bg-amber-600">
    //               EDIT DATA
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </>
  );
}

export default RestaurantPage;
