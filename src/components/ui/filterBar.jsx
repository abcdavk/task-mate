import { SearchIcon, FilterIcon, ChevronDownIcon } from "./icons";

const STATUS_OPTIONS = [
  { value: "all", label: "Semua Status" },
  { value: "active", label: "Belum Selesai" },
  { value: "completed", label: "Selesai" },
];

function FilterBar({ search, onSearchChange, filter, onFilterChange }) {
  return (
    <div className="filter-bar">
      <div className="filter-field">
        <SearchIcon className="filter-field__icon" />
        <input
          type="search"
          className="filter-field__control"
          placeholder="Cari tugas..."
          aria-label="Cari tugas"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filter-field">
        <FilterIcon className="filter-field__icon" />
        <select
          className="filter-field__control"
          aria-label="Filter status tugas"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDownIcon className="filter-field__chevron" />
      </div>


    </div>
  );
}

export default FilterBar;