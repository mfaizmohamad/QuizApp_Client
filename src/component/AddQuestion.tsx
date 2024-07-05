import React, { useState, ChangeEvent, FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DefaultLayout from "../layout/DefaultLayout";

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

  const initialFormData: FormData = {
    questionTitle: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    rightAnswer: "",
    difficultylevel: "",
    category: "",
  };

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

        setFormData(initialFormData);
      } else {
        toast.error("Question Added Failed");
        console.log("Failed to post question.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const postQuestion = async (payload: FormData) => {
    const token = sessionStorage.getItem('jwtToken');
    const response = await fetch(
      "https://quizappv2.onrender.com/question/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      }
    );
    return response;
  };

  return (
    <DefaultLayout>
    <div className="w-full rounded-md bg-gray bg-opacity-25 text-white shadow-lg p-10 mb-10">
    <h1 className="mb-4 text-2xl font-extrabold text-white dark:text-white md:text-2xl lg:text-3xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Add Question</span> Form.</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Question Title
            </label>
            <input
              type="text"
              name="questionTitle"
              value={formData.questionTitle}
              onChange={handleChange}
              id="first_name"
              className="bg-gray-2 bg-opacity-50 border border-gray-300 text-black text-sm rounded-lg
               focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <div className="flex gap-5 w-full">
            <div className="w-full">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Option 1
              </label>
              <input
                type="text"
                name="option1"
                value={formData.option1}
                onChange={handleChange}
                id="first_name"
                className="bg-gray-2 bg-opacity-50 border border-gray-300 text-black text-sm rounded-lg
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Option 2
              </label>
              <input
                name="option2"
                type="text"
                value={formData.option2}
                onChange={handleChange}
                id="first_name"
                className="bg-gray-2 bg-opacity-50 border border-gray-300 text-black  text-sm rounded-lg
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
              />
            </div>
          </div>
          <div className="flex gap-5 w-full">
            <div className="w-full">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Option 3
              </label>
              <input
                name="option3"
                type="text"
                value={formData.option3}
                onChange={handleChange}
                id="first_name"
                className="bg-gray-2 bg-opacity-50 border border-gray-300 text-black  text-sm rounded-lg
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Option 4
              </label>
              <input
                type="text"
                name="option4"
                value={formData.option4}
                onChange={handleChange}
                id="first_name"
                className="bg-gray-2 bg-opacity-50 border border-gray-300 text-black  text-sm rounded-lg
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Right Answer
            </label>
            <input
              type="text"
              name="rightAnswer"
              value={formData.rightAnswer}
              onChange={handleChange}
              id="first_name"
              className="bg-gray-2 bg-opacity-50 border border-gray-300 text-black  text-sm rounded-lg
               focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <div className="flex gap-5 w-full">
            <div className="w-full">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Difficulty Level
              </label>
              <input
                type="text"
                name="difficultylevel"
                value={formData.difficultylevel}
                onChange={handleChange}
                id="first_name"
                className="bg-gray-2 bg-opacity-50 border border-gray-300 text-black  text-sm rounded-lg
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                id="first_name"
                className="bg-gray-2 bg-opacity-50 border border-gray-300 text-black text-sm rounded-lg
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 w-[10rem] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
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
    </DefaultLayout>
  );
};

export default QuestionForm;
