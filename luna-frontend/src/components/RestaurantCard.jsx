import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

function RestaurantCard({ restaurant, isLoading }) {
  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/restaurant/${id}`, {
      replace: true,
    });
  }

  return (
    <article
      onClick={() => handleClick(restaurant?._id)}
      className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 cursor-pointer"
    >
      <img
        alt=""
        src={`http://localhost:8000/${restaurant?.image}`}
        className="absolute inset-0 -z-10 h-full w-full object-cover "
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-t  from-gray-900 via-gray-900/40" />
      <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

      <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
        <p className="mr-8">Category</p>
        <div className="-ml-4 flex items-center gap-x-4">
          <svg
            viewBox="0 0 2 2"
            className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50"
          >
            <circle r={1} cx={1} cy={1} />
          </svg>
          <div className="flex gap-x-2.5">
            <p>{restaurant?.category}</p>
          </div>
        </div>
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
        <a className="italic font-bold">
          <span className="absolute inset-0" />
          {restaurant?.name.charAt(0).toUpperCase() + restaurant?.name.slice(1)}
        </a>
      </h3>
    </article>
  );
}

export default RestaurantCard;
