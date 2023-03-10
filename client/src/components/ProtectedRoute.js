import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";


function ProtectedRoute(props) {
    const { children, redirectTo = "/home" } = props;
    const user = useSelector(state => state.auth.user);
    const location = useLocation();

    if (!user?.token)
        return <Navigate
            to={redirectTo}
            state={{ from: location }}
            replace />

    return children;
}

export default ProtectedRoute;