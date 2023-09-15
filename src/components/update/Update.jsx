import { useContext, useState } from 'react';
import './update.scss';
import axios from 'axios';
import { AuthContext } from '../../contexts/authContext';

function Update({setUpdateOpen, user}) {
  const {fetchContextUser}=useContext(AuthContext)
  const [coverFile, setCoverFile] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [texts, setTexts] = useState({
    name:user.name,
    city: user.city,
    website:user.website,
    coverPic:user.coverPic,
    profilePic:user.profilePic
  });
  
  const handleChange = (e)=>{
    setTexts((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    }));
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const updatedUser = {
      name : texts.name,
      city : texts.city,
      website : texts.website,
      coverPic : texts.coverPic,
      profilePic : texts.profilePic,
    }
    
      if(coverFile){
        const cover = new FormData();
        cover.append('file',coverFile);
      
    try {
      const res = await axios.post("https://react-social-api.onrender.com/api/upload/",cover,{
        withCredentials: true
      });
      updatedUser.coverPic = await res.data.url
    } catch (error) {
      console.log(error);
    }
    }
    

      if(profileFile){
        const profile = new FormData();
        profile.append('file',profileFile);
  
        try {
          const res = await axios.post("https://react-social-api.onrender.com/api/upload/",profile,{
            withCredentials: true
          });
          updatedUser.profilePic = await res.data.url
          
        } catch (error) {
          console.log(error);
        }
        
      }
    

      try {
        await axios.patch("https://react-social-api.onrender.com/api/users/",updatedUser,{
        withCredentials: true
      });
      fetchContextUser();
      } catch (error) {
        console.log(error);
      }
    }
  


  return (
    <div className='update'>
      <div className="updateContainer">
          <img src={"../../../public/images/" +user.profilePic} alt="" />
          <span>{user.name}</span>
          <form>
            <label htmlFor="cover">Cover Photo</label><input type="file" id="cover" onChange={(e)=>setCoverFile(e.target.files[0])} />
            <label htmlFor="profile">Profile Photo</label><input type="file" id="profile" onChange={(e)=>setProfileFile(e.target.files[0])} />
            <div className="infos">
              <div className="info-group">
                <label>Name</label><input type="text" value={texts.name || ""} name="name" onChange={handleChange} />
              </div>
              <div className="info-group">
                <label>city</label><input type="text" value={texts.city || ""} name="city" onChange={handleChange} />
              </div>
              <div className="info-group">
                <label>Website</label><input type="text" value={texts.website || ""} name="website" onChange={handleChange} />
              </div>
            </div>

            <button onClick={handleSubmit}>Update</button>
          </form>
      </div>
      <span onClick={()=>setUpdateOpen(false)} className="cancel">X</span>
    </div>
  )
}

export default Update;