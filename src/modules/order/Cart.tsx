import Header from "@/components/layout/Header";
import CartItem from "./CartItem";
import { useCart } from "./useCart";

export default function Cart() {
  const { data } = useCart();
  return (
    <>
      <Header />
      <div className="space-y-4">
        {data?.cart?.map((item: any) => (
          <CartItem
            key={item.id}
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
