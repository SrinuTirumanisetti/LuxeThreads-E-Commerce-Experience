import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { User, LogIn } from 'lucide-react';

const Login = () => {
    const [name, setName] = useState('');
    const { login } = useStore();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            login(name.trim());
            navigate('/');
        }
    };

    return (
        <div className="container animate-fade" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '70vh'
        }}>
            <div className="glass" style={{
                padding: '3rem',
                borderRadius: 'var(--br)',
                width: '100%',
                maxWidth: '400px',
                boxShadow: 'var(--shd)',
                textAlign: 'center'
            }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'var(--primary)',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0 auto 1.5rem'
                }}>
                    <User size={30} />
                </div>
                <h2 style={{ marginBottom: '0.5rem' }}>Welcome Back</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    Enter your name to sign in to LuxeThreads
                </p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Dipkamal"
                            required
                            style={{
                                width: '100%',
                                padding: '0.8rem 1rem',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: 'var(--primary)',
                            borderRadius: 'var(--br)',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <LogIn size={20} />
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
