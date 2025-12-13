import React, { useRef, useEffect } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router";

const ForgetPassword = () => {
    const emailRef = useRef();
    const location = useLocation();


    useEffect(() => {
        if (location.state?.email) {
            emailRef.current.value = location.state.email;
        }
    }, [location.state]);


    const handleResetPassword = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;

        if (!email) {
            toast.error("Please enter your email!");
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success("Password reset email sent! Redirecting to Gmail...");
                setTimeout(() => {
                    window.location.href = "https://mail.google.com";
                }, 2000);
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200">
            <div className="card bg-base-100 w-full max-w-sm shadow-xl p-6">
                <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>
                <form onSubmit={handleResetPassword} className="form-control space-y-3">
                    <label className="label font-semibold">Email</label>
                    <input
                        type="email"
                        ref={emailRef}
                        placeholder="Enter your email"
                        className="input input-bordered w-full"
                        required
                    />
                    <button type="submit" className="btn btn-neutral w-full">
                        Reset Password
                    </button>
                </form>
                <Toaster />
            </div>
        </div>
    );
};

export default ForgetPassword;