import React from 'react';
import styles from './index.module.css';

import GameOverText from '../../images/game-over-text.png';
import Button from 'react-bootstrap/Button';

const GameOver = ({ retry, score }) => {
  return (
    <div className={styles.gameOver}>
      <img src={GameOverText} alt="Fim de Jogo!" />
      <h2>Sua pontuação foi: <span>{score}</span></h2>
      <Button variant="primary" onClick={retry}>Resetar Jogo</Button>
    </div>
  )
}

export default GameOver;