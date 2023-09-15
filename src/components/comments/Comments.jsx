import { useContext, useEffect, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../contexts/authContext";
import axios from "axios";

const Comments = ({postId,setCommentsCount}) => {
  const { currentUser } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const addComment = async(e)=>{
    e.preventDefault();
    await axios.post("https://react-social-api.onrender.com/api/comments/", {desc:comment, postId:postId},{
      withCredentials: true
    });

    setComment("");
  }

    useEffect(()=>{
    const fetchComments = async()=>{
      try {
        const res = await axios.get("https://react-social-api.onrender.com/api/comments/"+postId);
        await setComments(res.data);
        setCommentsCount(res.data.length);
      } catch (error) {
        console.log(error);
      }
    }
    fetchComments();
  },[postId, comment])

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input type="text" value={comment} placeholder="write a comment" onChange={(e)=>setComment(e.target.value)}/>
        <button onClick={addComment}>Send</button>
      </div>
      {comments.map((comment) => (
        <div className="comment">
          <img src={comment.profilePic || "https://res.cloudinary.com/diiszoitk/image/upload/v1694809675/noAvatar_l1qqsa.png"} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
