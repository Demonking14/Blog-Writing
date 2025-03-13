import React from 'react'
import services from '../Appwrite/conf'
import { useState, useEffect } from 'react'
import { useParams , useNavigate } from 'react-router-dom'
import { Container, Postform } from '../components'

function EditPostPage() {
    const [post, SetPost] = useState([])
    const Navigate = useNavigate()
    const {slug} = useParams()
    useEffect((post)=>{
        
            services.getDocument(slug).then((post)=>{
                if(post){
                    SetPost(post)
                }
                else{
                    navigator('/')
                }
    })
        

    }, [slug, Navigate, ]
)

  return post? (
    <div className='py-8'>
        <Container>
            <Postform post={post}/>

        </Container>
    </div>
  ):null
}

export default EditPostPage
