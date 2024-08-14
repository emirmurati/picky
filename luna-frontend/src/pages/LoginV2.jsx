import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
import Input from "../components/Input";
import toast from "react-hot-toast";
import Logo from "../assets/img/pickyy.png";

function LoginV2() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (obj) => {
      const res = await axios.post("/api/v1/users/login", obj);

      const token = res.data.token;

      window.localStorage.setItem("token", `${token}`);
    },
    onSuccess: () => {
      toast.success("You are logged in!");
      navigate("/");
    },
    onError: () => {
      toast.error("Oh no, retry :(");
    },
  });

  function onSubmit(data) {
    mutate(data);
  }

  if (isPending) return <Loader />;

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10  w-auto" src={Logo} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input htmlFor="email" type="text" register={register} name="email">
              Email address
            </Input>
            {isError && (
              <span className="text-red-500">{error?.response.data.email}</span>
            )}

            <Input
              htmlFor="password"
              type="password"
              register={register}
              name="password"
            >
              Password
            </Input>
            {isError && (
              <span className="text-red-500">
                {error?.response.data.password}
              </span>
            )}

            <div className="text-sm">
              <NavLink
                to="/forgotPassword"
                className="font-semibold text-amber-500 hover:text-amber-600"
              >
                Forgot password?
              </NavLink>
            </div>

            {isError ? (
              <p className="text-red-600">{error?.response.data.detail}</p>
            ) : (
              ""
            )}
            <div>
              <button
                disabled={isPending}
                className="flex w-full justify-center rounded-md bg-amber-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
              >
                {isPending ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <NavLink
              to="/signup"
              className="font-semibold leading-6 text-amber-500 hover:text-amber-600"
            >
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginV2;
