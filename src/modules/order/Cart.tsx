import Header from "@/components/layout/Header";
import CartItem from "./CartItem";
import { useCart } from "@/hooks/useAddtoCart";


export default function Cart() {
  const { data } = useCart();
  return (
    <>
      <Header />
      <div className="space-y-4">
        {data?.cart?.map((item) => (
          <CartItem
            id={item.product.id}
            name={item.product.name}
            price={Number(item.product.price)}
            image={item.product.images?.[0]?.image_url}
            quantity={item.quantity}
          />
        ))}
      </div>
    </>
  );
}
