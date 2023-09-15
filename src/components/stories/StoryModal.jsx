import { useState } from 'react';
import './storyModal.scss';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import axios from 'axios';

function StoryModal({setOpenStroyModal}) {
  const [storyImg, setStroyImg] = useState(null);

  const handleClick = async(e)=>{
    e.preventDefault();
    const story = {}
    
    if(storyImg){
      const image = new FormData();
      image.append('file',storyImg);
      
    try {
      const res = await axios.post("https://react-social-api.onrender.com/api/upload/",image,{
        withCredentials: true
      });
      story.img = await res.data.url
      console.log(story);
    } catch (error) {
      console.log(error);
    }
    }

    try {
      await axios.post("https://react-social-api.onrender.com/api/stories/",story,{
        withCredentials: true
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='storyModal'>
    <div className="storyModalContainer">
      <form>
        <label className='showImg' htmlFor="story">
      {storyImg && <img src={URL.createObjectURL(storyImg)} alt="story image" />}
        {!storyImg && <span>
        <PhotoSizeSelectActualOutlinedIcon className='imgicon' />
        <h2>Add Stroy Image</h2>
        </span>}
        </label>
        <input type="file" id="story" onChange={(e)=>setStroyImg(e.target.files[0])} style={{display:"none"}}/>
        <button onClick={handleClick}>Add to Story</button>
      </form>
      </div>
      <span onClick={()=>setOpenStroyModal(false)} className='dismiss' >X</span>
    </div>
  )
}

export default StoryModal
