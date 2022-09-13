// array for books
const myLibrary = [];

function Book(title, author, pages, isRead = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead; 

  this.info = function() {
    return `${this.title}, by ${this.author}, ${pages} pages, ${(this.isRead) ? 'have read' : 'not read yet'}`;
  }
}


function addBookToLibrary() {
  // take user input
  let title = prompt("Enter book title:");
  let author = prompt("Enter author:");
  let pages = prompt("Enter number of pages:");
  let isRead = confirm("Have you read read the book?");

  // add book to array
  myLibrary.push(new Book(title, author, pages, isRead));
}