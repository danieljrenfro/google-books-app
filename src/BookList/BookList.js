import React, { Component } from 'react';

import Book from '../Book/Book';

class BookList extends Component {
  render() {
    const books = this.props.books.map(book => {
      return <Book key={book.id} book={book}/>
    })

    return (
      <section className="book-list">
        {books}
      </section>
    )
  }
}

export default BookList;