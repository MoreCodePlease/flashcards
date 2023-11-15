import React from "react";
function EditDeckNavig({deck,cardId, isNew}) {
    if(isNew) {
      return (
          <div className="container">
              <nav>
                  <ol>
                      <li><a href="/">Home</a></li>
                      <li><a href={`/decks/${deck.id}`}>{deck.name}</a></li>
                      <li>Add Card {cardId}</li>
                  </ol>
              </nav>
          </div>
      );
    }
      return (
          <div className="container">
              <nav>
                  <ol>
                      <li><a href="/">Home</a></li>
                      <li><a href={`/decks/${deck.id}`}>{deck.name}</a></li>
                      <li>Edit Card {cardId}</li>
                  </ol>
              </nav>
          </div>
      );
}
export default EditDeckNavig;