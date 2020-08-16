import React from 'react';
import logo from './logo.svg';
import './App.css';

// React Router
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Components
import MainNavbar from "./components/MainNavbar";

// Pages
import LandingPage from "./pages/landingpage/LandingPage";
import LoginPage from "./pages/loginpage/LoginPage";
import PodPage from "./pages/podpage/PodPage";

function App() {
  return (
    <div className="App">
      <Router>
        <main>

          <Route path="/" exact>
            <PodPage />
          </Route>
          <Route path="/login">
            <LandingPage />
          </Route>

        </main>
      </Router>
    </div>
  );
}

export default App;
