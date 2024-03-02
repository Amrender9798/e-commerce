import { NavLink } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineLogin,
  AiOutlineShoppingCart,
  AiOutlineSearch,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { searchFilter } from "../Redux/slices/productSlice";
import { useLocation } from "react-router-dom";
import { logoutUser, selectAuth } from "../Redux/slices/authenticationSlice";

const Navbar = () => {
  const { success } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    dispatch(searchFilter(searchTerm));
  };

  const isHomePage = location.pathname === "/";
  const paddingY = isHomePage ? "py-4" : "py-5";

  const activeClassName = "border-b-2 border-white"; // Add your active link style

  return (
    <nav
      className={`bg-gray-800 px-5 ${paddingY} flex justify-between items-center`}
    >
      {/* Left Side - Logo */}
      <div className="text-white font-bold text-xl mr-4">Digital Den</div>

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
        <NavLink
          to="/"
          className={`text-white flex items-center ${
            location.pathname === "/" ? activeClassName : ""
          }`}
        >
          <AiOutlineHome size={25} className="mr-1" />
          Home
        </NavLink>
        <NavLink
          to="/order"
          className={`text-white flex items-center ${
            location.pathname === "/order" ? activeClassName : ""
          }`}
        >
          <AiOutlineShopping size={25} className="mr-1" />
          My Orders
        </NavLink>
        <NavLink
          to="/cart"
          className={`text-white flex items-center ${
            location.pathname === "/cart" ? activeClassName : ""
          }`}
        >
          <AiOutlineShoppingCart size={25} className="mr-1" />
          Cart
        </NavLink>

        {success ? (
          <a
            href="/"
            className="text-white flex items-center"
            onClick={() => dispatch(logoutUser())}
          >
            <AiOutlineLogout size={25} className="mr-1" />
            Sign Out
          </a>
        ) : (
          <NavLink
            to="/sign-in"
            className={`text-white flex items-center ${
              location.pathname === "/sign-in" ? activeClassName : ""
            }`}
          >
            <AiOutlineLogin size={20} className="mr-1" />
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
