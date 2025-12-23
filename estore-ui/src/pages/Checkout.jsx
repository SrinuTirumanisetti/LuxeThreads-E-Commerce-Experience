import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { OrderService, CartService } from '../api';
import { CreditCard, Truck, ShieldCheck, ArrowLeft, CheckCircle } from 'lucide-react';

const Checkout = () => {
    const { cart, user, refreshCart } = useStore();
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [isOrdered, setIsOrdered] = useState(false);

    const subtotal = cart.reduce((acc, item) => acc + (59.99 * item.shoppingCartQuantity), 0);
    const total = (subtotal * 1.05) + 10;

    const handlePlaceOrder = async () => {
        if (!user || !agreed || !address) return;

        try {
            await OrderService.addOrder({
                userID: user.id,
                items: cart,
                orderDate: new Date().toLocaleDateString(),
                address: address
            });

            await CartService.clearCart(user.id);
            await refreshCart();
            setIsOrdered(true);

            setTimeout(() => {
                navigate('/orders');
            }, 3000);
        } catch (e) {
            console.error(e);
        }
    };

    if (isOrdered) {
        return (
            <div className="container animate-fade" style={{ textAlign: 'center', padding: '10rem 0' }}>
                <div style={{
                    width: '100px',
                    height: '100px',
                    background: '#26a383',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0 auto 2rem',
                    boxShadow: '0 0 30px rgba(38, 163, 131, 0.4)'
                }}>
                    <CheckCircle size={60} />
                </div>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Thank You!</h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>Your order has been placed successfully. Redirecting to your history...</p>
            </div>
        );
    }

    return (
        <div className="container animate-up">
            <button onClick={() => navigate('/cart')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', background: 'none', color: 'var(--text-muted)' }}>
                <ArrowLeft size={18} />
                Return to bag
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 450px', gap: '4rem', alignItems: 'start' }}>
                {/* Forms */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    {/* Shipping Section */}
                    <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--br)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
                            <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Truck size={20} />
                            </div>
                            <h2>Shipping Address</h2>
                        </div>
                        <textarea
                            placeholder="House #, Street name, City, State, ZIP code"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            style={{
                                width: '100%',
                                minHeight: '120px',
                                padding: '1rem',
                                borderRadius: '12px',
                                border: '1px solid #ddd',
                                fontSize: '1rem',
                                outline: 'none',
                                resize: 'none',
                                fontFamily: 'inherit'
                            }}
                        />
                    </div>

                    {/* Payment Section (Mock) */}
                    <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--br)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
                            <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <CreditCard size={20} />
                            </div>
                            <h2>Payment Method</h2>
                        </div>
                        <div style={{
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '2px solid var(--primary)',
                            background: 'rgba(255, 219, 62, 0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <div style={{ width: '50px', height: '32px', background: '#212121', borderRadius: '4px' }}></div>
                            <div>
                                <p style={{ fontWeight: 'bold' }}>Mock Payment Method</p>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Safe and instant checkout for demonstration</p>
                            </div>
                            <div style={{ marginLeft: 'auto' }}>
                                <CheckCircle size={20} color="#26a383" />
                            </div>
                        </div>
                    </div>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', padding: '1rem' }}>
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '0.9rem' }}>I have read and agree to the website <strong>terms and conditions *</strong></span>
                    </label>
                </div>

                {/* Floating Side Summary */}
                <div style={{ position: 'sticky', top: '100px' }}>
                    <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--br)', boxShadow: 'var(--shd)' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>Order Review</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '200px', overflowY: 'auto', marginBottom: '2rem', paddingRight: '0.5rem' }}>
                            {cart.map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <img src={item.image} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }} />
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{item.color} - {item.size}</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>x{item.shoppingCartQuantity}</p>
                                    </div>
                                    <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>${(59.99 * item.shoppingCartQuantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Merchandise</span>
                                <span style={{ fontWeight: '600' }}>${subtotal.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Shipping & Handling</span>
                                <span style={{ fontWeight: '600' }}>$10.00</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '900', marginTop: '0.5rem' }}>
                                <span>Total</span>
                                <span style={{ color: 'var(--text-main)' }}>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            disabled={!agreed || !address}
                            onClick={handlePlaceOrder}
                            style={{
                                width: '100%',
                                marginTop: '2rem',
                                padding: '1.2rem',
                                background: (!agreed || !address) ? '#ccc' : 'var(--primary)',
                                color: 'black',
                                borderRadius: 'var(--br)',
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                                boxShadow: (agreed && address) ? '0 10px 20px rgba(255, 219, 62, 0.3)' : 'none',
                                transition: 'var(--transition)'
                            }}
                        >
                            Confirm Order
                        </button>
                        <div style={{ textAlign: 'center', marginTop: '1.5rem', color: '#26a383', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                            <ShieldCheck size={16} />
                            <span>SSL Encrypted Transaction</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
