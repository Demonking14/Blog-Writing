import React from 'react'
import { useEffect, useState } from 'react'
import services from '../Appwrite/conf'
function AllPost() {
    const [posts , setPosts] = useState([])
    useEffect(()=>{} , [])
    services.getDocuments().then((post)=>{
        if(post){
            setPosts(post.documents)
        }
    })
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>

      
    </div>
  )
}

export default AllPost
