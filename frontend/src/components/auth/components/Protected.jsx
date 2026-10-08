import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
    selectLoggedInUser,
    selectUserChecked
} from "../authSlices";

function Protected({ children }) {

    const user = useSelector(selectLoggedInUser);
    const userChecked = useSelector(selectUserChecked);

    // Jab tak backend check na ho
    if (!userChecked) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <Navigate to="/auth-login" replace />;
    }

    return children;
}

export default Protected;
