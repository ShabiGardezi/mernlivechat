import {useState} from 'react'
import './App.css';
import Login from './components/Login';
import Signup from './components/SignUp';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import {ChatState} from "./context/chatsState"

function App() {

  const [isLoggedin, setisLoggedin] = useState(false);
  const handleLogin=(value)=>{
    setisLoggedin(value);
  
  }
  

  return (
    <ChatState>
    <BrowserRouter>
    {!isLoggedin? 
     <Routes>
     <>
     <Route path="/" element={<Login handleLogin={handleLogin}/>} />
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
  </ChatState>
  );
}

export default App;
