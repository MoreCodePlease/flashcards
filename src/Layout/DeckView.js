import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { Link, useParams, useHistory } from "react-router-dom";


export const DeckView = () => {
    const history = useHistory();
    const [error, setError] = useState(undefined);
    const deckId = useParams().deckId;
    const [deck, setDeck] = useState({})

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
          
    }, []);
    //console.log(deck);
    const list = deck.cards?.map((card,index) => {
        return(
            <tr id={index}>
                <td>{card.front}</td>
                <td>
                    <div>{card.back}</div>
                    <div>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </td>
            </tr>
        ) 
    })


  return (
    <section>
        <div>
            <h4>{deck.name}</h4>
            <p>{deck.description}</p>
            <Link to={`/decks/${deckId}/edit`}><button>Edit</button></Link>
            <button>Study</button>
            <button>Add Cards</button>
            <button>Delete</button>
        </div>
        <div>
            <h3>Cards</h3>
            <table>
                <tbody>{list}</tbody>                
            </table>
        </div>
    </section>
  )
}