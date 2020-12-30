import React, { Component } from 'react';

import './Book.css';

class Book extends Component {
  render() {
    const { book } = this.props;

    return (
      <div className="book">
        <img src={book.volumeInfo.imageLinks.smallThumbnail} alt={book.title + ' cover'} />
        <div className="book-details">
          <h2 className="book-title">{book.volumeInfo.title}</h2>
          {book.volumeInfo.authors && <p className="book-author">Author(s):{book.volumeInfo.authors.join(', ')}</p>}
          {book.saleInfo.listPrice && <p className="book-price">Price: ${book.saleInfo.listPrice.amount}</p>}
          <p className="book-description">{book.volumeInfo.description}</p>
        </div>
      </div>
    )
  }
}

export default Book;