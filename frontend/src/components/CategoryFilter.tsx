import { useEffect, useState } from "react";
import { fetchCategories } from "../api/ProjectAPICalls";

function CategoryFilter(
  { selectedCategories, setSelectedCategories }:
  { selectedCategories: string[]; setSelectedCategories: (categories: string[]) => void }
) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    loadCategories();
  }, []);

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((cat) => cat !== target.value)
      : [...selectedCategories, target.value];
    setSelectedCategories(updatedCategories);
  }

  return (
    <>
      {/* Trigger button */}
      <button
        className="btn btn-outline-secondary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#categoryOffcanvas"
      >
        <span className="me-2">☰</span>
        Filter by Category
        {selectedCategories.length > 0 && (
          <span className="badge bg-primary ms-2">{selectedCategories.length}</span>
        )}
      </button>

      {/* Offcanvas panel */}
      <div
        className="offcanvas offcanvas-start"
        id="categoryOffcanvas"
        tabIndex={-1}
        aria-labelledby="categoryOffcanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="categoryOffcanvasLabel">
            Filter by Category
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          {selectedCategories.length > 0 && (
            <button
              className="btn btn-sm btn-outline-danger w-100 mb-3"
              onClick={() => setSelectedCategories([])}
            >
              Clear all filters
            </button>
          )}
          {categories.map((category) => (
            <div key={category} className="form-check mb-2">
              <input
                type="checkbox"
                className="form-check-input"
                id={category}
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor={category}>
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoryFilter;
