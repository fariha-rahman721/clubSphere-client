import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';



const googleProvider = new GoogleAuthProvider();

const Register = () => {
    const { createUser, setUser, updateUser } = use(AuthContext);
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const { name, photo, email, password } = data;

        

        // Password validation (unchanged logic)
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            return;
        } else if (!hasUppercase || !hasLowercase) {
            setPasswordError('Password must include both uppercase and lowercase letters');
            return;
        } else if (!hasSpecialChar) {
            setPasswordError('Password must include at least 1 special character');
            return;
        } else {
            setPasswordError('');
        }

        setLoading(true);

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo });
                        toast.success(`Welcome ${name}!`);
                        navigate('/auth/login');
                        setLoading(false);
                    })
                    .catch((err) => {
                        toast.error(err.message);
                        setLoading(false);
                    });
            })
            .catch((err) => {
                toast.error(err.message);
                setLoading(false);
            });
    };

    const handleGoogleRegister = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                setUser(user);
                toast.success(`Welcome ${user.displayName || 'User'}!`);
                navigate('/');
            })
            .catch((err) => toast.error(err.message));
    };

    return (
        <div className="w-11/12 max-w-4xl mx-auto">
            <div className="flex justify-center items-center min-h-screen px-2 sm:px-4">
                <div className="card bg-base-100 w-full max-w-sm sm:max-w-md md:max-w-lg shadow-2xl py-5 px-4 sm:px-6 md:px-8">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-orange-500 mb-4">
                        Join ClubSphere
                    </h1>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="card-body p-0 flex flex-col gap-4"
                    >
                        <label className="label text-sm sm:text-base">Name</label>
                        <input
                            {...register('name', { required: true,
                                maxLength: {
                                    value:20,
                                    message: "Name cannot be too long"
                                }
                             })}
                            type="text"
                            className="input w-full"
                            placeholder="Your name"
                            required
                        />
                        {errors.name && <p className='text-red-500 text-xs'>{errors.name.message}</p>}

                        <label className="label text-sm sm:text-base">Photo URL</label>
                        <input
                            {...register('photo', { required: true ,
                                message: "Photo is required"
                            })}
                            type="url"
                            className="input w-full"
                            placeholder="Photo URL"
                            required
                        />
                         {errors.photo && <p className='text-red-500 text-xs'>{errors.name.message}</p>}

                        <label className="label text-sm sm:text-base">Email</label>
                        <input
                            {...register('email', { required: true ,
                                 message: "Email is required"
                            })}
                            type="email"
                            className="input w-full"
                            placeholder="Email"
                            required
                        />
                         {errors.email && <p className='text-red-500 text-xs'>{errors.name.message}</p>}

                        <label className="label text-sm sm:text-base">Password</label>
                        <input
                            {...register('password', { required: true ,
                                 message: "Password is required"
                            })}
                            type="password"
                            className="input w-full"
                            placeholder="Password"
                            required
                        />

                        {passwordError && (
                            <p className="text-xs sm:text-sm text-red-500">
                                {passwordError}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="btn bg-[#FFAA6E] hover:bg-orange-500 text-white w-full sm:w-auto mt-2"
                            disabled={loading}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>

                        <button
                            type="button"
                            onClick={handleGoogleRegister}
                            className="btn btn-outline w-full sm:w-auto mt-2 flex items-center justify-center gap-2"
                        ><svg
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
                            Register with Google
                        </button>

                        <p className="font-semibold text-center text-[12px] sm:text-sm mt-3">
                            Already have an account?{' '}
                            <Link className="text-blue-700 font-semibold" to="/auth/login">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

            <Toaster />
        </div>
    );
};

export default Register;
