import type { AddressForm } from "./AddressModal";

export type CarouselApi = {
  scrollNext: () => void;
};

export type Category = {
  id: string | number;
  category_name: string;
};

export type CategoriesResponse = {
  categories: Category[];
};



export type OrderItem = {
  id: number;
  quantity: number;
  price: string;
  product: {
    name: string;
  };
};

export type Order = {
  id: number;
  total_amount: string;
  status: "PAID" | "PENDING" | "CANCELLED";
  created_at: string;
  items: OrderItem[];
};

export type AddressModalProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (data: AddressForm) => void;
  onUpdate?: (id: number, data: AddressForm) => void;
  initialData?: any;
};

export type AddressListProps = {
  addresses: any[];
  user: any;
  onEdit: (addr: any) => void;
  onDelete: (id: number) => void;
};