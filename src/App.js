import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Login from './Components/Login';
import SignUp from './Components/SignUp';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/" element={<SignUp/>}/> */}
        <Route path="/" element={<Navigate to="/SignUp"/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
