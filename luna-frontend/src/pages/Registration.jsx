import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
// import { useNavigate } from 'react-router-dom';
import Loader from "../components/Loader";
import axios from "axios";
import Input from "../components/Input";
import SuccessRegistration from "../components/SuccessRegistration";
import Logo from "../assets/img/pickyy.png";

function Registration() {
  // const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: async (obj) => {
      const res = await axios.post(`/api/v1/users/signup`, obj);

      return res.data;
    },
    // onSuccess: () => navigate('/login'),
  });

  function onSubmit(data) {
    mutate(data);

    if (isPending) return <Loader />;

    return (
      <>
        {isSuccess ? (
          <SuccessRegistration />
        ) : (
          <div className="flex flex-col items-center justify-center pt-16">
            {/* <div>
            <img
              className="mx-auto h-10 w-auto"
              src="/Users/emirmurati/Desktop/luna-frontend/src/assets/svg/logo.svg"
              alt="Your Company"
            />
          </div> */}
            <div>
              <img src={Logo} className="w-20" />
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid lg:w-4/6 md:w-4/6 p-10 lg:grid-cols-2  md:grid-cols-2 sm:grid-cols-1 gap-4 mt-10 space-y-8  pb-12"
            >
              <div className="self-end">
                <Input
                  htmlFor="email"
                  type="text"
                  register={register}
                  name="email"
                  isRequired={true}
                >
                  EMAIL
                </Input>
              </div>
              {/* <Input htmlFor="code" type="text" register={register} name="code">
            CODE
          </Input> */}
              <Input
                htmlFor="username"
                type="text"
                register={register}
                name="username"
              >
                USERNAME
              </Input>
              {/* <Input
              htmlFor="location"
              type="text"
              register={register}
              name="location"
            >
              LOCATION
            </Input> */}
              <Input
                htmlFor="password"
                type="password"
                register={register}
                name="password"
              >
                PASSWORD
              </Input>
              <Input
                htmlFor="passwordConfirm"
                type="password"
                register={register}
                name="passwordConfirm"
              >
                REPEAT PASSWORD
              </Input>
              <Input
                htmlFor="firstName"
                type="text"
                register={register}
                name="firstName"
              >
                FIRST NAME
              </Input>
              <Input
                htmlFor="lastName"
                type="text"
                register={register}
                name="lastName"
              >
                LAST NAME
              </Input>

              {isError ? (
                <p className="text-red-500">
                  {error?.response?.data?.non_field_errors ||
                    error?.response?.data?.code ||
                    error?.response?.data?.email}
                </p>
              ) : (
                ""
              )}
              <button
                type="submit"
                className="col-span-2 cursor-pointer place-self-center justify-self-center rounded-xl bg-amber-500 px-8 py-2 text-white hover:bg-amber-600"
              >
                {isPending
                  ? "Finishing Registration..."
                  : "Finish Registration"}
              </button>
            </form>
          </div>
        )}
      </>
    );
  }
}

export default Registration;
