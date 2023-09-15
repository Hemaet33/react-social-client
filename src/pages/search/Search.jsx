import { useEffect, useState } from 'react';
import './search.scss';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function Search() {
  const name = useParams();
  const [results, setResults]=useState([]);

  const PF = "../../../public/images/";

  useEffect(()=>{
    const fetchUser = async()=>{
      const res = await axios.get(`https://react-social-api.onrender.com/api/users/search/${name.name}`,{
        withCredentials: true
      });
  
      setResults(res.data);
    }
    fetchUser();
  },[name]);


  return (
    <div className='searcher'>
     {results.length > 0 ? results.map(user=>(
      <div className="result" key={user.id}>
       <Link to={`/profile/${user.id}`}>
       <div className="user_identitty">
        <img src={user.profilePic || PF+"noAvatar.png"} alt="" />
        <h2>{user.name}</h2>
        </div>
       </Link>
        <ul className="user_desc">
        {user.city && <li>City: {user.city}</li>}
        {user.email && <li>Email: {user.email}</li>}
        {user.website && <li>Website: {user.website}</li>}
        </ul>
      </div>
     )) : <h1>No such user found</h1>}
    </div>
  )
}

export default Search
