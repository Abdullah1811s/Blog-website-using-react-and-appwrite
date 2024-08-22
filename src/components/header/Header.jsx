import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Logo, Container, LogOutBtn } from '../index';
import { Link } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.loginStatus);

    useEffect(() => {
        console.log('Auth status changed:', authStatus);
    }, [authStatus]);

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus
        },
    ];

    return (
        <header className='py-4 bg-black shadow-lg'>
            <Container className='flex items-center justify-center'>
                <nav className='flex items-center justify-center space-x-6'>
                    <ul className='flex space-x-6'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className={`text-orange-400 font-monospace text-xl px-4 py-2 rounded-md bg-transparent shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
                                            window.location.pathname === item.slug
                                                ? 'text-orange-400'
                                                : 'text-gray-600'
                                        }`}
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogOutBtn className='text-orange-400 px-4 py-2 rounded-md bg-transparent hover:bg-red-600 hover:text-white shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105' />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;
