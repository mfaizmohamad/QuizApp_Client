import { useEffect, useState } from "react";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import routingPath from "../routing/router_path";

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
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const token = sessionStorage.getItem("jwtToken");
      const response = await fetch(
        "http://quizappv2.onrender.com/question/allQuestions",
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
        setCurrentQuestionIndex(0); // Initialize current question index to start from the first question
      } else {
        console.log("Failed to get questions");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
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
    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <ul className="fle flex-wrap gap-5 rounded-md bg-opacity-25 text-black">
        <li
          key={currentQuestionIndex}
          className="mt-5 w-full p-5 grid justify-center "
        >
          <h3 className="font-bold mb-3">
            <span className="mr-2">Q{questions[currentQuestionIndex].id}</span>
            {questions[currentQuestionIndex].questionTitle}
          </h3>
          <label>
            <input
              className="mr-2"
              type="radio"
              name="option"
              checked={selectedOption === 1}
              onChange={() => handleOptionSelect(1)}
            />
            {questions[currentQuestionIndex].option1}
          </label>
          <label>
            <input
              className="mr-2"
              type="radio"
              name="option"
              checked={selectedOption === 2}
              onChange={() => handleOptionSelect(2)}
            />
            {questions[currentQuestionIndex].option2}
          </label>
          <label>
            <input
              className="mr-2"
              type="radio"
              name="option"
              checked={selectedOption === 3}
              onChange={() => handleOptionSelect(3)}
            />
            {questions[currentQuestionIndex].option3}
          </label>
          <label>
            <input
              className="mr-2 mb-5"
              type="radio"
              name="option"
              checked={selectedOption === 4}
              onChange={() => handleOptionSelect(4)}
            />
            {questions[currentQuestionIndex].option4}
          </label>
          {/* <p>Right Answer: {questions[currentQuestionIndex].rightAnswer}</p> */}
          <p>
            Difficulty Level: {questions[currentQuestionIndex].difficultylevel}
          </p>
          <p>Category: {questions[currentQuestionIndex].category}</p>
        </li>
      </ul>
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
            Complete{" "}
          </button>
        </div>
      )}
    </div>
  );
};

export default Examination;
