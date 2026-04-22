import { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext(null);
const AUTH_KEY = 'auth_user';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem(AUTH_KEY);
        setUser(saved || null);
        setIsAuthenticated(Boolean(saved));
        setIsCheckingAuth(false);
    }, []);

    const login = (username) => {
        localStorage.setItem(AUTH_KEY, username);
        setUser(username);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem(AUTH_KEY);
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoggedIn: isAuthenticated,
                isCheckingAuth,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );

   
}    
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
