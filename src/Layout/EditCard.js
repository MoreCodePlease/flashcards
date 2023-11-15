import React, { useState, useEffect } from "react";
import { createCard, readCard, readDeck, updateCard } from "../utils/api";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import Bread from "./Bread";
import EditCardNavig from "./EditCardNavig";


export const EditCard = ({isNew}) => {
    const initCard = {
        front:'',
        back:''};
    const cardId = useParams().cardId;
    const history = useHistory();
    const location = useLocation();
    const deckId = useParams().deckId;
    const [deck,setDeck] = useState({});
    const [thisCard, setThisCard] = useState({});
    const [error, setError] = useState(undefined);
    const [formData, setFormData] = useState({});
    useEffect(() => {
        const abortController = new AbortController();
        if(isNew == false) {
            readCard(cardId, abortController.signal).then(setThisCard).catch(setError)
        } else {
            setThisCard({...initCard});
        }
        return () => abortController.abort();
    }, [history]);
    if (error) {
        console.log(error);
    } 
    useEffect(() => {
        setFormData((!isNew)?{...thisCard, front:'', back:''}:{...thisCard});
    },[thisCard])
    
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
        console.log(formData)
        if(isNew == true){
            createCard(deckId, formData);
            setFormData({front:'',back:''});
            console.log('new');
        } else{
            updateCard(formData);
            history.push(`/decks/${deckId}`);
            console.log('edit');
        }
        ;
    };
    const handleChange = ({target}) => {
        setFormData({...formData, [target.name]: target.value});
    };
    //<Bread deck={deck} card={thisCard}/>
    return (
    <div>
        
        <EditCardNavig isNew={isNew} cardId={cardId} deck={deck}/>
    {(isNew)?<h2>Add Card</h2>:<h2>Edit Card</h2>}
    <form onSubmit={handleSubmit}name="create">    
        <div >
        <label htmlFor="cardFront">{`Front`}</label>
            <textarea 
                name='front'
                id="cardFront" 
                rows="2" 
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