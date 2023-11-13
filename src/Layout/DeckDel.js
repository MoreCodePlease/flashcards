import React from "react";
import {Link, useHistory, useLocation } from 'react-router-dom';
import {deleteDeck} from "../utils/api";


export const DeckDel = ({deckId}) => {
    const location = useLocation().pathname;
    const history = useHistory();
    const deletePromp = () => {
        if(window.confirm('Delete This Deck?\n'+'\n'+'You will not be able to recover it.')== true) {
            deleteDeck(deckId);
            (location !== '/')? history.push('/'):window.location.reload(false);
        }
    }

    return (
        <button className="btn btn-danger" onClick={deletePromp}><i className="oi oi-trash"></i></button>
    )
}

export default DeckDel;