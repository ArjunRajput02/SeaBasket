import type { FilterTypeProps } from "./productType";

export default function Filters({ filters, setFilters }: FilterTypeProps) {
  return (
    <div className="p-3 bg-white rounded-xl shadow-sm space-y-3 w-64">
      <div>
        <p className="text-sm font-medium mb-1">Price</p>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-full border rounded-md px-2 py-1 text-sm"
            onChange={(e) =>
              setFilters({
                ...filters,
                minPrice: e.target.value ? Number(e.target.value) : 0,
              })
            }
          />
          <input
            type="number"
            placeholder="Max"
            className="w-full border rounded-md px-2 py-1 text-sm"
            onChange={(e) =>
              setFilters({
                ...filters,
                maxPrice: e.target.value ? Number(e.target.value) : 0,
              })
            }
          />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-1">Rating</p>
        <div className="flex gap-2 flex-wrap">
          {[4, 3].map((r) => (
            <button
              key={r}
              className={`px-2 py-1 text-xs rounded-md border ${
                filters.rating === r ? "bg-black text-white" : "bg-white"
              }`}
              onClick={() => setFilters({ ...filters, rating: r })}
            >
              {r}+
            </button>
          ))}
          <button
            className="px-2 py-1 text-xs rounded-md border"
            onClick={() => setFilters({ ...filters, rating: 0 })}
          >
            All
          </button>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium mb-1">Discount</p>
        <div className="flex gap-2 flex-wrap">
          {[10, 20].map((d) => (
            <button
              key={d}
              className={`px-2 py-1 text-xs rounded-md border ${
                filters.discount === d ? "bg-black text-white" : ""
              }`}
              onClick={() => setFilters({ ...filters, discount: d })}
            >
              {d}+
            </button>
          ))}
          <button
            className="px-2 py-1 text-xs rounded-md border"
            onClick={() => setFilters({ ...filters, discount: 0 })}
          >
            All
          </button>
        </div>
      </div>
    </div>
  );
}
