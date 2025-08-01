import { useEffect, useState } from "react";

const ReactionTimerGame = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeoutReached, setTimeoutReached] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [result, setResult] = useState(null);

  const handleStart = () => {
    setStartTime(Date.now());
    setResult(null);
    setIsRunning(true);
    setTimeoutReached(false);
  };

  const handleStop = () => {
    if (!isRunning || startTime === null) return;
    const now = Date.now();

    const elapsed = (now - startTime) / 1000;
    const diff = Math.abs(elapsed - 10);
    setResult(diff);
    setIsRunning(false);
  };

  useEffect(() => {
    if (!isRunning) return;

    const timer = setTimeout(() => {
      setTimeoutReached(true);
    }, 10500);

    return () => clearTimeout(timer);
  }, [isRunning]);

  return (
    <div className="flex flex-col justify-center items-center gap-8 p-8 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-xl rounded-xl max-w-sm mx-auto">
      <h1 className="text-3xl font-extrabold text-white text-center">
        ⏱️ 10초 반응 게임
      </h1>

      {!isRunning && result === null && (
        <button
          className="bg-white text-blue-600 px-8 py-4 rounded-full shadow-lg hover:bg-blue-100 transition duration-300 transform hover:scale-105"
          onClick={handleStart}
        >
          시작
        </button>
      )}

      {isRunning && (
        <>
          <p className="text-lg text-white">
            10초가 되었다고 생각되면 누르세요!
          </p>
          <button
            className="bg-red-500 text-white px-8 py-4 rounded-full shadow-lg hover:bg-red-600 transition duration-300 transform hover:scale-105"
            onClick={handleStop}
          >
            지금!
          </button>
        </>
      )}

      {result !== null && (
        <div className="text-center">
          <p className="text-xl font-bold text-white">
            ⏱️ {result.toFixed(2)}초 차이로 정답과{" "}
            {result < 0.5 ? "아주 가까웠어요! 🎯" : "조금 멀었어요! 🙏"}
          </p>

          <button
            onClick={handleStart}
            className="mt-6 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300"
          >
            다시 도전하기
          </button>
        </div>
      )}

      {timeoutReached && (
        <p className="text-red-300 mt-2 text-lg">
          10초가 지나도 누르지 않았어요!
        </p>
      )}
    </div>
  );
};

export default ReactionTimerGame;
