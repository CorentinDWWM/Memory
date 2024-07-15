import React, { useContext } from "react";
import { CardContext } from "../../context/CardContext";
import Table from "../../components/Table/Table";

export default function Jeu() {
  const { cards, matchedPairs } = useContext(CardContext);
  return (
    <div className="table mhFull wFull d-flex center flex-column ta-center">
      {matchedPairs === cards.length / 2 && (
        <h2 className="mt-10">Vous avez gagné !</h2>
      )}
      <Table />
    </div>
  );
}
