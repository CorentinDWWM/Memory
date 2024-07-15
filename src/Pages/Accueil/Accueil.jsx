import React from "react";
import styles from "./Accueil.module.scss";
import { Link } from "react-router-dom";

export default function Accueil() {
  return (
    <div className="d-flex flex-column center table mhFull wFull">
      <h1>Jeu du Memory</h1>
      <Link to="/game" className="btn btn-primary mt-10">
        Nouvelle Partie
      </Link>
    </div>
  );
}
