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

function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <MainNavbar />

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
