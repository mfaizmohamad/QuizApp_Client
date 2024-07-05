import Login from "../Authentication/Login";
import QuestionForm from "../component/AddQuestion";
import AllQuestion from "../component/AllQuestion";
import Examination from "../component/Examination";
import Start_Exam from "../component/Start_Exam";

let routing = [
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/question_bank",
        element: <AllQuestion />,
    },
    {
        path: "/add_question",
        element: <QuestionForm/>,
    },
    {
        path: "/start_exam",
        element: <Start_Exam/>,
    },
    {
        path: "/examination",
        element: <Examination/>,
    },
];

export default routing;