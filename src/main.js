import { Admin } from './models/Admin.js';
import { Member } from './models/Member.js';
import { Book } from './models/Book.js';
import { LibrarySystem } from './services/LibraryService.js';
import { refs } from './dom.js';
import { renderBooks, renderBorrowedBooks } from './ui.js';

const { userSwitcher, bookSection, borrowedBooks, bookForm, bookList } = refs;
let currentUser = new Member('John', 'john@test.com');

const library = new LibrarySystem();
userSwitcher.addEventListener('change', (e) => {
  const selected = e.target.value;

  currentUser =
    selected === 'admin'
      ? new Admin('Alice', 'alice@test.com')
      : new Member('John', 'john@test.com');

  bookSection.style.display = selected === 'admin' ? 'block' : 'none';
  borrowedBooks.style.display = selected === 'member' ? 'block' : 'none';
  renderBooks(library, currentUser);
  renderBorrowedBooks(currentUser);
});

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const title = formData.get('title');
  const author = formData.get('author');
  const genre = formData.get('genre');

  const book = new Book(title, author, genre);
  library.addBook(book);

  renderBooks(library, currentUser);
  bookForm.reset();
});

bookSection.style.display = 'none';
renderBooks(library, currentUser);
renderBorrowedBooks(currentUser);
