import { Navigate, Outlet } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import axios from "axios";
import { bascURL, USER } from "../../Api/Api";
import Laouding from "../../Css/Laouding";
import Error403 from "./Error403";

export default function RequireAuth({ allowedRole }) {

    const cookie = new Cookie();
    const token = cookie.get("token");

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(
                `${bascURL}/${USER}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    }
                }
            );
            setUser(response.data);
        } catch (error) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchUserProfile();
        } else {
            setIsLoading(false);
        }
    }, []);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Laouding />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRole.includes(user.role)) {
        return <Outlet />;
    }

    return <Error403 />;
}
