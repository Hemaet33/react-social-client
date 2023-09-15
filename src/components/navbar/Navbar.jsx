import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import './navbar.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { DarkModeContext } from '../../contexts/darkModeContext';
import { AuthContext } from '../../contexts/authContext';
import axios from 'axios';

function Navbar() {
  const navigate = useNavigate();
  const {currentUser} = useContext(AuthContext);
  const {toggle, darkMode} = useContext(DarkModeContext);
  const [search, setSearch]=useState("");
  const PF = "../../../public/images/";


  const handleSubmit = async(e)=>{
    e.preventDefault();
    
    navigate(search);
  }

  
  const handleLogout = async()=>{
    await axios.post("https://react-social-api.onrender.com/api/auth/logout");
    await localStorage.removeItem("user");
    navigate("/login");
  }


  return (
    <div className='navbar'>
      <div className="left">
        <Link to="/" style={{textDecoration:"none"}}>
          <span>Social</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? <WbSunnyOutlinedIcon onClick={toggle} /> : <DarkModeOutlinedIcon onClick={toggle}/>}
        <GridViewOutlinedIcon />
        <form action={`/search/${search}`} className="search" onSubmit={handleSubmit}>
          <SearchOutlinedIcon />
          <input type="text" placeholder='Search' onChange={(e)=>setSearch("/search/"+e.target.value)} />
          <button type="submit" style={{display:"none"}}></button>
        </form>
          <button className="logout" onClick={handleLogout}>Logout</button>
      </div>

      <div className="right"> 
        <span className='person'>
          <Person2OutlinedIcon />
        </span>
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <Link to={`/profile/${currentUser.id}`}>
        <div className="user">
          <img src={currentUser.profilePic || PF + "noAvatar.png"} alt="" />
          <span>{currentUser.name}</span>
        </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
