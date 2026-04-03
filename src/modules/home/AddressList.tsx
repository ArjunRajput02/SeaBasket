import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type{ AddressListProps } from "./homeType";



export default function AddressList({
  addresses,
  user,
  onEdit,
  onDelete,
}: AddressListProps) {
  if (addresses.length === 0) {
    return <p className="text-sm text-gray-500">No addresses added yet.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {addresses.map((addr) => (
        <div
          key={addr.id}
          className="border rounded-lg p-4 flex justify-between items-start"
        >
          <div>
            <p className="font-semibold">
              {user?.first_name} {user?.last_name}
            </p>

            <p className="text-sm text-gray-600">{addr.address}</p>
            <p className="text-sm text-gray-600">
              {addr.city}, {addr.state} - {addr.pincode}
            </p>
            <p className="text-sm text-gray-600">{user?.phone}</p>

            {addr.isDefault && (
              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded mt-1 inline-block">
                Default
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(addr)}
              className="text-blue-500 hover:text-blue-600 transition"
            >
              <Pencil className="h-4 w-4" />
            </button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="text-red-500 hover:text-red-600 transition">
                  <Trash2 className="h-4 w-4" />
                </button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Address?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently remove your address.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>

                  <AlertDialogAction
                    onClick={() => onDelete(addr.id)}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ))}
    </div>
  );
}