import { useState } from "react";

const categories = [
  { name: "Electronics", icon: "/seaBasket.png" },
  { name: "Clothing", icon: "/seaBasket.png" },
  { name: "Home", icon: "/seaBasket.png" },
  { name: "Toys", icon: "/seaBasket.png" },
  { name: "Fresh", icon: "/seaBasket.png" },
  { name: "Groceries", icon: "/seaBasket.png" },
  { name: "Mobiles", icon: "/seaBasket.png" },
  { name: "Beauty", icon: "/seaBasket.png" },
  { name: "Fashion", icon: "/seaBasket.png" },
];

export default function CategoryNav() {
  const [active, setActive] = useState("");

  return (
    <div className="border-b bg-white">
      <div className="flex items-center gap-6 px-6 py-3 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActive(cat.name)}
            className={`flex items-center gap-2 pb-2 whitespace-nowrap text-sm font-medium transition
            ${
              active === cat.name
                ? "text-black-400 border-b-2 border-orange-600"
                : "text-gray-600 hover:text-black"
            }`}
          >
            <img src={cat.icon} alt={cat.name} className="w-5 h-5" />
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
