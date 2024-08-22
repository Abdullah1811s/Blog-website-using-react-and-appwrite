import React from 'react';
import { Container, PostForm } from '../components';

function AddPost() {
    return (
        <div className='bg-black py-2'>
            <Container>
                <PostForm />
            </Container>
        </div>
    );
}

export default AddPost;
