export default function Header() {
  return (
    <header className="w-full bg-white shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 md:px-10">
        <div className="flex items-center cursor-pointer">
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
          <img
            src="/profile.png"
            alt="Profile"
            className="h-8 w-8 rounded-full"
          />

          <div className="relative">
            <img src="/cart.png" alt="Cart" className="h-8 w-8" />
          </div>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-medium">
            Login
          </button>
        </div>
      </div>
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
