import React from "react";
import {Link, useHistory, useLocation } from 'react-router-dom';
import {deleteCard, deleteDeck} from "../utils/api";


export const DelHandler = ({deckId, cardId}) => {
    const location = useLocation().pathname;
    const history = useHistory();
    const deletePromp = () => {
        if(deckId) {
            if(window.confirm('Delete This Deck?\n'+'\n'+'You will not be able to recover it.')== true) {
                deleteDeck(deckId);
                (location !== '/')? history.push('/'):window.location.reload(false);
            }
        } else if (cardId){
            if(window.confirm('Delete This Card?\n'+'\n'+'You will not be able to recover it.')== true) {
                deleteCard(cardId);
                window.location.reload(false);
            }
        }
            
    }

    return (
        <button className="btn btn-danger" onClick={deletePromp}><i className="oi oi-trash"></i></button>
    )
}

export default DelHandler;