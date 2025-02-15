import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../api'; // Adjust path to correctly import from src/api.js
import './UserList.css'; // Import the CSS file

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError('Failed to fetch users.');
        console.error(err);
      }
    }
    loadUsers();
  }, []);

  return (
    <div className="user-list-container">
      <h1>🏆 Leaderboard</h1>
      {error && <p className="error">{error}</p>}
      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Username</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Best Score</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.userType}</td>
                <td>{user.score !== undefined ? user.score : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default UserList;
