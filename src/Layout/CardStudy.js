import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import DeckDel from "./DelHandler";

export const CardStudy = ({deck, cardState}) => {
    const currentCard = deck.cards[cardState.id]
    console.log(currentCard);
    if(deck) {
        return(
            <div >
                {(cardState.side === 'front')?<p>{currentCard.front}</p>:<p>{currentCard.back}</p>}
            </div>
        )
    }    
}

export default CardStudy;