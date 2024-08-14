import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BetterProfile from "../components/BetterProfile";
import API from "../../axios";
import Loader from "../components/Loader";

function Profile() {
  const [restaurantIsClicked, setRestaurantIsClicked] = useState(false);
  const [usersIsClicked, setUsersIsClicked] = useState(false);
  const [reviewsIsClicked, setReviewsIsClicked] = useState(false);

  const token = window.localStorage.getItem("token");
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await API.get(`/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data.data;
    },
  });
  const {
    data: restaurants,
    isLoading: restaurantLoading,
    error,
  } = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const res = await API.get(`/restaurant/getmyrestaurants/${user?._id}`);

      return res.data.data.data;
    },
  });
  const { data: reviews, isLoading: reviewLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await API.get(`/review/${user?._id}`);

      return res.data.data.data;
    },
  });
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
    setReviewsIsClicked(true);
  }, []);
  console.log(error);
  console.log(user?._id);

  if (userLoading) return <Loader />;
  if (restaurantLoading) return <Loader />;
  if (reviewLoading) return <Loader />;
  return (
    <>
      <BetterProfile
        user={user}
        restaurants={restaurants}
        reviews={reviews}
        handleRestaurantClick={handleRestaurantClick}
        handleUsersClick={handleUsersClick}
        handleReviewsClick={handleReviewsClick}
        restaurantIsClicked={restaurantIsClicked}
        usersIsClicked={usersIsClicked}
        reviewsIsClicked={reviewsIsClicked}
        userLoading={userLoading}
        restaurantLoading={restaurantLoading}
        reviewLoading={reviewLoading}
      />
    </>
  );
}

export default Profile;
