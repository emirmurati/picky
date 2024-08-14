import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import axios from "axios";
import BetterProfile from "../components/BetterProfile";
import ReviewCard from "../components/ReviewCard";

function Profile() {
  const [currentProfilePage, setCurrentProfilePage] = useState(<ReviewCard />);

  const token = window.localStorage.getItem("token");
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get(
        `https://picky-70o0.onrender.com/api/v1/users/me`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.data.data;
    },
  });
  const { data: restaurants } = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const res = await axios.get(
        `https://picky-70o0.onrender.com/api/v1/restaurant/getmyrestaurants/${user?._id}`
      );

      return res.data.data.data;
    },
  });
  const { data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axios.get(
        `https://picky-70o0.onrender.com/api/v1/review/${user?._id}`
      );

      return res.data.data.data;
    },
  });
  useEffect(() => {
    setCurrentProfilePage(<ReviewCard />);
  }, []);

  if (isLoading) return <Loader />;
  return (
    <>
      <BetterProfile
        user={user}
        setCurrentProfilePage={setCurrentProfilePage}
        currentProfilePage={currentProfilePage}
        restaurants={restaurants}
        reviews={reviews}
      />
    </>
  );
}

export default Profile;
