interface SortButtonProps {
  sortOrder: string;
  onToggle: () => void;
}

function SortButton({ sortOrder, onToggle }: SortButtonProps) {
  return (
    <div className="mb-3">
      <button className="btn btn-outline-secondary" onClick={onToggle}>
        Sort by Title{" "}
        {sortOrder === "asc" ? "A→Z" : sortOrder === "desc" ? "Z→A" : ""}
      </button>
    </div>
  );
}

export default SortButton;
