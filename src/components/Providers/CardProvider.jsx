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
      "JMerise",
      "Tailwind",
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
  const [score, setScore] = useState(0);

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
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.dev === secondCard.dev) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.dev === firstCard.dev ? { ...card, isMatched: true } : card
          )
        );
        setMatchedPairs((prev) => prev + 1);
        handleMatch();
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
        handleIncorrectMatch();
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
