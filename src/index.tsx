import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom"; // Use HashRouter instead of BrowserRouter
import { StateMachineProvider, createStore } from "little-state-machine";
import ChooseDish from "./pages/ChooseDish";
import Pizza from "./pages/Pizza";
import Soup from "./pages/Soup";
import Sandwich from "./pages/Sandwich";

import "./index.css";
import Result from "./pages/Result";

createStore({
  data: {
    name: "",
    preparation_time: "",
    type: "",
  },
});

function App() {
  return (
    <StateMachineProvider>
      <h1>Frontend (React) Developer - Dishes</h1>
      <Router>
        <Route exact path="/" component={ChooseDish} />
        <Route path="/pizza" component={Pizza} />
        <Route path="/soup" component={Soup} />
        <Route path="/sandwich" component={Sandwich} />
        <Route path="/result" component={Result} />
      </Router>
    </StateMachineProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
