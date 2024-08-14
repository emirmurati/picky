import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { useMutation } from "@tanstack/react-query";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/img/pickyy.png";

function ForgotPassword() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (email) => {
      await axios.post(
        `https://picky-70o0.onrender.com/api/v1/auth/password-reset/`,
        email
      );
    },
    onSuccess: () => {
      toast.success("Great! another step before resetting the password ");
      navigate("/newPassword");
    },
    onError: () => {
      toast.error("Oh no... please try again :(");
    },
  });

  function onSubmit(data) {
    mutate(data);
  }
  if (isPending) return <Loader />;
  return (
    <div className="flex h-full items-center justify-center w-full">
      <div className="flex h-2/4 flex-col items-center gap-14">
        <div>
          <img src={Logo} alt="" className="w-20" />
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input htmlFor="email" type="text" register={register} name="email">
              Email address
            </Input>
            {isError ? (
              <span className="text-red-500">{error?.response.data.email}</span>
            ) : null}

            <div>
              <button
                disabled={isPending}
                className="flex w-full justify-center rounded-md bg-amber-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
              >
                SEND CODE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
