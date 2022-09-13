function Book(title, author, pages, isRead = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead; 

  this.info = function() {
    return `${this.title}, by ${this.author}, ${pages} pages, ${(this.isRead) ? 'have read' : 'not read yet'}`;
  }
}