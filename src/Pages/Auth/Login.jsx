import React, { use, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';
import toast, { Toaster } from 'react-hot-toast';
import { EyeIcon, EyeOffIcon } from 'lucide-react';


const googleProvider = new GoogleAuthProvider()

const Login = () => {


    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const { signIn } = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const emailRef = useRef()
    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value
        // console.log({ email, password })
        signIn(email, password).then(result => {
            const user = result.user;
            toast.success(`Welcome ${user.displayName || "User"}!`);

            // console.log(user)
            navigate(`${location.state ? location.state : '/'}`)
        })
            .catch(error => {
                const errorMessage = error.message;
                setError(errorMessage)
            })
    }

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            toast.error('Please enter your email first!');
            return;
        }


        navigate('/auth/forgetPassword', { state: { email } });
    };



    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const user = result.user;
                toast.success(`Welcome ${user.displayName || user.email}!`);
                navigate('/');
            })
            .catch(error => {
                toast.error(error.message);
            })
    }

    return (
        <div className="w-11/12 max-w-4xl mx-auto">
            

            <div className="flex justify-center items-center min-h-screen px-2 sm:px-4">
                <div className="card bg-base-100 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-lg shadow-2xl py-5 px-4 sm:px-6 md:px-8">
                    <h1 className="text-2xl  sm:text-3xl font-extrabold text-center text-orange-500 mb-4">
                        Login To ClubSphere
                    </h1>

                    <form onSubmit={handleLogin} className="card-body p-0">
                        <fieldset className="flex flex-col gap-4">
                            {/* Email */}
                            <label className="label text-sm sm:text-base">Email</label>
                            <input
                                name="email"
                                type="email"
                                ref={emailRef}
                                className="input w-full"
                                placeholder="Email"
                                required
                            />

                            {/* Password */}
                            <label className="label text-sm sm:text-base">Password</label>
                            <div className="relative w-full">
                                <input
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className="input w-full pr-10"
                                    placeholder="Password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-800"
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="w-5 h-5" />
                                    ) : (
                                        <EyeIcon className="w-5 h-5" />
                                    )}
                                </button>
                            </div>

                            <div className="text-right">
                                <button onClick={handleForgetPassword} className="link link-hover text-xs sm:text-sm">
                                    Forgot password?
                                </button>
                            </div>

                            {error && <p className="text-red-400 text-xs sm:text-sm">{error}</p>}

                            <button type="submit" className="btn bg-[#FFAA6E] hover:bg-orange-400 text-white mt-2 sm:mt-4 w-full sm:w-auto">
                                Login
                            </button>
                        </fieldset>
                    </form>

                    {/* Google Sign-In */}
                    <button
                        onClick={handleGoogleSignIn}
                        className="btn w-full sm:w-auto mt-4 bg-white text-black border border-gray-300 hover:bg-sky-100 flex items-center justify-center gap-2"
                    >
                        <svg
                            aria-label="Google logo"
                            width="16"
                            height="16"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <g>
                                <path d="m0 0H512V512H0" fill="#fff"></path>
                                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                            </g>
                        </svg>
                        Login with Google
                    </button>

                    <p className="font-semibold text-center text-[12px] sm:text-sm mt-4">
                        Don't have an account?{' '}
                        <Link className="text-blue-700 font-semibold" to="/auth/register">
                            Register
                        </Link>
                    </p>
                </div>
            </div>

            
        </div>

    );
};

export default Login;