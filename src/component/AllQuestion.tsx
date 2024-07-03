import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  questionTitle: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  rightAnswer: string;
  difficultylevel: string;
  category: string;
}

const AllQuestion: React.FC = () => {
  const [questions, setQuestions] = useState<FormData[]>([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('https://quizappv2.onrender.com/question/allQuestions');
      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
        console.log(data)
      } else {
        toast.error("Failed to fetch questions");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error: " + error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    <div>
      <h2>All Questions</h2>
      <ul>
        {questions.map((question, index) => (
          <li key={index} className="mt-5">
            <h3>{question.questionTitle}</h3>
            <p>Option 1: {question.option1}</p>
            <p>Option 2: {question.option2}</p>
            <p>Option 3: {question.option3}</p>
            <p>Option 4: {question.option4}</p>
            <p>Right Answer: {question.rightAnswer}</p>
            <p>Difficulty Level: {question.difficultylevel}</p>
            <p>Category: {question.category}</p>
          </li>
        ))}
      </ul>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default AllQuestion;
