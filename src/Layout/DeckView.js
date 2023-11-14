import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { Link, useParams, useHistory,useLocation } from "react-router-dom";
import DeckDel from "./DeckDel";
import Bread from "./Bread";


export const DeckView = () => {
    const history = useHistory();
    const [error, setError] = useState(undefined);
    const deckId = useParams().deckId;
    const [deck, setDeck] = useState({});
    const path = useLocation();
    //console.log(path);

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
    const list = deck.cards?.map((card,index) => {
        return(
            <tr key={index} id={index}>
                <td>{card.front}</td>
                <td>
                    <div>{card.back}</div>
                    <div>
                        <Link to={`/decks/${deckId}/cards/${card.id}/edit`}><button>Edit</button></Link>
                        <button>Delete</button>
                    </div>
                </td>
            </tr>
        ) 
    })
    //console.log(list)
  return (
    <section>
        <div>
            <Bread deck={deck}/>
        </div>
        <div>
            <h4>{deck.name}</h4>
            <p>{deck.description}</p>
            <Link to={`/decks/${deckId}/edit`}><button>Edit</button></Link>
            <Link to={{pathname:`/decks/${deck.id}/study`, state:{foreignDeck:deck}}}><button>Study</button></Link>
            <Link to={`/decks/${deckId}/cards/new`}><button>Add Cards</button></Link>
            <DeckDel />
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