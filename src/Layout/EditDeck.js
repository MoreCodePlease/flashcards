import React, { useState, useEffect } from "react";
import { updateDeck, readDeck, createDeck, listDecks } from "../utils/api";
import { useParams, useHistory } from "react-router-dom";
import Bread from "./Bread";
import EditDeckNavig from "./EditDeckNavig";


export const EditDeck = ({isNew}) => {
    const history = useHistory();
    const deckId = useParams().deckId;
    const [thisDeck, setThisDeck] = useState([]);
    const [allDecks, setAllDecks] = useState([]);
    const [error, setError] = useState(undefined);
    const initDeck = (isNew)?{name:'', desctiprion:''}:{id:deckId, name:'', desctiprion:''};
    const [formData, setFormData] = useState({...initDeck});
    useEffect(() => {
        const abortController = new AbortController();
        listDecks(abortController.signal).then(setAllDecks).catch(setError);
        return () => abortController.abort();
    }, [history]);

    useEffect(() => {
        const abortController = new AbortController();
        
        if(!isNew) readDeck(deckId, abortController.signal).then(setThisDeck).catch(setError);
        return () => abortController.abort();
    }, [history]);
    if (error) {
        console.log(error);
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if(isNew){
            createDeck(formData);
            history.push(`/decks/${allDecks.length + 1}`);
        } else {
            updateDeck(formData);
            history.push(`/decks/${deckId}`);
        }
    };
    const handleChange = ({target}) => {
        setFormData({...formData, [target.name]: target.value});
    };
//<Bread deck={thisDeck}/>
    return (
    <div>
        <EditDeckNavig deck={thisDeck} />
    {(isNew)?<h2>Create Deck</h2>:<h2>Edit Deck</h2>}
    <form onSubmit={handleSubmit}name="create">    
        <div value={thisDeck.name}>{thisDeck.name}
            <label htmlFor="name">Name</label>
            <input 
                type="text" 
                name='name'
 
                placeholder={thisDeck.name}
                onChange={handleChange}
                value={formData.name}
            />
        </div>
        <div >w
            <label htmlFor="description">Description</label>
            <textarea 
                
                name='description'
                rows="3" 
                placeholder={thisDeck.description}
                onChange={handleChange}
                value={formData.description}>
                
            </textarea>
        </div>
        <button type="cancel" >Cancel</button>
        <button type="submit" >Submit</button>
    </form>
    </div>
    );
};


export default EditDeck;