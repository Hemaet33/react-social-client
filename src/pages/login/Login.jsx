import { useContext, useState } from 'react';
import './login.scss';
import {Link, useNavigate} from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username:"",
    password:""
  });
  const [err, setErr] = useState(null);
  
  const {login} = useContext(AuthContext)

  const handleChange =(e)=>{
    setInputs((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }
  const handleLogin = async(e)=>{
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (error) {
      setErr(error.response.data);
    }
  }

  return (
    <div className='login'>
      <div className="card">
        <div className="left">
          <h1>Hello World</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet magnam architecto vitae molestiae harum illo saepe quam, vel obcaecati recusandae, assumenda, nam doloremque? </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
          <input type="text"  placeholder='Username' name="username" onChange={handleChange}/>
          <input type="password"  placeholder='Password'  name="password" onChange={handleChange} />
          {err && err}
          <button type='submit'>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
