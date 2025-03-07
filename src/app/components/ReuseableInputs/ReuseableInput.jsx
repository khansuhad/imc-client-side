import React from "react";
import { Controller } from "react-hook-form";

const Input = ({
  name,
  control,
  label,
  placeholder,
  rules = {},
  defaultValue,
  type = "text",
  className = "",
  onChange
}) => {
  return (
    <div className="mb-4">
      <label className="block font-semibold text-lg">{label} :</label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <input
              {...field}
              onChange={(e) => {
                // Call the custom onChange handler if provided
                if (onChange) {
                  onChange(e); // Pass the event to the custom handler
                }
                // Call react-hook-form's onChange to update the form state
                field.onChange(e);
              }}
              type={type}
              placeholder={placeholder}
              className={`p-2 w-full  border border-orange-700 bg-white rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                error ? "border-red-500" : "border-gray-300"
              } ${className}`}
            />
            {error && (
              <p className="text-red-500 text-sm mt-2">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default Input;
