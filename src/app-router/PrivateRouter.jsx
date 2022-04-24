
import {Navigate,Outlet} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";


const PrivateRouter = () => {
    const { currentUser } = useContext(AuthContext);
    if (!currentUser) {
        return <Navigate to="/login"  replace />;
    }
    return <Outlet />;

};

export default PrivateRouter;






