import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './Token/AuthContext';
import Home from "./Components/Home";
import SignIn from './Components/Login/SignIn';
import ForgotPassword from "./Components/Login/ForgotPassword";
import ResetPassword from './Components/Login/ResetPassword';


import HomeA from './Components/Admin/HomeA';
import HomeM from './Components/User/Manager/HomeM';
import HomeTL from './Components/User/Team Lead/HomeTL';
import HomeE from './Components/User/Employee/HomeE';

function App() {
  //Leave management system
  return (
    <AuthProvider>
      <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='signIn' element={<SignIn />} />
        <Route path='forgotPassword' element={<ForgotPassword />} />
        <Route path='reset-password/:id/:token' element={<ResetPassword />}/>
        <Route path="admin" element={<HomeA />} />
        <Route path="manager" element={<HomeM />} />
        <Route path="teamLead" element={<HomeTL />} />
        <Route path="employee" element={<HomeE />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
