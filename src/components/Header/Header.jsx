import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";
import { useContext } from "react";
import { CardContext } from "../../context/CardContext";

function Header() {
  const { resetGame, score } = useContext(CardContext);
  const location = useLocation();
  return (
    <header className={`${styles.header} d-flex flex-row align-items-center`}>
      <div className={`d-flex flex-fill center ${styles.divScore}`}>
        {location.pathname === "/game" ? <p>{score}</p> : null}
      </div>
      <div className="d-flex flex-rr">
        <div>
          <Link to="/" onClick={resetGame}>
            Accueil
          </Link>
          {location.pathname === "/game" ? (
            <a className="ml-15" onClick={resetGame}>
              Recommencer
            </a>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default Header;
