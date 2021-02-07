import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Lyrics from "./components/lyrics/Lyrics";
import Suggestion from "./components/suggestion/Suggestion";
import "./App.css";


function App() {
  return (
    <Router>
      <Switch>

        <Route path="/lyrics/:artistName/:title">
          <Lyrics />
        </Route>
        
        <Route path = "/suggestion/:query">
          <Suggestion></Suggestion>
        </Route>

        <Route path="/">
          <Home />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
