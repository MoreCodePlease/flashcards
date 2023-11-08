import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import NotFound from "./NotFound";

export const DeckSummary = ({deck}) => {
    const [cards, setCards] = useState([]);
    const [error, setError] = useState(undefined);
    
    if(deck) {
        return(
            <article className="">
                <div className="">
                    <h2 className="">{deck.name}</h2><h6>{deck.cards.length} Cards</h6>
                    <p>{deck.description}</p>
                </div>
                <button>View</button>
                <button>Study</button>
                <button><span class="bi bi-trash"></span></button>
            </article>
        )
    }    
}

export default DeckSummary;