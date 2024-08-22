import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logIn } from '../store/authSlice';
import { Button, Input } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const userData1 = useSelector((state) => state.auth.userDetail);

    const login = async (data) => {
        setIsLoading(true);
        try {
            const isLoggedIn = await authService.login(data);
            if (isLoggedIn) {
                const userData = await authService.getUser();
                console.log(userData);
                if (userData) {
                    dispatch(logIn(userData));
                    setTimeout(() => {
                        console.log("User Data after Dispatch:", userData1);
                    }, 100);
                    navigate('/');
                }
            }
        } catch (error) {
            setError(error.message || "An unexpected error occurred");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="mb-8 mx-auto w-full max-w-md bg-gray-950  border-0 shadow-xl rounded-3xl p-10 hover:shadow-orange-300/15 transition-transform duration-300 ease-in-out transform hover:scale-105">
                <h2 className="mb-5 mt-5 text-center text-3xl font-extrabold text-orange-400">
                    Welcome Back
                </h2>
                <p className="mt-2 text-center text-sm text-gray-300">
                    Sign in to continue
                </p>
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            className="block w-full ml-7 px-4 py-3 border border-gray-700 placeholder-gray-400 text-gray-100 bg-gray-800 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                },
                            })}
                        />
                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            className="block w-full px-4 py-3 border border-gray-700 placeholder-gray-400 text-gray-100 bg-gray-800 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            {...register("password", {
                                required: true,
                            })}
                        />
                    </div>
                    <Button
                        type="submit"
                        className={`w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg transition duration-300 ease-in-out transform ${isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Log in'}
                    </Button>

                </form>
                <div className="mt-6 flex text-gray-300 items-center justify-between">
                    Don't have an account?
                    <Link
                        to="/signup"
                        className="text-sm font-medium text-orange-400 hover:text-orange-300"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
