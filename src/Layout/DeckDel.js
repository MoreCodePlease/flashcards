import React from "react";
import {Link, useHistory, useParams } from 'react-router-dom';
import {deleteDeck} from "../utils/api";


export const DeckDel = () => {
    const deckId = useParams().deckId;
    const history = useHistory();
    const deletePromp = () => {
        if(window.confirm('Delete This Deck?\n'+'\n'+'You will not be able to recover it.')== true) {
            deleteDeck(deckId);
            history.push('/');
        }
    }

    return (
        <button type="button" class="btn btn-danger" onClick={deletePromp}><i class="oi oi-trash"></i></button>
    )
}

export default DeckDel;