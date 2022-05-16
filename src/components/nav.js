import { Fragment } from "react";
import { Link } from "react-router-dom";
function Nav() {
  return (
    <Fragment>
      <section id="navigation">
        <nav>
          <ul>
            <li>
              <Link to="/HomePage">Home</Link>
            </li>
            <li>
              <Link to="/FactsPage">Facts</Link>
            </li>
            <li>
              <Link to="/QuotePage">Quotes</Link>
            </li>
            <li>
              <Link to="/GeniusPage">Genius</Link>
            </li>
            <li>
              <Link to="/LovePage">Love Calculator</Link>
            </li>
            <li>
              <Link to="/SWPage">Star Wars</Link>
            </li>
            <li>
              <Link to="/NewsPage">News</Link>
            </li>
            <li>
              <Link to="/WeatherPage">Weather</Link>
            </li>
            <li>
              <Link to="/WeatherPage1">Weather+</Link>
            </li>
            <li>
              <Link to="/WeatherPage2">Weather++</Link>
            </li>
            <li>
              <Link to="/WeatherPage3">Weather+++</Link>
            </li>
          </ul>
        </nav>
      </section>
    </Fragment>
  );
}
export default Nav;
