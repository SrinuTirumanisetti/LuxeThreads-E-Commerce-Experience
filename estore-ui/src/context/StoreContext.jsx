import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CartService, UserService } from '../api';

const StoreContext = createContext(undefined);

export const StoreProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('estore_user');
        return saved ? JSON.parse(saved) : null;
    });
    const [cart, setCart] = useState([]);

    const refreshCart = useCallback(async () => {
        if (user && user.id !== -1) {
            try {
                const response = await CartService.getCart(user.id);
                setCart(response.data);
            } catch (error) {
                console.error('Failed to fetch cart', error);
            }
        } else {
            setCart([]);
        }
    }, [user]);

    useEffect(() => {
        refreshCart();
    }, [refreshCart]);

    const login = async (name) => {
        try {
            const response = await UserService.login(name);
            const newUser = response.data;
            setUser(newUser);
            localStorage.setItem('estore_user', JSON.stringify(newUser));
            return newUser;
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        }
    };

    const signup = async (name) => {
        try {
            const response = await UserService.register(name);
            const newUser = response.data;
            setUser(newUser);
            localStorage.setItem('estore_user', JSON.stringify(newUser));
            return newUser;
        } catch (error) {
            console.error('Signup failed', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('estore_user');
        setCart([]);
    };

    const addToCart = async (productId, color, size, image) => {
        if (!user) return;
        try {
            await CartService.addItem({
                productID: productId,
                color,
                size,
                image,
                userID: user.id,
                shoppingCartQuantity: 1
            });
            await refreshCart();
        } catch (error) {
            console.error('Failed to add to cart', error);
            throw error;
        }
    };

    return (
        <StoreContext.Provider value={{ user, login, signup, logout, cart, refreshCart, addToCart }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) throw new Error('useStore must be used within StoreProvider');
    return context;
};
