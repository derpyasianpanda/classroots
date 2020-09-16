import React from "react";
import { ContextProvider } from "./Context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Err from "./components/Err";
import Pod from "./components/Pod";
import Home from "./components/Home";
import Pods from "./components/Pods";
import Users from "./components/Users";
import Profile from "./components/Profile";
import User from "./components/User";
import Navigation from "./components/Navigation";

import "./App.css";

function App() {
    return (
        <div className="App">
            <ContextProvider>
                <Router>
                    <Navigation/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/pods" component={Pods}/>
                        <Route exact path="/pods/:podID" component={Pod}/>
                        <Route exact path="/users" component={Users}/>
                        <Route exact path="users/me" component={Profile}/>
                        <Route exact path="/users/:userID" component={User}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route component={Err}/>
                    </Switch>
                </Router>
            </ContextProvider>
        </div>
    );
};

export default App;
