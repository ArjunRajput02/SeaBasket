import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export default function Header() {
  const navigate = useNavigate();
  const sessionToken = useSelector(
    (state: RootState) => state.auth.sessionToken
  );

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:px-8">
        <div
          className="flex items-center cursor-pointer flex-shrink-0"
          onClick={() => navigate("/")}
        >
          <img
            src="/seaBasket.png"
            alt="SeaBasket Logo"
            className="h-10 w-10 md:h-12 md:w-12"
          />
          <span className="text-lg md:text-xl font-semibold tracking-wide ml-2">
            SeaBasket
          </span>
        </div>

        <div className="flex-1 mx-4 max-w-xl">
          <input
            type="text"
            placeholder="Search Items"
            className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-sm md:text-base"
          />
        </div>

        <div className="flex items-center space-x-3 md:space-x-5 flex-shrink-0">
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <img src="/cart.png" alt="Cart" className="h-6 w-6 md:h-7 md:w-7" />
          </div>

          {sessionToken ? (
            <img
              src="/profile.png"
              alt="Profile"
              className="h-7 w-7 md:h-8 md:w-8 rounded-full cursor-pointer"
            />
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
