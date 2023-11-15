import React from "react";
import { Route, Switch, useLocation} from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./DeckList";
import { DeckView } from "./DeckView";
import EditDeckT from "./EditDeckT";
import EditCardT from "./EditCardT";
import DeckStudy from "./DeckStudy";

function Layout() {
  const pathArr = useLocation().pathname.split('/');
  //console.log(pathArr);
  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact={true} path ='/'>
            <DeckList />
          </Route>
          <Route  path ='/decks/new'>
            <EditDeckT isNew={true} />
          </Route>
          <Route  path ='/decks/:deckId/cards/:cardId/edit'>
            <EditCardT isNew={false}/>
          </Route>
          <Route  path ='/decks/:deckId/edit'>
            <EditDeckT isNew={false}/>
          </Route>
          <Route  path ='/decks/:deckId/study'>
            <DeckStudy />
          </Route>
          <Route  path ='/decks/:deckId/cards/new'>
            <EditCardT isNew={true}/>
          </Route>
          <Route  path ='/decks/:deckId'>
            <DeckView />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
