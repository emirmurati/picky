import ReviewCard, { ReviewCardProp } from "../components/ReviewCard";
import UserCard, { UserCardProp } from "../components/UserCard";
import RestaurantCard from "../components/RestaurantCard";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchMenu from "../components/SearchMenu";
import API from "../../axios";
import Loader from "../components/Loader";
import { RestaurantType } from "../lib/GlobalTypes";

interface reviewTypeSearch {
  comments?: string[];
  content: string;
  _id: string;
  likes: number;
  rating: number;
  restaurant: { _id: string; image: string; name: string };
  user: { firstName: string; lastName: string; avatar: string };
  createdAt: string;
}

function Search() {
  const [restaurantIsClicked, setRestaurantIsClicked] = useState(false);
  const [usersIsClicked, setUsersIsClicked] = useState(false);
  const [reviewsIsClicked, setReviewsIsClicked] = useState(false);

  const { data: restaurants, isLoading: restaurantLoading } = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const res = await API.get(`/restaurant`);

      return res.data.data.data;
    },
  });
  const { data: reviews, isLoading: reviewLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await API.get(`/review`);

      return res.data.data.data;
    },
  });
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await API.get(`/users`);

      return res.data.data.data;
    },
  });
  console.log(users);

  function handleRestaurantClick() {
    setRestaurantIsClicked(true);
    setReviewsIsClicked(false);
    setUsersIsClicked(false);
  }
  function handleUsersClick() {
    setUsersIsClicked(true);
    setRestaurantIsClicked(false);
    setReviewsIsClicked(false);
  }
  function handleReviewsClick() {
    setReviewsIsClicked(true);
    setUsersIsClicked(false);
    setRestaurantIsClicked(false);
  }

  useEffect(() => {
    setRestaurantIsClicked(true);
  }, []);

  if (restaurantLoading) return <Loader />;
  if (reviewLoading) return <Loader />;
  if (usersLoading) return <Loader />;

  return (
    <>
      <SearchMenu
        handleRestaurantClick={handleRestaurantClick}
        handleUsersClick={handleUsersClick}
        handleReviewsClick={handleReviewsClick}
      />

      {restaurantIsClicked && (
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
              {restaurants?.map((restaurant: RestaurantType) => (
                <RestaurantCard restaurant={restaurant} />
              ))}
            </div>
          </div>
        </div>
      )}
      {usersIsClicked && (
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
              {users?.map(
                (user: {
                  description: string;
                  avatar: string;
                  firstName: string;
                  lastName: string;
                }) => <UserCard user={user} />
              )}
            </ul>
          </div>
        </div>
      )}

      {reviewsIsClicked && (
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
                {reviews?.map((review: reviewTypeSearch) => (
                  <ReviewCard review={review} />
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
