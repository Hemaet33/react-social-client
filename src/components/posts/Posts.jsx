import { useEffect, useState } from 'react';
import Post from './post/Post';
import './posts.scss';
import axios from 'axios';


function Posts({userId}) {
    const [posts, setPosts] = useState([]);
    const [havePosts, setHavePosts] = useState(true);
    useEffect(()=>{
      const userPosts = async()=>{
        try {
          if(userId){
            const res = await axios.get("https://react-social-api.onrender.com/api/posts?userId="+userId.id,{
            withCredentials: true
          });
          await setPosts(res.data);
          res.data.length>0 ? setHavePosts(true) : setHavePosts(false)
          }else{
            const res = await axios.get("https://react-social-api.onrender.com/api/posts/",{
            withCredentials: true
          });
          await setPosts(res.data);
          res.data.length>0 ? setHavePosts(true) : setHavePosts(false)
          }
        } catch (error) {
          console.log(error);
        }
      }
      userPosts();
    },[]);
  return (
    <div className='posts'>
      {havePosts ? <h1>No posts to show.</h1> :
        posts.map(post=>(
          <Post post={post} key={post.id} userId = {userId} />
        ))
      }
    </div>
  )
}

export default Posts
