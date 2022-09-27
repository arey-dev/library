class Book {
  constructor(title, author, pages, isRead = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead; 
  }

  changeStatus() {
    this.isRead = (this.isRead) ? false : true;
  }
}

class Library {
  myLibrary = [];

  // add book
  // create card container
  // show books'
  // reset book
  // remove book
}

// Library Controller