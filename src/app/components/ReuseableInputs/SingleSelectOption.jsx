import React from "react";
import { Controller } from "react-hook-form";

const SingleSelect = ({
  name,
  control,
  label,
  options,
  rules = {},
  placeholder = "Select an option",
  className ="",
  onChange,
  defaultValue
}) => {
  return (
    <div className="mb-4 ">
      <label className="block font-semibold text-lg">{label}:</label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <select
              {...field}
              onChange={(e) => {
                // Call the custom onChange handler if provided
                if (onChange) {
                  onChange(e); // Pass the event to the custom handler
                }
                // Call react-hook-form's onChange to update the form state
                field.onChange(e);
              }}
              className={`border p-2 w-full  border-orange-700 bg-white rounded-lg px-4 py-4 mt-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                error ? "border-red-500" : "border-gray-300"
              } ${className}`}
            >
              <option value="" disabled>{placeholder}</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error && (
              <p className="text-red-500 text-sm">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default SingleSelect;
