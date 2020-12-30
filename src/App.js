import React, { Component } from 'react';

import BookList from './BookList/BookList';
import apiKey from './api-key';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bookResults: [],
      searchTerm: '',
      printType: 'all',
      bookType: null
    }
  }

  apiRequestUrl = () => {
    const { searchTerm, printType, bookType } = this.state;
    const searchQuery = `q=${searchTerm}`;
    const bookFilter = `filter=${bookType}`
    const printFilter = `printType=${printType}`;
    const apiKeyUrl = `key=${apiKey}`;
    const baseUrl = `https://www.googleapis.com/books/v1/volumes?`;

    let completeRequestUrl = `${baseUrl}${searchQuery}&${printFilter}`;
    
    if (bookType !== '' && bookType !== null) {
      completeRequestUrl += '&' + bookFilter;
    }

    completeRequestUrl += '&' + apiKeyUrl;

    return completeRequestUrl;
  }

  getBooks = () => {
    fetch(this.apiRequestUrl(), {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => {
        return res.json();
      })
      .then(books => {
        this.setState({ bookResults: books.items})
      })
  }

  updateSearchTerm = (userInput) => {
    this.setState({ searchTerm: userInput });
  }

  updatePrintType = (userSelection) => {
    this.setState({ printType: userSelection });
  }

  updateBookType = (userSelection) => {
    this.setState({ bookType: userSelection });
  } 
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Google Book Search</h1>
        </header>
        <form className="search-form">
          <label htmlFor="book-search">Search:</label>
          <input onChange={(e) => this.updateSearchTerm(e.target.value)}  name="book-search" id="book-search"/>
          <button onClick={this.getBooks} type="button">Search</button>
        </form>

        <form className="filter-form">
          <label htmlFor="print-type">Print Type:</label>
          <select onChange={(e) => this.updatePrintType(e.target.value)} name="print-type" id="print-type">
            <option value="all">All</option>
            <option value="books">Books</option>
            <option value="magazines">Magazines</option>
          </select>

          <label htmlFor="book-type">Book Type:</label>
          <select onChange={(e) => {this.updateBookType(e.target.value)}} name="book-type" id="book-type">
            <option value="">No Filter</option>
            <option value="partial">Partial</option>
            <option value="full">Full</option>
            <option value="free-ebooks">Free E-Books</option>
            <option value="paid-ebooks">Paid E-Books</option>
            <option value="ebooks">E-Books</option>
          </select>
        </form>
  
        <BookList books={this.state.bookResults}/>
      </div>
    );
  }
}

export default App;
