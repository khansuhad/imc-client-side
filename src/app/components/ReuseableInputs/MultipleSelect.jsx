import React from "react";
import { Controller } from "react-hook-form";

const MultiSelect = ({
  name,
  control,
  label,
  options,
  rules = {},
  placeholder = "Select options",
  className = "",
}) => {
  return (
    <div className="mb-4">
      <label className="block font-semibold text-lg">{label}:</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <>
            <select
              multiple
              value={value || []} // Ensure value is an array
              onChange={(e) =>
                onChange(Array.from(e.target.selectedOptions, (option) => option.value))
              }
              className={`border p-2 w-full border-gray-700 bg-gray-900 rounded-lg px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                error ? "border-red-500" : "border-gray-300"
              } ${className}`}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};

export default MultiSelect;
