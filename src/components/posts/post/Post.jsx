import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import './post.scss';
import Comments from "../../comments/Comments";
import { createContext, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';
import axios from "axios";
import { AuthContext } from "../../../contexts/authContext";
import Posts from "../Posts";


function Post({post,setDeletedPost}) {
  const {currentUser} = useContext(AuthContext)
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  


  
  useEffect(()=>{
    const getLikes = async()=>{
      
      const res = await axios.get("https://react-social-api.onrender.com/api/likes?postId="+post.id,{
        withCredentials: true
      });
      setLikes(res.data);
    }
    getLikes();
  },[post,liked])


  const likePost = async()=>{
    await axios.post(`https://react-social-api.onrender.com/api/likes`,{postId:post.id},{
      withCredentials: true
    });
    setLiked(!liked)
  }


  const dislikePost = async()=>{
    await axios.delete(`https://react-social-api.onrender.com/api/likes/${post.id}`,{
      withCredentials: true
    });
    setLiked(!liked)
  }

  useEffect(()=>{
    const counComment = async()=>{
      const res = await axios.get("https://react-social-api.onrender.com/api/comments/"+post.id);
      setCommentsCount(res.data.length)
    }
    counComment();
  },[post,commentsCount]);

    const deletePost = async()=>{
      await axios.delete(`https://react-social-api.onrender.com/api/posts/${post.id}`, {
        withCredentials:true
      });
      setDeletedPost(true);
    }



  return (
    <>
    <div className='post'>
    
      <div className="user">
        <div className="userInfo">
        <img src={post.profilePic || "https://res.cloudinary.com/diiszoitk/image/upload/v1694809675/noAvatar_l1qqsa.png"} alt="" />
        <div className="details">
          <Link to={`/profile/${post.userId}`} style={{textDecoration:"none", color:"inherit"}}>
            <span className="name">{post.name}</span>
          </Link>
            <span className="date">{moment(post.createdAt).fromNow()}</span>
        </div>
        </div>
        {currentUser.id == post.userId && <span className="delPost" onClick={deletePost} title="Delete post">x</span>}
      </div>

      <div className="content">
        <p>{post.desc}</p>
        <img src={`${post.img}`} alt="" />
      </div>

      <div className="info">
        <div className="item">
          {likes.includes(currentUser.id) ? <FavoriteOutlinedIcon style={{color:"red"}} onClick={dislikePost}  /> : <FavoriteBorderOutlinedIcon onClick={likePost}  />}
          {likes.length > 0 ? `${likes.length} people like it.` : "Be the first to like it."}
        </div>
        <div className="item" onClick={()=>setCommentsOpen(!commentsOpen)}>
          <TextsmsOutlinedIcon />
          {commentsCount > 0 ? `${commentsCount} Comments` : 'No comment'}
        </div>
        <div className="item">
          <ShareOutlinedIcon />
          Share
        </div>
      </div>

      {commentsOpen && <Comments key={post.id}  postId={post.id} setCommentsCount={setCommentsCount} />}
      </div>
    
    </>
  )
}

export default Post
