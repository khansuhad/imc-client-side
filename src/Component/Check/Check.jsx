import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../ReuseableInput/ReuseableInput"

const Check = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <InputField
        name="username"
        control={control}
        className="bg-red-700 text-red-400"
        label="Username"
        placeholder="Enter your username"
        rules={{ required: "Username is required" }}
      />

      <InputField
        name="email"
        control={control}
        label="Email"
        type="email"
        placeholder="Enter your email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid password address",
          },
        }}
      />

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default Check;
