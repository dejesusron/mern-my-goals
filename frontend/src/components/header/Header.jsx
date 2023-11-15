import { useState, useEffect } from "react";
import { FaSignInAlt, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";

const Header = () => {
    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/");
    }

    useEffect(() => {
        if(location.pathname === "/") {
            setLogin(false);
            setRegister(false);
        } else if (location.pathname === "/login") {
            setLogin(true);
            setRegister(false);
        } else if (location.pathname === "/register") {
            setLogin(false);
            setRegister(true);
        }

    }, [location])

    return (
        <div className="h-16 w-full bg-[#fff] shadow-md fixed top-0 left-0 z-50">
            <div className="h-full container px-4 mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    <Link to="/">My Goals</Link>
                </h1>

                <ul className="flex gap-x-4">
                    {user ? (
                        <li>
                            <button onClick={onLogout} className="flex items-center gap-x-1">
                                <FaSignOutAlt />Logout
                            </button>
                        </li>
                    ) : (
                    <>
                        <li>
                            <Link to="/login" className={`items-center gap-x-1 ${login ? "hidden" : "flex"}`}><FaSignInAlt />Login</Link>
                        </li>
                        <li>
                            <Link to="/register" className={`items-center gap-x-1 ${register ? "hidden" : "flex"}`}><FaUserAlt />Register</Link>
                        </li>
                    </>)}
                    
                </ul>
            </div>
        </div>
    );
};

export default Header;