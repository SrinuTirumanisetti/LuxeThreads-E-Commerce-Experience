import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const ProductService = {
    getProducts: () => api.get('/products'),
    getProduct: (id) => api.get(`/products/${id}`),
    searchProducts: (term) => api.get(`/products/?name=${term}`),
    addProduct: (product) => api.post('/products', product),
    updateProduct: (product) => api.put('/products', product),
    deleteProduct: (id) => api.delete(`/products/${id}`),
};

export const CartService = {
    getCart: (userId) => api.get(`/shoppingcart/${userId}`),
    addItem: (item) => api.post('/shoppingcart', item),
    updateItem: (item) => api.put('/shoppingcart', item),
    deleteItem: (id) => api.delete(`/shoppingcart/${id}`),
    clearCart: (userId) => api.delete(`/shoppingcart/?userID=${userId}`),
};

export const OrderService = {
    getOrders: (userId) => api.get(`/order/${userId}`),
    addOrder: (order) => api.put('/order', order),
};

export const UserService = {
    getUserId: (name) => {
        return name.split('').reduce((a, b) => {
            a = (a << 5) - a + b.charCodeAt(0);
            return a & a;
        }, 0);
    },
};
