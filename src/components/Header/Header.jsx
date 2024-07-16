import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";
import { useContext, useState } from "react";
import { CardContext } from "../../context/CardContext";
import HeaderMobile from "./components/HeaderMobile";

function Header() {
  const { resetGame, score } = useContext(CardContext);
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className={`${styles.header} d-flex flex-row align-items-center`}>
      <div className={`d-flex flex-fill center ${styles.divScore}`}>
        {location.pathname === "/game" ? <p>{score}</p> : null}
      </div>
      <div className={`${styles.responsive} d-flex flex-rr`}>
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
      <i
        onClick={() => setShowMenu(true)}
        className={`fas fa-bars mr-10 ${styles.mobileHeader}`}
      ></i>
      {showMenu && (
        <>
          <HeaderMobile setShowMenu={setShowMenu} />
        </>
      )}
    </header>
  );
}

export default Header;
