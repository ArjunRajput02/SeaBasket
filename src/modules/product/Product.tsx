import { useNavigate } from "react-router-dom";
import type { Product } from "./productType";



export default function ProductCard({ product }: { product:  Product}) {
  const navigate = useNavigate();

  return (
    <div
      className="p-4 border rounded-xl cursor-pointer hover:shadow"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <img src={product.image} className="w-full h-40 object-cover" />
      <h2 className="font-semibold mt-2">{product.name}</h2>
      <p>₹{product.price}</p>
      <p> {product.rating}</p>
    </div>
  );
}