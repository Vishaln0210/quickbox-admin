import React, { useState, useEffect } from 'react';
import '../css/UserManagement.css'; // Import CSS for UserManagement

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user data from the backend API
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users'); // Replace with your correct endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="user-management">Loading users...</div>;
  }

  if (error) {
    return <div className="user-management">Error: {error}</div>;
  }

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>
                {/* Add buttons for viewing, editing, or deleting users */}
                <button onClick={() => viewUser(user.id)}>View</button>
                <button>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const viewUser = (id) => {
  // Function to fetch and display a specific user's details
  fetch(`http://localhost:8080/api/user/${id}`)
    .then(response => response.json())
    .then(data => {
      alert(`User Details:\nID: ${data.id}\nEmail: ${data.email}`);
    })
    .catch(error => {
      alert('Error fetching user details');
    });
};

export default UserManagement;
