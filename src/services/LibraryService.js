export class LibrarySystem {
  #books;

  constructor(book) {
    const storedBooks = JSON.parse(localStorage.getItem('libraryBooks')) || [];
    this.#books = storedBooks;
  }
  #saveToLocalStorage() {
    localStorage.setItem('libraryBooks', JSON.stringify(this.#books));
  }
  save() {
    this.#saveToLocalStorage();
  }
  addBook(book) {
    this.#books.push(book);
    this.#saveToLocalStorage();
  }
  getAvailableBooks() {
    return this.#books.filter((book) => book.isAvailable);
  }
  getAllBooks() {
    return this.#books;
  }
  getBookById(id) {
    return this.#books.find((book) => book.id === id);
  }
}
