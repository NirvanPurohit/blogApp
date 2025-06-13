import React ,{useState,useEffect} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import service from "../../appwrite/config";
import { Container, PostForm } from "../../components";

function EditPost() {

  const [post, setPost] = React.useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if(slug){
      service.getPost(slug).then((post)=>setPost(post))
    }
    else{
      navigate("/")
    }

  },[slug,navigate])
  return (
    post? (
      <div className='py-8'>
        <Container>
          <PostForm post={post} />
        </Container>
      </div>
    ):null
  )
}

export default EditPost