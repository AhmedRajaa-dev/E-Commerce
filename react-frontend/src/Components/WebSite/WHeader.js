import logo from "../../Assits/logo (2).png";
import {
  faCartArrowDown,
  faCircleUser,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function WHeader() {
  return (
    <nav className="w-full h-24 fixed top-0 border-b border-gray-100 z-50 shadow-sm bg-white content-center">
      <div className="max-w-7xl h-10 mx-auto px-4 flex items-center justify-between ">
        {/* Logo Section */}
        <div className="flex-shrink-0 cursor-pointer">
          <img src={logo} alt="logo" className="w-32 h-auto" />
        </div>
        {/* Search Bar*/}
        <div className="flex grow max-w-2xl hidden md:block">
          <form className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              className="block w-full p-2.5 ps-10 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Search Products..."
              required
            />
            <button
              type="submit"
              className="absolute end-2 bottom-1.5 bg-black text-white hover:bg-gray-800 font-medium rounded-md text-xs px-4 py-1.5 transition-colors"
            >
              بحث
            </button>
          </form>
        </div>
        {/* Icons Section */}
        <div className="flex items-center gap-8">
          <FontAwesomeIcon
            className=" w-8 h-8 cursor-pointer"
            icon={faCartArrowDown}
          />
          <FontAwesomeIcon
            className=" w-7 h-7 cursor-pointer"
            icon={faCircleUser}
          />
          <button className="md:hidden">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>ّ
    </nav>
  );
}
