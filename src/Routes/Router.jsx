import { createBrowserRouter } from "react-router-dom";
import Home from "../Page/Home/Home";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Dashboard from "../Page/Dashboard/Dashboard";
import AdmissionForm from "../Page/Dashboard/AdmissionForm/AdmissionForm";
import AllStudents from "../Page/Dashboard/AllStudents/AllStudents";
import StudentDetails from "../Page/Dashboard/StudentDetails/StudentDetails";


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
        path:"/dashboard/allstudent",
        element:<AllStudents/>
      },
      {
        path:"/dashboard/allstudent/suhadahmodkhan",
        element:<StudentDetails/>
      }
    ]
    }
  ]);

export default Router;