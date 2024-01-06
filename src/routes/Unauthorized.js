import { FiAlertTriangle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  let count = 0;
  let interval;
  const history = useNavigate();
  function delayedText() {
    count += 1;
    const secondstext = document.querySelector(".seconds");
    if (count <= 5) {
      secondstext.innerText = count + " Seconds Left";
    } else {
      clearInterval(interval);
      secondstext.innerText = "Redirecting";
      history("/");
    }
  }

  interval = setInterval(delayedText, 1000);
  return (
    <>
      <div className="w-screen h-screen bg-gradient-to-b from-slate-800 to-slate-900 items-center justify-center">
        <div className="w-screen h-screen flex flex-col items-center justify-center">
          <h1 className="text-white text-2xl font-bold flex">
            User is not logged in{" "}
            <FiAlertTriangle className="text-red-700 text-4xl ml-4" />
          </h1>
          <div className="seconds text-white text-xl"></div>
        </div>
      </div>
    </>
  );
}
