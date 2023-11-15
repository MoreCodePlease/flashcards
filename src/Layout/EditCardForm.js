import React, { useState, useEffect } from "react";
import { updateCard, createCard, readCard } from "../utils/api";
import {useHistory, useParams} from "react-router-dom";

function EditCardForm({card, isNew}) {
    const history = useHistory();
    const deckId = useParams().deckId;
    const initCard = {front:'', back:''};
    const [current, setCurrent] = useState((isNew)?{...initCard}:{...card});
    const [formData, setFormData] = useState({...current});
    const [error, setError] = useState(undefined);

    useEffect(() => {
        const abortController = new AbortController();
        if(!isNew) {
          readCard(card.id, abortController.signal).then(setCurrent).catch(setError);
        }
        return () => abortController.abort();
    }, [card]);

    const handleChange = ({target}) => {
        setFormData({...formData, [target.name]: target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(isNew){
          createCard(formData).then(setCurrent).catch(setError);
          setFormData({...initCard});
        } else {
          updateCard(formData).then(setCurrent).catch(setError);
          history.push(`/decks/${deckId}`);
        }
    };

    return (
        <div className="container">
            {(isNew)?<h1>Add Card</h1>:<h1>Edit Card </h1>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="front">Description</label>
                    <textarea className="form-control" name="front" value={formData.front} onChange={handleChange} rows={3}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="back">Description</label>
                    <textarea className="form-control" name="back" value={formData.back} onChange={handleChange} rows={3}></textarea>
                </div>
                <a href={(isNew)?`/`:`/decks/${current.id}`} className="btn btn-secondary">Cancel</a>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    );
}
export default EditCardForm;