import React from 'react';
import styles from './index.module.css';

import Button from 'react-bootstrap/Button';

const StartScreen = () => {
  return (
    <div className={styles.startScreen}>
      <h2>Secret Word</h2>
      <p>Clique no botão abaixo para começar a jogar</p>
      <Button variant="outline-primary">Começar o jogo</Button>
    </div>
  )
}

export default StartScreen;