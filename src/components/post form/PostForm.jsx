import React, { useCallback, useEffect, useState } from 'react';
import { Button, Input, Select, RTE } from '../index';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import databasesService from '../../appwrite/databaseService';
import conf from '../../config'; //TODO: ENV

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            Content: post?.Content || '',
            status: post?.status || 'active'
        }
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userDetail.payload);
    const [loading, setLoading] = useState(false); 

    const Submit = async (data) => {
        setLoading(true); 
        try {
            if (post) {
                const file = data.image?.[0] ? await databasesService.uploadFile(data.image[0]) : null;
                if (file) {
                    await databasesService.deleteFile(post.image);
                }
                const updated = await databasesService.updatePost(post.$id, {
                    ...data,
                    image: file ? file.$id : post.image
                });
                navigate(`/post/${updated.$id}`);
            } else {
                const file = data.image?.[0] ? await databasesService.uploadFile(data.image[0]) : null;
                if (file) {
                    const fileID = file.$id;
                    data.image = fileID;
                    
                    if (userData) {
                        const addedDoc = await databasesService.createPost({
                            ...data,
                            userId: userData.$id    
                        });
                        addedDoc && navigate(`/post/${addedDoc.$id}`);
                    } else {
                        console.log("user data is not defined");
                    }
                }
            }
        } catch (error) {
            console.error('Failed to submit the form:', error);
        } finally {
            setLoading(false);
        }
    };

    const slugTransform = useCallback(
        (value) => {
            if (value && typeof value === 'string') {
                return value
                    .trim()
                    .toLowerCase()
                    .replace(/\s+/g, '-');
            }
            return '';
        }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(Submit)} className="flex flex-wrap bg-black p-6 rounded-lg shadow-lg">
            <div className="w-full lg:w-2/3 px-4">
                <Input
                    label="Title:"
                    placeholder="Enter the title"
                    className="mb-4 bg-gray-800 text-gray-100 border-gray-700 focus:ring-orange-500 focus:border-orange-500 rounded-md"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug:"
                    placeholder="Auto-generated from title"
                    className="mb-4 bg-gray-800 text-gray-100 border-gray-700 focus:ring-orange-500 focus:border-orange-500 rounded-md"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content:" name="Content" control={control} defaultValue={getValues("Content")} />
            </div>
            <div className="w-full lg:w-1/3 px-4 mt-6 lg:mt-0">
                <Input
                    label="Featured Image:"
                    type="file"
                    className="mb-4 bg-gray-800 text-gray-100 border-gray-700 focus:ring-orange-500 focus:border-orange-500 rounded-md"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={databasesService.filePreview(post.image)}
                            alt={post.title}
                            className="rounded-lg shadow-md"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 bg-gray-800 text-gray-100 border-gray-700 focus:ring-orange-500 focus:border-orange-500 rounded-md"
                    {...register("status", { required: true })}
                />
                <Button
                    type="submit"
                    className={`w-full py-2 px-4 rounded-md shadow-lg text-gray-100 transition-colors duration-300 ${
                        loading
                            ? 'bg-gray-600 cursor-wait' // Style for loading state
                            : (post ? 'bg-green-600 hover:bg-green-700' : 'bg-orange-600 hover:bg-orange-700')
                    }`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg
                                className="animate-spin h-5 w-5 mr-3 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"
                                ></path>
                            </svg>
                            Processing...
                        </span>
                    ) : (
                        (post ? "Update" : "Submit")
                    )}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;