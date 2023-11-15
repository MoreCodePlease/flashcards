import EditDeckNavig from "./EditDeckNavig";
import EditDeckForm from "./EditDeckForm";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";

//responsible for rendering Edit Deck Page
function EditDeck({isNew}) {
    const [deck, setDeck] = useState(null);
    const { deckId } = useParams();
    const [error, setError] = useState(undefined);

    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal).then(setDeck).catch(setError);
        return () => abortController.abort();
    }, [deckId]);

    if(!deck && !isNew) {
        return <h2>Loading...</h2>;
    } else {
        return (
            <div>
                <EditDeckNavig isNew={isNew} deck={deck}/>
                <EditDeckForm isNew={isNew} deck={deck}/>
            </div>

        );
    }

}
export default EditDeck;