import React, { useState, useEffect } from "react";
import { createDeck, listDecks } from "../utils/api";
import {useHistory} from 'react-router-dom';


export const CreateDeck = () => {
    const history = useHistory();
    const [allDecks, setAllDecks] = useState([]);
    const [error, setError] = useState(undefined);
    const initDeck = {name:'', desctiprion:''};
    const [formData, setFormData] = useState({...initDeck});
    useEffect(() => {
        const abortController = new AbortController();
        listDecks(abortController.signal).then(setAllDecks).catch(setError);
        return () => abortController.abort();
    }, []);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        createDeck(formData);
        history.push(`/decks/${allDecks.length}`);
    };
    const handleChange = ({target}) => {
        setFormData({...formData, [target.name]: target.value});
    };

    return (
    <>
    <h2>Create Deck</h2>
    <form onSubmit={handleSubmit}name="create">    
        <div class="form-group">
            <label for="deckname">Name</label>
            <input 
                type="text" 
                name='name'
                id="deckname" 
                placeholder="Deck Name"
                onChange={handleChange}
                value={formData.name}
            />
        </div>
        <div class="form-group">
            <label for="deckdescription">Description</label>
            <textarea 
                class="" 
                name='description'
                id="deckdescription" 
                rows="3" 
                placeholder="Brief description of the deck"
                onChange={handleChange}
                value={formData.description}>
                
            </textarea>
        </div>
        <button type="cancel" class="btn btn-primary">Cancel</button>
        <button type="submit" class="btn btn-secondary">Submit</button>
    </form>
    </>
    );
};


export default CreateDeck;