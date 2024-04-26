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
import HomeU from './Components/User/Employee/HomeE';

//import for Admin
import DashboardA from './Components/Admin/Admin Pages/DashboardA';
import LeaveRequestA from './Components/LeavePages/LeaveRequests';
import AddEmployee from './Components/Admin/Admin Pages/AddEmployee';
import AllEmployees from './Components/Admin/Admin Pages/AllEmployees';
import EmployeeByID from './Components/Admin/Admin Pages/EmployeeByID';
import Multer from './Components/Admin/Admin Pages/Multer'; 

//import for Manager 
import DashboardM from './Components/User/Dashboard';
import LeaveM from './Components/LeavePages/Leave';
import LeaveRequestsM from './Components/LeavePages/LeaveRequests';
import LeaveStatusM from './Components/LeavePages/LeaveStatus';

//import for Team Lead
import DashboardTL from './Components/User/Dashboard';
import LeaveTL from './Components/LeavePages/Leave';
import LeaveRequestsTL from './Components/LeavePages/LeaveRequests';

//import for  Employee
import DashboardE from './Components/User/Dashboard';
import LeaveE from './Components/LeavePages/Leave';
import LeaveStatusE from './Components/LeavePages/LeaveStatus';

//CopyRights
import Copyright from './Components/Copyright';
import Profile from './Components/Profile';



function App() {
  return (
    <AuthProvider>
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/reset-password/:id/:token' element={<ResetPassword />} />
          <Route path="/admin/*" element={<HomeA />}>
            <Route path='' element={<DashboardA />} />
            <Route path='leave-requests' element={<LeaveRequestA/>} />
            <Route path='add-employee' element={<AddEmployee/>}/>
            <Route path='all-employees' element={<AllEmployees/>} />
            <Route path='employee-by-id' element={<EmployeeByID />}/>
            <Route path='multer' element={<Multer />}/>
            <Route path='profile' element={<Profile />} />
          </Route>
          <Route path="manager" element={<HomeU />}>
            <Route path='' element={<DashboardM />} />
            <Route path='leaves' element={<LeaveM/>}/>
            <Route path='leave-status' element={<LeaveStatusM />} />
            <Route path='leave-requests' element={<LeaveRequestsM />} />
            <Route path='profile' element={<Profile />} />
          </Route>
          <Route path="team-lead" element={<HomeU />}>
            <Route path='' element={<DashboardTL />} />
            <Route path='leaves' element={<LeaveTL/>}/>
            <Route path='leave-status' element={<LeaveStatusE />} />
            <Route path='leave-requests' element={<LeaveRequestsTL />} />
            <Route path='profile' element={<Profile />} />
          </Route>
          <Route path="employee" element={<HomeU />}>
            <Route path='' element={<DashboardE />} />
            <Route path='leaves' element={<LeaveE />} />
            <Route path='leave-status' element={<LeaveStatusE />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Copyright />
    </AuthProvider>
  );
}

export default App;
