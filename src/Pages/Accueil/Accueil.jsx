import React, { useContext, useEffect } from "react";
import styles from "./Accueil.module.scss";
import { Link } from "react-router-dom";
import { CardContext } from "../../context/CardContext";

export default function Accueil() {
  const { resetGame } = useContext(CardContext);

  return (
    <div className="d-flex flex-column center table mhFull wFull">
      <h1>Jeu du Memory</h1>
      <Link to="/game" onClick={resetGame} className="btn btn-primary mt-10">
        Nouvelle Partie
      </Link>
    </div>
  );
}
