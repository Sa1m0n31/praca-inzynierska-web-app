import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './static/style/style.css'
import Homepage from "./Homepage";

function App() {
  return <Router>
    <Route path="/">
      <Homepage/>
    </Route>
  </Router>
}

export default App;
