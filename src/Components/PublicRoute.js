import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
    const isAuthenticated = false; // Replace with real auth logic
    return isAuthenticated ? <Navigate to="/" /> : children;
};

export default PublicRoute;
