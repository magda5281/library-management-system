import { refs } from './dom.js';

const { bookList, borrowedList } = refs;

function createLi(book, color, controls) {
  const li = document.createElement('li');
  li.className = `bg-${color} p-2 rounded shadow flex justify-between items-center`;

  li.innerHTML = `
    <div class="flex items-center" >
    <strong>&ldquo;${book.title}&rdquo;</strong> by ${book.author} <em class="text-sm">   (${book.genre})</em></div>${controls} 
`;

  return li;
}

function createBookList(books, isAdmin) {
  const fragment = document.createDocumentFragment();
  books.forEach((book) => {
    let controls = '';
    let color = 'white';
    if (!isAdmin && !book.isAvailable) {
      controls = `<button data-id = ${book.id} data-action ="return" class="bg-red-500 text-white rounded shadow px-4 py-2 hover:bg-red-600 cursor-pointer">Return</button>`;
      color = 'yellow-100';
    } else if (!isAdmin && book.isAvailable) {
      controls = `<button data-id = ${book.id} data-action ="borrow" class="bg-green-500 text-white rounded shadow px-4 py-2 hover:bg-green-600 cursor-pointer">Borrow</button>`;
    } else if (isAdmin) {
      controls = `<span class="semi-bold text-gray-500"> ${
        book.isAvailable ? 'Available' : 'Borrowed'
      }</span>`;
    }

    const li = createLi(book, color, controls);
    fragment.appendChild(li);
  });
  return fragment;
}

export function renderBooks(library, currentUser) {
  bookList.innerHTML = '';
  const isAdmin = currentUser.getRole() === 'Admin';
  const allBooks = isAdmin
    ? library.getAllBooks()
    : library.getAvailableBooks();

  const list = createBookList(allBooks, isAdmin);

  bookList.appendChild(list);

  bookList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const id = e.target.getAttribute('data-id');
      const action = e.target.getAttribute('data-action');
      const book = library.getBookById(id);
      if (action === 'borrow' && !isAdmin && book.isAvailable) {
        currentUser.borrowBook(book);
        renderBooks(library, currentUser);
        renderBorrowedBooks(library, currentUser);
      }
    }
  });
}

export function renderBorrowedBooks(library, currentUser) {
  const isAdmin = currentUser.getRole() === 'Admin';
  if (isAdmin) return;
  borrowedList.innerHTML = '';

  const borrowedBooks = currentUser.getBorrowedBooks();

  const list = createBookList(borrowedBooks, isAdmin);

  borrowedList.appendChild(list);

  borrowedList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const id = e.target.dataset.id;
      const book = library.getBookById(id);
      if (e.target.dataset.action === 'return' && !isAdmin)
        currentUser.returnBook(book);
      library.save();
      renderBooks(library, currentUser);
      renderBorrowedBooks(library, currentUser);
    }
  });
}
