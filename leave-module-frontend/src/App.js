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
import LeaveRequestA from './Components/Admin/Admin Pages/LeaveRequestA';
import AddEmployee from './Components/Admin/Admin Pages/AddEmployee';
import AllEmployees from './Components/Admin/Admin Pages/AllEmployees'; 

//import for Manager 
import DashboardM from './Components/User/Manager/Manager Pages/DashboardM';
import LeaveM from './Components/User/Manager/Manager Pages/LeaveM';
import LeaveRequestsM from './Components/User/Manager/Manager Pages/LeaveRequests';

//import for Team Lead
import DashboardTL from './Components/User/Team Lead/Team Lead Pages/DashboardTL';
import LeaveTL from './Components/User/Team Lead/Team Lead Pages/LeaveTL';
import LeaveRequestsTL from './Components/User/Team Lead/Team Lead Pages/LeaveRequests';

//import for  Employee
import DashboardE from './Components/User/Employee/Employee Pages/DashboardE';
import LeaveE from './Components/User/Employee/Employee Pages/Leave';
import LeaveStatusE from './Components/User/Employee/Employee Pages/LeaveStatus';

//CopyRights
import Copyright from './Components/Copyright';



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
          </Route>
          <Route path="manager" element={<HomeM />}>
            <Route path='' element={<DashboardM />} />
            <Route path='leaves' element={<LeaveM/>}/>
            <Route path='leave-status' element={<LeaveStatusE />} />
            <Route path='leave-requests' element={<LeaveRequestsM />} />
          </Route>
          <Route path="team-lead" element={<HomeTL />}>
            <Route path='' element={<DashboardTL />} />
            <Route path='leaves' element={<LeaveTL/>}/>
            <Route path='leave-status' element={<LeaveStatusE />} />
            <Route path='leave-requests' element={<LeaveRequestsTL />} />
          </Route>
          <Route path="employee" element={<HomeE />}>
            <Route path='' element={<DashboardE />} />
            <Route path='leaves' element={<LeaveE />} />
            <Route path='leave-status' element={<LeaveStatusE />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Copyright />
    </AuthProvider>
  );
}

export default App;
