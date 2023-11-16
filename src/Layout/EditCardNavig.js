import React from "react";
function EditDeckNavig({deck,cardId, isNew}) {
    if(isNew) {
      return (
          <div className="container">
              <nav>
              <p><span><a href="/">Home</a></span> / <span><a href={`/decks/${deck.id}`}>{deck.name}</a></span> / Add Card</p>
              </nav>
          </div>
      );
    }
      return (
          <div className="container">
              <nav>
                <p><span><a href="/">Home</a></span> / <span><a href={`/decks/${deck.id}`}>{deck.name}</a></span> / Edit Card {cardId}</p>
              </nav>
          </div>
      );
}
export default EditDeckNavig;