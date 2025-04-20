import React, { useState } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi'; // Import logout icon
import Footer from '../Footer';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin User', role: 'Admin' },
    { id: 2, name: 'Momina', role: 'Faculty' },
    { id: 3, name: 'Mr. Javed', role: 'Parent' }
  ]);

  const addUser = () => {
    const name = prompt('Enter user name:');
    const role = prompt('Enter user role (Admin/Faculty/Parent):');

    if (name && role) {
      const newUser = { id: users.length + 1, name, role };
      setUsers([...users, newUser]);
      alert('User added successfully!');
    } else {
      alert('Invalid input.');
    }
  };

  const editUser = (index) => {
    const newName = prompt('Enter new name:', users[index].name);
    const newRole = prompt('Enter new role:', users[index].role);

    if (newName && newRole) {
      const updatedUsers = [...users];
      updatedUsers[index] = { ...updatedUsers[index], name: newName, role: newRole };
      setUsers(updatedUsers);
      alert('User updated successfully!');
    }
  };

  const deleteUser = (index) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter((_, i) => i !== index);
      setUsers(updatedUsers);
      alert('User deleted successfully!');
    }
  };

  // Logout function
  const logout = () => {
    alert('You have been logged out!');
    navigate('/login');
  };

  return (
    <div>
      <header className="navbar">
        <nav>
          <ul className="nav-links">
            <li><Link to="/student">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            {/* Logout Icon on Leftmost Side */}
            <li className="logout-icon" onClick={logout}>
              <FiLogOut size={24} color="#ff4d4d" style={{ cursor: 'pointer' }} />
            </li>
          </ul>
        </nav>
      </header>

      <div className="container">

        {/* User Management */}
        <h3 className="dashboard-title">👥 Manage Users</h3>
        <button className="add-user-btn" onClick={addUser}>Add New User</button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>
                  <button className=" edit-btn" onClick={() => editUser(index)}>Edit</button>
                  <button className=" delete-btn" onClick={() => deleteUser(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer/>
    </div>
  );
};

export default AdminPanel;
