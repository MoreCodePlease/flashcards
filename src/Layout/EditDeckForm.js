import React, { useState, useEffect } from "react";
import { readDeck, updateDeck, createDeck } from "../utils/api";
import {useHistory} from "react-router-dom";

function EditDeckForm({deck, isNew}) {
    const history = useHistory();
    const initDeck = {name:'', description:''};
    const [current, setCurrent] = useState((isNew)?{...initDeck}:{...deck});
    const [formData, setFormData] = useState({...current});
    const [error, setError] = useState(undefined);
    const [created,setCreated] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        if(!isNew) {
          readDeck(deck.id, abortController.signal).then(setCurrent).catch(setError);
        }
        return () => abortController.abort();
    }, [deck]);
    useEffect(() => {
      if(created) history.push(`/decks/${current.id}`);
    },[current]);
    const handleChange = ({target}) => {
        setFormData({...formData, [target.name]: target.value});
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if(isNew){
          setCreated(true);
          createDeck(formData).then(setCurrent).catch(setError);
          
        } else {
          updateDeck(formData).then(setCurrent).catch(setError);
          history.push(`/decks/${current.id}`)
        }
    };

    return (
        <div className="container">
            {(isNew)?<h1>Create Deck</h1>:<h1>Edit Deck</h1>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" name="name" value={formData.name} onChange={handleChange}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows={3}></textarea>
                </div>
                <a href={(isNew)?`/`:`/decks/${current.id}`} className="btn btn-secondary">Cancel</a>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    );
}
export default EditDeckForm;