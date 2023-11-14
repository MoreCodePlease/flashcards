import React from "react";
import { Route, Switch, useLocation} from "react-router-dom";
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
  const pathArr = useLocation().pathname.split('/');
  //console.log(pathArr);
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
            <EditDeck isNew={true} />
          </Route>
          <Route  path ='/decks/:deckId/cards/:cardId/edit'>
            <EditCard cardIsNew={false}/>
          </Route>
          <Route  path ='/decks/:deckId/edit'>
            <EditDeck isNew={false}/>
          </Route>
          <Route  path ='/decks/:deckId/study'>
            <DeckStudy />
          </Route>
          <Route  path ='/decks/:deckId/cards/new'>
            <EditCard cardIsNew={true}/>
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
