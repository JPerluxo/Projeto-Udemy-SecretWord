import { React, useState, useRef } from 'react';
import styles from './index.module.css';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

const Game = ({ verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score }) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();

    verifyLetter(letter);
    setLetter("");
    letterInputRef.current.focus();
  };
  
  return (
    <div className={styles.game}>
      <p className={styles.points}> <span>Pontuação: {score}</span> </p>
      <h1>Adivinhe a palavra:</h1>
      <h3>Dica sobre a palavra: <span>{pickedCategory}</span> </h3>
      <p>Você ainda tem {guesses} tentativa(s).</p>
      <div className={styles.wordContainer}>
        {letters.map((letter, index) => (
          guessedLetters.includes(letter) ? (
            <Card key={index}>
              <Card.Body key={index}>{letter}</Card.Body>
            </Card>
          ) : (
            <Card key={index}>
              <Card.Body key={index}></Card.Body>
            </Card>
          )
        ))}
      </div>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Form.Control type="text" placeholder="Tente adivinhar uma letra da palavra" maxLength={1} required onChange={(event) => setLetter(event.target.value)} value={letter} ref={letterInputRef}/>
          <Button variant="primary" type="submit">Jogar!</Button>
        </InputGroup>
      </Form>
      <div className={styles.wrongLettersContainer}>
        Letras já utilizadas:<br/>
        {wrongLetters.map((letter, index) => (
          <span key={index}>{letter}, </span>
        ))}
      </div>
    </div>
  )
}

export default Game;