import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./components/navbar.component";
import TradespeopleList from "./components/tradespeople-list.component";
import EditTradesperson from "./components/edit-tradesperson.component";
import CreateTradesperson from "./components/create-tradesperson.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={TradespeopleList} />
        <Route path="/edit/:id" exact component={EditTradesperson} />
        <Route path="/create" exact component={CreateTradesperson} />
        <Route path="/user" exact component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
