import type { SortBarProps } from "./productType";

export default function SortBar({ setSort }: SortBarProps) {
  return (
    <select
      onChange={(e) => setSort(e.target.value)}
      className="border px-2 py-1 rounded-md text-sm"
    >
      <option value="">Sort</option>
      <option value="low">Price Low → High</option>
      <option value="high">Price High → Low</option>
      <option value="name-asc">Name A → Z</option>
      <option value="name-desc">Name Z → A</option>
    </select>
  );
}
