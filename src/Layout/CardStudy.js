import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import DeckDel from "./DeckDel";

export const CardStudy = ({deck, cardState}) => {
    const currentCard = deck.cards.filter((card) => card.id === cardState.id);
    if(deck) {
        return(
            <div >
                {(cardState.side === 'front')?<p>{currentCard[0].front}</p>:<p>{currentCard[0].back}</p>}
            </div>
        )
    }    
}

export default CardStudy;