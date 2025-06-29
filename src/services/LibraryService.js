export class LibrarySystem {
  #books;

  constructor(book) {
    this.#books = [];
  }

  addBook(book) {
    this.#books.push(book);
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
