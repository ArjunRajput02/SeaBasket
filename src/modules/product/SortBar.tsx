type Props = {
  setSort: (val: string) => void;
};

export default function SortBar({ setSort }: Props) {
  return (
    <select onChange={(e) => setSort(e.target.value)}>
      <option value="">Sort</option>
      <option value="low">Price Low → High</option>
      <option value="high">Price High → Low</option>
    </select>
  );
}
