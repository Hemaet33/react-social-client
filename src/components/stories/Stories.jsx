import { useContext, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import {AuthContext} from '../../contexts/authContext';
import './stories.scss';
import StoryModal from './StoryModal';
import axios from 'axios';
function Stories() {
  const {currentUser} = useContext(AuthContext);
  const PF = "../../../public/images/";

  const [openStroyModal, setOpenStroyModal] = useState(false);
  const [stories, setStories] = useState([]);
  const [storyDelTime, setStoryDelTime] = useState([]);

  useEffect(()=>{
    const fetchStories = async()=>{
      const res = await axios.get("https://react-social-api.onrender.com/api/stories",{
        withCredentials: true
      });
      setStories(res.data);
      
    }
    fetchStories();
  },[]);

  useEffect(()=>{
    const deleteStories = async()=>{
      const res = await axios.get("https://react-social-api.onrender.com/api/stories/2",{
        withCredentials: true
      });
    }
    deleteStories();
  },[storyDelTime]);


  return (
    <>
      <div className='stories' style={stories.length>3 ? {overflowX: "auto", overflowY:"hidden", whiteSpace:"nowrap"} : {overflowX:"hidden"}}>
      <div className="user_story" >
        <img src={currentUser.profilePic || PF + "noAvatar.png"} alt="" />
          <div className="create_story">
          <span onClick={()=>setOpenStroyModal(true)}><AddIcon /></span>
        <h4>Create story</h4>
          </div>
      </div>
      {
        stories.map(story=>(
          <div className="story" key={story.id}>
            <img src={story.img} alt="" />
            <span><Link to={`/profile/${story.userId}`}>{story.name}</Link></span>
          </div>
        ))
      }
    </div>
    {openStroyModal && <StoryModal setOpenStroyModal={setOpenStroyModal} />}
    </>
  )
}

export default Stories
