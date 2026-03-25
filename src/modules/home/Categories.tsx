import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useCategories } from "../../hooks/useTrendingProduct";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Categories() {
  const { data } = useCategories();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const activeCategory = params.get("categoryId");

  return (
    <div className="border-b bg-white w-full">
      <div className="overflow-x-auto scrollbar-hide w-full">
        <NavigationMenu className="max-w-none w-full justify-start">
          <NavigationMenuList className="flex gap-6 px-6 py-3 flex-nowrap min-w-max justify-start m-0">
            {data?.categories?.map((cat) => (
              <NavigationMenuItem key={cat.id} className="list-none">
                <button
                  onClick={() => navigate(`/products?categoryId=${cat.id}`)}
                  className={`pb-2 whitespace-nowrap text-sm font-medium transition
                    ${
                      activeCategory === String(cat.id)
                        ? "text-black border-b-2 border-orange-600"
                        : "text-gray-600 hover:text-black"
                    }`}
                >
                  {cat.category_name}
                </button>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
