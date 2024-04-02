import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Input, Progress } from '@mantine/core';
import classes from './Game.module.css';
import WordsArray from '../components/WordsArray/WordsArray';

export default function Game() {
  const [words] = useState(() => WordsArray.slice(0, 100)); // Initialize words array
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [totalCharTyped, setTotalCharTyped] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [time, setTime] = useState(100);
  const [clockTime, setClockTime] = useState(60);
  const [timerStarted, setTimerStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const startTime = () => {
    if (!timerStarted) {
      const inputElement = document.getElementById('input') as HTMLInputElement;
      inputElement.disabled = false;
      document.getElementById('input')?.focus();
      setTimerStarted(true);
      const interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval);
            setClockTime(0);
            setGameOver(true); // set gameOver to true if timer is at 0
            inputElement.disabled = true;
            setInputValue('');
            return 0;
          }
          return prevTime - 1.667; // decrement by approximately 1.67 every second
        });
        setClockTime((prevClockTime) => prevClockTime - 1); // decrement clock time by 1 every second
      }, 100);
    }
  };

  const setNewWord = () => {
    setTotalCharTyped(totalCharTyped + words[currentWordIndex].length);
    setCorrectWords(correctWords + 1);
    setCurrentWordIndex(currentWordIndex + 1);
  };

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputValue.trim().toLowerCase() === words[currentWordIndex]) {
      setCorrectWords(correctWords + 1);
      setNewWord();
      setInputValue('');
    } else {
      setCorrectWords(correctWords - 1);
      setInputValue('');
    }
  }

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className={classes.div}>
      <h1>Speed Typer!</h1>
      <div style={{ width: '50%', textAlign: 'center' }}>
        {!gameOver && (
          <Button
            className={classes.gameButton}
            onClick={startTime}
            autoContrast
            variant="gradient"
            gradient={{ from: 'violet', to: 'orange', deg: 0 }}
          >
            Start Timer
          </Button>
        )}
        {gameOver && (
          <Button
            className={classes.gameButton}
            onClick={refreshPage}
            autoContrast
            variant="gradient"
            gradient={{ from: 'violet', to: 'orange', deg: 0 }}
          >
            Restart Game
          </Button>
        )}
        <div className={classes.stats}>
          <h3
            className={classes.timer}
            style={clockTime <= 10 ? { color: '#e8590b' } : { color: 'white' }}
          >
            {clockTime === 60 ? '1:00' : clockTime <= 10 ? `0:0${clockTime}` : `0:${clockTime}`}
          </h3>
          <div className={classes.statCounts}>
            <h3 className={classes.counts}>Words Typed: {correctWords}</h3>
            <h3 className={classes.counts}>Characters Typed: {totalCharTyped}</h3>
          </div>
        </div>
        <Progress
          transitionDuration={1667} // 1667 milliseconds = 1.667 seconds
          style={{ margin: 10 }}
          color="orange"
          radius="xs"
          value={time}
        />
      </div>
      <div className={classes.wordDiv}>
        {words.map((word, index) => (
          <span
            key={word}
            className={index === currentWordIndex ? classes.currentWord : classes.otherWords}
          >
            {word}
          </span>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          disabled={!timerStarted}
          id="input"
          className={classes.input}
          size="lg"
          radius="md"
          value={inputValue}
          placeholder=""
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
