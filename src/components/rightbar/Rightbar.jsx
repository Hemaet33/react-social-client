import { useEffect, useState } from "react";
import "./rightbar.scss";
import axios from 'axios';
import { Link } from "react-router-dom";

const Rightbar = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(false);

  const handleFollow=async(id)=>{
    await axios.post(`https://react-social-api.onrender.com/api/relationships/`,{followedUserId: id},{
        withCredentials: true
      });

      setFollowed(!followed);
  }


  useEffect(()=>{
    const fetchSuggestions = async()=>{
      const res = await axios.get("https://react-social-api.onrender.com/api/users",{
        withCredentials: true
      });
      setSuggestions(res.data);
    }
    fetchSuggestions();
  },[followed])


  useEffect(()=>{
    const fetchFriends = async()=>{
      const res = await axios.get("https://react-social-api.onrender.com/api/users/friends",{
        withCredentials: true
      });
      setFriends(res.data);
    }
    fetchFriends();
  },[]);
  return (
    <div className="rightbar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>

          {suggestions.map(user=>(
            <div className="user" key={user.id}>
            <Link to={`/profile/${user.id}`}>
            <div className="userInfo">
              <img
                src={user.profilePic || "https://res.cloudinary.com/diiszoitk/image/upload/v1694809675/noAvatar_l1qqsa.png"}
                alt=""
              />
              <span>{user.name}</span>
            </div>
            </Link>
            <div className="buttons">
              <button onClick={()=>handleFollow(user.id)}>follow</button>
            </div>
          </div>
          ))}
         
        </div>
        <hr />
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
        <hr />
        <div className="item">
          <span>Online Friends</span>
          {friends.map(friend=>(
            <Link to={`/profile/${friend.id}`}  key={friend.id}>
            <div className="user">
            <div className="userInfo">
              <img
                src={friend.profilePic || "https://res.cloudinary.com/diiszoitk/image/upload/v1694809675/noAvatar_l1qqsa.png"}
                alt=""
              />
              <div className="online" />
              <span>{friend.name}</span>
            </div>
          </div>
          </Link> 
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
