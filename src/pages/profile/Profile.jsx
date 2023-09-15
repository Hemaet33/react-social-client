import './profile.scss';
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from '../../components/posts/Posts';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/authContext';
import Update from '../../components/update/Update';

function Profile() {
  const {currentUser} = useContext(AuthContext)
  const userId = useParams();
  const [user, setUser] = useState([]);
  const [userPost, setUserPost] = useState(true);
  const [followers, setFollowers] = useState([]);
  const [followed, setFollowed] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);


  useEffect(()=>{
    const fetchUser = async()=>{
      const resPost = await axios.get(`https://react-social-api.onrender.com/api/users/post/${userId.id}`,{
        withCredentials: true
      });
      
      if(resPost.data.length > 0){

        const resp = await axios.get(`https://react-social-api.onrender.com/api/users/profile/${userId.id}`,{
          withCredentials: true
        });
        setUser(resp.data[0]);
      }else{
        const res = await axios.get(`https://react-social-api.onrender.com/api/users/profile/${userId.id}/q`,{
          withCredentials: true
        });
        await setUserPost(false);
        setUser(res.data[0])
      }
    }
    fetchUser();
  },[userId]);

  const handleUnfollow=async()=>{
    await axios.delete(`https://react-social-api.onrender.com/api/relationships/${userId.id}`,{
        withCredentials: true
      });

      setFollowed(!followed);
  }

  const handleFollow=async()=>{
    await axios.post(`https://react-social-api.onrender.com/api/relationships/`,{followedUserId: userId.id},{
        withCredentials: true
      });

      setFollowed(!followed);
  }

  useEffect(()=>{
    const getFollowers = async()=>{
      const res = await axios.get(`https://react-social-api.onrender.com/api/relationships/${userId.id}`,{
          withCredentials: true
        });
        setFollowers(res.data);
    }
    getFollowers();
  },[userId,followed]);


  return (
    <>
    <div className='profile'>
      <div className="images">
        <img src={user.coverPic || "https://res.cloudinary.com/diiszoitk/image/upload/v1694809710/noCover_nmxegz.png"} alt="" className="cover" />
        <img src={user.profilePic || "https://res.cloudinary.com/diiszoitk/image/upload/v1694809675/noAvatar_l1qqsa.png"} alt="" className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
          <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="small" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="small" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="small" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="small" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="small" />
            </a>
          </div>

          <div className="center">
            <span>{user.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{user.city}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{user.website}</span>
              </div>
            </div>
              {parseInt(userId.id) !== currentUser.id ? followers.includes(currentUser.id) ? <button style={{color:"#000", backgroundColor:"#ddd"}} onClick={handleUnfollow}>Following</button> : <button onClick={handleFollow}>Follow</button>  : <button onClick={()=>setUpdateOpen(true)}>Update</button>}
          </div>

          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        
          <Posts userId={userId} />
      </div>
      
    {updateOpen && <Update setUpdateOpen={setUpdateOpen} user={user} key={user.id} />}
    </div>
    </>
  )
}

export default Profile
