// Globals
import "./styles.scss";
import React, { useState, useEffect } from "react";

// Components
import { Button } from "components/Button";

// Sub-component
function Expired() {
  return (
    <div className="aura-expired">
      <div className="aura-expired-emoji">⚠️</div>
      <div className="aura-expired-text">Timer expired!</div>
    </div>
  );
}

// Component
function Timer() {
  // Hooks - state
  let [counter, setCounter] = useState(0);
  let [timerStarted, setTimerStarted] = useState(false);
  let [intervalId, setIntervalId] = useState();

  // TODO: implement counter...
  let countDown = 60;

  useEffect(() => {
    return () => resetTimer(intervalId);
  }, []);

  const startTimer = () => {
    if (!timerStarted) {
      setCounter(countDown);
      const id = setInterval(() => {
        countDown > 0 ? setCounter(--countDown) : clearInterval(id);
      }, 1000);
      setIntervalId(id);
      setTimerStarted(true);
    }
  };

  const resetTimer = (intervalId) => {
    clearInterval(intervalId);
    setIntervalId(undefined);
    countDown = 60;
    setCounter(countDown);
    setTimerStarted(false);
  };

  const getFormattedTime = (seconds) => {
    const formattedMinutes = parseInt(seconds / 60);
    let formattedSeconds = seconds % 60;
    formattedSeconds =
      formattedSeconds < 10 ? "0" + formattedSeconds : formattedSeconds; //pad leading zero on seconds
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  // Render
  return (
    <div className="aura-page aura-timer">
      <h1>Timer</h1>

      <div className="aura-page-content">
        <div className="aura-timer-clock">{getFormattedTime(counter)}</div>
        {counter <= 0 ? <Expired /> : null}

        <div className="aura-timer-buttons">
          <Button onClick={startTimer}>Start</Button>
          <Button onClick={() => resetTimer(intervalId)}>Reset</Button>
        </div>
      </div>
    </div>
  );
}

export { Timer, Expired };
