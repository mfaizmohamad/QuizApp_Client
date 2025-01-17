import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import routingPath from "../routing/router_path";
import { ToastContainer, toast } from "react-toastify";

interface FormData {
  login: string;
  password: any;
}

const Login = () => {
  const words = ["ENT Dashboard", "With Embeded Tableau"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [letterIndex, setLetterIndex] = useState(0);

  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    login: "",
    password: "",
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
        console.log("Login successfully!");
        toast.success("Login successfully!");
      } else {
        console.log("Failed to Login.");
        toast.error("Invalid Credential");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const postQuestion = async (payload: FormData) => {
    try {
      const response = await fetch("https://quizappv2.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data >>>", data);
        const token = data.token;
        sessionStorage.setItem("jwtToken", token);
        navigate(routingPath.startExam);
      } else {
        console.log("Failed to login.");
      }

      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  useEffect(() => {
    const type = () => {
      const currentWord = words[currentWordIndex];
      if (isDeleting) {
        setCurrentText(currentWord.substring(0, letterIndex - 1));
        setLetterIndex(letterIndex - 1);
        if (letterIndex === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((currentWordIndex + 1) % words.length);
        }
      } else {
        setCurrentText(currentWord.substring(0, letterIndex + 1));
        setLetterIndex(letterIndex + 1);
        if (letterIndex === currentWord.length) {
          setIsDeleting(true);
        }
      }
    };

    const typingSpeed = isDeleting ? 50 : 100;
    const timeoutId = setTimeout(type, typingSpeed);

    return () => clearTimeout(timeoutId);
  }, [currentWordIndex, currentText, isDeleting, letterIndex]);
  return (
    <section className="">
      <div className="area h-[100vh] w-[100%]">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-black bg-opacity-80  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="mb-4 text-center text-2xl font-extrabold text-white dark:text-white md:text-2xl lg:text-3xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                Exam
              </span>{" "}
              AI
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-white dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="login"
                  value={formData.login}
                  onChange={handleChange}
                  id="login"
                  className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Username"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  id="password"
                  placeholder="••••••••"
                  className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>
              <button
                type="submit"
                className=" w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
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
    </section>
  );
};

export default Login;
