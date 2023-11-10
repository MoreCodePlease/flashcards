import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./DeckList";
import Bread from "./Bread";
import CreateDeck from "./CreateDeck";
import { DeckView } from "./DeckView";
import EditDeck from "./EditDeck";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Bread />
        <Switch>
          <Route exact={true} path ='/'>
            <DeckList />
          </Route>
          <Route  path ='/decks/new'>
            <CreateDeck />
          </Route>
          <Route  path ='/decks/:deckId/edit'>
            <EditDeck />
          </Route>
          <Route  path ='/decks/:deckId'>
            <DeckView />
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
