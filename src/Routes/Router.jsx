import { createBrowserRouter } from "react-router-dom";
import Home from "../Page/Home/Home";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Dashboard from "../Page/Dashboard/Dashboard";
import AdmissionForm from "../Page/Dashboard/AdmissionForm/AdmissionForm";
import AllStudents from "../Page/Dashboard/AllStudents/AllStudents";
import StudentDetails from "../Page/Dashboard/StudentDetails/StudentDetails";
import DashImg from "../Page/Dashboard/DashImg";
import UpdateStudentDetails from "../Page/Dashboard/UpdateStudentDetails/UpdateStudentDetails";
import Addpayment from "../Page/Dashboard/AddPayment/Addpayment";
import Login from "../Page/Authentication/Login/Login";


const Router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children:[
        {
            path:'/',
            element:<Home/>
        }
      ]
    },
    {
    path:"/dashboard",
    element:<Dashboard/>,
    children:[
      {
        path:"/dashboard/admissionForm",
        element:<AdmissionForm/>
      },
      {
        path:"/dashboard/addpayment/suhadahmodkhan",
        element:<Addpayment/>
      },
      {
        path:"/dashboard",
        element:<DashImg/>
      },
      {
        path:"/dashboard/updateStudentDetails/suhadahmodkhan",
        element:<UpdateStudentDetails/>
      },
      {
        path:"/dashboard/allstudent",
        element:<AllStudents/>
      },
      {
        path:"/dashboard/allstudent/suhadahmodkhan",
        element:<StudentDetails/>
      }
    ]
    },
    {
      path:"/login",
      element:<Login/>
    }
  ]);

export default Router;