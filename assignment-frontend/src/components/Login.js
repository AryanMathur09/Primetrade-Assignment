import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', {
                email: email.trim(),
                password: password.trim()
            });
            if (res.data && res.data.token) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('role', res.data.role || 'USER');
                navigate('/dashboard');
            }
        } catch (err) {
            alert(err.response?.data?.message || "Invalid credentials");
        }
    };

    return (
        <div style={loginStyles.container}>
            <div style={loginStyles.card}>
                <div style={loginStyles.header}>
                    <h1 style={loginStyles.logo}>TaskSphere</h1>
                    <p style={loginStyles.subtitle}>Welcome back! Please enter your details.</p>
                </div>

                <form onSubmit={handleLogin} style={loginStyles.form}>
                    <div style={loginStyles.inputGroup}>
                        <label style={loginStyles.label}>Email Address</label>
                        <input
                            type="email"
                            placeholder="name@company.com"
                            style={loginStyles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div style={loginStyles.inputGroup}>
                        <label style={loginStyles.label}>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            style={loginStyles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" style={loginStyles.button}>Sign In</button>
                </form>

                <p style={loginStyles.footer}>
                    Don't have an account? <Link to="/register" style={loginStyles.link}>Create one for free</Link>
                </p>
            </div>
        </div>
    );
};

const loginStyles = {
    container: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', fontFamily: "'Inter', sans-serif" },
    card: { width: '100%', maxWidth: '440px', padding: '40px', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' },
    header: { textAlign: 'center', marginBottom: '32px' },
    logo: { fontSize: '2rem', fontWeight: '800', color: '#1e293b', margin: '0 0 8px 0', letterSpacing: '-0.025em' },
    subtitle: { color: '#64748b', fontSize: '0.95rem' },
    form: { display: 'flex', flexDirection: 'column', gap: '20px' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
    label: { fontSize: '0.875rem', fontWeight: '600', color: '#334155' },
    input: { padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' },
    button: { marginTop: '10px', padding: '12px', backgroundColor: '#4f46e5', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s' },
    footer: { marginTop: '24px', textAlign: 'center', fontSize: '0.875rem', color: '#64748b' },
    link: { color: '#4f46e5', fontWeight: '600', textDecoration: 'none' }
};

export default Login;