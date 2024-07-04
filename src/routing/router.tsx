import Login from "../Authentication/Login";
import QuestionForm from "../component/AddQuestion";
import AllQuestion from "../component/AllQuestion";

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
];

export default routing;