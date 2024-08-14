import ReviewCard from "../components/ReviewCard";
import UserCard from "../components/UserCard";
import RestaurantCard from "../components/RestaurantCard";
import { useState } from "react";
import DropDown from "../components/DropDown";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SearchMenu from "../components/SearchMenu";

function Search() {
  const [currentPage, setCurrentPage] = useState(<RestaurantCard />);
  const { data: restaurants, isLoading } = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:8000/api/v1/restaurant`);

      return res.data.data.data;
    },
  });
  const { data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:8000/api/v1/review`);

      return res.data.data.data;
    },
  });
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:8000/api/v1/users`);

      return res.data.data.data;
    },
  });

  return (
    <>
      <SearchMenu setCurrentPage={setCurrentPage} />

      {currentPage.type.name === "RestaurantCard" && (
        <div className="bg-white lg:py-10 md:py-6 py-3">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Restaurants
              </h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                A list of all the restaurants
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {restaurants?.map((restaurant, index) => (
                <RestaurantCard restaurant={restaurant} isLoading={isLoading} />
              ))}
            </div>
          </div>
        </div>
      )}
      {currentPage.type.name === "UserCard" && (
        <div className="bg-white lg:py-10 md:py-6 py-3">
          <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Users
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                A list of our users
              </p>
            </div>
            <ul
              role="list"
              className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
            >
              {users?.map((user, index) => (
                <UserCard user={user} isLoading={isLoading} />
              ))}
            </ul>
          </div>
        </div>
      )}

      {currentPage.type.name === "ReviewCard" && (
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
                  <ReviewCard review={review} isLoading={isLoading} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Search;
