import React from 'react';
import styles from './index.module.css';

import Logo from '../../images/logo-secret-word.png';
import Button from 'react-bootstrap/Button';

const StartScreen = ({ startGame }) => {
  return (
    <div className={styles.startScreen}>
      <img src={Logo} alt="Secret Word" />
      <p>Clique no botão abaixo para começar a jogar</p>
      <Button variant="outline-primary" onClick={startGame}>Começar o jogo</Button>
    </div>
  )
}

export default StartScreen;