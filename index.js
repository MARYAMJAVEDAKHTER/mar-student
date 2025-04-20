import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle"
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './page/About';
import Error404 from './page/Error404';
import App from './App';
import Login from './component/Login';
import Signup from './component/Signup';
import StudentDashboard from './component/StudentDashboard';
import Terms from './page/Term';
import PrivacyPolicy from './page/Privacy';
import StudentProfile from './component/Profile';
import Reports from './component/report';
import ParentPortal from './component/parent';
import FacultyPortal from './component/Faculty';
import Dashboard from './component/StudentDashboard';
import AttendanceHistory from './component/history';
import AdminDashboard from './component/admin';
import AdminPanel from './component/manageuser';
import BulkNotifications from './component/notifi';
import ParentMessages from './component/responsequery';
const root = ReactDOM.createRoot(document.getElementById('root'));

let route = createBrowserRouter([
  {
    path: '/',
    element: <App /> // App only wraps Home page
  },
  {
    path: 'about',
    element: <About/>
  },
  {
    path: '/login',
    element: <Login/>
  },
 { 
  path: '/signup',
    element: <Signup/>
 },
 {
  path: '/student',
  element: <Dashboard/>
},
{
  path: '/term',
  element: <Terms/>
},
{
  path: '/privacy',
  element: <PrivacyPolicy/>
},

{
  path: '/admin',
  element: <AdminPanel/>
},
{
  path: '/report',
  element: <Reports/>
},
{
  path: '/response',
  element: <ParentMessages/>
},
{
  path: '/notification',
  element: <BulkNotifications/>
},
{
  path: '/parent',
  element: <ParentPortal/>
},
{
  path: '/dashboard',
  element: <AdminDashboard/>
},
{
  path: '/profile',
  element: <StudentProfile/>
},
{
  path: '/faculty',
  element: <FacultyPortal/>
},
{
  path: '/history',
  element: <AttendanceHistory/>
},
  {
    path: '*',
    element: <Error404 />
  },
 
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>
);

reportWebVitals();


