import React, { useState, useEffect } from "react";
import { updateDeck, readDeck } from "../utils/api";
import { useParams, useHistory } from "react-router-dom";


export const EditDeck = () => {
    const history = useHistory();
    const [thisDeck, setThisDeck] = useState([]);
    const [error, setError] = useState(undefined);
    const initDeck = {name:'', desctiprion:''};
    const [formData, setFormData] = useState({...initDeck});
    
    useEffect(() => {
        const abortController = new AbortController();
        readDeck(abortController.signal).then(setThisDeck).catch(setError);
        return () => abortController.abort();
    }, []);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        updateDeck(formData);
        history.push(`/decks/${thisDeck.id}`);
    };
    const handleChange = ({target}) => {
        setFormData({...formData, [target.name]: target.value});
    };

    return (
    <>
    <h2>Edit Deck</h2>
    <form onSubmit={handleSubmit}name="create">    
        <div class="form-group">
            <label for="deckname">Name</label>
            <input 
                type="text" 
                name='name'
                id="deckname" 
                placeholder={thisDeck.name}
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
                placeholder={thisDeck.description}
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


export default EditDeck;