

export const CardContent = () => {

    if (deck.cards.length <= 2) {
        return (
            <>
                <h3>Not enough cards.</h3>
                <p>You need at least 3 cards to study. There are {} cards in this deck.</p>
                <button>Add Cards</button>
            </>
        )
    }
}

export default CardContent;