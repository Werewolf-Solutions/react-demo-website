import { Outlet } from "react-router-dom";
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";
import "./app.css";
import { useEffect } from "react";
import { useUser } from "./contexts/UserContext";

function App() {
  const { updateUser } = useUser();
  useEffect(() => {
    updateUser();
  }, []);
  return (
    <>
      <div className="background-image" />
      {/* <PopUp /> */}
      <Header />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
