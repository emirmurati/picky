import { useNavigate } from "react-router-dom";

function RestaurantsProfile({ setRestaurantClicked }) {
  const navigate = useNavigate();
  return (
    <>
      <h3 className="pb-3 text-2xl">Restaurants</h3>
      <div className="border-b-2 border-b-slate-200 px-3 py-2">
        <p className="text-amber-500">Laurentio Gelato Store</p>
        <p className="text-gray-800">%STARS%</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero rem in
          nostrum sint doloribus corporis et perferendis commodi at accusantium
          officiis, odio consequuntur, cupiditate non.
        </p>
      </div>
      <div className="flex justify-center pt-6">
        <button
          onClick={() => {
            setRestaurantClicked(true);
            navigate("/createRestaurant", {
              replace: true,
            });
          }}
          className="cursor-pointer rounded-xl bg-amber-500 px-8 py-4 text-gray-50 hover:bg-amber-600"
        >
          Create Restaurant
        </button>
      </div>
    </>
  );
}

export default RestaurantsProfile;
