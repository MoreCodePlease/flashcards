import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import Bread from "./Bread";

export const DeckStudy = () => {
    const location = useLocation();
    const history = useHistory();
    const foreignDeck = location.state?.foreignDeck;
    const [deck, setDeck] = useState({...foreignDeck});
    const [error, setError] = useState(undefined);
    const deckId = useParams().deckId;
    const initState = { id:1, side:'front'};
    const [cardState, setCardState] = useState({...initState});
    
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
          
    }, [history]);

    if (deck.cards.length <= 2) {
        return (
            <div>
                <h3>Not enough cards.</h3>
                <p>You need at least 3 cards to study. There are {} cards in this deck.</p>
                <Link to={`/decks/${deckId}/cards/new`}><button>Add Cards</button></Link>
            </div>
        )
    }

    return(
    <div>
        <div>
            <Bread deck={deck}/>
        </div>
        <h1>{deck.name}: Study</h1>
        <div>
            <h4>Card {cardState.id} of {deck.cards.length}</h4>
        </div>
        <div>
            
        </div>
    </div>)
}
export default DeckStudy;