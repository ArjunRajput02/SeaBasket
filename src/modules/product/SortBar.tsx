import type { SortBarProps } from "./productType";

export default function SortBar({ setSort }: SortBarProps) {
  return (
    <select onChange={(e) => setSort(e.target.value)}>
      <option value="">Sort</option>
      <option value="low">Price Low → High</option>
      <option value="high">Price High → Low</option>
    </select>
  );
}
