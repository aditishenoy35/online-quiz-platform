import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../api';  // Import the API function
import { Select, MenuItem, FormControl, InputLabel, Box, IconButton, Menu, Button, Typography } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt'; // MUI filter icon

const QuizFilters = ({ difficulty, setDifficulty, category, setCategory }) => {
  const [categories, setCategories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null); // State to control the Menu visibility

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

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu when the filter icon is clicked
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {/* Filter Icon with Label */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
        <IconButton onClick={handleMenuOpen} color="primary">
          <FilterAltIcon sx={{ fontSize: 30, color: '#4A4A4A' }} />
        </IconButton>
        <Typography variant="body1" sx={{ color: '#4A4A4A', fontWeight: 'bold' }}>
          FILTERS
        </Typography>
      </Box>

      {/* Menu for filter options */}
      <Menu
        anchorEl={anchorEl} // Menu position is relative to the filter icon
        open={Boolean(anchorEl)} // Menu visibility depends on anchorEl state
        onClose={handleMenuClose} // Close the menu when clicked outside
        PaperProps={{
          sx: {
            padding: '10px',
            width: '250px',
            borderRadius: '8px',
          },
        }}
      >
        {/* Difficulty Filter */}
        <FormControl fullWidth sx={{ marginBottom: '10px' }}>
          <InputLabel id="difficulty-label">Difficulty</InputLabel>
          <Select
            labelId="difficulty-label"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            label="Difficulty"
          >
            <MenuItem value="">All Difficulties</MenuItem>
            <MenuItem value="Easy">Easy</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Hard">Hard</MenuItem>
          </Select>
        </FormControl>

        {/* Category Filter */}
        <FormControl fullWidth>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((cat, index) => (
              <MenuItem key={index} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Apply Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <Button onClick={handleMenuClose} color="primary" size="small" variant="contained">
            Apply
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default QuizFilters;
