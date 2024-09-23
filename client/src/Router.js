import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import LandingPage from "./pages/LandingPage";
import CreateQuiz from "./pages/CreateQuiz"
import Section from "./pages/Section"
import StudentHome from "./pages/StudentHome";
import TeacherHome from "./pages/TeacherHome";
import ManageClasses from "./pages/ManageClasses";
import Managequizzes  from "./pages/ManageQuizzes";
import UpdateQuiz from "./pages/UpdateQuiz";
import MyQuizes from "./pages/MyQuizzes";
import Help from "./pages/Help";
import CreateClass from "./components/CreateClass";
import UpdateClass from "./components/UpdateClass";
import MyClasses from "./components/MyClasses";

const router = createBrowserRouter(
    [
     {
        path: "/",
        element: <Root />,
        children: [
        {
            path: "/",
                element: <LandingPage/>,
                index: true
            },
            {
            path: "/section",
            element: <Section/>,
            Children:[
                    {
                    path: "/student",
                    element:<StudentHome/>
                    }
                ]
            },
            {
                path: "/teacher",
                element: <TeacherHome/>,
            },
            {
                path: "/manageclasses",
                element: <ManageClasses/>,
                children:[
                    {
                        path:"/manageclasses/createclass",
                        element: <CreateClass/>,
                    },
                    {
                        path: "/manageclasses",
                        element: <MyClasses/>,
                        index: true
                    },
                    {
                        path:"/manageclasses/update-class/:section_id",
                        element: <UpdateClass/>,
                    }]
            },
            {
                path: "/managequizzes",
                element: <Managequizzes/>,
                children:[
                    {
                        path:"/managequizzes/createquiz",
                        element: <CreateQuiz/>,
                    },
                    {
                        path: "/managequizzes",
                        element: <MyQuizes/>,
                        index:true
                    },
                    {
                        path:"/managequizzes/update-quiz",
                        element: <UpdateQuiz/>,
                    }
                ]
            },
            {
                path: "/help",
                element: <Help/>,
            },
            {
            path:"*",
                element:<p>404 Error - Nothing here...</p>
        }
        ]
    }
     ]
);

export default router