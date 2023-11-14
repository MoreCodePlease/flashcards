import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import Bread from "./Bread";
import CardStudy from "./CardStudy";

export const DeckStudy = () => {
    const initDeck = {
        id:0,
        name:'',
        description:'',
        cards:[]
    };
    const [deck, setDeck] = useState({...initDeck});
    const location = useLocation();
    const history = useHistory();
    const deckId = useParams().deckId;
    //const foreignDeck = location.state?.foreignDeck;
    //setDeck({...foreignDeck});
    const [error, setError] = useState(undefined);
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
    const flipHandler = (event) =>{
        event.preventDefault();
        (cardState.side === 'front')?setCardState({...cardState, side:'back'}):setCardState({...cardState, side:'front'});
        console.log(cardState.side);
    }
    const nextHandler = (event) =>{
        event.preventDefault();
        const nextId = cardState.id + 1;
        (cardState.id < deck.cards.length)?setCardState({side:'front', id:nextId}):setCardState({side:'front', id:1});
        console.log(cardState.side);
    }
        


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
            <CardStudy deck={deck} cardState={cardState}/>  
        </div>
        <button onClick={flipHandler}>Flip</button>
        {(cardState.side == 'back')?<button onClick={nextHandler}>Next</button>:<div></div>}
    </div>)
}
export default DeckStudy;