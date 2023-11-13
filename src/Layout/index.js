import React from "react";
import { Route, Switch} from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./DeckList";
import Bread from "./Bread";
import CreateDeck from "./CreateDeck";
import { DeckView } from "./DeckView";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import DeckStudy from "./DeckStudy";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact={true} path ='/'>
            <DeckList />
          </Route>
          <Route  path ='/decks/new'>
            <CreateDeck />
          </Route>
          <Route  path ='/decks/:deckId/cards/:cardId/edit'>
            <EditCard />
          </Route>
          <Route  path ='/decks/:deckId/edit'>
            <EditDeck />
          </Route>
          <Route  path ='/decks/:deckId/study'>
            <DeckStudy />
          </Route>
          <Route  path ='/decks/:deckId/cards/new'>
            <AddCard />
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
