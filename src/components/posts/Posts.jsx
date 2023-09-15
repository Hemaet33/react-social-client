import { useEffect, useState } from 'react';
import Post from './post/Post';
import './posts.scss';
import axios from 'axios';


function Posts({userId,noPost}) {
    const [posts, setPosts] = useState([]);
    const [noPostMsg, setNoPostMsg]=useState("");
    useEffect(()=>{
      const userPosts = async()=>{
        try {
          let res;
          if(userId){
            res = await axios.get("https://react-social-api.onrender.com/api/posts?userId="+userId.id,{
            withCredentials: true
          });
          res.data.length<1 && setNoPostMsg("No posts to show.");
          }else{
            res = await axios.get("https://react-social-api.onrender.com/api/posts/",{
            withCredentials: true
          });
          res.data.length<1 && setNoPostMsg("No posts to show.");
          }
          setPosts(res.data);
        } catch (error) {
          console.log(error);
        }
      }
      userPosts();
    },[]);
  return (
    <div className='posts'>
      {noPostMsg !== "" ? <h1>{noPostMsg}</h1> :
        posts.map(post=>(
          <Post post={post} key={post.id} userId = {userId} />
        ))
      }
    </div>
  )
}

export default Posts
