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
      <div className="flex h-[50rem] justify-center items-center">
        <button
          className="bg-green-500 w-[10rem] hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={startExam}
        >
          Start Exam{" "}
        </button>
      </div>
    </DefaultLayout>
  );
};

export default Start_Exam;
