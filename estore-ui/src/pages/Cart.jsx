import { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CartService, ProductService } from '../api';

const Cart = () => {
    const { cart, user, refreshCart } = useStore();
    const navigate = useNavigate();
    const [productDetails, setProductDetails] = useState({});

    useEffect(() => {
        const fetchDetails = async () => {
            const details = {};
            for (const item of cart) {
                if (!details[item.productID]) {
                    try {
                        const res = await ProductService.getProduct(item.productID);
                        details[item.productID] = res.data;
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
            setProductDetails(details);
        };
        if (cart.length > 0) fetchDetails();
    }, [cart]);

    const handleUpdateQty = async (id, current, delta) => {
        const next = current + delta;
        if (next < 1) return;
        try {
            await CartService.updateItem({ shoppingCartID: id, shoppingCartQuantity: next });
            refreshCart();
        } catch (e) {
            console.error(e);
        }
    };

    const handleDelete = async (id) => {
        try {
            await CartService.deleteItem(id);
            refreshCart();
        } catch (e) {
            console.error(e);
        }
    };

    const subtotal = cart.reduce((acc, item) => {
        const price = productDetails[item.productID]?.price || 0;
        return acc + (price * item.shoppingCartQuantity);
    }, 0);

    const tax = subtotal * 0.05;
    const shipping = subtotal > 0 ? 10 : 0;
    const total = subtotal + tax + shipping;

    if (cart.length === 0) {
        return (
            <div className="container animate-up" style={{ textAlign: 'center', padding: '5rem 0' }}>
                <ShoppingBag size={80} color="#ddd" style={{ marginBottom: '2rem' }} />
                <h2>Your cart is feeling light</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Add some stylish apparel to your cart and make it happy!</p>
                <Link to="/" style={{ background: 'var(--primary)', padding: '1rem 2.5rem', borderRadius: 'var(--br)', fontWeight: 'bold', display: 'inline-block' }}>
                    Shop Now
                </Link>
            </div>
        );
    }

    return (
        <div className="container animate-up">
            <h1 style={{ marginBottom: '3rem' }}>Shopping Bag</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem', alignItems: 'start' }}>
                {/* Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {cart.map(item => (
                        <div key={item.shoppingCartID} className="glass" style={{
                            display: 'grid',
                            gridTemplateColumns: '120px 1fr auto',
                            padding: '1.5rem',
                            borderRadius: 'var(--br)',
                            gap: '2rem',
                            alignItems: 'center'
                        }}>
                            <div style={{ height: '120px', background: '#f5f5f5', borderRadius: '12px', overflow: 'hidden' }}>
                                <img src={item.image || (productDetails[item.productID]?.image)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                <h3 style={{ fontSize: '1.25rem' }}>{productDetails[item.productID]?.name || 'Loading...'}</h3>
                                <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                    <span>Color: <strong style={{ color: 'var(--text-main)' }}>{item.color}</strong></span>
                                    <span>Size: <strong style={{ color: 'var(--text-main)' }}>{item.size}</strong></span>
                                </div>
                                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#f0f0f0', padding: '0.4rem 0.8rem', borderRadius: '8px' }}>
                                        <button onClick={() => handleUpdateQty(item.shoppingCartID, item.shoppingCartQuantity, -1)} style={{ background: 'none' }}><Minus size={16} /></button>
                                        <span style={{ fontWeight: 'bold' }}>{item.shoppingCartQuantity}</span>
                                        <button onClick={() => handleUpdateQty(item.shoppingCartID, item.shoppingCartQuantity, 1)} style={{ background: 'none' }}><Plus size={16} /></button>
                                    </div>
                                    <button onClick={() => handleDelete(item.shoppingCartID)} style={{ background: 'none', color: '#e2465b', display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.85rem' }}>
                                        <Trash2 size={16} /> Remove
                                    </button>
                                </div>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                                <span style={{ fontSize: '1.2rem', fontWeight: '900' }}>
                                    ${((productDetails[item.productID]?.price || 0) * item.shoppingCartQuantity).toFixed(2)}
                                </span>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    ${(productDetails[item.productID]?.price || 0).toFixed(2)} each
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Card */}
                <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--br)', position: 'sticky', top: '100px' }}>
                    <h2 style={{ marginBottom: '1.5rem' }}>Order Summary</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span color="var(--text-muted)">Subtotal</span>
                            <span style={{ fontWeight: '600' }}>${subtotal.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span color="var(--text-muted)">Tax (5%)</span>
                            <span style={{ fontWeight: '600' }}>${tax.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span color="var(--text-muted)">Shipping</span>
                            <span style={{ fontWeight: '600' }}>${shipping.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #eee', paddingTop: '1rem', marginTop: '0.5rem', fontSize: '1.25rem', fontWeight: '900' }}>
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/checkout')}
                        style={{
                            width: '100%',
                            padding: '1.2rem',
                            background: 'var(--secondary)',
                            color: 'white',
                            borderRadius: 'var(--br)',
                            fontWeight: 'bold',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '0.8rem',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                        }}
                    >
                        Checkout <ArrowRight size={20} />
                    </button>

                    <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            <div style={{ width: '40px', height: '40px', background: '#f5f5f5', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>💳</div>
                            <span>Secure Payment methods supported</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            <div style={{ width: '40px', height: '40px', background: '#f5f5f5', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>🔄</div>
                            <span>30-day Free Return Policy</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
