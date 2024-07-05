import React, { useEffect, useState } from "react";

const Timer: React.FC = () => {
  const [time, setTime] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00"
  });

  useEffect(() => {
    // Set the timer for 30 minutes from now
    const dest = new Date().getTime() + 30 * 60 * 1000;

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = dest - now;

      if (diff <= 0) {
        clearInterval(intervalId);
        setTime({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00"
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTime({
        days: days < 10 ? `0${days}` : `${days}`,
        hours: hours < 10 ? `0${hours}` : `${hours}`,
        minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
        seconds: seconds < 10 ? `0${seconds}` : `${seconds}`
      });
    };

    const intervalId = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full mr-[-1rem] rounded-2xl flex gap-9 flex-col items-center justify-center bg-cover bg-center">
      <div className="flex items-start justify-center w-full gap-1.5 count-down-main">
        <div className="timer">
          <div className="rounded-xl shadow-lg bg-[#36454F] backdrop-blur-sm py-3 min-w-[96px] flex items-center justify-center flex-col gap-1 px-3">
            <h3 className="countdown-element days font-manrope font-semibold text-2xl text-white text-center">
              {time.days}
            </h3>
            <p className="text-sm uppercase font-normal text-white mt-1 text-center w-full">days</p>
          </div>
        </div>

        <div className="timer">
          <div className="rounded-xl shadow-lg bg-[#36454F] backdrop-blur-sm py-3 min-w-[96px] flex items-center justify-center flex-col gap-1 px-3">
            <h3 className="countdown-element hours font-manrope font-semibold text-2xl text-white text-center">
              {time.hours}
            </h3>
            <p className="text-sm uppercase font-normal text-white mt-1 text-center w-full">hours</p>
          </div>
        </div>

        <div className="timer">
          <div className="rounded-xl shadow-lg bg-[#36454F] backdrop-blur-sm py-3 min-w-[96px] flex items-center justify-center flex-col gap-1 px-3">
            <h3 className="countdown-element minutes font-manrope font-semibold text-2xl text-white text-center">
              {time.minutes}
            </h3>
            <p className="text-sm uppercase font-normal text-white mt-1 text-center w-full">minutes</p>
          </div>
        </div>

        <div className="timer">
          <div className="rounded-xl shadow-lg bg-[#36454F] backdrop-blur-sm py-3 min-w-[96px] flex items-center justify-center flex-col gap-1 px-3">
            <h3 className="countdown-element seconds font-manrope font-semibold text-2xl text-white text-center">
              {time.seconds}
            </h3>
            <p className="text-sm uppercase font-normal text-white mt-1 text-center w-full">seconds</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
