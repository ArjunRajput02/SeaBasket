import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export default function Header() {
  const navigate = useNavigate();


  const sessionToken = useSelector(
    (state: RootState) => state.auth.sessionToken
  );

  return (
    <header className="w-full bg-white shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 md:px-10">
        <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
          <img
            src="/seaBasket.png"
            alt="SeaBasket Logo"
            className="h-16 w-16"
          />
          <span className="text-2xl font-bold text-gray-800 ml-2 hidden md:block">
            SeaBasket
          </span>
        </div>

        <div className="flex-1 max-w-lg mx-6 hidden md:flex">
          <input
            type="text"
            placeholder="Search Items"
            className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-l-lg focus:outline-none focus:border-orange-500 bg-orange-50"
          />
        </div>

        <div className="flex items-center space-x-4">
          {sessionToken ? (
            <>
              <img
                src="/profile.png"
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-medium"
            >
              Login
            </button>
          )}

          <div className="relative">
            <img src="/cart.png" alt="Cart" className="h-8 w-8" />
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden px-6 pb-4">
        <input
          type="text"
          placeholder="Search Items"
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 bg-orange-50"
        />
      </div>
    </header>
  );
}