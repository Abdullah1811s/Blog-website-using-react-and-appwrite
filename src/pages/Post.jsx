import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import databasesService from "../appwrite/databaseService";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userDetail.payload);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (slug) {
                    const fetchedPost = await databasesService.getPost(slug);
                    if (fetchedPost) {
                        setPost(fetchedPost);
                    } else {
                        navigate("/");
                    }
                } else {
                    navigate("/");
                }
            } catch (error) {
                console.error("Error fetching post:", error);
                navigate("/");
            }
        };

        fetchPost();
    }, [slug, navigate]);

    const deletePost = async () => {
        try {
            const status = await databasesService.deletePost(post.$id);
            if (status) {
                await databasesService.deleteFile(post.image);
                navigate("/");
            }
        } catch (error) {
            console.error("Failed to delete post or associated file", error);
        }
    };

    return post ? (
        <div className="py-8 bg-black text-gray-100">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border-0 rounded-xl p-2 ">
                    <img
                        src={databasesService.filePreview(post.image)}
                        alt={post.title}
                        className="rounded-xl"
                    />
                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex space-x-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button
                                    bgColor="bg-orange-600"
                                    hoverColor="bg-orange-700"
                                    className="text-gray-100"
                                >
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                bgColor="bg-red-600"
                                hoverColor="bg-red-700"
                                className="text-gray-100"
                                onClick={deletePost}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold text-orange-400">{post.title}</h1>
                </div>
                <div className="browser-css text-gray-300">
                    {parse(post.Content)}
                </div>
            </Container>
        </div>
    ) : null;
}
