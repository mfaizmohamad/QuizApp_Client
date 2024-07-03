import React, { useState, ChangeEvent, FormEvent } from "react";
import endpoints from "../data/network/API_ENDPOINT";
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

const QuestionForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    questionTitle: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    rightAnswer: "",
    difficultylevel: "",
    category: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await postQuestion(formData);
      if (response.ok) {
        toast.success("Question Added");
        console.log("Question posted successfully!");
      } else {
        toast.error("Question Added Failed");
        console.log("Failed to post question.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const postQuestion = async (payload: FormData) => {
    const response = await fetch(
      "https://quizappv2.onrender.com/question/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    return response;
  };

  return (
    <div className="w-[50rem]">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <input
            type="text"
            name="questionTitle"
            value={formData.questionTitle}
            onChange={handleChange}
            placeholder="Question Title"
            required
          />
          <input
            type="text"
            name="option1"
            value={formData.option1}
            onChange={handleChange}
            placeholder="Option 1"
            required
          />
          <input
            type="text"
            name="option2"
            value={formData.option2}
            onChange={handleChange}
            placeholder="Option 2"
            required
          />
          <input
            type="text"
            name="option3"
            value={formData.option3}
            onChange={handleChange}
            placeholder="Option 3"
            required
          />
          <input
            type="text"
            name="option4"
            value={formData.option4}
            onChange={handleChange}
            placeholder="Option 4"
            required
          />
          <input
            type="text"
            name="rightAnswer"
            value={formData.rightAnswer}
            onChange={handleChange}
            placeholder="Right Answer"
            required
          />
          <input
            type="text"
            name="difficultylevel"
            value={formData.difficultylevel}
            onChange={handleChange}
            placeholder="Difficulty Level"
            required
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 w-20 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
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

export default QuestionForm;
