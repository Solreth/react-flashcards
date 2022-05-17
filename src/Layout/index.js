import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import { Route, Switch } from "react-router-dom";
import ViewDeck from "./ViewDeck";
function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/decks/:deckId">
            <ViewDeck />
          </Route>
          <Route path="/decks/:deckId/study"></Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
