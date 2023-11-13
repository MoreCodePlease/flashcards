import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { Link, useParams, useHistory } from "react-router-dom";

export const DeckStudy = () => {
    const initState = { id:1, side:'front'};
    const history = useHistory();
    const [error, setError] = useState(undefined);
    const deckId = useParams().deckId;
    const [deck, setDeck] = useState(undefined);
    const [cardState, setCardState] = useState({...initState});
    const [deckLength, setDeckLength] = useState(0);

    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal)
            .then(setDeck)
            .catch((error) => {
                if (error.name !== "AbortError") {
                setError(error);
                }
          });
          return () => abortController.abort();
          
    }, []);
    
    if(deck) {
        setDeckLength(deck.cards.length);
        if (deckLength <= 2) {
            return (
                <div>
                    <h3>Not enough cards.</h3>
                    <p>You need at least 3 cards to study. There are {} cards in this deck.</p>
                    <Link to={`/decks/${deckId}/cards/new`}><button>Add Cards</button></Link>
                </div>
            )
        }
        return (
            <container>
                <h1>{deck.name}: Study</h1>
                <div>
                    <h4>Card {cardState.id} of {deck.cards.length}</h4>
                </div>
            </container>
            
            
        )

    }

    


    
}
export default DeckStudy;