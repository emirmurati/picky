import { Link } from "react-router-dom";

export default function Cta() {
  return (
    <div className="bg-white">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl lg:leading-relaxed font-bold tracking-tight text-gray-900 sm:text-4xl">
            Discover Your Next Favorite Restaurant.
            <br />
            Start Exploring with PickyEater Today.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Join a community of food lovers and find the best dining experiences
            near you. Share your reviews and help others make informed choices.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/search"
              className="rounded-md bg-amber-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-600"
            >
              Explore Restaurants
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
