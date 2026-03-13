import React, { useEffect, useState, useCallback } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const role = localStorage.getItem('role');

    const fetchTasks = useCallback(async () => {
        if (!localStorage.getItem('token')) {
            navigate('/');
            return;
        }
        try {
            const res = await api.get('/tasks');
            setTasks(res.data);
            setLoading(false);
        } catch (err) {
            if (err.response?.status === 401 || err.response?.status === 403) {
                localStorage.clear();
                navigate('/');
            }
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const addTask = async (e) => {
        e.preventDefault();
        try {
            const taskData = {
                title: newTask.title.trim(),
                description: newTask.description || "No description provided",
                status: 'Pending'
            };
            await api.post('/tasks', taskData);
            setNewTask({ title: '', description: '' });
            fetchTasks();
        } catch (err) {
            alert("Failed to add task.");
        }
    };

    const deleteTask = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            fetchTasks();
        } catch (err) {
            alert(role === 'ADMIN' ? "Delete failed" : "Admins only!");
        }
    };

    if (loading && !tasks.length) return <div style={styles.loader}>Loading your workspace...</div>;

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.brand}>
                    <h1 style={styles.logo}>TaskSphere</h1>
                    <span style={styles.roleBadge}>{role}</span>
                </div>
                <button onClick={() => { localStorage.clear(); navigate('/'); }} style={styles.logoutBtn}>Logout</button>
            </header>

            <main style={styles.main}>
                <section style={styles.formSection}>
                    <h2 style={styles.sectionTitle}>Create New Task</h2>
                    <form onSubmit={addTask} style={styles.form}>
                        <input
                            value={newTask.title}
                            placeholder="What needs to be done?"
                            style={styles.input}
                            onChange={e => setNewTask({...newTask, title: e.target.value})}
                            required
                        />
                        <textarea
                            value={newTask.description}
                            placeholder="Add some details..."
                            style={styles.textarea}
                            onChange={e => setNewTask({...newTask, description: e.target.value})}
                        />
                        <button type="submit" style={styles.addBtn}>Add to List</button>
                    </form>
                </section>

                <section style={styles.listSection}>
                    <h2 style={styles.sectionTitle}>Active Tasks ({tasks.length})</h2>
                    <div style={styles.grid}>
                        {tasks.length === 0 ? <p style={styles.emptyMsg}>No tasks yet. Start by adding one above!</p> : tasks.map(t => (
                            <div key={t.id} style={styles.card}>
                                <div style={styles.cardContent}>
                                    <h3 style={styles.cardTitle}>{t.title}</h3>
                                    <p style={styles.cardDesc}>{t.description}</p>
                                    <span style={styles.statusTag}>{t.status}</span>
                                </div>
                                {role === 'ADMIN' && (
                                    <button onClick={() => deleteTask(t.id)} style={styles.deleteBtn}>Delete</button>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

const styles = {
    container: { fontFamily: "'Inter', sans-serif", backgroundColor: '#f4f7f9', minHeight: '100vh', color: '#333' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 5%', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
    brand: { display: 'flex', alignItems: 'center', gap: '15px' },
    logo: { margin: 0, fontSize: '1.5rem', color: '#2c3e50', fontWeight: '800' },
    roleBadge: { fontSize: '0.7rem', backgroundColor: '#e0e7ff', color: '#4338ca', padding: '4px 10px', borderRadius: '20px', fontWeight: 'bold', textTransform: 'uppercase' },
    logoutBtn: { padding: '8px 16px', borderRadius: '8px', border: '1px solid #4f46e5', backgroundColor: '#4f46e5', cursor: 'pointer', transition: '0.3s',color: '#ffffff',fontWeight: '600' ,boxShadow: '0 2px 4px rgba(79, 70, 229, 0.2)'},
    main: { maxWidth: '1000px', margin: '2rem auto', padding: '0 20px' },
    formSection: { backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', marginBottom: '2rem' },
    sectionTitle: { fontSize: '1.1rem', marginBottom: '1.5rem', color: '#64748b' },
    form: { display: 'flex', flexDirection: 'column', gap: '12px' },
    input: { padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem' },
    textarea: { padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem', minHeight: '80px', fontFamily: 'inherit' },
    addBtn: { padding: '12px', backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' },
    card: { backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid #f1f5f9' },
    cardTitle: { margin: '0 0 8px 0', fontSize: '1.2rem', color: '#1e293b' },
    cardDesc: { color: '#64748b', fontSize: '0.9rem', marginBottom: '15px', lineHeight: '1.5' },
    statusTag: { fontSize: '0.75rem', backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', alignSelf: 'flex-start' },
    deleteBtn: { marginTop: '15px', color: '#ef4444', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' },
    loader: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#64748b' },
    emptyMsg: { gridColumn: '1/-1', textAlign: 'center', color: '#94a3b8', padding: '40px' }
};

export default Dashboard;