import Timer from '../timer/Timer';

const Header_Exam =() => {
  return (
    <header className="sticky top-0 z-999 flex w-full shadow-lg bg-black backdrop-blur-md drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center lg:justify-end justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex gap-3 2xsm:gap-7">
            <Timer/>
        </div>
      </div>
    </header>
  );
};






export default Header_Exam
