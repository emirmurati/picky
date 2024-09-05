export default function HeroHeader() {
  return (
    <div className="relative isolate w-full overflow-hidden bg-gray-900 bg-gradient-to-b from-black to-[#000000] py-24 sm:py-32">
      <img
        src="src/assets/img/2df2de3dc1221a8c16d915eba78fdfad86e61e43.png"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right opacity-60 md:object-center"
      />
      <div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0"></div>
          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none"></div>
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform gap-4 text-3xl">
          <input
            className="h-8 w-96 rounded-md px-2 text-base"
            type="text"
            placeholder="Search..."
          />
          <button className="rounded-md bg-orange-500 px-6 py-1 text-base text-gray-50 hover:bg-orange-600">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
