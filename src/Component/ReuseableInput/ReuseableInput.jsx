import React from "react";
import { Controller } from "react-hook-form";

const InputField = ({
  name,
  control,
  label,
  placeholder,
  rules = {},
  type = "text",
  className = ""
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">{label}:</label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              className={`border rounded p-2 w-full ${
                error ? "border-red-500" : "border-gray-300"
              } ${className}`}
            />
            {error && (
              <p className="text-red-500 text-sm">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default InputField;
