import { React, useCallback, useEffect, useState } from 'react';
import './Reset.css';

import { wordsList } from './words';
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const STAGES = [
  { id: 1, name:"start" },
  { id: 2, name:"game" },
  { id: 3, name:"end" }
];

const GUESSES_NUM = 3;

function App() {
  const [gamestage, setGameStage] = useState(STAGES[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState(null);
  const [pickedCategory, setPickedCategory] = useState(null);
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(GUESSES_NUM);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  }, [words]);

  const startGame = useCallback(() => {
    clearLetterStates();
    const { word, category } = pickWordAndCategory();
    let letters = word.split("").map((letter) => letter.toLowerCase());

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(letters);
    setGameStage(STAGES[1].name);
  }, [pickWordAndCategory]);

  const verifyLetter = (letter) => {
    letter = letter.toLowerCase();
    if (!/^[a-záéíóúãõâêîôûç]$/i.test(letter)) return;
    if(guessedLetters.includes(letter) || wrongLetters.includes(letter)) return;
    if(letters.includes(letter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, letter
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, letter
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  useEffect(() => {
    if(guesses <=0) {
      clearLetterStates();
      setGameStage(STAGES[2].name);
    }
  }, [guesses])

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    if(guessedLetters.length === uniqueLetters.length && gamestage === STAGES[1].name) {
      setScore((actualScore) => actualScore += 100);
      setGuesses(GUESSES_NUM);
      startGame();
    }
  }, [guessedLetters, letters, gamestage, startGame])
  
  const retry = () => {
    setScore(0);
    setGuesses(GUESSES_NUM);
    clearLetterStates();
    setGameStage(STAGES[0].name);
  };

  return (
    <div className="appBox">
      {gamestage === "start" && <StartScreen startGame={startGame}/>}
      {gamestage === "game" && <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score}/>}
      {gamestage === "end" && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
