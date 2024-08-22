import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Logo, Container, LogOutBtn } from '../index';

function Header() {
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.loginStatus);

    useEffect(() => {
    }, [authStatus]);

    const navItems = [
        {
            name:
                'Home',
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
            name: "My Posts",
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
        <header className="py-4 bg-black shadow-lg">
            <Container className="flex items-center justify-center">
                <nav className="flex items-center justify-center space-x-6 font-monospace">
                    <ul className="flex space-x-6">
                        {navItems.map((item) =>
                            item.active ? (
                                <li
                                    key={item.name}
                                    className={`relative pb-1 ${window.location.pathname === item.slug
                                            ? 'after:content-[""] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-orange-400 after:w-full'
                                            : 'after:content-[""] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-transparent after:w-0 after:transition-all after:duration-500 after:ease-in-out hover:after:w-full hover:after:bg-orange-400'
                                        }`}
                                >
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className={`text-gray-400 text-xl px-4 py-2 rounded-md bg-transparent shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${window.location.pathname === item.slug
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
                                <LogOutBtn className="text-orange-400 px-4 py-2 rounded-md bg-transparent hover:bg-red-600 hover:text-white shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105" />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;