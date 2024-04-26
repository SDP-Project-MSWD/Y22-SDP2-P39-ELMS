// Main Backend-Server URL
export const SERVERURL = "https://elms-backend.onrender.com/";

//Authentication Endpoints for User
export const LOGIN_ENDPOINT = SERVERURL + "auth/login";

//Endpoint for Forgot Password
export const FORGOT_PASSWORD = SERVERURL + "auth/forgot-password";

//Endpoint Reset Password
export const RESET_PASSWORD = SERVERURL + "auth/reset-password/";

//Admin Endpoints
export const ADMIN_ADD_EMPLOYEE = SERVERURL + "auth/register";
export const ADMIN_GET_ALL_EMPLOYEE = SERVERURL + "auth/getAllUsers";
export const ADMIN_FILTER = SERVERURL + "auth/filter/";
//Admin AllEmployeesCard.js
export const ADMIN_EDIT_EMPLOYEE = SERVERURL + "auth/";
export const ADMIN_DELETE_EMPLOYEE = SERVERURL + "auth/";
//Admin Dashboard
export const ADMIN_DASHBOARD = SERVERURL + "user/adminDashboard";
//Admin EmployeeByID.js
export const ADMIN_EMPLOYEEBYID = SERVERURL + "auth/profile/";
//Admin Get ALL Leaves LeaveRequestA.js
export const ADMIN_GET_ALL_LEAVES = SERVERURL + "manager/leave/getAllLeaves";
export const ADMIN_ACCEPT_LEAVE = SERVERURL + "manager/leave/accept/";
export const ADMIN_REJECT_LEAVE = SERVERURL + "manager/leave/reject/";
//Admin Multer.js
export const ADMIN_MULTER = SERVERURL + "uploadcsv";

//Common Leave Pages -> ./Components/LeavePages
export const APPLY_LEAVE = SERVERURL + "employee/";
export const LEAVE_REQUESTS_GET_LEAVES = SERVERURL + "manager/leave/getAllLeaves";
export const LEAVE_REQUESTS_ACCEPT = SERVERURL + "manager/leave/accept/";
export const LEAVE_REQUESTS_REJECT = SERVERURL + "manager/leave/reject/";
export const LEAVE_STATUS = SERVERURL + "employee/";

//ProfileEndpoint
export const PROFILE_ENDPOINT = SERVERURL + "auth/profile/";
