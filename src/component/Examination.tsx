import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import routingPath from "../routing/router_path";
import Header_Exam from "../Header/Header_Exam";

interface FormData {
  questionTitle: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  rightAnswer: string;
  difficultylevel: string;
  category: string;
  id: number;
}

const Examination: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [questions, setQuestions] = useState<FormData[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const token = sessionStorage.getItem("jwtToken");
      const response = await fetch(
        "https://quizappv2.onrender.com/question/allQuestions",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
        setCurrentQuestionIndex(0); 
      } else {
        console.log("Failed to get questions");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };


  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const prevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const completeQuestion = () => {
    navigate(routingPath.startExam);
  }

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className="relative  flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <Header_Exam sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex justify-center">
        <ul className="mt-10 flex w-[50rem] flex-wrap gap-5 rounded-md bg-opacity-25 text-black">
          <li
            key={currentQuestionIndex}
            className="mt-5 w-full p-5 grid"
          >
            <h3 className="font-bold mb-3">
              <span className="mr-2">Q{questions[currentQuestionIndex].id}</span>
              {questions[currentQuestionIndex].questionTitle}
            </h3>
            <div className="p-1 w-[20rem] cursor-pointer hover:bg-slate-500 rounded-md hover:text-white">
              A. {questions[currentQuestionIndex].option1}
            </div>
            <div className="p-1 w-[20rem] cursor-pointer hover:bg-slate-500 rounded-md hover:text-white">
              B. {questions[currentQuestionIndex].option2}
            </div>
            <div className="p-1 w-[20rem] cursor-pointer hover:bg-slate-500 rounded-md hover:text-white">
              C. {questions[currentQuestionIndex].option3}
            </div>
            <div className="p-1 w-[20rem] cursor-pointer hover:bg-slate-500 rounded-md hover:text-white">
              D. {questions[currentQuestionIndex].option4}
            </div>
            {/* <p>Right Answer: {questions[currentQuestionIndex].rightAnswer}</p> */}
            <div className="flex gap-3 mt-5">
              <p className="p-2 bg-green-700 text-white rounded-md">
                 Level: {questions[currentQuestionIndex].difficultylevel}
              </p >
              <p className="p-2 bg-yellow-700 text-white rounded-md">Category: {questions[currentQuestionIndex].category}</p>
            </div>
          </li>
        </ul>
      </div>
      {currentQuestionIndex < questions.length - 1 && (
        <div className="flex gap-5 justify-center mt-5">
          <button
            className="bg-red-500 w-[10rem] hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            disabled={currentQuestionIndex === 0}
            onClick={prevQuestion}
          >
            Prev{" "}
          </button>
          <button
            className="bg-blue-500 w-[10rem] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={goToNextQuestion}
          >
            Next{" "}
          </button>
        </div>
      )}
      {currentQuestionIndex == questions.length - 1 && (
        <div className="flex gap-5 justify-center mt-5">

          <button
            className="bg-green-500 w-[10rem] hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={completeQuestion}
          >
            Finish{" "}
          </button>
        </div>
      )}
    </div>
  );
};

export default Examination;
