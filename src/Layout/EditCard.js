import React, { useState, useEffect } from "react";
import { readCard, updateCard } from "../utils/api";
import { Link, useParams, useHistory } from "react-router-dom";


export const EditCard = () => {
    const cardId = useParams().cardId;
    const deckId = useParams().deckId;
    const history = useHistory();
    const [thisCard, setThisCard] = useState({});
    const [error, setError] = useState(undefined);
    
    useEffect(() => {
        const abortController = new AbortController();
        readCard(cardId, abortController.signal).then(setThisCard).catch(setError);
        return () => abortController.abort();
    }, [history]);
    
    /*const initCard = {
        id:useParams().cardId,
        deckId:useParams().deckId,
        front:'',
        back:''};
    */
    
    const [formData, setFormData] = useState({...thisCard});
    
    


    
    const handleSubmit = (event) => {
        event.preventDefault();
        updateCard(formData);
        history.push(`/decks/${deckId}`);
    };
    const handleChange = ({target}) => {
        setFormData({...formData, [target.name]: target.value});
    };

    return (
    <>
    <h2>Edit Card</h2>
    <form onSubmit={handleSubmit}name="create">    
        <div class="form-group">
        <label for="cardFront">Front</label>
            <textarea 
                
                name='front'
                id="cardFront" 
                rows="2" 
                placeholder={thisCard.front}
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
                placeholder={thisCard.back}
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


export default EditCard;