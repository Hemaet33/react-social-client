import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import axios from "axios";

const Share = () => {
  const [file, SetFile] = useState(null);
  const [desc, SetDesc] = useState("");
  const PF = "../../../public/images/";


  const handleClick = async(e)=>{
    e.preventDefault();
    const newPost = {
      desc : desc
    }
    
    if(file){
      const data = new FormData();
      data.append('file',file);
      
    try {
      const res = await axios.post("https://react-social-api.onrender.com/api/upload/",data,{
        withCredentials: true
      });
      newPost.img = await res.data.url
    } catch (error) {
      console.log(error);
    }
    }

    try {
      await axios.post("https://react-social-api.onrender.com/api/posts/",newPost,{
        withCredentials: true
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  
  const {currentUser} = useContext(AuthContext)
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
          <img
            src={currentUser.profilePic || "https://res.cloudinary.com/diiszoitk/image/upload/v1694809675/noAvatar_l1qqsa.png"}
            alt=""
          />
          <input type="text" value={desc} placeholder={`What's on your mind ${currentUser.name}?`} onChange={(e)=>SetDesc(e.target.value)} />
          </div>
          <div className="right">
            {file && <img className="file" alt="" src={URL.createObjectURL(file)} />}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} onChange={(e)=>SetFile(e.target.files[0])}/>
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
