import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
    const token = localStorage.getItem("skillswapToken");
    if (!token) return false;

    try {
        const { exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
            localStorage.removeItem("skillswapToken");
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
};