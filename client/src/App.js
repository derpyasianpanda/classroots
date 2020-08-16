import React from 'react';
import logo from './logo.svg';
import './App.css';

// React Router
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Pages
import LandingPage from "./pages/landingpage/LandingPage";
import LoginPage from "./pages/loginpage/LoginPage";

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

          <Route path="/" exact>
            <LandingPage /> 
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>

        </main>
      </Router>
    </div>
  );
}

export default App;
