import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "./Loader";
import Avatar from "../assets/img/avatar.jpeg";
import { StarIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ReviewCard({ review }) {
  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/restaurant/${id}`, {
      replace: true,
    });
  }
  return (
    <article className="relative isolate flex flex-col gap-8 lg:flex-row border-b pb-8 border-gray-900/5">
      <div
        onClick={() => handleClick(review?.restaurant?._id)}
        className="cursor-pointer hover:opacity-60  relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0"
      >
        <img
          alt=""
          src={`/${review?.restaurant?.image}`}
          className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover "
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div>
        <div className="flex items-center gap-x-4 text-xs">
          <p className="text-gray-500">{review?.createdAt}</p>
        </div>
        <div className="group relative max-w-xl">
          <div className="flex">
            <h3 className="mt-3 mr-8 text-lg font-semibold leading-6 text-gray-900 text-start">
              {review?.restaurant?.name.charAt(0).toUpperCase() +
                review?.restaurant?.name?.slice(1)}
            </h3>
            <div className="flex items-center xl:col-span-1">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    aria-hidden="true"
                    className={classNames(
                      review?.rating > rating
                        ? "text-yellow-400"
                        : "text-gray-200",
                      "h-5 w-5 flex-shrink-0"
                    )}
                  />
                ))}
              </div>
              <p className="ml-3 text-sm text-gray-700">
                {review?.rating}
                <span className="sr-only"> out of 5 stars</span>
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-gray-600">
            {review?.content}
          </p>
        </div>
        <div className="mt-6 flex border-t border-gray-900/5 pt-6">
          <div className="relative flex items-center gap-x-4">
            <img
              alt=""
              src={`/${review?.user?.avatar}`}
              className="h-10 w-10 rounded-full bg-gray-50"
            />
            <div className="text-sm leading-6">
              <p className="font-semibold text-gray-900">
                <span className="absolute inset-0" />
                {review?.user?.firstName?.charAt(0).toUpperCase() +
                  review?.user?.firstName?.slice(1)}{" "}
                {review?.user?.lastName.charAt(0).toUpperCase() +
                  review?.user?.lastName.slice(1)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ReviewCard;
