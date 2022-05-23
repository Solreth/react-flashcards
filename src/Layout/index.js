import React, { useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import { Route, Switch } from "react-router-dom";
import ViewDeck from "./ViewDeck";
import StudyDeck from "./StudyDeck";
import AddDeck from "./AddDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import EditDeck from "./EditDeck";

function Layout() {
  const [decks, setDecks] = useState([]);
  const [deck, setDeck] = useState("");

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
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard deck={deck} setDeck={setDeck} />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
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
