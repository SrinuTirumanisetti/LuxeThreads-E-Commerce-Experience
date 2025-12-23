import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ShoppingCart, Package, User as UserIcon, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout, cart } = useStore();
    const navigate = useNavigate();

    const cartCount = cart.reduce((acc, item) => acc + item.shoppingCartQuantity, 0);

    return (
        <nav className="glass" style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            padding: '1rem 0',
            marginBottom: '2rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ padding: '0.4rem', background: 'var(--primary)', borderRadius: '8px' }}>🚀</div>
                    <span>LuxeThreads</span>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <Link to="/" style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Products
                    </Link>

                    {user && (
                        <>
                            <Link to="/orders" style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Package size={20} />
                                Orders
                            </Link>
                            <Link to="/cart" style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem', position: 'relative' }}>
                                <ShoppingCart size={20} />
                                Cart
                                {cartCount > 0 && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '-8px',
                                        right: '-12px',
                                        background: 'var(--primary)',
                                        fontSize: '0.7rem',
                                        fontWeight: 'bold',
                                        padding: '2px 6px',
                                        borderRadius: '10px',
                                        border: '2px solid white'
                                    }}>{cartCount}</span>
                                )}
                            </Link>
                        </>
                    )}

                    {!user ? (
                        <Link to="/login" className="animate-fade" style={{
                            background: 'var(--primary)',
                            padding: '0.6rem 1.2rem',
                            borderRadius: 'var(--br)',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <UserIcon size={20} />
                            Login
                        </Link>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                <UserIcon size={16} />
                                <span>Hi, {user.name}</span>
                            </div>
                            <button
                                onClick={() => { logout(); navigate('/login'); }}
                                style={{
                                    background: 'none',
                                    color: '#e2465b',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.3rem'
                                }}
                            >
                                <LogOut size={16} />
                                Sign out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
