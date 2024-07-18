import { NavLink, useLocation } from "react-router-dom";
import styles from "./HeaderMobile.module.scss";
import { CardContext } from "../../../context/CardContext";
import { useContext } from "react";

export default function HeaderMobile({ setShowMenu }) {
  const { resetGame } = useContext(CardContext);
  const location = useLocation();

  // pour faire deux handleClick en un
  const handleClick = () => {
    setShowMenu(false);
    resetGame();
  };

  return (
    <>
      <ul className={`d-flex flex-column p-20 ${styles.container}`}>
        <i
          style={{ cursor: "pointer" }}
          onClick={() => setShowMenu(false)}
          className=" d-flex flex-column align-items-end fa-solid fa-xmark"
        ></i>
        <NavLink
          onClick={handleClick}
          to="/"
          className={`${styles.btnNav} mt-10`}
        >
          Accueil
        </NavLink>
        {location.pathname === "/game" ? (
          <a className={`${styles.btnNav}`} onClick={handleClick}>
            Recommencer
          </a>
        ) : null}
      </ul>
    </>
  );
}
