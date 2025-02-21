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
import AllTest from "../Page/Dashboard/Result/AllTest/AllTest";
import AddMark from "../Page/Dashboard/Result/AddMark/AddMark";
import BatchEntry from "../Page/Dashboard/BatchInfo/BatchEntry/BatchEntry";
import ListOfBatch from "../Page/Dashboard/BatchInfo/ListOfBatch/ListOfBatch";
import BatchEdit from "../Page/Dashboard/BatchInfo/BatchEdit/BatchEdit";
import Admission from "../Page/Dashboard/Admission/Admission/Admission";
import CurrentStudent from "../Page/Dashboard/Admission/CurrentStudent/CurrentStudent";
import AdmissionEdit from "../Page/Dashboard/Admission/AdmissionEdit/AdmissionEdit";
import TransectionEntry from "../Page/Dashboard/GenaralAccount/TransectionEntry/TransectionEntry";
import TransectionList from "../Page/Dashboard/GenaralAccount/TransectionList/TransectionList";
import TransectionsEdit from "../Page/Dashboard/GenaralAccount/TransectionsEdit/TransectionsEdit";
import BatchInfo from "../Page/Dashboard/BatchInfo/BatchInfo/BatchInfo";
import Check from "../Component/Check/Check";
import DuesAlert from "../Page/Dashboard/SMS/DuesAlert/DuesAlert";
import PrivateRoute from "./PrivateRoute";
import SmsHistory from "../Page/Dashboard/SMS/SmsHistroy/SmsHistroy";
import PrintCurrentStudent from "../Page/Dashboard/Admission/PrintCurrentStudent/PrintCurrentStudent";
import ListOfClasses from "../Page/Dashboard/BatchInfo/ListOfClass/ListOfClass";
import ClassWiseBatches from "../Page/Dashboard/BatchInfo/ClassWiseBatch/ClassWiseBatch";


const Router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children:[
        {
            path:'/',
            element:<Home/>
        },
        {
            path:'/check',
            element:<Check/>
        }
      ]
    },
    {
    path:"/dashboard",
    element:<PrivateRoute><Dashboard/></PrivateRoute>,
    children:[
      {
        path:"/dashboard/admission",
        element:<PrivateRoute><Admission/></PrivateRoute>
      },
      {
        path:"/dashboard/admission-edit/:id",
        element:<AdmissionEdit/>,
        loader: ({params}) => fetch(`https://imc-server-side.vercel.app/admissions/${params.id}`)
      },
      {
        path:"/dashboard/current-student",
        element:<CurrentStudent/>
      },
      {
        path:"/dashboard/print-student",
        element:<PrintCurrentStudent/>
      },
      {
        path:"/dashboard/batch-entry",
        element:<BatchEntry/>
      },
      {
        path:"/dashboard/fees-entry",
        element:<TransectionEntry/>
      },
      {
        path:"/dashboard/fees-list",
        element:<TransectionList/>
      },
      {
        path:"/dashboard/dues-alert",
        element:<DuesAlert/>
      },
      {
        path:"/dashboard/sms-history",
        element:<SmsHistory/>
      },
      {
        path:"/dashboard/batchInfo/:id",
        element:<BatchInfo/>
      },
      // {
      //   path:"/dashboard/fees-edit/:id",
      //   element:<TransectionsEdit/>
      // },
      {
        path:"/dashboard/list-of-batch",
        element:<ListOfBatch/>
      },
      {
        path:"/dashboard/list-of-class",
        element:<ListOfClasses/>
      },
      {
        path:"/dashboard/class-wise-batch/:id",
        element:<ClassWiseBatches/>
      },
      {
        path:"/dashboard/batch-edit/:id",
        element:<BatchEdit/>,
        loader: ({params}) => fetch(`https://imc-server-side.vercel.app/batches/${params.id}`)
      },
      {
        path:"/dashboard/addpayment/:id",
        element:<Addpayment/>,
        loader: ({params}) => fetch(`https://imc-server-side.vercel.app/studentDetails/${params.id}`)
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
        path:"/dashboard/allTest",
        element:<AllTest/>
      },
      {
        path:"/dashboard/add-mark/:id",
        element:<AddMark/>,
        loader : ({params}) => fetch(`http://localhost:5000/test-marks/${params?.id}`)
        // loader : ({params}) => fetch(`https://imc-server-side.vercel.app/test-marks/${params?.id}`)
      }
    ]
    },
    {
      path:"/login",
      element:<Login/>
    }
  ]);

export default Router;