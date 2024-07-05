import { useNavigate } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import routingPath from "../routing/router_path";

const Start_Exam = () => {
  const navigate = useNavigate();

  const startExam = () => {
    navigate(routingPath.examination);
  };

  return (
    <DefaultLayout>
      <div className="relative overflow-x-auto rounded-md">
        <table className="w-full text-sm text-left rtl:text-right text-white dark:text-gray-400 rounded-md shadow-lg">
          <thead className="text-md text-white backdrop:uppercase bg-slate-600 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-3">
                No
              </th>
              <th scope="col" className="px-10 py-3">
                Test
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-4 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white bg-opacity-30 border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                1
              </th>
              <td className="px-10 py-4">Python general exam</td>
              <td className="px-6 py-4">12/02/2024</td>
              <td className="px-4 py-4">
                {" "}
                <button
                  className="bg-green-600 w-[10rem] hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
                  onClick={startExam}
                >
                  Start Exam{" "}
                </button>
              </td>
            </tr>
            <tr className="bg-white bg-opacity-30 border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                2
              </th>
              <td className="px-10 py-4">Javascript general exam</td>
              <td className="px-6 py-4">21/04/2025</td>
              <td className="px-4 py-4">
                {" "}
                <button
                  className="bg-green-600 w-[10rem] hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
                  onClick={startExam}
                >
                  Start Exam{" "}
                </button>
              </td>
            </tr>
            <tr className="bg-white  bg-opacity-30 dark:bg-gray-800">
              <th
                scope="row"
                className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                3
              </th>
              <td className="px-10 py-4">React general exam</td>
              <td className="px-6 py-4">16/07/2024</td>
              <td className="px-4 py-4">
                {" "}
                <button
                  className="bg-green-600 w-[10rem] hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
                  onClick={startExam}
                >
                  Start Exam{" "}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DefaultLayout>
  );
};

export default Start_Exam;
