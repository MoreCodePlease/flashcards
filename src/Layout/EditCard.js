import React, { useState, useEffect } from "react";
import { createCard, readCard, readDeck, updateCard } from "../utils/api";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import Bread from "./Bread";


export const EditCard = ({cardIsNew}) => {
    const initCard = {
        front:'',
        back:''};
    const cardId = useParams().cardId;
    const history = useHistory();
    const location = useLocation();
    const deckId = useParams().deckId;
    const [deck,setDeck] = useState({});
    const [thisCard, setThisCard] = useState({...initCard});
    const [error, setError] = useState(undefined);
    
    useEffect(() => {
        const abortController = new AbortController();
        if(!cardIsNew) {
            readCard(cardId, abortController.signal).then(setThisCard).catch(setError);
        }
        return () => abortController.abort();
    }, [history]);
    if (error) {
        console.log(error);
    }  
    const [formData, setFormData] = useState({...thisCard});
    
    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal)
            .then(setDeck)
            .catch((error) => {
                if (error.name !== "AbortError") {
                setError(error);
                }
          });
          return () => abortController.abort();
          
    }, [history]);
    if (error) {
        console.log(error);
    }
    
    
    
    const handleSubmit = (event) => {
        event.preventDefault();
        (cardIsNew)?createCard(deckId, formData):updateCard(formData);
        (cardIsNew)?setFormData({front:'',back:''}):history.push(`/decks/${deckId}`);
    };
    const handleChange = ({target}) => {
        setFormData({...formData, [target.name]: target.value});
    };

    return (
    <div>
        <Bread deck={deck} card={thisCard}/>
    {(cardIsNew)?<h2>Add Card</h2>:<h2>Edit Card</h2>}
    <form onSubmit={handleSubmit}name="create">    
        <div >
        <label htmlFor="cardFront">Front</label>
            <textarea 
                
                name='front'
                id="cardFront" 
                rows="2" 
                placeholder={(cardIsNew)?'front':thisCard.front}
                onChange={handleChange}
                value={formData.front}>
            </textarea>
        </div>
        <div >
            <label htmlFor="cardBack">Back</label>
            <textarea 
                 
                name='back'
                id="cardBack" 
                rows="2" 
                placeholder={(cardIsNew)?'back':thisCard.back}
                onChange={handleChange}
                value={formData.back}>
            </textarea>
        </div>
        <Link to ={`/decks/${deckId}`}><button type="cancel" className="btn btn-primary">Done</button></Link>
        <button type="submit" className="btn btn-secondary">Save</button>
    </form>
    </div>
    );
};


export default EditCard;