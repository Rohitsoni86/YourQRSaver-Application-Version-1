import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Home() {
  const [tokenF, setTokenF] = useState(null);

  // Store Data

  const [dataF, setDataF] = useState(null);

  // GET TOKEN
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("Token"));
    console.log(token);
    setTokenF(token);
    fetchData(token);
  }, []);

  // FETCH DATA

  const fetchData = (localtoken) => {
    let data = "";
    console.log(localtoken);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/getuserdetails",
      headers: { token: localtoken, "Content-Type": "application/json" },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));

        let dataR = JSON.parse(JSON.stringify(response.data));

        console.log(dataR);

        setDataF(dataR);
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message == "Network Error") {
          alert("Please Check Your Internet Connection !");
        }
      });
  };

  return (
    <>
      {dataF && (
        <div className="flex flex-col justify-center items-center h-[100vh]">
          <div className="relative flex flex-col items-center rounded-[20px] md:w-[400px] mx-auto p-4 bg-pink-300 bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
            <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
              <img
                src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png"
                className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
              />
              <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                <img
                  className="h-full w-full rounded-full"
                  src={dataF.ProfilePhoto}
                  alt="Profile Photo"
                />
              </div>
            </div>
            <div className="mt-16 flex flex-col items-center">
              <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                {dataF.FirstName.toUpperCase()} {dataF.LastName.toUpperCase()}
              </h4>
              <p className="text-base font-normal text-gray-600">
                {dataF.UserLoginId}
              </p>
            </div>
            <div className="mt-6 mb-3 flex flex-wrap justify-between gap-14 md:!gap-14">
              <div className="flex flex-col items-center justify-center">
                <p className="text-sm font-normal text-gray-600">
                  <span className="text-md font-bold text-black">Email :</span>{" "}
                  {dataF.Email}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-sm font-normal text-gray-600">
                  <span className="text-md font-bold text-black">Role:</span>{" "}
                  {dataF.Role}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-sm font-normal text-gray-600">
                  <span className="text-md font-bold text-black">
                    Nationality :
                  </span>{" "}
                  {dataF.Nationality}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-sm font-normal text-gray-600">
                  <span className="text-md font-bold text-black">Phone :</span>{" "}
                  {dataF.Phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
