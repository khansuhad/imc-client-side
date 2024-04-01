import { createBrowserRouter } from "react-router-dom";
import Home from "../Page/Home/Home";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Dashboard from "../Page/Dashboard/Dashboard";
import DashImg from "../Page/Dashboard/DashImg";
import Login from "../Page/Authentication/Login/Login";
import AdmissionForm from "../Page/Dashboard/Student/AdmissionForm/AdmissionForm";
import Addpayment from "../Page/Dashboard/Student/AddPayment/Addpayment";
import UpdateStudentDetails from "../Page/Dashboard/Student/UpdateStudentDetails/UpdateStudentDetails";
import AllStudents from "../Page/Dashboard/Student/AllStudents/AllStudents";
import StudentDetails from "../Page/Dashboard/Student/StudentDetails/StudentDetails";
import CreateTest from "../Page/Dashboard/Result/CreateTest/CreateTest";
import AddMark from "../Page/Dashboard/Result/AddMark/AddMark";
import AllTest from "../Page/Dashboard/Result/AllTest/AllTest";


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
        path:"/dashboard/updateStudentDetails/:studentId",
        element:<UpdateStudentDetails/>
      },
      {
        path:"/dashboard/allstudent",
        element:<AllStudents/>
      },
      {
        path:"/dashboard/student/:studentId",
        element:<StudentDetails/>
      },
      {
        path:"/dashboard/createTest",
        element:<CreateTest/>
      },
      {
        path:"/dashboard/addMark/:testDetails",
        element:<AddMark/>
      },
      {
        path:"/dashboard/allTest",
        element:<AllTest/>
      },
    ]
    },
    {
      path:"/login",
      element:<Login/>
    }
  ]);

export default Router;