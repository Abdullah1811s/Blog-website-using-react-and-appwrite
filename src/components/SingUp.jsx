import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Logo } from './index'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { logIn } from '../store/authSlice'

function SingUp() {
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setLoading(true);
        try {
            const isSignedUp = await authService.createAccount(data);
            if (isSignedUp) {
                const userData = await authService.getUser();
                if (userData) {
                    dispatch(logIn(userData));
                    navigate('/');
                }
            }
        } catch (err) {
            setError(err.message || 'An error occurred during sign up');
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="mb-10 mx-auto w-full max-w-md bg-gray-950 border-0 outline-none hover:shadow-orange-300/15 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-xl rounded-3xl p-10 border-gray-700">
                <div className="mb-15 flex justify-center">

                </div>
                <h2 className="text-center text-3xl font-extrabold text-orange-400">
                    Create Your Account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-300">
                    Sign up to get started
                </p>
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <Input
                                label="Name"
                                placeholder="Enter your name"
                                className="block w-full px-4 ml-6 py-3 border border-gray-700 placeholder-gray-400 text-gray-100 bg-gray-800 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                {...register('name', { required: true })}
                            />
                        </div>  
                        <div className="relative">
                            <Input
                                label="Email"
                                placeholder="Enter your email"
                                type="email"
                                className="block w-full px-4 py-3  ml-7  border border-gray-700 placeholder-gray-400 text-gray-100 bg-gray-800 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                {...register('email', {
                                    required: true,
                                    validate: {
                                        matchPattern: (value) =>
                                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            'Email address must be a valid address',
                                    },
                                })}
                            />
                        </div>
                        <div className="relative">
                            <Input
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                                className="block w-full px-4 py-3 border border-gray-700 placeholder-gray-400 text-gray-100 bg-gray-800 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                {...register('password', { required: true })}
                            />
                        </div>
                    </div>
                    <Button
                        type="submit"
                        className={`w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg ${isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-300 ease-in-out transform hover:scale-105`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Sign Up'}
                    </Button>
                </form>
                <div className="mt-6 flex text-gray-300 items-center justify-between">
                    Already have an account?
                    <Link
                        to="/login"
                        className="text-sm font-medium text-orange-400 hover:text-orange-300"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}


export default SingUp