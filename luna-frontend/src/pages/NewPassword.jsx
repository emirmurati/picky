import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/img/pickyy.png";

function NewPassword() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { mutate, isPending } = useMutation({
    mutationFn: async (obj) => {
      await axios.patch(
        `https://motion.propulsion-home.ch/backend/api/auth/password-reset/validation/`,
        obj
      );
    },
    onSuccess: () => {
      toast.success("Great! You successfully changed your password! ");
      navigate("/login");
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
    <div className="flex flex-col items-center justify-center mt-4 lg:mt-24 md:mt-20">
      <div>
        <img src={Logo} alt="" className="w-20" />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid lg:w-4/6 md:w-4/6 p-10 lg:grid-cols-2  md:grid-cols-2 sm:grid-cols-1 gap-4 mt-10 space-y-8  pb-12"
      >
        <div className="w-full place-self-end justify-self-start">
          <Input htmlFor="email" type="email" register={register} name="email">
            Email address
          </Input>
        </div>

        <Input htmlFor="code" type="text" register={register} name="code">
          Validation Code
        </Input>
        <Input
          htmlFor="password"
          type="password"
          register={register}
          name="password"
        >
          New password
        </Input>

        <Input
          htmlFor="password_repeat"
          type="password"
          register={register}
          name="password_repeat"
        >
          New Password repeat
        </Input>

        <div className="col-span-2 place-self-center justify-self-center">
          <button
            disabled={isPending}
            className="flex w-full justify-center rounded-md bg-amber-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            SEND CODE
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewPassword;
