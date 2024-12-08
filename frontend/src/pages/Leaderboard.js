import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../api';
import Navbar from '../component/Navbar';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await getLeaderboard();
        if (response.data.success) {
          setLeaderboard(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', margin: 0 }}>
      <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Content Area with the styles you provided */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#f4f4f9',
          paddingTop: '0',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <div className="leaderboard-content">
          <h1 className="leaderboard-title">Leaderboard|QuizHive</h1>
          {leaderboard.length > 0 ? (
            <div className="leaderboard-table-container">
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Score</th>
                    <th>Quizzes Played</th> {/* Added new column */}
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((user, index) => (
                    <tr key={user._id} className={index === 0 ? 'highlight' : ''}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.score}</td>
                      <td>{user.quizzesPlayed}</td> {/* Accessing quizzesPlayed */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No leaderboard data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
