import { useEffect, useState } from "react";
import { CardContext } from "../../context/CardContext";
import { datas } from "../../data";

export default function CardProvider({ children }) {
  const [devs, setDevs] = useState(datas);
  // génération des cartes aléatoirements

  const generateCards = () => {
    const cards = devs.concat(devs).map((dev, index) => ({
      id: index,
      dev,
      isFlipped: false,
      isMatched: false,
    }));
    return cards.sort(() => 0.5 - Math.random());
  };

  const [cards, setCards] = useState(generateCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [score, setScore] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  // gestion du score

  const handleMatch = () => {
    setScore((prevScore) => prevScore + 100);
  };

  const handleIncorrectMatch = () => {
    setScore((prevScore) => prevScore - 10);
  };

  // gestion des cartes retournés

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true);
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.dev === secondCard.dev) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.dev === firstCard.dev ? { ...card, isMatched: true } : card
          )
        );
        setMatchedPairs((prev) => prev + 1);
        handleMatch();
        setIsChecking(false);
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setIsChecking(false);
        }, 2000);
        handleIncorrectMatch();
      }
      setFlippedCards([]);
    }
  }, [flippedCards]);

  // gestion du click sur une carte
  const handleCardClick = (card) => {
    if (card.isFlipped || flippedCards.length === 2 || isChecking) {
      return;
    }
    setCards((prevCards) =>
      prevCards.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c))
    );
    setFlippedCards((prev) => [...prev, card]);
  };

  // pour recommencer

  const resetGame = () => {
    setCards(generateCards());
    setFlippedCards([]);
    setMatchedPairs(0);
    setScore(0);
  };

  return (
    <CardContext.Provider
      value={{
        cards,
        resetGame,
        handleCardClick,
        matchedPairs,
        score,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}
