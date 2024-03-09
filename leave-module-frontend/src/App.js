import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './Token/AuthContext';
import Home from "./Components/Home";
import SignIn from './Components/Login/SignIn';
import ForgotPassword from "./Components/Login/ForgotPassword";
import ResetPassword from './Components/Login/ResetPassword';
//Types of users import
import HomeA from './Components/Admin/HomeA';
import HomeM from './Components/User/Manager/HomeM';
import HomeTL from './Components/User/Team Lead/HomeTL';
import HomeE from './Components/User/Employee/HomeE';

//import for Admin
import DashboardA from './Components/Admin/Admin Pages/DashboardA';

//import for Manager 
import DashboardM from './Components/User/Manager/Manager Pages/DashboardM';


//import for Team Lead
import DashboardTL from './Components/User/Team Lead/Team Lead Pages/DashboardTLjs';


//import for  Employee
import Dashboard from './Components/User/Employee/Employee Pages/DashboardE';
import LeaveE from './Components/User/Employee/Employee Pages/Leave';

function App() {
  //Leave management system
  return (
    <AuthProvider>
      <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/reset-password/:id/:token' element={<ResetPassword />}/>
        <Route path="/admin" element={<HomeA />}>
          <Route path='' element={<DashboardA/>} />
        </Route>
        <Route path="/manager" element={<HomeM />}>
          <Route path='' element={<DashboardM/>} />
        </Route>
        <Route path="teamLead" element={<HomeTL />}>
          <Route path='' element={<DashboardTL/>} />
        </Route>
        <Route path="employee" element={<HomeE />}>
          <Route path='' element={<Dashboard/>} />
          <Route path='leaves' element={<LeaveE/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
