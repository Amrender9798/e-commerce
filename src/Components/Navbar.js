import React from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineLogin,
  AiOutlineShoppingCart,
  AiOutlineSearch,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { searchFilter } from "../Redux/slices/productSlice";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("token");
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSearch = (event) => {
    // Handle search functionality here
    const searchTerm = event.target.value;
    dispatch(searchFilter(searchTerm));

    // Implement your search logic using the searchTerm
  };
  const isHomePage = location.pathname === "/";
  const paddingY = isHomePage ? "py-4" : "py-5";
  return (
    <nav
      className={`bg-gray-800 px-5 ${paddingY} flex justify-between items-center`}
    >
      {/* Left Side - Logo */}
      <div className="text-white font-bold text-xl mr-4">YourLogo</div>

      {/* Center - Search Bar */}
      {isHomePage && (
        <div className="text-white  w-[40vw] flex justify-end">
          <div className="relative text-gray-600 focus-within:text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <AiOutlineSearch size={20} />
            </span>
            <input
              type="text"
              className="py-2 pl-8 pr-40 rounded-md bg-white text-gray-800 focus:outline-none"
              placeholder="Search..."
              onChange={handleSearch}
            />
          </div>
        </div>
      )}

      {/* Right Side - Navigation Links */}
      <div className="flex space-x-10 items-center">
        <a href="/" className="text-white flex items-center">
          <AiOutlineHome size={25} className="mr-1" />
          Home
        </a>
        <a href="/order" className="text-white flex items-center">
          <AiOutlineShopping size={25} className="mr-1" />
          My Orders
        </a>
        <a href="/cart" className="text-white flex items-center">
          <AiOutlineShoppingCart size={25} className="mr-1" />
          Cart
        </a>

        {isLoggedIn ? (
          <a
            href="/"
            className="text-white flex items-center"
            onClick={() => localStorage.removeItem("token")}
          >
            <AiOutlineLogout size={25} className="mr-1" />
            Sign Out
          </a>
        ) : (
          <a href="/sign-in" className="text-white flex items-center">
            <AiOutlineLogin size={20} className="mr-1" />
            Sign In
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
