import { useEffect, useState } from 'react';
import { ProductService } from '../api';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search } from 'lucide-react';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await ProductService.getProducts();
                setProducts(response.data);
            } catch (error) {
                console.error('Failed to fetch products', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container animate-up">
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '3rem',
                gap: '1rem'
            }}>
                <h1 style={{ fontSize: '2.5rem' }}>Our Products</h1>
                <div style={{ position: 'relative', maxWidth: '500px' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search for hoodies, t-shirts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.8rem 1rem 0.8rem 3rem',
                            borderRadius: '30px',
                            border: 'none',
                            background: 'white',
                            boxShadow: 'var(--shd)',
                            fontSize: '1rem',
                            outline: 'none'
                        }}
                    />
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '5rem' }}>Loading stylish apparel...</div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '2rem'
                }}>
                    {filteredProducts.map(product => (
                        <Link
                            to={`/product/${product.id}`}
                            key={product.id}
                            className="glass"
                            style={{
                                padding: '1.5rem',
                                borderRadius: 'var(--br)',
                                transition: 'var(--transition)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{
                                height: '240px',
                                background: '#eee',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                position: 'relative'
                            }}>
                                <img
                                    src={product.image || 'https://via.placeholder.com/300x400?text=Apparel'}
                                    alt={product.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    padding: '0.4rem 0.8rem',
                                    background: 'rgba(255,255,255,0.9)',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    fontWeight: 'bold'
                                }}>{product.type}</div>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>{product.name}</h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--text-main)' }}>
                                        ${product.price.toFixed(2)}
                                    </span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#26a383', fontWeight: 'bold' }}>
                                        <ShoppingBag size={16} />
                                        <span>View Detail</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
