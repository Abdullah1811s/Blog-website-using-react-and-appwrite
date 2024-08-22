import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import databasesService from '../appwrite/databaseService'
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [posts, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate()
    useEffect(() => {
        if (slug) {
            databasesService.getPost(slug) 
                .then((post) => {
                    post && (setPost(post))
                })
        }
        else {
            navigate(`/`);
        }

    }, [slug, navigate])
    return posts ? (
        <div className='py-8'>
            <Container>
                <PostForm post={posts} />
            </Container>
        </div>
    ) : null
}

export default EditPost