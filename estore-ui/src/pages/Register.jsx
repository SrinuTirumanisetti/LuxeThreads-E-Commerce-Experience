import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, User } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const { signup } = useStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedName = name.trim();
        if (trimmedName) {
            try {
                await signup(trimmedName);
                navigate('/');
            } catch (error) {
                alert('Registration failed. The name might already be taken or there was a server error.');
            }
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
                    background: 'var(--secondary)',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0 auto 1.5rem'
                }}>
                    <User size={30} />
                </div>
                <h2 style={{ marginBottom: '0.5rem' }}>Create Account</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    Join LuxeThreads and start shopping!
                </p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
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
                            onFocus={(e) => e.target.style.borderColor = 'var(--secondary)'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: 'var(--secondary)',
                            color: 'white',
                            borderRadius: 'var(--br)',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '0.5rem',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <UserPlus size={20} />
                        Register Now
                    </button>
                </form>

                <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
