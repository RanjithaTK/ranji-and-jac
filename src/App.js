import React, { useEffect,useState } from 'react';
import {Routes,Route,Link} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import AuthService from "./services/auth.services"
import Login from "./components/Login"
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import BoardUser from './components/BoardUser';
import Userimage from './components/Userimage';
import Imagebyid from './components/Imagebyid';

// import logo from './logo.svg';

function App(){
  const [currentUser,setCurrentUser]=useState(undefined)
  useEffect(()=>{
    const user = AuthService.getCurrentUser();
    if(user){
      setCurrentUser(user);
    }
  },[]);
  const LogOut = ()=>{
    AuthService.logout()
  };
  return(
    <div>
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
      <Link to={"/"} className="navbar-brand">
          bezKoder
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </li>
          {currentUser && (
            <li className='nav-item'>
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>
        {currentUser ? (
          <div className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link to= {"/profile"} className="nav-link">
                {currentUser.fullName}
              </Link>
            </li>
            <li className='nav-item'>
              <a href="/login" className='nav-link ' onClick={LogOut}>
                LogOut
              </a>
            </li>
          </div>
        ):(
          <div className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={"/login"} className="nav-link">
                Sign in
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className='container mt-3'>
        <Routes>
        <Route exact path="/" element={<BoardUser />} />
        <Route exact path="/:id" element={<Imagebyid />} />
          <Route exact path ="/login" element={<Login/>}/>
          <Route exact path ="/register" element={<Register/>}/>
          <Route exact path ="/profile" element={<Profile/>}/>
          <Route exact path ="/user" element={<Userimage/>}/>
        </Routes>
      </div>
    </div>
  )
}
export default App;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
