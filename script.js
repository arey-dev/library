// array for books
const myLibrary = [];

function Book(title, author, pages, isRead = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead; 
}

Book.prototype.changeStatus = function() {
  this.isRead = (this.isRead) ? false : true;
}

function addBookToLibrary() {
  // get form
  const form = document.forms.book;

  // get inputs
  const title = form.elements.title;
  const author = form.elements.author;
  const pages = form.elements.pages;
  const status = (form.elements.status.value === "1");

  // add book to array
  myLibrary.push(new Book(title.value, author.value, pages.value, status));

  // reset input fields
  title.value = '';
  author.value = '';
  pages.value = '';
  status.value = '';
}

// generate a card for book
// accepts a Book obj
// returns a an article element with book info
function generateCard(book, i) {
  const card = document.createElement('article');
  card.setAttribute('data-id', i);
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

  const btn_remove = document.createElement('button');
  btn_remove.classList.add('button');
  btn_remove.classList.add('button--remove');
  btn_remove.textContent = 'X';
  card.append(btn_remove);

  return card;
}

function showBooks() {
  const shelve = document.querySelector('.grid-wrapper');
  shelve.innerHTML = ''; // resets the container

  const books_length = myLibrary.length;
  for(let i = 0; i < books_length; i++) {
    const card = generateCard(myLibrary[i], i); 

    shelve.append(card);
  }
}

function resetBookId() {
  const books = document.querySelectorAll('article.book.flex');
  const books_length = myLibrary.length;
  for(let i = 0; i < books_length; i++) {
    books[i].setAttribute('data-id', i);
  }
}

const promptBtn = document.querySelector('#show-prompt-btn');
const submitBtn = document.querySelector('#submit-btn');
const cancelBtn = document.querySelector('#cancel-btn');
const booksContainer = document.querySelector('.grid-wrapper');


promptBtn.onclick = function() {
  const formContainer = document.querySelector('.prompt-form-container');

  if(formContainer.style.display !== 'block') {
    formContainer.style.display = 'block';
  } else {
    formContainer.style.display = '';
  }
}

submitBtn.onclick = function() {
  addBookToLibrary();
  showBooks();
}

booksContainer.addEventListener('click', function (event) {
  const target = event.target;
  const card = target.closest('.book');
  const id = card.getAttribute('data-id');

  if(target.classList.contains('button--remove')) {
    const confirmed = confirm("Remove this book?");
    if(confirmed) {
      myLibrary.splice(id, 1);
      card.remove();
      resetBookId();
    } else return;
  }
});
