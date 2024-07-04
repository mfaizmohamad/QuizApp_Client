import { useEffect,useContext, useState } from "react";
import endpoints from '../data/network/API_ENDPOINT';
import HTTP from '../data/network/HTTP';
import { LoginModel } from '../model/login_model';
import { UserContext } from '../context_provider/user_provider';

import {
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import routingPath from "../routing/router_path";

const Login = () => {
  const words = ["ENT Dashboard", "With Embeded Tableau"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [letterIndex, setLetterIndex] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const ctx:any = useContext(UserContext);

  function submitForm(event:any):void {
    // console.log("here")
    // // @ts-ignore
    // console.log(import.meta.env.VITE_REACT_APP_API_BASE_URL) // "123"
    // event.preventDefault();
    // console.log("here")
    // let payload = new LoginModel();
    // for (let i = 0; i < event.target.length; i++) {
    //   if(event.target[i].localName==='input') {
    //     if(event.target[i].name==="username")
    //       payload.username = event.target[i].value;
    //     else
    //       payload.password = event.target[i].value;
    //   }
    // }
    // if(payload.isValid()){
    //   HTTP.LOGIN(endpoints.login,payload)
    //       .then(() => {
    //         console.log('logged in')
            navigate(routingPath.questionBank)
    //       }).catch(() => {
    //     toast.info("invalid value");
    //   });
    // }
    // else
    //   toast.info("invalid value");
  }

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
      <div className="area">
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
            <h1
              
              className="text-xl text-center font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white"
            >
              Question Bank
            </h1>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={submitForm}>
              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-white dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Username"
                  defaultValue={`quizAdmin`}
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
                  id="password"
                  placeholder="••••••••"
                  defaultValue={`password1234`}
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
    </section>
  );
};

export default Login;
