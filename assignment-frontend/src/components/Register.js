import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [user, setUser] = useState({ name: '', email: '', password: '', role: 'USER' });
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', user);
            alert("Registration successful! Please login.");
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="auth-box">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input placeholder="Name" onChange={e => setUser({...user, name: e.target.value})} required />
                <input placeholder="Email" onChange={e => setUser({...user, email: e.target.value})} required />
                <input type="password" placeholder="Password" onChange={e => setUser({...user, password: e.target.value})} required />
                <select onChange={e => setUser({...user, role: e.target.value})}>
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                </select>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};
export default Register;