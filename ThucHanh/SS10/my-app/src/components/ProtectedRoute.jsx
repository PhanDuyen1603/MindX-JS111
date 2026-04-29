import { Navigate, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({children}) {
    const {isLoggedIn, isCheckingAuth} = useAuth();
    const location = useLocation();

    if(isCheckingAuth) {
       <div style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh"}}>
        <Spin size="large" tip="Đang kiểm tra đăng nhập..." />
       </div>
    }

    if(!isLoggedIn) {
        return <Navigate to="/login" state={{from: location}} replace />;
    }

    return children;
}

export default ProtectedRoute;