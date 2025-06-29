import { Admin } from './models/Admin.js';
import { Member } from './models/Member.js';
import { Book } from './models/Book.js';

const userSwitcher = document.getElementById('userSwitcher');
const bookSection = document.getElementById('bookSection');
const borrowedBooks = document.getElementById('borrowedBooks');
const bookForm = document.getElementById('bookForm');
let currentUser = new Member('John', 'john@test.com');
userSwitcher.addEventListener('change', (e) => {
  const selected = e.target.value;

  currentUser =
    selected === 'admin'
      ? new Admin('Alice', 'alice@test.com')
      : new Member('John', 'john@test.com');

  bookSection.style.display = selected === 'admin' ? 'block' : 'none';
  borrowedBooks.style.display = selected === 'member' ? 'block' : 'none';
});

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const title = formData.get('title');
  const author = formData.get('author');
  const genre = formData.get('genre');

  const book = new Book(title, author, genre);
});

bookSection.style.display = 'none';
