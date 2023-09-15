import { useState } from 'react';
import './register.scss'
import {Link} from 'react-router-dom';
import axios from 'axios';

function Register() {

  const [inputs, setInputs]=useState({
    username:"",
    email:"",
    password:"",
    name:"",
  });
  const [err, setErr]=useState(null);

  const handleChange = e=>{
    setInputs((prev)=>({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      await axios.post("https://react-social-api.onrender.com/api/auth/register" ,inputs);
    } catch (error) {
      setErr(error.response.data);
    }
  }

  return (
    <div className='register'>
      <div className="card">
        <div className="left">
          <h1>Social</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet magnam architecto vitae molestiae harum illo saepe quam, vel obcaecati recusandae, assumenda, nam doloremque? </p>
          <span>Don't you have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
          <input type="text"  placeholder='Username' name="username" onChange={handleChange} />
          <input type="email"  placeholder='Email' name="email" onChange={handleChange}  />
          <input type="password"  placeholder='Password' name="password" onChange={handleChange}  />
          <input type="text"  placeholder='Name' name="name" onChange={handleChange}  />
          <span>{err && err}</span>
          <button type='submit'>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
