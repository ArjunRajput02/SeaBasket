import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export default function Header() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();
  
  
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        <div className="flex items-center cursor-pointer">
          <img
            src="/seaBasket.png"
            alt="SeaBasket Logo"
            className="h-12 w-12"
          />
          <span className="text-xl font-semibold tracking-wide ml-2">
            SeaBasket
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <input
            type="text"
            placeholder="Search"
            className="hidden md:block px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-orange-500 bg-white"
          />
          <img
            src="/profile.png"
            alt="Profile"
            className="h-8 w-8 rounded-full cursor-pointer"
          />
          <div className="relative cursor-pointer">
            <img src="/cart.png" alt="Cart" className="h-7 w-7" />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>

          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-sm font-medium border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white transition"
          >
            Login
          </button>
        </div>
      </div>
    </header>
  );
}
