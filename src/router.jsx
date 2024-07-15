import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Accueil from "./Pages/Accueil/Accueil";
import Jeu from "./Pages/Jeu/Jeu";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Accueil />,
      },
      {
        path: "/game",
        element: <Jeu />,
      },
    ],
  },
]);
