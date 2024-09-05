/* eslint-disable react/prop-types */
import { UseFormRegister } from "react-hook-form";
interface InputType {
  register: UseFormRegister<any>;
  children: React.ReactNode;
  htmlFor: string;
  type: string;
  name: string;
  value?: string;
  defaultValue?: string;
  isRequired?: boolean;
}
function Input({
  register,
  children,
  htmlFor,
  type,
  name,
  value,
  defaultValue,
}: InputType) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {children}
      </label>
      <div className="mt-2">
        <input
          {...register(`${name}`)}
          type={type}
          defaultValue={defaultValue}
          className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}

export default Input;
