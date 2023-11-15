import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import NotFound from "./NotFound";
import {Link} from "react-router-dom";
import { DelHandler } from "./DelHandler";

export const DeckListSummary = ({deck}) => {
    const [cards, setCards] = useState([]);
    const [error, setError] = useState(undefined);
    
    if(deck) {
        return(
            <article >
                <div >
                    <h2 >{deck.name}</h2><h6>{`${deck.cards.length} cards`}</h6>
                    <p>{deck.description}</p>
                </div>
                <Link to={`/decks/${deck.id}`}><button>View</button></Link>
                <Link to={{pathname:`/decks/${deck.id}/study`}}><button>Study</button></Link>
                <DelHandler deckId={deck.id}/>
            </article>
        )
    }    
}

export default DeckListSummary;