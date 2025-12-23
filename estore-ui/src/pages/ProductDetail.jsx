import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ProductService } from '../api';
import { useStore } from '../context/StoreContext';
import { ArrowLeft, ShoppingCart, CreditCard, CheckCircle, Package } from 'lucide-react';
import Toast from '../components/Toast';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, addToCart } = useStore();
    const [product, setProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState('#ffffff');
    const [selectedSize, setSelectedSize] = useState('M');
    const [showToast, setShowToast] = useState(false);
    const [loading, setLoading] = useState(true);

    const colors = [
        { name: 'White', hex: '#ffffff' },
        { name: 'Black', hex: '#323d3f' },
        { name: 'Navy', hex: '#213051' },
        { name: 'Red', hex: '#df183f' },
        { name: 'Royal', hex: '#0c66a4' },
        { name: 'Forest', hex: '#374d36' },
    ];

    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await ProductService.getProduct(Number(id));
                setProduct(response.data);
            } catch (error) {
                console.error('Failed to fetch product', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        await addToCart(Number(id), selectedColor, selectedSize, product?.image || '');
        setShowToast(true);
    };

    const handlePurchase = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        await addToCart(Number(id), selectedColor, selectedSize, product?.image || '');
        navigate('/cart');
    };

    if (loading) return <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>Loading details...</div>;
    if (!product) return <div className="container" style={{ padding: '5rem', textAlign: 'center' }}>Product not found</div>;

    return (
        <div className="container animate-up">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
                <ArrowLeft size={18} />
                Back to Products
            </Link>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1fr', gap: '4rem', alignItems: 'start' }}>
                {/* Gallery Section */}
                <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--br)', textAlign: 'center' }}>
                    <div style={{
                        borderRadius: '20px',
                        overflow: 'hidden',
                        background: '#fff',
                        border: '8px solid white',
                        boxShadow: 'var(--shd)',
                        marginBottom: '2rem',
                        aspectRatio: '1/1'
                    }}>
                        <img
                            src={product.image || 'https://via.placeholder.com/600x600'}
                            alt={product.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                        <div style={{ width: '60px', height: '60px', border: '3px solid var(--primary)', borderRadius: '10px', overflow: 'hidden' }}>
                            <img src={product.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        {/* placeholders for more images */}
                        <div style={{ width: '60px', height: '60px', border: '1px solid #ddd', borderRadius: '10px', background: '#f0f0f0' }}></div>
                        <div style={{ width: '60px', height: '60px', border: '1px solid #ddd', borderRadius: '10px', background: '#f0f0f0' }}></div>
                    </div>
                </div>

                {/* Info Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div>
                        <span style={{
                            background: 'rgba(0,0,0,0.05)',
                            padding: '0.4rem 0.8rem',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>{product.type}</span>
                        <h1 style={{ fontSize: '3rem', margin: '0.5rem 0' }}>{product.name}</h1>
                        <p style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-main)' }}>${product.price.toFixed(2)}</p>
                    </div>

                    <div style={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee', padding: '1.5rem 0' }}>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>{product.description}</p>
                    </div>

                    {/* Customizations */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <h4 style={{ marginBottom: '1rem' }}>Select Color</h4>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                {colors.map(c => (
                                    <button
                                        key={c.name}
                                        onClick={() => setSelectedColor(c.hex)}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            background: c.hex,
                                            border: selectedColor === c.hex ? '3px solid var(--primary)' : '2px solid #ddd',
                                            boxShadow: selectedColor === c.hex ? '0 0 10px rgba(255, 219, 62, 0.5)' : 'none',
                                            transition: 'var(--transition)'
                                        }}
                                        title={c.name}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 style={{ marginBottom: '1rem' }}>Select Size</h4>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {sizes.map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setSelectedSize(s)}
                                        style={{
                                            padding: '0.6rem 1.2rem',
                                            borderRadius: '8px',
                                            background: selectedSize === s ? 'var(--primary)' : 'white',
                                            border: selectedSize === s ? '1px solid var(--primary)' : '1px solid #ddd',
                                            fontWeight: 'bold',
                                            transition: 'var(--transition)'
                                        }}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button
                            onClick={handleAddToCart}
                            style={{
                                flex: 1,
                                padding: '1.2rem',
                                borderRadius: 'var(--br)',
                                background: 'white',
                                border: '2px solid var(--primary)',
                                fontWeight: 'bold',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '0.8rem',
                                transition: 'var(--transition)'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 219, 62, 0.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                        >
                            <ShoppingCart size={20} />
                            Add to Cart
                        </button>
                        <button
                            onClick={handlePurchase}
                            style={{
                                flex: 1,
                                padding: '1.2rem',
                                borderRadius: 'var(--br)',
                                background: 'var(--primary)',
                                fontWeight: 'bold',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '0.8rem',
                                boxShadow: '0 4px 15px rgba(255, 219, 62, 0.4)'
                            }}
                        >
                            <CreditCard size={20} />
                            Buy It Now
                        </button>
                    </div>

                    <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#26a383' }}>
                            <CheckCircle size={16} />
                            <span>In Stock</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            <Package size={16} />
                            <span>Free Shipping</span>
                        </div>
                    </div>
                </div>
            </div>

            <Toast
                message="Item added to your cart!"
                show={showToast}
                onClose={() => setShowToast(false)}
            />
        </div>
    );
};

export default ProductDetail;
