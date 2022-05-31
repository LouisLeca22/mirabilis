import Featured from "../../components/Featured/Featured";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Discover from "../../components/Discover/Discover";
import "./home.css";
import Trend from "../../components/Trend/Trend";
import MailList from "../../components/MailList/MailList";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <h1 className="homeTitle">Mejores destinos</h1>
        <Featured />
        <h1 className="homeTitle">Descubre Paris </h1>
        <Discover />
        <h1 className="homeTitle">Inspírate para tu próximo viaje</h1>
        <Trend />
        <MailList />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
