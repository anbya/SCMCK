import React, { Component } from 'react';
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Mainpage from "./main";
import Loginpage from "./loginPage";
import Navbarpage from "./navbar";
import Outletpage from "./outlet";
import Categorypage from "./categoryitem";
import Itempage from "./itempage";
import Staffpage from "./staff";

class base extends Component {
    render() {
        return (
            <Provider store={store}>
              <Router>
                <Switch>
                  <Route exact path="/">
                    <Loginpage />
                  </Route>
                  <Route path="/home">
                    <Navbarpage />
                    <Mainpage />
                  </Route>
                  <Route path="/outlet">
                    <Outletpage />
                  </Route>
                  <Route path="/categoryItem">
                    <Navbarpage />
                    <Categorypage />
                  </Route>
                  <Route path="/item">
                    <Navbarpage />
                    <Itempage />
                  </Route>
                  <Route path="/staff">
                    <Navbarpage />
                    <Staffpage />
                  </Route>
                </Switch>
              </Router>
            </Provider>
        );
    }
}

export default base;