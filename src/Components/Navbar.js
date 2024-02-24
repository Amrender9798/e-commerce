import React from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineLogin,
  AiOutlineShoppingCart,
} from "react-icons/ai";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <nav className="bg-gray-800 p-5 flex justify-between items-center">
      {/* Left Side - Logo */}
      <div className="text-white font-bold text-xl">YourLogo</div>

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
          // If user is logged in, show "Sign Out" link
          <a
            href="/"
            className="text-white flex items-center"
            onClick={() => localStorage.removeItem("token")}
          >
            <AiOutlineLogout size={25} className="mr-1" />
            Sign Out
          </a>
        ) : (
          // If user is not logged in, show "Sign In" link
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
