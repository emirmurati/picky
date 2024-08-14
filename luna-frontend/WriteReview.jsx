/* eslint-disable react/prop-types */
function WriteReview({ setIsReviewButtonClicked }) {
  return (
    <div className="flex justify-center">
      <form className="w-2/3 p-20 text-center">
        <div className="flex items-center justify-center gap-8 pb-4">
          <button className="cursor-pointer">%STAR%</button>
          <p>Select your rating</p>
        </div>
        <div className="col-span-full">
          <div className="mt-2">
            <textarea
              rows={3}
              className="block w-full rounded-md border-0 p-4 text-4xl text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
              placeholder="You review helps others learn about great local businesses.
            Please Dont review this business if you received a freeble for writing this review, or if you are connected in any way to the owner or employees."
            />
          </div>
        </div>
        <div className="flex items-center justify-between pt-3">
          <p className="text-red-500">This Field is required</p>
          <div className="flex gap-6">
            <button className="cursor-pointer text-black hover:text-slate-300">
              CANCEL
            </button>
            <button
              onClick={() => setIsReviewButtonClicked(false)}
              className="cursor-pointer rounded-xl bg-amber-500 px-8 py-3 text-white hover:bg-amber-600"
            >
              SUBMIT
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default WriteReview;
