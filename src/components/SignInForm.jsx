import { z } from "zod";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {Link} from "react-router-dom"

import { StyledInput, FormError } from "./StyledFormComponents";

const signInLabels = ["email", "password"];

const signInSchema = z
  .object({
    identifier: z.union([
      z
        .string()
        .regex(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Invalid email"
        )
        .nonempty("Field can't be empty"),
      z
        .string()
        .regex(/^[0-9]{10}$/, "Invalid phone number")
        .nonempty("Field can't be empty"),
    ]),

    password: z.string().nonempty("Password cannot be empty"),
  })
  .strict();

const SignInForm = () => {
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="absolute top-20 flex flex-col gap-4 p-16 bg-black bg-opacity-75
 w-1/3"
    >
      <h1 className="text-3xl text-white font-bold mb-3">{"Sign In"}</h1>

      {Object.keys(errors).length > 0 && (
        <div className="bg-yellow-600 p-4">
          {signInLabels.map((label, idx) => {
            return errors[label] ? (
              <FormError>{errors[label].message}</FormError>
            ) : null;
          })}
        </div>
      )}

      <StyledInput
        type="text"
        placeholder="Email or mobile number"
        {...register("identifier")}
      />

      <StyledInput
        type="password"
        placeholder="password"
        {...register("password")}
      />

      <button className="bg-red-600 text-white font-semibold py-2 px-4 rounded-md">
        {"Sign In"}
      </button>

      <span className="text-slate-300">
        {"New to Netflix?"}{" "}
        <Link  to={"/signup"} className="cursor-pointer hover:underline text-white">
          {"Sign up Now"}
        </Link>
      </span>
    </form>
  );
};

export default SignInForm;