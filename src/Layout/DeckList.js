import React, {useEffect, useState} from "react";
import {Link, useHistory} from 'react-router-dom';
import { listDecks } from "../utils/api";
import DeckListSummary from "./DeckListSummary";

export const DeckList = () => {
    const [decks, setDecks] = useState([]);
    const [error, setError] = useState(undefined);
    const history = useHistory();
    
    useEffect(() => {
      const abortController = new AbortController();
      listDecks(abortController.signal).then(setDecks).catch(setError);
      return () => abortController.abort();
    }, [history]);
    if (error) {
      //return <ErrorMessage error={error} />;
    }
    const list = decks.map((deck) => <DeckListSummary key={deck.id} deck={deck} />);
    

    return (
        <section className="">
            <Link to='/decks/new'><button>Create Deck</button></Link>
            {list}
        </section>
    )
}

export default DeckList;