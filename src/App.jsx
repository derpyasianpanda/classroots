import "./App.css";
import React from "react";
import { ContextProvider } from "./Context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Err from "./components/Err";
import Pod from "./components/Pod";
import Home from "./components/Home";
import Pods from "./components/Pods";
import Users from "./components/Users";
import UserInfo from "./components/UserInfo";

function App() {
    return (
        <div className="App">
            <ContextProvider>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/pods" component={Pods}/>
                        <Route exact path="/pods/:podID" component={Pod}/>
                        <Route exact path="/users" component={Users}/>
                        <Route exact path="/users/:userID" component={UserInfo}/>
                        <Route component={Err}/>
                    </Switch>
                </Router>
            </ContextProvider>
        </div>
    );
};

export default App;
