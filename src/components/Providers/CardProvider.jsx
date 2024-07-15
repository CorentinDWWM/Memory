import { useEffect, useState } from "react";
import { CardContext } from "../../context/CardContext";

export default function CardProvider({ children }) {
  // génération des cartes aléatoirements

  const generateCards = () => {
    const devs = [
      "HTML",
      "CSS",
      "JavaScript",
      "Docker",
      "Git",
      "GitHub",
      "Excel",
      "Trello",
      "Figma",
      "WordPress",
    ];
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
  const [allFlippedCards, setAllFlippedCards] = useState(0);

  // gestion du score

  let score = 0;

  const handleScore = () => {
    if (allFlippedCards === 2) {
      score += 100;
      setAllFlippedCards(0);
    } else if (allFlippedCards === 4) {
      score += 80;
      setAllFlippedCards(0);
    } else if (allFlippedCards === 6) {
      score += 60;
      setAllFlippedCards(0);
    } else if (allFlippedCards === 8) {
      score += 40;
      setAllFlippedCards(0);
    } else if (allFlippedCards >= 10) {
      score += 20;
      setAllFlippedCards(0);
    }
  };

  // gestion des cartes retournés

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.dev === secondCard.dev) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.dev === firstCard.dev ? { ...card, isMatched: true } : card
          )
        );
        setMatchedPairs((prev) => prev + 1);
        handleScore();
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
        }, 1000);
      }
      setFlippedCards([]);
    }
  }, [flippedCards]);

  const handleCardClick = (card) => {
    if (card.isFlipped || flippedCards.length === 2) {
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
    score = 0;
  };

  return (
    <CardContext.Provider
      value={{ cards, resetGame, handleCardClick, matchedPairs }}
    >
      {children}
    </CardContext.Provider>
  );
}
