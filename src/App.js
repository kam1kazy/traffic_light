import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [count, setCount] = useState(0);

  const [redColor, setRedColor] = useState();
  const [yellowColor, setYellowColor] = useState();
  const [greenColor, setGreenColor] = useState();

  // Time for Red light and Green light
  const redTime = 15;
  const greenTime = 10;
  const flashAnimation = 4;

  // Set time for change color
  const time = redTime + greenTime;
  const redChangeColor = time - (redTime - flashAnimation);
  const greenChangeColor = time - redTime;

  useEffect(() => {
    const timer = count > 0 && setInterval(() => setCount(count - 1), 1000);

    if (count === redChangeColor) {
      setYellow();
    }

    if (count === greenChangeColor) {
      setGreen();
    }

    if (count === 0) {
      startTimer();
      setGreenColor("");
    }

    return () => clearInterval(timer);
  }, [count]);

  // START YELLOW
  const setYellow = async () => {
    setYellowColor("yellow animated");
    await new Promise((resolve) =>
      setTimeout(
        () => resolve(setYellowColor(""), setRedColor("")),
        flashAnimation * 1000
      )
    );
  };

  // START GREEN
  const setGreen = async () => {
    setGreenColor("green");
    await new Promise((resolve) =>
      setTimeout(
        () => resolve(setGreenColor("green animated")),
        flashAnimation * 1000
      )
    );
  };

  // START RED
  const startTimer = () => {
    setRedColor("red");
    setCount(redTime + greenTime);
  };

  return (
    <div className="App">
      <h1>Ligher</h1>
      <div className="ligther">
        <span className={redColor}></span>
        <span className={yellowColor}></span>
        <span className={greenColor}></span>
      </div>
      <div>
        <span>{count}</span>
      </div>
      <br />
      <button onClick={startTimer}>play</button>
    </div>
  );
}
