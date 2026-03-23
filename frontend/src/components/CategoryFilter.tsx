import { useEffect, useState } from "react";

function CategoryFilter (
    { selectedCategories, setSelectedCategories }: 
    { selectedCategories: string[]; setSelectedCategories: (categories: string[]) => void }) {

        const [categories, setCategories] = useState<string[]>([]);

        useEffect(() => {
            const fetchCategories = async () => {
                try{
                    const response = await fetch(`https://localhost:5000/api/Books/Categories`);
                    const data = await response.json();
                setCategories(data);
                }
                catch(error) {
                    console.error("Error fetching categories:", error);
                }
            }

            fetchCategories();
        }, []);

        function handleCheckboxChange({target}: {target: HTMLInputElement}) 
        {
            const updatedCategories = selectedCategories.includes(target.value) ? selectedCategories.filter(cat => cat !== target.value) : [...selectedCategories, target.value];

            setSelectedCategories(updatedCategories);
        }

        return (
            <div className="mb-3">
                <h5>Filter by Category</h5>
                {categories.map((category) => (
                    <div key={category} className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id={category}
                            value={category}
                            onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor={category}>
                            {category}
                        </label>
                    </div>
                ))}
            </div>
        );
    }

    export default CategoryFilter;