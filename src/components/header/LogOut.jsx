import React from 'react'
import { useDispatch } from 'react-redux'
import  authService  from '../../appwrite/auth'
import { logOut } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'
function LogOutBtn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const doLogout = () => {
        authService.logOut().then(() => {
            dispatch(logOut())
        });
        navigate('/')

    }
    return (
        <button
            onClick={doLogout}
            className="px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 hover:shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
        >
            Logout
        </button>
    )
}

export default LogOutBtn