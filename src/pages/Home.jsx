import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import databasesService from '../appwrite/databaseService';
import { Container, Postcard } from '../components';
import '../App.css';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const isAuthenticated = useSelector((state) => state.auth.loginStatus);

    useEffect(() => {
        if (isAuthenticated) {
            databasesService.getAllPost()
                .then((response) => {
                    if (response && response.documents) {
                        setPosts(response.documents);
                    }
                })
                .catch(error => console.error("Error fetching posts: ", error))
                .finally(() => setLoading(false));
        } else {
            setPosts([]);
            setLoading(false);
        }
    }, [isAuthenticated]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-black transition-opacity duration-300 ease-in-out opacity-100">
                <Container>
                    <div className="text-center text-orange-400 fade-in">
                        <h1 className="text-2xl font-bold">Loading posts...</h1>
                    </div>
                </Container>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-black transition-opacity duration-300 ease-in-out opacity-100">
                <Container>
                    <div className="text-center text-orange-400 fade-in ">
                    <h1 className="text-2xl font-bold typing-effect transition-opacity duration-500 ease-in-out">
                            Please log in to view posts.
                        </h1>
                    </div>
                </Container>
            </div>
        );
    }

    if (posts.length <= 0) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-black transition-opacity duration-300 ease-in-out opacity-100">
                <Container>
                    <div className="text-center text-orange-400 fade-in">
                        <h1 className="text-2xl font-bold typing-effect">
                            No posts available. Create posts.
                        </h1>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full bg-black'>
            <Container>
                <div className='flex flex-wrap -mx-2'>
                    {posts.map((post) => (
                        <div
                            key={post.$id}
                            className='p-2 w-full md:w-1/2 lg:w-1/4 content-transition'
                        >
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
