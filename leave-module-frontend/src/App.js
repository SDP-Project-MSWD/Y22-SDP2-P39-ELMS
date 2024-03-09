import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Components/Home";
import SignIn from './Components/Login/SignIn';
import ForgotPassword from "./Components/Login/ForgotPassword";
import ResetPassword from './Components/Login/ResetPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='signIn' element={<SignIn />} />
        <Route path='forgotPassword' element={<ForgotPassword />} />
        <Route path='reset-password/:id/:token' element={<ResetPassword />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
