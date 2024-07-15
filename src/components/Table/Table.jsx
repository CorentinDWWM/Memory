import React, { useContext } from "react";
import { CardContext } from "../../context/CardContext";
import styles from "./Table.module.scss";
import Card from "../Card/Card";

export default function Table() {
  const { cards } = useContext(CardContext);
  return (
    <div className={`${styles.board}`}>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
        />
      ))}
    </div>
  );
}
