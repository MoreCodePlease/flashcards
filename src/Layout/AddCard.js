import React, { useState, useEffect } from "react";
import { readDeck, createCard } from "../utils/api";
import { Link, useParams, useHistory } from "react-router-dom";


export const AddCard = () => {
    const initCard = {
        front:'',
        back:''};
    const deckId = useParams().deckId;
    const history = useHistory();
    const [thisDeck, setThisDeck] = useState([]);
    const [error, setError] = useState(undefined);
    //const initDeck = {name:'', desctiprion:''};
    const [formData, setFormData] = useState({...initCard});
    
    useEffect(() => {
        const abortController = new AbortController();
        readDeck(abortController.signal).then(setThisDeck).catch(setError);
        return () => abortController.abort();
    }, [history]);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        createCard(deckId, formData);
        setFormData({...initCard});
    };
    const handleChange = ({target}) => {
        setFormData({...formData, [target.name]: target.value});
    };

    return (
    <>
    <h2>Add Card</h2>
    <form onSubmit={handleSubmit}name="create">    
        <div class="form-group">
        <label for="cardFront">Front</label>
            <textarea 
                
                name='front'
                id="cardFront" 
                rows="2" 
                placeholder='Front side of card'
                onChange={handleChange}
                value={formData.front}>
            </textarea>
        </div>
        <div class="form-group">
            <label for="cardBack">Back</label>
            <textarea 
                 
                name='back'
                id="cardBack" 
                rows="2" 
                placeholder='Back side of card'
                onChange={handleChange}
                value={formData.back}>
            </textarea>
        </div>
        <Link to ={`/decks/${deckId}`}><button type="cancel" class="btn btn-primary">Done</button></Link>
        <button type="submit" class="btn btn-secondary">Save</button>
    </form>
    </>
    );
};


export default AddCard;