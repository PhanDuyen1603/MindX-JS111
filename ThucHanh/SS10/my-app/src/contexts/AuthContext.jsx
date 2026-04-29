import {createContext, useContext, useState, useEffect} from "react";

const AuthContext = createContext(null);
const AUTH_KEY = "kanban_user";

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem(AUTH_KEY);
        if(saved) setUser(saved);
        setIsCheckingAuth(false);
    }, []);

    const login = (username) => {
        setUser(username);
        localStorage.setItem(AUTH_KEY, username);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(AUTH_KEY);
    };
    
    return (
        <AuthContext.Provider value={{user, isLoggedIn: !!user, login, logout, isCheckingAuth}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error("useAuth phải dùng bên trong AuthProvider");
    return ctx;
}