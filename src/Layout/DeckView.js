import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { Link, useParams, useHistory,useLocation } from "react-router-dom";
import { DelHandler } from "./DelHandler";
import Bread from "./Bread";


export const DeckView = () => {
    const initDeck = {
        id:0,
        name:'',
        description:'',
        cards:[{back:'',deckId:0,front:'',id:0}]
    };
    const history = useHistory();
    const [error, setError] = useState(undefined);
    const deckId = useParams().deckId;
    const [deck, setDeck] = useState({...initDeck});
    const [thisDeck, setThisDeck] = useState({...initDeck});
    const path = useLocation();
    //console.log(path);

    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal)
            .then(setThisDeck)
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
    useEffect(() => {
        setDeck(thisDeck);
    },[thisDeck])
    const list = deck.cards.map((card,index) => {
        return(
            <tr key={index} id={index}>
                <td>{card.front}</td>
                <td>
                    <div>{card.back}</div>
                    <div>
                        <Link to={`/decks/${deckId}/cards/${card.id}/edit`}><button>Edit</button></Link>
                        <DelHandler cardId={card.id}/>
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
            <Link to={{pathname:`/decks/${deck.id}/study`}}><button>Study</button></Link>
            <Link to={`/decks/${deckId}/cards/new`}><button>Add Cards</button></Link>
            <DelHandler deckId={deck.id}/>
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