import React, { useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import { Route, Switch } from "react-router-dom";
import ViewDeck from "./ViewDeck";
import StudyDeck from "./StudyDeck";
import AddDeck from "./AddDeck";

function Layout() {
  const [decks, setDecks] = useState([]);

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home decks={decks} setDecks={setDecks} />
          </Route>
          <Route path="/decks/new">
            <AddDeck decks={decks} setDecks={setDecks} />
          </Route>
          <Route exact path="/decks/:deckId">
            <ViewDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
