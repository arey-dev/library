// array for books
const myLibrary = [];
const book1 = new Book("To Kill A Mockingbird", "Harper Lee", "281", false);
const book2 = new Book("Gone Girl", "Gillian Flynn", "432", true);
myLibrary.push(book1);
myLibrary.push(book2);

function Book(title, author, pages, isRead = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead; 
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

// generate a card for book
// accepts a Book obj
// returns a an article element with book info
function generateCard(book) {
  const card = document.createElement('article');
  card.classList.add('book');
  card.classList.add('flex');

  const h3_title = document.createElement('h3');
  h3_title.innerHTML = `<em class="book-info">${book.title}</em>`;
  card.append(h3_title);

  const p_author = document.createElement('p');
  p_author.innerHTML = `Author: <em class="book-info">${book.author}</em>`;
  card.append(p_author);

  const p_pages = document.createElement('p');
  p_pages.innerHTML = `Pages: <em class="book-info">${book.pages}</em>`;
  card.append(p_pages);

  const p_status = document.createElement('p');
  const status = (book.isRead) ? 'Finished' : 'Not Finished';
  p_status.innerHTML = `Status: <em class="book-info">${status}</em>`;
  card.append(p_status);

  return card;
}

function showBooks() {
  const shelve = document.querySelector('.grid-wrapper');
  shelve.innerHTML = ''; // resets the container

  const books_length = myLibrary.length;
  for(let i = 0; i < books_length; i++) {
    const card = generateCard(myLibrary[i]); 

    shelve.append(card);
  }
}