import EditCardNavig from "./EditCardNavig";
import EditCardForm from "./EditCardForm";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readCard, readDeck } from "../utils/api/index";

function EditCardT({isNew}) {
    const initDeck = {
        id:0,
        name:'',
        description:'',
        cards:[{back:'',deckId:0,front:'',id:0}]
    };
    const [card, setCard] = useState(null);
    const [deck, setDeck] = useState({...initDeck});
    const [thisDeck, setThisDeck] = useState({...initDeck});
    const { cardId } = useParams();
    const { deckId } = useParams();
    const [error, setError] = useState(undefined);
    
    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal).then(setDeck).catch(setError);
        return () => abortController.abort();
    }, [deckId]);
    
    useEffect(() => {
        const abortController = new AbortController();
        readCard(cardId, abortController.signal).then(setCard).catch(setError);
        return () => abortController.abort();
    }, [cardId]);
    
    if(!card && !isNew && deck != null) {
        return <h2>Loading...</h2>;
    } else {
        return (
            <div>
                <EditCardNavig isNew={isNew} cardId={cardId} deck={deck}/>
                <EditCardForm isNew={isNew} card={card}/>
            </div>
        );
    }

}
export default EditCardT;