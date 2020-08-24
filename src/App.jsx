import "./App.css";
import React from "react";
import { ContextProvider } from "./Context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Err from "./components/Err";

function App() {
    return (
        <div className="App">
            <ContextProvider>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route component={Err}/>
                    </Switch>
                </Router>
            </ContextProvider>
        </div>
    );
};

export default App;
