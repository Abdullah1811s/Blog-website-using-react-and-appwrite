import React from 'react'
import { useEffect, useState } from 'react'
import databasesService from '../appwrite/databaseService'
import { Container, Postcard } from '../components'
function Allpost() {
    const [post, setPost] = useState([]);
    useEffect(() => {
        databasesService.getAllPost([])
            .then((singlePost) => {
                // singlePost && (setPost(singlePost.documents))
                if(singlePost)
                {
                    setPost(singlePost.documents)
                }
                else 
                {
                    console.log("unable to get all post")
                }

            })
            console.log("in the function")
    }, [])
    return (
       <div className='w-full p-8'>
            <Container>
                <div className='flex flex-wrap'>
                   
                    {post.map((sp) => (
                        <div key={sp.$id} className='p-2 w-1/4'>
                            <Postcard {...sp}/>
                        </div>
                    ))}
                </div>
            </Container>
       </div>
    )
}

export default Allpost;  