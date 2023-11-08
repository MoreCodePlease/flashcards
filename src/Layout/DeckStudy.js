import React from "react"

export const DeckStudy = ({deck}) => {



    if (deck.card.length <= 2) {
        return (
            <>
                <h3>Not enough cards.</h3>
                <p>You need at least 3 cards to study. There are {} cards in this deck.</p>
                <button>Add Cards</button>
            </>
        )
    }
    return (
        <h1>Study: {deck.name}</h1>
        
    )
}