import { refs } from './dom.js';

const { bookList } = refs;
export function renderBooks(library, currentUser) {
  bookList.innerHTML = '';
  const fragment = document.createDocumentFragment();
  library.getAllBooks().forEach((book) => {
    const li = document.createElement('li');
    li.className = 'bg-white p-2 rounded shadow flex justify-between';
    let controls = '';
    if (currentUser.getRole() === 'Member' && book.isAvailable) {
      controls = `<button data-id = ${book.id} data-action ="borrow" class="bg-green-500 text-white rounded shadow px-4 py-2 hover:bg-green-600 cursor-pointer">Borrow</button>`;
    } else if (currentUser.getRole() === 'Admin') {
      controls = `<span class="semi-bold text-gray-500"> ${
        book.isAvailable ? 'Available' : 'Borrowed'
      }</span>`;
    }
    li.innerHTML = `
    <div >
    <strong>&ldquo;${book.title}&rdquo;</strong> by ${book.author} <em class="text-sm">(${book.genre})</em></div> ${controls}
    
`;
    fragment.appendChild(li);
  });
  bookList.appendChild(fragment);

  bookList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const id = e.target.getAttribute('data-id');
      const action = e.target.getAttribute('data-action');
      const book = library.getBookById(id);
      if (
        action === 'borrow' &&
        currentUser.getRole() === 'Member' &&
        book.isAvailable
      ) {
        currentUser.borrowBook(book);
        renderBooks(library, currentUser);
      }
    }
  });
}
