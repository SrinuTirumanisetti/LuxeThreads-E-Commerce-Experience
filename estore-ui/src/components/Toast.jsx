import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

const Toast = ({ message, show, onClose }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div
            className="glass"
            style={{
                position: 'fixed',
                bottom: '2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '1rem 2rem',
                borderRadius: 'var(--br)',
                boxShadow: 'var(--shd)',
                zIndex: 2000,
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                background: 'white',
                border: '2px solid var(--primary)',
                animation: 'slideUp 0.3s ease-out'
            }}
        >
            <CheckCircle color="#26a383" size={24} />
            <span style={{ fontWeight: '600' }}>{message}</span>
        </div>
    );
};

export default Toast;
