import React from 'react';
import logo from './logo.svg';
import './App.css';

// React Router
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Pages
//import LandingPage from "./pages";

function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <nav>
            <ul>
              <li><Link to="/">Landing</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </nav>

          <Route path="/" exact> <h1>LANDING</h1> </Route>
          <Route path="/login"> <h1>LOGIN</h1> </Route>

        </main>
      </Router>
    </div>
  );
}

export default App;
