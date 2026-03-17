type Props = {
  filters: any;
  setFilters: (val: any) => void;
};

export default function Filters({ filters, setFilters }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <p>Price Range</p>
        <input
          type="number"
          placeholder="Min"
          onChange={(e) =>
            setFilters({ ...filters, minPrice: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Max"
          onChange={(e) =>
            setFilters({ ...filters, maxPrice: Number(e.target.value) })
          }
        />
      </div>

      <div>
        <p>Rating</p>
        <select
          onChange={(e) =>
            setFilters({ ...filters, rating: Number(e.target.value) })
          }
        >
          <option value={0}>All</option>
          <option value={4}>4+</option>
          <option value={3}>3+</option>
        </select>
      </div>

      <div>
        <p>Discount</p>
        <select
          onChange={(e) =>
            setFilters({ ...filters, discount: Number(e.target.value) })
          }
        >
          <option value={0}>All</option>
          <option value={10}>10%+</option>
          <option value={20}>20%+</option>
        </select>
      </div>
    </div>
  );
}