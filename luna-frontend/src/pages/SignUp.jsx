import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import Loader from '../components/Loader';
import axios from 'axios';
import Input from '../components/Input';
import toast from 'react-hot-toast';
import SuccessRegistration from '../components/SuccessRegistration';

function SignUp() {
  const { register, handleSubmit } = useForm();
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: async (email) => {
      await axios.post(
        `https://motion.propulsion-home.ch/backend/api/auth/registration/`,
        email,
      );
    },
    onSuccess: () => {
      toast.success('Great! another step before signing up ');
    },
    onError: () => {
      toast.error('Oh no... please try again :(');
    },
  });

  function onSubmit(data) {
    mutate(data);
  }
  if (isPending) return <Loader />;

  return (
    <>
      {isSuccess ? (
        <SuccessRegistration />
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="src/assets/svg/logo.svg"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign a new account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                htmlFor="email"
                type="text"
                register={register}
                name="email"
              >
                Email address
              </Input>
              {isError ? (
                <span className="text-red-500">
                  {error?.response.data.email}
                </span>
              ) : null}

              <div>
                <button
                  disabled={isPending}
                  className="flex w-full justify-center rounded-md bg-amber-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?{' '}
              <NavLink
                to="/login"
                className="font-semibold leading-6 text-amber-500 hover:text-amber-600"
              >
                Login
              </NavLink>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUp;
