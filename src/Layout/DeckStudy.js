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
        cards:[{back:'',deckId:0,front:'',id:0}]
    };
    const [deck, setDeck] = useState({...initDeck});
    const [thisDeck, setThisDeck] = useState({...initDeck});
    const location = useLocation();
    const history = useHistory();
    const deckId = useParams().deckId;
    const [error, setError] = useState(undefined);
    const initState = { id:0, side:'front'};
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
          
    }, []);
    useEffect(() => {
        setThisDeck({...deck});
        //console.log(deck);
    },[deck])

    const flipHandler = (event) =>{
        event.preventDefault();
        (cardState.side === 'front')?setCardState({...cardState, side:'back'}):setCardState({...cardState, side:'front'});
    }
    const nextHandler = (event) =>{
        event.preventDefault();
        console.log(cardState.id+1);
        (cardState.id +1 < thisDeck.cards.length)?setCardState({side:'front', id:cardState.id + 1}):setCardState({side:'front', id:0}); 
    }
    const restartPrompt = () => {
        if(window.confirm('Restart cards?\n'+'\n'+'Click "cancel" to return to the Home Page')== true) {
            setCardState({side:'front', id:0});
        } else {
            history.push('/')
        }
    }

    if (thisDeck.cards.length <= 2) {
        return (
            <div>
                <Bread deck={deck}/>
                <h3>Not enough cards.</h3>
                <p>You need at least 3 cards to study. There are {} cards in this deck.</p>
                <Link to={`/decks/${deckId}/cards/new`}><button>Add Cards</button></Link>
            </div>
        )
    }

    return(
    <div>
        <Bread deck={deck}/>
        <h1>{deck.name}: Study</h1>
        <div>
            <h4>Card {cardState.id + 1} of {thisDeck.cards.length}</h4>
            {(cardState.side === 'front')?<p>{thisDeck.cards[cardState.id].front}</p>:<p>{thisDeck.cards[cardState.id].back}</p>}
        </div>
        <button onClick={flipHandler}>Flip</button>
        {(cardState.side == 'back')?<button onClick={(cardState.id + 1 >= thisDeck.cards.length)?restartPrompt:nextHandler}>Next</button>:<div></div>}
    </div>)
}
export default DeckStudy;