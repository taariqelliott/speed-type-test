import React, { ChangeEvent, FormEvent, useState } from 'react';
import {
  Anchor,
  Button,
  Group,
  Input,
  MantineProvider,
  Progress,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import classes from './Game.module.css';
import WordsArray from '../components/WordsArray/WordsArray';

export default function Game() {
  const { setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  const randomizeWords = WordsArray.sort(() => Math.random() - 0.5);
  const [words, setWords] = useState(() => randomizeWords.slice(0, 80)); // Initialize words array
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
          return prevTime - 1.667; // decrement by approximately 1.667 every second
        });
        setClockTime((prevClockTime) => prevClockTime - 1); // decrement clock time by 1 every second
      }, 1000);
    }
  };

  const setNewWord = () => {
    setTotalCharTyped(totalCharTyped + words[currentWordIndex].length);
    setCorrectWords(correctWords + 1);
    setCurrentWordIndex(currentWordIndex + 1);
  };

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const typedWord = e.target.value.trim().toLowerCase();
    setInputValue(typedWord);

    if (typedWord === words[currentWordIndex]) {
      setCorrectWords(correctWords + 1);
      setNewWord();
      setInputValue('');
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputValue.trim().toLowerCase() === words[currentWordIndex]) {
      setCorrectWords(correctWords + 1);
      setNewWord();
      setInputValue('');
    } else {
      setInputValue('');
    }
  }

  const refreshGame = () => {
    setCurrentWordIndex(0);
    setTotalCharTyped(0);
    setCorrectWords(0);
    setInputValue('');
    setTime(100);
    setClockTime(60);
    setTimerStarted(false);
    setGameOver(false);
    const newWordsArray = WordsArray.slice(0, 80); // Generate new set of words
    setWords(newWordsArray); // Update state with new words
  };

  return (
    <MantineProvider defaultColorScheme="dark">
      <Group className={classes.themeButtons}>
        <Button onClick={() => setColorScheme('light')}>Light</Button>
        <Button onClick={() => setColorScheme('dark')}>Dark</Button>
        <Button onClick={() => setColorScheme('auto')}>Auto</Button>
      </Group>
      <div className={classes.div}>
        <Text
          className={classes.title}
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: 'pink', to: 'yellow' }}
        >
          Speed Typer!
        </Text>
        <div style={{ width: '50%', textAlign: 'center' }}>
          <div className={classes.stats}>
            <div className={classes.clockAndButton}>
              <h3
                className={classes.timer}
                style={clockTime <= 10 ? { color: 'red' } : { color: 'white' }}
              >
                {clockTime === 60
                  ? '1:00'
                  : clockTime === 10
                    ? `0:${clockTime}`
                    : clockTime <= 9
                      ? `0:0${clockTime}`
                      : `0:${clockTime}`}
              </h3>
              {!gameOver && (
                <Button
                  className={classes.gameButton}
                  onClick={startTime}
                  autoContrast
                  variant="gradient"
                  gradient={{ from: 'violet', to: '#ed8607', deg: 0 }}
                >
                  Start Timer
                </Button>
              )}
              {gameOver && (
                <Button
                  className={classes.gameButton}
                  onClick={refreshGame}
                  autoContrast
                  variant="gradient"
                  gradient={{ from: 'violet', to: '#ed8607', deg: 0 }}
                >
                  Restart Game
                </Button>
              )}
            </div>
            <div className={classes.statCounts}>
              <h3 className={classes.counts}>
                WPM: <span style={{ color: '#ed8607' }}>{totalCharTyped / 5}</span>
              </h3>
              <h3 className={classes.counts}>
                Words Typed: <span style={{ color: '#ed8607' }}>{correctWords}</span>
              </h3>
              <h3 className={classes.counts}>
                Characters Typed: <span style={{ color: '#ed8607' }}>{totalCharTyped}</span>
              </h3>
              <h3 className={classes.counts}>
                Characters Per Second:{' '}
                <span style={{ color: '#ed8607' }}>{(totalCharTyped / 60).toFixed(2)}</span>
              </h3>
            </div>
          </div>
          <Progress
            transitionDuration={500} // 1667 milliseconds = 1.667 seconds
            style={{ margin: 10 }}
            color="pink"
            animated
            size="xl"
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

      <Group className={classes.socials}>
        <Anchor
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/taariq-elliott"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div
            className={classes.anchors}
            style={{ display: 'flex', alignItems: 'center', marginRight: 0 }}
          >
            <span style={{ margin: 3 }}>linkedin</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
              <path d="M8 11l0 5" />
              <path d="M8 8l0 .01" />
              <path d="M12 16l0 -5" />
              <path d="M16 16v-3a2 2 0 0 0 -4 0" />
            </svg>
          </div>
        </Anchor>
        <Anchor
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.github.com/taariqelliott"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div
            className={classes.anchors}
            style={{ display: 'flex', alignItems: 'center', marginLeft: 0 }}
          >
            <span style={{ margin: 3 }}>github</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
            </svg>
          </div>
        </Anchor>
      </Group>
    </MantineProvider>
  );
}
