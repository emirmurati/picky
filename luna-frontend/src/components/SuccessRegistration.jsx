import { useNavigate } from "react-router-dom";

function SuccessRegistration() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/login");
  }

  return (
    <div className="flex justify-start mt-14 lg:mt-24 md:mt-20  items-start">
      <div className="flex flex-col items-center justify-start gap-y-9">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-20 text-amber-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>

        <p className="text-3xl leading-relaxed text-gray-700 p-12">
          Thank you for your registration.
          <br /> We have sent an email to confirm, please verify and go back to
          the login page.
        </p>
        <button
          className="cursor-pointer rounded-lg bg-amber-500 px-7 py-3 text-lg text-white hover:bg-amber-600"
          onClick={() => handleClick()}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default SuccessRegistration;
