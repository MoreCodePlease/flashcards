import React from "react";
function EditDeckNavig({deck, isNew}) {
      
    if(isNew) {
      return (
          <div className="container">
              <nav>
                <p><span><a href="/">Home</a></span> / Create Deck</p>
              </nav>
          </div>
      );
    }
      return (
          <div className="container">
              <nav>
                      <p><span><a href="/">Home</a></span> / <span><a href={`/decks/${deck.id}`}>{deck.name}</a></span> / Edit Deck</p>                  
              </nav>
          </div>
      );
}
export default EditDeckNavig;