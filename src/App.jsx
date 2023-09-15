import Login from "./pages/login/Login.jsx";
import './app.scss';
import Register from './pages/register/Register.jsx';
import {createBrowserRouter, RouterProvider, Route, Outlet, Navigate} from 'react-router-dom';
import Navbar from './components/navbar/Navbar.jsx';
import Leftbar from './components/leftbar/Leftbar.jsx';
import Rightbar from './components/rightbar/Rightbar.jsx';
import Home from './pages/home/Home.jsx';
import Profile from './pages/profile/Profile.jsx';
import './style.scss';
import { useContext } from 'react';
import { DarkModeContext } from './contexts/darkModeContext.jsx';
import { AuthContext } from './contexts/authContext.jsx';
import Search from './pages/search/Search.jsx';


function App() {
  const {currentUser} = useContext(AuthContext);
  const {darkMode} = useContext(DarkModeContext);
  const Layout = ()=>{
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{display:"flex"}}>
        <div style={{flex:2}}>
          <Leftbar />
          </div>
          <div style={{flex:5,overflow:"hidden"}}>
            <Outlet />
          </div>
          <div style={{flex:3}}>
          <Rightbar />
          </div>
        </div>
      </div>
    );
  }

  const ProtectedRoute = ({children})=>{
    if(!currentUser){
     return  <Navigate to="/login" />;
    }
    return children;
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><Layout /></ProtectedRoute>,
      children: [{
        path: "/",
        element: <Home />
      },
      {
        path: "profile/:id",
        element: <Profile />
      },
      {
        path: "search/:name",
        element: <Search />
      }]
    },
    {
      path: "login",
      element: <Login />
    },
    {
      path: "register",
      element: <Register />
    }
  ],{basename:"/react-social-client/"});

  return(
    <RouterProvider router={router}/>
  )
}

export default App
