import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../api';  // Import the API function

const QuizFilters = ({ difficulty, setDifficulty, category, setCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the backend on component mount
    const fetchCategoriesData = async () => {
      try {
        const response = await fetchCategories();  // Call the imported function
        setCategories(response.data);  // Update the categories state
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategoriesData();
  }, []);  // Only run on component mount

  return (
    <div className="filters">
      <select onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
        <option value="">All Difficulties</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="">All Categories</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
};

export default QuizFilters;
