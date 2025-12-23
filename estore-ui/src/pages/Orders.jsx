import { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { OrderService } from '../api';
import { Package, Calendar, MapPin, CheckCircle2, ChevronRight, ShoppingBag } from 'lucide-react';

const Orders = () => {
    const { user } = useStore();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;
            try {
                const response = await OrderService.getOrders(user.id);
                setOrders(response.data);
            } catch (error) {
                console.error('Failed to fetch orders', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user]);

    if (loading) return <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>Loading your history...</div>;

    return (
        <div className="container animate-up" style={{ paddingBottom: '5rem' }}>
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Order History</h1>
                <p style={{ color: 'var(--text-muted)' }}>Manage and track your recent purchases</p>
            </div>

            {orders.length === 0 ? (
                <div className="glass" style={{
                    padding: '4rem',
                    textAlign: 'center',
                    borderRadius: 'var(--br)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.5rem'
                }}>
                    <div style={{ width: '80px', height: '80px', background: '#f0f0f0', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Package size={40} color="#999" />
                    </div>
                    <div>
                        <h3>No orders found yet</h3>
                        <p style={{ color: 'var(--text-muted)' }}>You haven't placed any orders in our store.</p>
                    </div>
                    <button style={{
                        padding: '0.8rem 2rem',
                        background: 'var(--primary)',
                        borderRadius: 'var(--br)',
                        fontWeight: 'bold'
                    }}>Start Shopping</button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {orders.map(order => (
                        <div key={order.orderID} className="glass" style={{
                            borderRadius: 'var(--br)',
                            overflow: 'hidden',
                            boxShadow: 'var(--shd)',
                            border: '1px solid rgba(0,0,0,0.05)'
                        }}>
                            {/* Header */}
                            <div style={{
                                background: 'rgba(0,0,0,0.02)',
                                padding: '1.5rem 2rem',
                                borderBottom: '1px solid rgba(0,0,0,0.05)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                gap: '1rem'
                            }}>
                                <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                                    <div>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Order Placed</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '600' }}>
                                            <Calendar size={14} />
                                            {order.orderDate}
                                        </div>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Total Amount</span>
                                        <div style={{ fontWeight: '900', fontSize: '1.1rem' }}>
                                            ${order.items.reduce((acc, item) => acc + (59.99 * item.shoppingCartQuantity), 0).toFixed(2)}
                                        </div>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Ship To</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                            <MapPin size={14} />
                                            {order.address || 'Standard Address'}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Order #</span>
                                    <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: 'var(--text-main)' }}>FLX-{order.orderID}</span>
                                </div>
                            </div>

                            {/* Status Bar */}
                            <div style={{ padding: '1.5rem 2rem', background: 'white' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#26a383', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                                    <CheckCircle2 size={20} />
                                    <span>Delivered</span>
                                </div>

                                {/* Items List */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {order.items.map((item, idx) => (
                                        <div key={idx} style={{ display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: '1.5rem', alignItems: 'center' }}>
                                            <div style={{ width: '80px', height: '80px', background: '#f5f5f5', borderRadius: '12px', overflow: 'hidden' }}>
                                                <img src={item.image || 'https://via.placeholder.com/80px'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <div>
                                                <h4 style={{ marginBottom: '0.3rem' }}>Product Placeholder</h4>
                                                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                                    <span>Color: <strong style={{ color: 'var(--text-main)' }}>{item.color}</strong></span>
                                                    <span>Size: <strong style={{ color: 'var(--text-main)' }}>{item.size}</strong></span>
                                                    <span>Qty: <strong style={{ color: 'var(--text-main)' }}>{item.shoppingCartQuantity}</strong></span>
                                                </div>
                                            </div>
                                            <button style={{
                                                padding: '0.5rem 1rem',
                                                borderRadius: '8px',
                                                border: '1px solid #ddd',
                                                fontSize: '0.85rem',
                                                fontWeight: '600',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.4rem',
                                                background: 'white'
                                            }}>
                                                <ShoppingBag size={14} />
                                                Buy Again
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div style={{
                                padding: '1rem 2rem',
                                borderTop: '1px solid rgba(0,0,0,0.05)',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                background: 'rgba(0,0,0,0.01)'
                            }}>
                                <button style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                                    View Invoice <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
