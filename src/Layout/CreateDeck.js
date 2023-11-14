import React, { useState, useEffect } from "react";
import { createDeck, listDecks } from "../utils/api";
import {useHistory} from 'react-router-dom';
import Bread from "./Bread";


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
    }, [history]);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        createDeck(formData);
        history.push(`/decks/${allDecks.length + 1}`);
    };
    const handleChange = ({target}) => {
        setFormData({...formData, [target.name]: target.value});
    };

    return (
    <div>
        <Bread />
    <h2>Create Deck</h2>
    <form onSubmit={handleSubmit}name="create">    
        <div>
            <label htmlFor="deckname">Name</label>
            <input 
                type="text" 
                name='name'
                id="deckname" 
                placeholder="Deck Name"
                onChange={handleChange}
                value={formData.name}
            />
        </div>
        <div>
            <label htmlFor="deckdescription">Description</label>
            <textarea 
                name='description'
                id="deckdescription" 
                rows="3" 
                placeholder="Brief description of the deck"
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


export default CreateDeck;