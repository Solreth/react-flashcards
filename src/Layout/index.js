import React, { useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import { Route, Switch } from "react-router-dom";
import ViewDeck from "./ViewDeck";
import StudyDeck from "./StudyDeck";
import AddDeck from "./AddDeck";
import AddCard from "./AddCard";

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
            <AddDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <ViewDeck setDecks={setDecks} />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
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
