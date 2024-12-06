import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../api';
import { 
  Select, MenuItem, FormControl, InputLabel, Box, 
  FormControlLabel, Switch, IconButton, Menu , Typography
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const QuizFilters = ({
  difficulty,
  setDifficulty,
  category,
  setCategory,
  includeUserQuizzes,
  setIncludeUserQuizzes,
  includeDefaultQuizzes,
  setIncludeDefaultQuizzes,
}) => {
  const [categories, setCategories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null); // For managing dropdown state

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategoriesData();
  }, []);

  // Handle opening and closing of the filter dropdown menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {/* Filter Icon with Label */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
        <IconButton onClick={handleClick} color="primary">
          <FilterAltIcon sx={{ fontSize: 30, color: '#4A4A4A' }} />
        </IconButton>
        <Typography variant="body1" sx={{ color: '#4A4A4A', fontWeight: 'bold' }}>
          FILTERS
        </Typography>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* Difficulty Filter */}
        <Box sx={{ padding: '10px' }}>
          <FormControl fullWidth>
            <InputLabel id="difficulty-label">Difficulty</InputLabel>
            <Select
              labelId="difficulty-label"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <MenuItem value="">All Difficulties</MenuItem>
              <MenuItem value="Easy">Easy</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Hard">Hard</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Category Filter */}
        <Box sx={{ padding: '10px' }}>
          <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((cat, index) => (
                <MenuItem key={index} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* User-Created and Default Quiz Filters */}
        <Box sx={{ padding: '10px' }}>
          <FormControlLabel
            control={
              <Switch
                checked={includeUserQuizzes}
                onChange={(e) => setIncludeUserQuizzes(e.target.checked)}
              />
            }
            label="Include User-Created Quizzes"
          />
          <FormControlLabel
            control={
              <Switch
                checked={includeDefaultQuizzes}
                onChange={(e) => setIncludeDefaultQuizzes(e.target.checked)}
              />
            }
            label="Include Default Quizzes"
          />
        </Box>
      </Menu>
    </Box>
  );
};

export default QuizFilters;
