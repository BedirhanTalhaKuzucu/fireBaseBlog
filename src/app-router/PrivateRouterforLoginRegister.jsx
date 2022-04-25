
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";


const PrivateRouterforLoginRegister = () => {
    const { currentUser } = useContext(AuthContext);
    if (!currentUser) {
        return <Outlet />;
    } else {
        return <Navigate to="/" replace />;
    }
};

export default PrivateRouterforLoginRegister;






