import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import type { RootState } from "@/store/store";
import { useCart } from "@/hooks/useAddtoCart";
import { useDebounce } from "@/hooks/useDebounce";

export default function Header() {
  const navigate = useNavigate();
  const { data } = useCart();
  const sessionToken = useSelector(
    (state: RootState) => state.auth.sessionToken,
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const reduxCartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const apiCartCount =
    data?.cart?.reduce(
      (total: number, item: any) => total + item.quantity,
      0,
    ) || 0;

  const cartCount = sessionToken ? apiCartCount : reduxCartCount;

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedQuery = useDebounce(searchQuery, 400);
  useEffect(() => {
    const trimmed = debouncedQuery.trim();

    if (!trimmed) {
      navigate;
      return;
    }

    navigate(`/products?name=${encodeURIComponent(trimmed)}`);
  }, [debouncedQuery, navigate]);

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

        <div className="hidden md:flex flex-1 mx-4 max-w-xl relative">
          <input
            type="text"
            placeholder="Search Items"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 pr-10"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer hover:text-orange-500 transition" />
        </div>

        <button
          className="flex md:hidden items-center justify-center p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
          onClick={() => setShowSearch(!showSearch)}
          aria-label="Toggle search"
        >
          <Search className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex items-center space-x-3 md:space-x-5 flex-shrink-0">
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <img src="/cart.png" alt="Cart" className="h-6 w-6 md:h-7 md:w-7" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] md:text-xs font-semibold rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </div>

          {sessionToken ? (
            <img
              src="/profile.png"
              alt="Profile"
              className="h-7 w-7 md:h-8 md:w-8 rounded-full cursor-pointer"
              onClick={() => navigate("/profile")}
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

      {showSearch && (
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Items"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 pr-10"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer hover:text-orange-500 transition" />
          </div>
        </div>
      )}
    </header>
  );
}
