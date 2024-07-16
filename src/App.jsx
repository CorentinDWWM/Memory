import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import styles from "./App.module.scss";
import { Outlet } from "react-router-dom";
import CardProvider from "./components/Providers/CardProvider";

function App() {
  return (
    <>
      <div className={`d-flex center flex-column`}>
        <CardProvider>
          <Header />
          <Outlet />
          <Footer />
        </CardProvider>
      </div>
    </>
  );
}
export default App;
