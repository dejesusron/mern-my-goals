import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserAlt } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { register, reset } from "../../features/auth/authSlice";
import Spinner from "../../components/spinner/Spinner";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
        age: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const { name, email, password, password2, age } = formData;

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
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (password !== password2) {
            toast.error("Passwords do not match");
        } else {
            const userData = {
                name, age, email, password
            }

            dispatch(register(userData));
        }
    };

    const onClick = () => {
        setShowPassword(!showPassword);
    }

    const onClick2 = () => {
        setShowPassword2(!showPassword2);
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="container px-4 mx-auto h-screen w-screen grid place-items-center">
            <section className="w-full border border-[#333] p-4 mt-[-50px] md:w-[400px]">
                <h1 className="flex items-center gap-x-2 w-max mx-auto mb-6 text-3xl font-bold"><FaUserAlt /> Register</h1>

                <p className="text-center mb-2 color-[gray]">Please create an account</p>

                <form className="flex flex-col gap-y-4" onSubmit={onSubmit}>

                    <div>
                        <input 
                            type="text" 
                            className="border border-[#333] p-2 w-full"
                            placeholder="Enter your name"
                            name="name"
                            value={name}
                            onChange={onChange}
                            required
                        />
                    </div>

                    <div>
                        <input 
                            type="number" 
                            className="border border-[#333] p-2 w-full"
                            placeholder="Enter your age"
                            name="age"
                            value={age}
                            onChange={onChange}
                        />
                    </div>
                    
                    <div>
                        <input 
                            type="email" 
                            className="border border-[#333] p-2 w-full"
                            placeholder="Enter your email"
                            name="email"
                            value={email}
                            onChange={onChange}
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
                        />
                        <div title="Show Password" onClick={onClick} className="absolute top-[50%] right-3 translate-y-[-50%] z-10 cursor-pointer">
                            {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                        </div>
                    </div>

                    <div className="relative">
                        <input 
                            type={showPassword2 ? "text" : "password"} 
                            className="border border-[#333] p-2 w-full"
                            placeholder="Confirm your password"
                            name="password2"
                            value={password2}
                            onChange={onChange}
                        />
                        <div title="Show Password" onClick={onClick2} className="absolute top-[50%] right-3 translate-y-[-50%] z-10 cursor-pointer">
                            {showPassword2 ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
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