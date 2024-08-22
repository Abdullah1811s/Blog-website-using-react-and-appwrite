import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from './store/store.js'
import './index.css'
import { AuthLayout, Login } from './components/index.js'
import Home from './pages/Home.jsx'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SingUp from './pages/Signup.jsx'
import EditPost from './pages/EditPost.jsx'
import AddPost from './pages/AddPost.jsx'
import Allpost from './pages/Allpost.jsx'
import Post from './pages/Post.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: (
                    <AuthLayout authentication={false}>
                        <Login />
                    </AuthLayout>
                )
            },
            {
                path: "/signup",
                element: (
                    <AuthLayout authentication={false}>
                        <SingUp />
                    </AuthLayout>
                ),
            },
            {
                path: "/all-posts",
                element: (

                    <Allpost />

                ),
            },
            {
                path: "/add-post",
                element: (
                    <AddPost />
                ),
            },
            {
                path: "/edit-post/:slug",
                element: (
                    <EditPost />
                ),
            },
            {
                path: "/post/:slug",
                element: <Post />,
            },
        ],
    },
])



ReactDOM.createRoot(document.getElementById('root')).render(

    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>

)