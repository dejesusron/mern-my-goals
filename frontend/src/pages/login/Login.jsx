import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../../features/auth/authSlice";
import Spinner from "../../components/spinner/Spinner";

const Register = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate("/");
        }

        dispatch(reset());

    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email, password
        }

        dispatch(login(userData));
    }

    const onClick = () => {
        setShowPassword(!showPassword);
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="container px-4 mx-auto h-screen w-screen grid place-items-center">
            <section className="w-full border border-[#333] p-4 mt-[-150px] md:w-[400px]">
                <h1 className="flex items-center gap-x-2 w-max mx-auto mb-6 text-3xl font-bold"><FaSignInAlt /> Login</h1>

                <p className="text-center mb-2 color-[gray]">Please login to your account</p>

                <form className="flex flex-col gap-y-4" onSubmit={onSubmit}>
                    
                    <div>
                        <input 
                            type="email" 
                            className="border border-[#333] p-2 w-full"
                            placeholder="Enter your email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                        />
                    </div>

                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            className="border border-[#333] p-2 w-full"
                            placeholder="Enter your password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                        />
                        <div title="Show Password" onClick={onClick} className="absolute top-[50%] right-3 translate-y-[-50%] z-10 cursor-pointer">
                            {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                        </div>
                    </div>

                    <div>
                        <button className="border border-[#333] bg-[#333] text-[#fff] w-full p-2 hover:opacity-70 transition" type="submit">Submit</button>
                    </div>

                </form>
            </section>
        </div>
    );
};

export default Register;