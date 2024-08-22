import React from 'react';
import databasesService from '../appwrite/databaseService';
import { Link } from 'react-router-dom';

function Postcard({ title, $id, image }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-800 rounded-xl p-4 shadow-md border border-gray-700 hover:border-orange-500 transition-transform duration-300 ease-in-out transform hover:scale-105'>
                <div className='w-full justify-center mb-4'>
                    <img
                        src={databasesService.filePreview(image)}
                        alt={title}
                        className='rounded-xl'
                    />
                </div>
                <h2 className='text-xl font-bold text-orange-400'>
                    {title}
                </h2>
            </div>
        </Link>
    );
}

export default Postcard;
