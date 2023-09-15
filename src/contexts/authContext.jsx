import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  const login = async(inputs)=>{
    const res = await axios.post("https://react-social-api.onrender.com/api/auth/login", inputs, {
      withCredentials:true
    });
    setCurrentUser(res.data)
  }

    const fetchContextUser = async()=>{
      const resPost = await axios.get(`https://react-social-api.onrender.com/api/users/post/${currentUser.id}`,{
        withCredentials: true
      });
      
      if(resPost.data.length > 0){

        const resp = await axios.get(`https://react-social-api.onrender.com/api/users/profile/${currentUser.id}`,{
          withCredentials: true
        });
        setCurrentUser(resp.data[0]);
        console.log(resp);
      }else{
        const res = await axios.get(`https://react-social-api.onrender.com/api/users/profile/${currentUser.id}/q`,{
          withCredentials: true
        });
        setCurrentUser(res.data[0])
        console.log(res);
      }
    }

  useEffect(()=>{
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);



  return(
    <AuthContext.Provider value={{currentUser, login,fetchContextUser}}>{children}</AuthContext.Provider>
  );
}