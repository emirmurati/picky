import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import axios from 'axios';
import Input from '../components/Input';

function RegistrationValidation() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (obj) => {
      const res = await axios.patch(
        `https://motion.propulsion-home.ch/backend/api/auth/registration/validation`,
        obj,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      return res.data;
    },
    onSuccess: () => navigate('/login'),
  });

  function onSubmit(data) {
    mutate(data);
  }
  error;
  if (isPending) return <Loader />;

  return (
    <>
      <div className="flex flex-col items-center justify-center pt-16">
        <div>
          <img
            className="mx-auto h-10 w-auto"
            src="/Users/emirmurati/Desktop/luna-frontend/src/assets/svg/logo.svg"
            alt="Your Company"
          />
        </div>

        <h2 className="bg-slate-150 mt-14 w-fit border-b-2 border-solid border-orange-500 text-3xl">
          VERIFICATION
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 grid w-1/3 grid-cols-2 gap-x-4 space-y-6"
        >
          <div className="w-full place-self-end justify-self-start">
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
          <Input htmlFor="code" type="text" register={register} name="code">
            CODE
          </Input>
          <Input
            htmlFor="username"
            type="text"
            register={register}
            name="username"
          >
            USERNAME
          </Input>
          <Input
            htmlFor="location"
            type="text"
            register={register}
            name="location"
          >
            LOCATION
          </Input>
          <Input
            htmlFor="password"
            type="password"
            register={register}
            name="password"
          >
            PASSWORD
          </Input>
          <Input
            htmlFor="password_repeat"
            type="password"
            register={register}
            name="password_repeat"
          >
            REPEAT PASSWORD
          </Input>
          <Input
            htmlFor="first_name"
            type="text"
            register={register}
            name="first_name"
          >
            FIRST NAME
          </Input>
          <Input
            htmlFor="last_name"
            type="text"
            register={register}
            name="last_name"
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
            ''
          )}
          <button className="col-span-2 cursor-pointer place-self-center justify-self-center rounded-xl bg-amber-500 px-8 py-2 text-white hover:bg-amber-600">
            {isPending ? 'Finishing Registration...' : 'Finish Registration'}
          </button>
        </form>
      </div>
    </>
  );
}

export default RegistrationValidation;
