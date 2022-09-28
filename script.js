class Book {
  constructor(title, author, pages, isRead = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead; 
  }

  changeStatus = () => {
    this.isRead = (this.isRead) ? false : true;
  }

  // generate a card for book
  // accepts a Book obj
  // returns a an article element with book info
  generateCard = (i) => {
    const card = document.createElement('article');
    card.setAttribute('data-id', i);
    card.classList.add('book');
    card.classList.add('flex');

    const h3_title = document.createElement('h3');
    h3_title.innerHTML = `<em class="book-info">${this.title}</em>`;
    card.append(h3_title);

    const p_author = document.createElement('p');
    p_author.innerHTML = `Author: <em class="book-info">${this.author}</em>`;
    card.append(p_author);

    const p_pages = document.createElement('p');
    p_pages.innerHTML = `Pages: <em class="book-info">${this.pages}</em>`;
    card.append(p_pages);

    const p_status = document.createElement('p');
    const status = (this.isRead) ? 'Finished' : 'Not Finished';
    p_status.innerHTML = `Status: <em data-book-info="status" class="book-info">${status}</em>`;
    card.append(p_status);

    const btn_change = document.createElement('button');
    btn_change.classList.add('button');
    btn_change.classList.add('button--change');
    btn_change.textContent = 'Change';
    card.append(btn_change);

    const btn_remove = document.createElement('button');
    btn_remove.classList.add('button');
    btn_remove.classList.add('button--remove');
    btn_remove.textContent = 'X';
    card.append(btn_remove);
    return card;
  }
}

class Library {
  #myLibrary = [];

  getBook = (id) => {
    return this.#myLibrary[id];
  }

  // add book
  addBook = () => {
    // get form
    const form = document.forms.book;

    // get inputs
    const title = form.elements.title;
    const author = form.elements.author;
    const pages = form.elements.pages;
    const status = (form.elements.status.value === "1");

    // add book to array
    this.#myLibrary.push(new Book(title.value, author.value, pages.value, status));

    // reset input fields
    form.reset()
  }

  removeBook = (id) => {
    this.#myLibrary.splice(id, 1);
  }

  showBooks = () => {
    const container = document.querySelector('.grid-wrapper');
    container.innerHTML = ''; // resets the container

    const books_length = this.#myLibrary.length;
    for(let i = 0; i < books_length; i++) {
      const card = this.#myLibrary[i].generateCard(i); 

      container.append(card);
    }
  }

  // reset book
  resetBookId = () => {
    const books = document.querySelectorAll('article.book.flex');
    const books_length = this.#myLibrary.length;
    for(let i = 0; i < books_length; i++) {
      books[i].setAttribute('data-id', i);
    }
  }

  //show form
  toggleForm() {
    const formContainer = document.querySelector('.prompt-form-container');

    if(formContainer.style.display !== 'block') {
      formContainer.style.display = 'block';
    } else {
      formContainer.style.display = '';
    }
  }
}

const library = new Library();
const booksContainer = document.querySelector('.grid-wrapper');
const promptBtn = document.querySelector('#show-prompt-btn');
const submitBtn = document.querySelector('#submit-btn');
const cancelBtn = document.querySelector('#cancel-btn');

promptBtn.onclick = function() {
  library.toggleForm();
}

cancelBtn.onclick = function() {
  library.toggleForm();
  document.forms.book.reset();
};

submitBtn.onclick = function() {
  library.addBook();
  library.showBooks();
};


booksContainer.onclick = function (event) {
  const target = event.target;
  const id = target.closest('.book').getAttribute('data-id');

  if(target.classList.contains('button--remove')) {
    const confirmed = confirm("Remove this book?");

    if(confirmed) {
      library.removeBook(id);
      target.closest('.book').remove();
      library.resetBookId();
    } else return;
  }

  if(target.classList.contains('button--change')) {
    const confirmed = confirm("Change read status of this book?");
    if(confirmed) {
      const bookObj = library.getBook(id);
      const status = target.closest('.book').querySelector('em[data-book-info="status"]');
      
      bookObj.changeStatus();
      status.textContent = (bookObj.isRead) ? `Finished` : `Not Finished`;
    } else return;
  }
};