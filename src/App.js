import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Header from "./components/shared/Header";
import RentalListing from "./components/rental/rental-listing/RentalListing";
import RentalSearchListing from "./components/rental/rental-listing/RentalSearchListing";

import RentalDetail from "./components/rental/rental-detail/RentalDetail";
import { RentalCreate } from "./components/rental/rental-create/RentalCreate";
import "./App.css";
import Login from "./components/login/Login";
import { Register } from "./components/register/Register";
import { ProtectedRoute } from "./components/shared/auth/ProtectedRoute";
import { LoggedInRoute } from "./components/shared/auth/LoggedInRoute";
import * as actions from "./actions";

const store = require("./reducers").init();

class App extends Component {
  componentWillMount() {
    this.checkAuthState();
  }

  checkAuthState() {
    store.dispatch(actions.checkAuthState());
  }

  logout() {
    store.dispatch(actions.logout());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header logout={this.logout} />
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to="/rentals" />}
                />

                <Route exact path="/rentals" component={RentalListing} />
                <Route
                  exact
                  path="/rentals/:city/homes"
                  component={RentalSearchListing}
                />
                <Route exact path="/login" component={Login} />
                <LoggedInRoute exact path="/register" component={Register} />

                <ProtectedRoute
                  exact
                  path="/rentals/:id"
                  component={RentalDetail}
                />
                <ProtectedRoute
                  exact
                  path="/rentals/new"
                  component={RentalCreate}
                />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
