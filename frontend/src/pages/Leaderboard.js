import React, { useState, useEffect } from 'react';
import Navbar from '../component/Navbar';
import { getLeaderboard } from '../api'; // Make sure this points to the correct API function

const Leaderboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const result = await getLeaderboard(); // Make the API call

        // Ensure the response is successful
        if (result.success) {
          setLeaderboardData(result.data); // Set the leaderboard data if successful
        } else {
          throw new Error(result.message || 'Failed to fetch leaderboard'); // Throw error if not successful
        }
      } catch (err) {
        console.error('Error fetching leaderboard:', err.message);
        setError(err.message || 'An unexpected error occurred'); // Handle error
      } finally {
        setLoading(false); // Always stop loading
      }
    };

    fetchLeaderboard(); // Call the fetch function
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', margin: 0 }}>
      <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div
        style={{
          flex: 1,
          backgroundColor: '#f4f4f9',
          marginLeft: isSidebarOpen ? '0px' : '0px', // Adjust margin based on sidebar state
          paddingTop: '0',
          overflowY: 'auto',
          transition: 'margin-left 0.3s ease',
        }}
      >
        <h2 style={{ padding: '20px 0', textAlign: 'center', color: '#333' }}>Leaderboard</h2>

        {/* Show loading message */}
        {loading ? (
          <p style={{ textAlign: 'center', color: '#888' }}>Loading...</p>
        ) : error ? (
          // Show error message
          <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
        ) : leaderboardData.length === 0 ? (
          // Show message if no leaderboard data
          <p style={{ textAlign: 'center', color: '#555' }}>No data available.</p>
        ) : (
          <table
            style={{
              margin: '20px auto',
              borderCollapse: 'collapse',
              width: '90%',
              backgroundColor: '#fff',
            }}
          >
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Rank</th>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Score</th>
                <th style={tableHeaderStyle}>Quizzes Played</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user, index) => (
                <tr key={user._id || index}>
                  <td style={tableCellStyle}>{index + 1}</td>
                  <td style={tableCellStyle}>{user.name}</td>
                  <td style={tableCellStyle}>{user.score}</td>
                  <td style={tableCellStyle}>{user.quizzesPlayed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// Styles for table cells and headers
const tableHeaderStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  backgroundColor: '#f2f2f2',
  textAlign: 'left',
};

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  textAlign: 'left',
};

export default Leaderboard;
