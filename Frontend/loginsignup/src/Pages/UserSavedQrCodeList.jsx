import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function UserSavedQrCodeList() {
  const [loading, setLoading] = useState(true);
  const [tokenF, setTokenF] = useState(null);

  // Store Data

  const [dataF, setDataF] = useState([]);

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
      url: "http://localhost:3000/getmyqrcodes",
      headers: { token: localtoken, "Content-Type": "application/json" },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));

        let dataR = JSON.parse(JSON.stringify(response.data));

        console.log(dataR);

        setDataF(dataR.List);
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message == "Network Error") {
          alert("Please Check Your Internet Connection !");
        }
      });
  };

  // After fetching Data if Data Comes then map the Data if not come then show nothing

  // DELETING QR CODE

  const deleteQRCode = (objectID) => {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/deleteqrcode/${objectID}`,
      headers: { token: tokenF, "Content-Type": "application/json" },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert(JSON.stringify(response.data));
        fetchData(tokenF);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex flex-wrap gap-10 p-20 justify-center items-center min-h-screen">
        <div className=" border-2 shadow-lg relative flex flex-col rounded-[20px] max-w-[300px]  bg-clip-border shadow-3xl shadow-shadow-500 flex flex-col w-full !p-4 3xl:p-![18px] bg-white undefined">
          <div className="h-full w-full">
            <div className="relative w-full">
              <img
                src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/Nft3.3b3e6a4b3ada7618de6c.png"
                className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
                alt=""
              />
              <button className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer">
                <div className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="32"
                      d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
            <div className="mb-3 flex items-center justify-between px-1 md:items-start">
              <div className="mb-2">
                <p className="text-lg font-bold text-navy-700"> Title </p>
                <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
                  By Esthera Jackson{" "}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center md:items-center  ">
              <button className="linear rounded-[20px] bg-blue-300 w-full px-4 py-2 text-base font-medium text-black transition duration-200 hover:bg-brand-800 active:bg-brand-700">
                Delete
              </button>
            </div>
          </div>
        </div>
        {dataF &&
          dataF.map((elem, index) => {
            return (
              <>
                <div
                  key={elem._id}
                  className="z-5 border-2 shadow-lg relative flex flex-col rounded-[20px] max-w-[300px]  bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px] bg-white undefined"
                >
                  <div className="h-full w-full">
                    <div className="relative w-full">
                      <img
                        src={elem.DataImageURL}
                        className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
                        alt="QR CODE IMAGE"
                      />
                      <button className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer">
                        <div className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 512 512"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="32"
                              d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
                            ></path>
                          </svg>
                        </div>
                      </button>
                    </div>

                    <div className="flex items-center justify-center md:items-center  ">
                      <button
                        onClick={() => deleteQRCode(elem._id)}
                        className="linear rounded-[20px] bg-blue-300 w-full px-4 py-2 text-base font-medium text-black transition duration-200 hover:bg-brand-800 active:bg-brand-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}
