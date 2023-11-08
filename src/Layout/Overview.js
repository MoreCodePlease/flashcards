import React, {useEffect, useState} from "react";
import { listDecks } from "../utils/api";
import DeckSummary from "./DeckSummary";

export const DeckOverview = () => {
    const [decks, setDecks] = useState([]);
    const [error, setError] = useState(undefined);
    
    useEffect(() => {
        const abortController = new AbortController();
        listDecks(abortController.signal).then(setDecks).catch(setError);
        return () => abortController.abort();
      }, []);
      if (error) {
        //return <ErrorMessage error={error} />;
      }
      const list = decks.map((deck) => <DeckSummary key={deck.id} deck={deck} />);
      console.log(decks)

    return (
        <section className="">
            <button>Create Deck</button>
            {list}
        </section>
    )
}

export default DeckOverview;