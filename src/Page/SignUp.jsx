import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuth'
import { Eye, EyeOff, Loader, Mail, MessageSquare, User, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../Components/AuthImagePattern';
import toast from 'react-hot-toast';

const SignUp = () => {
    const { isSigningUp, signUp } = useAuthStore();
    const initialState = {
        fullName: "",
        email: "",
        password: ""
    };
    const [signUpData, setSignupData] = useState(initialState);
    const [hidePassword, setHidePassword] = useState(true);

    const handleInputChange = (e) => {
        setSignupData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = validateForm()
        if (success === true) {
            signUp(signUpData)
        }

    }
    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!signUpData.fullName.trim()) return toast.error("Full name is required");
        if (!signUpData.email.trim()) return toast.error("Email is required");
        if (!signUpData.password.trim()) return toast.error("Password is required");
        if (!emailRegex.test(signUpData.email)) return toast.error("Invalid email format");
        if (signUpData.password.length < 6) return toast.error("Password must be at least 6 characters");
        return true
    }

    return (
        <div className='min-h-screen grid lg: grid-cols-2 ' >
            {/* Left-Side  */}



            <div className="flex flex-col justify-center items-center p-6 sm:p-12  ">
                <div className="w-full max-w-md space-y-8  ">

                    {/* LOGO   */}
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 f=group">
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors ">
                                <MessageSquare className="size-6 text-primary" />
                            </div>
                            <h1 className='text-2xl font-bold mt-2 ' >Create Account</h1>
                            <p className='text-base-content/60' >Get started with your free account.    </p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className='space-y-6'  >
                        <div className="form-control">
                            <label htmlFor="" className="label">
                                <span className="label-text font-medium ">Full Name</span>
                            </label>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className='size-5 mt-2 text-base-content/40 z-2' />
                                </div>
                                <input
                                    type='text'
                                    className={`input input-bordered w-full pl-10 mt-2`}
                                    placeholder='John Doe'
                                    value={signUpData.fullName}
                                    name='fullName'
                                    onChange={handleInputChange}

                                />
                            </div>
                        </div>
                        <div className="form-control">
                            <label htmlFor="" className="label">
                                <span className="label-text font-medium ">Email</span>
                            </label>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className='size-5 mt-2 text-base-content/40 z-2' />
                                </div>
                                <input
                                    type='text'
                                    className={`input input-bordered w-full pl-10 mt-2`}
                                    placeholder='Work@email.com'
                                    value={signUpData.email}
                                    name='email'
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-control">
                            <label htmlFor="" className="label">
                                <span className="label-text font-medium ">Password</span>
                            </label>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className='size-5 mt-2 text-base-content/40 z-2 ' />
                                </div>
                                <input
                                    type={hidePassword ? "password" : "text"}
                                    className={`input input-bordered w-full pl-10 mt-2`}
                                    placeholder='********'
                                    value={signUpData.password}
                                    name='password'
                                    onChange={handleInputChange}
                                />

                                <button className='absolute inset-y-0 right-0 pr-3 flex items-center' type='button' onClick={() => setHidePassword(!hidePassword)} >
                                    {
                                        hidePassword ? (
                                            <Eye className='size-5 text-base-content/40  z-5 mt-2 ' />

                                        ) : (
                                            <EyeOff className='size-5 text-base-content/40 z-5 mt-2  ' />
                                        )
                                    }
                                </button>
                            </div>
                        </div>

                        <button type='submit' className='btn btn-primary w-full' disabled={isSigningUp} >
                            {
                                isSigningUp ? (<>
                                    <Loader className='size-5 animate-spin' />
                                    Loading...
                                </>
                                ) : (
                                    "Create Account"
                                )
                            }
                        </button>

                        <div className="text-center">
                            <p className="text-base-content/60" />
                            Already have an account?{" "}
                            <Link to={"/login"} className='link link-primary z-2' >Sign in </Link>
                        </div>
                    </form>
                </div>

            </div>

            <AuthImagePattern title={"Join Our Community"} subtitle={"Connect with friends, share moments, and stay in touch with your Friends."} />
        </div>
    )
}

export default SignUp
