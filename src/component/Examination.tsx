import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import routingPath from "../routing/router_path";
import Header_Exam from "../Header/Header_Exam";
import { Context } from "../gemini/context/Context";
import { assets } from "../assets/assets";

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

interface Question {
  questionTitle: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  rightAnswer: string;
}

const Examination: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<FormData[]>([]);

  const navigate = useNavigate();

  const context = useContext(Context);

  if (!context) {
    throw new Error("Gemini_Main must be used within a ContextProvider");
  }

  const {
    onSent,
    loading,
    resultData,
    setInput,
  } = context;

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
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }


  const question: Question = {
    questionTitle: questions[currentQuestionIndex].questionTitle,
    option1: questions[currentQuestionIndex].option1,
    option2: questions[currentQuestionIndex].option2,
    option3: questions[currentQuestionIndex].option3,
    option4: questions[currentQuestionIndex].option4,
    rightAnswer: questions[currentQuestionIndex].rightAnswer,
  };

  const questionString = JSON.stringify(question);

  setInput(questionString);

  const answer = () => {
    onSent();
  };

  return (
    <div className="relative  flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <Header_Exam />

        <div className="flex justify-center  gap-[30rem] mt-5">
                <p className="p-2 bg-green-700 text-white rounded-md">
                  Level: {questions[currentQuestionIndex].difficultylevel}
                </p>
                <p className="p-2 bg-yellow-700 text-white rounded-md">
                  Category: {questions[currentQuestionIndex].category}
                </p>
              </div>
        <div className="flex justify-center">

        <ul className="mt-10 flex w-[50rem] flex-wrap gap-5 rounded-md bg-opacity-25 text-black">
          <li key={currentQuestionIndex} className="mt-5 w-full p-5 grid">
            <h3 className="font-bold mb-3">
              <span className="mr-2">
                Q{questions[currentQuestionIndex].id}
              </span>
              {questions[currentQuestionIndex].questionTitle}
            </h3>
            <div onClick={() => answer()} className="p-1 w-[20rem] cursor-pointer hover:bg-slate-500 rounded-md hover:text-white">
              A. {questions[currentQuestionIndex].option1}
            </div>
            <div onClick={() => answer()} className="p-1 w-[20rem] cursor-pointer hover:bg-slate-500 rounded-md hover:text-white">
              B. {questions[currentQuestionIndex].option2}
            </div>
            <div  onClick={() => answer()} className="p-1 w-[20rem] cursor-pointer hover:bg-slate-500 rounded-md hover:text-white">
              C. {questions[currentQuestionIndex].option3}
            </div>
            <div  onClick={() => answer()} className="p-1 w-[20rem] cursor-pointer hover:bg-slate-500 rounded-md hover:text-white">
              D. {questions[currentQuestionIndex].option4}
            </div>
            {/* <p>Right Answer: {questions[currentQuestionIndex].rightAnswer}</p> */}

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
      <div className="result mt-10" >
        <div className="result-data">
          <img src={assets.gemini_icon} alt="Gemini Icon" />
          {loading ? (
            <div className="loader">
              <hr />
              <hr />
              <hr />
            </div>
          ) : (
            <p className="text-black" dangerouslySetInnerHTML={{ __html: resultData }}></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Examination;
