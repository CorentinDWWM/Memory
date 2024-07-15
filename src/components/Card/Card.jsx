import React, { useContext } from "react";
import styles from "./Card.module.scss";
import { CardContext } from "../../context/CardContext";

export default function Card({ card, isFlipped, isMatched }) {
  const { handleCardClick } = useContext(CardContext);
  return (
    <div
      className={`${styles.card} ${isFlipped ? `${styles.flipped}` : ""} ${
        isMatched ? `${styles.matched}` : ""
      }`}
      onClick={() => handleCardClick(card)}
    >
      <div className={`${styles.card_inner}`}>
        <div className={`${styles.card_front}`}>?</div>
        <div className={`${styles.card_back}`}>{card.dev}</div>
      </div>
    </div>
  );
}
