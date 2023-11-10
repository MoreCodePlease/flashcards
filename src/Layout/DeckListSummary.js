import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import NotFound from "./NotFound";
import {Link} from "react-router-dom";

export const DeckListSummary = ({deck}) => {
    const [cards, setCards] = useState([]);
    const [error, setError] = useState(undefined);
    
    if(deck) {
        return(
            <article className="">
                <div className="">
                    <h2 className="">{deck.name}</h2><h6>{deck.cards.length} Cards</h6>
                    <p>{deck.description}</p>
                </div>
                <Link to={`/decks/${deck.id}`}><button>View</button></Link>
                <button>Study</button>
                <button><span>DELETE</span></button>
            </article>
        )
    }    
}

export default DeckListSummary;