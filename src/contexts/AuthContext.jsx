import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedAuth = localStorage.getItem('bazaranet_auth');
        if (storedAuth) {
            try {
                const { user } = JSON.parse(storedAuth);
                setUser(user);
                setIsAuthenticated(true);
            } catch (e) {
                localStorage.removeItem('bazaranet_auth');
            }
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockUser = { id: '1', email, name: email.split('@')[0], role: 'user' };
                setUser(mockUser);
                setIsAuthenticated(true);
                localStorage.setItem('bazaranet_auth', JSON.stringify({ user: mockUser }));
                resolve();
            }, 500);
        });
    };

    const loginDemo = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const demoUser = { id: 'demo-1', email: 'demo@bazaranet.com', name: 'Demo User', role: 'admin' };
                setUser(demoUser);
                setIsAuthenticated(true);
                localStorage.setItem('bazaranet_auth', JSON.stringify({ user: demoUser }));
                resolve();
            }, 500);
        });
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('bazaranet_auth');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, login, loginDemo, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
