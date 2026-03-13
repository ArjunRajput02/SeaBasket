import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useState } from "react";

const categories = [
  { name: "Electronics" },
  { name: "Clothing" },
  { name: "Home" },
  { name: "Toys" },
  { name: "Fresh" },
  { name: "Groceries" },
  { name: "Mobiles" },
  { name: "Beauty" },
  { name: "Fashion" },
];

export default function CategoryNav() {
  const [active, setActive] = useState("");

  return (
    <div className="border-b bg-white">
      <NavigationMenu className="max-w-full">
        <NavigationMenuList className="flex gap-6 px-6 py-3 overflow-x-auto">
          {categories.map((cat) => (
            <NavigationMenuItem key={cat.name}>
              <button
                onClick={() => setActive(cat.name)}
                className={`pb-2 whitespace-nowrap text-sm font-medium transition
                ${
                  active === cat.name
                    ? "text-black border-b-2 border-orange-600"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {cat.name}
              </button>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
