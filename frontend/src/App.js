import {useState,useContext} from 'react'
import './App.css';
import Login from './components/Login';
import Signup from './components/SignUp';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import {userContext} from "./context/userState"


function App() {
  const { user } = useContext(userContext);
  

  return (

    
    <BrowserRouter>
    {!user? 
     <Routes>
     <>
     <Route path="/" element={<Login/>} />
     <Route path="/signup" element={<Signup />} />
     </>
     </Routes>
     :
     <>
    
     <Routes>
    <Route path="/" element={<Home />} />
      </Routes>
    </>
      }
  </BrowserRouter>
  
  );
}

export default App;
