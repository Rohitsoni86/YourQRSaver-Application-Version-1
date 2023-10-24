import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, NavLink } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AiFillCodeSandboxCircle } from "react-icons/ai";

export default function Navbar({ checkUserLog, logoutUser }) {
  const navigate = useNavigate();

  console.log(checkUserLog);

  let Links = [
    { name: "Home", link: "/Home" },
    { name: "Generate New QR", link: "/generatenewqrcodes" },
    { name: "Saved QR", link: "/savedqrcodes" },
    { name: "Contact", link: "/contact" },
  ];

  let [open, setOpen] = useState(false);

  const makeLogout = () => {
    localStorage.clear();
    logoutUser(false);
    navigate("/login");
  };

  return (
    <div className="shadow-md z-10 w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-black text-white py-4 md:px-10 px-7 ">
        <Link
          to="/"
          className="font-bold text-2xl cursor-pointer hover:text-red-600 font-[Poppins] 
      text-gray-300"
        >
          YourQRSaver
        </Link>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer text-white md:hidden"
        >
          {open ? (
            <MdClose className="text-white" />
          ) : (
            <GiHamburgerMenu className="text-white" />
          )}
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 absolute md:static  md:z-auto z-[-1] left-0 w-full bg-black md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-18" : "top-[-490px]"
          }`}
        >
          {checkUserLog ? (
            Links.map((link) => (
              <li
                key={link.name}
                className="md:ml-8 hover:underline  text-xl md:my-0 my-7"
              >
                <NavLink
                  to={link.link}
                  className="text-gray-800 hover:text-gray-400 duration-500"
                >
                  {link.name}
                </NavLink>
              </li>
            ))
          ) : (
            <>
              <li className="md:ml-8 hover:underline  text-xl md:my-0 my-7">
                <NavLink
                  to="/login"
                  className="text-gray-800 hover:text-gray-400 duration-500"
                >
                  Login
                </NavLink>
              </li>
              <li className="md:ml-8 hover:underline  text-xl md:my-0 my-7">
                <NavLink
                  to="/signup"
                  className="text-gray-800 hover:text-gray-400 duration-500"
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
        </ul>
        {/* Logout Button*/}

        {checkUserLog ? (
          <>
            {" "}
            <button
              onClick={makeLogout}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ms-32 md:ms-0"
            >
              Logout
            </button>
          </>
        ) : null}

        {/* Logout Button*/}
      </div>
    </div>
  );
}
