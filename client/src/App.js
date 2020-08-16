import React from 'react';
import logo from './logo.svg';
import './App.css';
import ContextProvider from "./Context";

// React Router
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Components
import MainNavbar from "./components/MainNavbar";

// Pages
import LandingPage from "./pages/landingpage/LandingPage";
import LoginPage from "./pages/podbrowsepage/PodBrowsePage";
import PodPage from "./pages/podpage/PodPage";
import PodBrowsePage from "./pages/podbrowsepage/PodBrowsePage";

function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <ContextProvider>
            <Route path="/" exact>
              <LandingPage />
            </Route>
            <Route path="/message">
              <MainNavbar />
              <PodPage />
            </Route>
            <Route path="/browse">
              <MainNavbar />
              <PodBrowsePage />
            </Route>
          </ContextProvider>
        </main>
      </Router>
    </div>
  );
}

export default App;
