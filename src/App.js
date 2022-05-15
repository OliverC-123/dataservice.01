import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import { Fragment } from "react";

import Nav from "./components/nav";
import NewsPage from "./components/NewsPage";
import HomePage from "./components/HomePage";
import GeniusPage from "./components/GeniusPage";
import QuotePage from "./components/QuotePage";
import LovePage from "./components/LovePage";
import FactsPage from "./components/FactsPage";
import SWPage from "./components/SWPage";
import WeatherPage from "./components/WeatherPage";
import WeatherPage1 from "./components/WeatherPage copy";
import WeatherPage2 from "./components/WeatherPage copy 2";
function App() {
  return (
    <Fragment>
      <Router>
        <section id="container">
          <Nav></Nav>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/FactsPage" element={<FactsPage />} />
            <Route path="/GeniusPage" element={<GeniusPage />} />
            <Route path="/QuotePage" element={<QuotePage />} />
            <Route path="/LovePage" element={<LovePage />} />
            <Route path="/SWPage" element={<SWPage />} />
            <Route path="/NewsPage" element={<NewsPage />} />
            <Route path="/WeatherPage" element={<WeatherPage />} />
            <Route path="/WeatherPage1" element={<WeatherPage1 />} />
            <Route path="/WeatherPage2" element={<WeatherPage2 />} />

          </Routes>
        </section>
      </Router>
    </Fragment>
  );
}

export default App;
