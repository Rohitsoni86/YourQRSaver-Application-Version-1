import React, { useId } from "react";

const Input = React.forwardRef(
  (
    {
      label,
      labelText,
      type = "text",
      labelClass,
      className = "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
      ...props
    },
    ref
  ) => {
    const id = useId();
    return (
      <>
        <div className="mb-6">
          {label && (
            <label
              htmlFor={label}
              className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${labelClass}`}
            >
              {labelText}
            </label>
          )}

          <input
            type={type}
            className={`${className}`}
            ref={ref}
            id={id}
            {...props}
          />
        </div>
      </>
    );
  }
);

export default Input;
