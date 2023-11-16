import React from "react";
import { Link, useHistory, useParams, useLocation} from 'react-router-dom';


export const Bread =({deck, card}) => {
    const location = useLocation();
    const history = useHistory();
    const deckId = useParams();
    const path = location.pathname;
    const pathArr = path.split('/')
    const crumb = [];
    //if(deck) console.log(deck);
    //if(card) console.log(card);
    //if(deckId) console.log(deckId.cardId);
    console.log(pathArr)
    if(path.includes('decks')) {
        crumb.push({title:'Home', paths:'/'});
    }
    if(parseFloat(pathArr[2]) == deckId.deckId) {
        if (pathArr.length == 3){
            crumb.push({title:deck.name, paths:0});
        } else{
            crumb.push({title:deck.name, paths:`/decks/${deck.id}`});
        }
        
    } else if (pathArr[2] === 'new'){
        
        crumb.push({title:'New', paths:0});
    }
    if(pathArr[3] === 'edit'){
        crumb.push({title:'Edit', paths:0});
    } else if (pathArr[3] === 'study'){
        crumb.push({title:'Study', paths:0})
    } else if (pathArr[3] === 'cards'){
        if(pathArr[4] === 'new') {
            crumb.push({title:'Add Card', paths:0});
        } else if(parseFloat(pathArr[4]) == deckId.cardId) {
            crumb.push({title:`Edit Card ${deckId.cardId}`, paths:0});
        }
    }
    
const crumbs = crumb.map(({title, paths}, key) =>{
    
    if(paths != 0) {
        return (<span key={key}><Link  to={paths}>{title}</Link>{(key + 1 == crumb.length)? '':' / '}</span>);
    }
        return (<span key={key}>{title}</span>);
    
})

//console.log(crumbs);
return (
    <nav><p></p>{crumbs}</nav>
)

}

export default Bread;