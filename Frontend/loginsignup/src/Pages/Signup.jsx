import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import axios from "axios";

export default function Signup() {
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerUser = (dataObject) => {
    setError("");
    console.log(dataObject);
    document.getElementById("signupForm").reset();

    let data = JSON.stringify(dataObject);

    console.log(data);

    // Axios Request

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/signup/createnewuser",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.status == 200) {
          //  Show Success Modal
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
        // Show Error Modal
        alert(error);
      });
  };

  return (
    <>
      <div className="flex bg-slate-800 min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Register To Become a New User
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            id="signupForm"
            onSubmit={handleSubmit(registerUser)}
            className="space-y-6"
          >
            {/*FirstName */}
            <Input
              label={"First Name"}
              labelClass={`block text-sm font-medium leading-6 text-white`}
              labelText={"First Name :"}
              type={"text"}
              className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              name="FirstName"
              {...register("FirstName", {
                required: "FirstName is required !",
                validate: {
                  minLength: (v) =>
                    v.length >= 3 ||
                    "The Name should have at least 3 characters",
                  matchPattern: (v) =>
                    /^[a-zA-Z0-9_]+$/.test(v) ||
                    "Please Enter Correct FirstName",
                },
              })}
            />

            {errors.FirstName?.message && (
              <small>{errors.FirstName.message}</small>
            )}
            {/*Middle Name */}
            <Input
              label={"Middle Name"}
              labelClass={`block text-sm font-medium leading-6 text-white`}
              labelText={"Middle Name :"}
              type={"text"}
              className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              name="FullName"
              {...register("MiddleName", {
                required: {
                  value: false,
                },
                validate: {
                  minLength: (v) =>
                    v.length >= 3 ||
                    "The Name should have at least 3 characters",
                  matchPattern: (v) =>
                    /^[a-zA-Z0-9_]+$/.test(v) ||
                    "Please Enter Correct MiddleName",
                },
              })}
            />

            {errors.MiddleName?.message && (
              <small>{errors.MiddleName.message}</small>
            )}

            {/*Last Name */}
            <Input
              label={"Last Name"}
              labelClass={`block text-sm font-medium leading-6 text-white`}
              labelText={"Last Name :"}
              type={"text"}
              className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              name="LastName"
              {...register("LastName", {
                required: "LastName is required !",
                validate: {
                  minLength: (v) =>
                    v.length >= 3 ||
                    "The Name should have at least 3 characters",
                  matchPattern: (v) =>
                    /^[a-zA-Z0-9_]+$/.test(v) ||
                    "Please Enter Correct LastName",
                },
              })}
            />

            {errors.LastName?.message && (
              <small>{errors.LastName.message}</small>
            )}

            <Input
              label={"email"}
              labelClass={`block text-sm font-medium leading-6 text-white`}
              labelText={"Email address :"}
              type={"email"}
              className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              name="email"
              {...register("Email", {
                required: "Email is required !",
                validate: {
                  maxLength: (v) =>
                    v.length <= 50 ||
                    "The email should have at most 50 characters",
                  matchPattern: (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    "Email address must be a valid address",
                },
              })}
            />
            {errors.email?.message && <small>{errors.email.message}</small>}
            <div>
              {/* Password */}

              <div className="mt-2">
                <Input
                  label={"password"}
                  labelClass={`block text-sm font-medium leading-6 text-white`}
                  labelText={"Enter Password"}
                  type={"password"}
                  className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  name="password"
                  {...register("Password", {
                    required: "Password is required !",
                    validate: {
                      maxLength: (v) =>
                        v.length <= 15 ||
                        "The Password should have at most 15 characters",
                      minLength: (v) =>
                        v.length >= 8 ||
                        "The Password should have at least 8 characters",
                    },
                  })}
                />
                {errors.password?.message && (
                  <small>{errors.password.message}</small>
                )}
              </div>

              {/* Phone Number */}

              <div className="mt-2">
                <Input
                  label={"Phone"}
                  labelClass={`block text-sm font-medium leading-6 text-white`}
                  labelText={"Enter Phone"}
                  type={"number"}
                  className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  name="Phone"
                  {...register("Phone", {
                    required: "Phone is required !",
                    valueAsNumber: true,
                    minLength: 10,
                  })}
                />
                {errors.Phone?.message && <small>{errors.Phone.message}</small>}
              </div>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-semibold text-pink-400 hover:text-pink-500"
              >
                Forgot password?
              </a>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
