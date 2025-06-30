# 📚 Library Management System

A simple browser-based OOP Library Management System built with vanilla JavaScript, Tailwind CSS, and localStorage for data persistence.

✨ Features
✅ Add books to the library
✅ Switch between Admin and Member views
✅ Borrow and return books as a Member
✅ See which books are available or borrowed
✅ Data is saved in localStorage — so your books persist across page reloads
✅ Private in-memory user data with WeakMap for borrowed books

## ⚡️ How It Works

### Books

Managed by LibrarySystem

Stored in an internal array #books

Synced to localStorage automatically on add/borrow/return

### Members

Each Member uses a WeakMap to track borrowed books privately in-memory

Borrowed books are also saved to localStorage for persistence

On page load, the Member constructor reads localStorage and hydrates the borrowed list

### Borrow/Return

Members borrow a book → book.isAvailable is set to false

Book disappears from the available list and appears in the borrowed list

Members return a book → book.isAvailable is set to true and it moves back to available

UI re-renders both lists every time

## 🧩 How State Persists

LibrarySystem books: always saved to localStorage with JSON.stringify

Member borrowed books: saved both in a WeakMap (live) and localStorage (persistence)

On page reload: LibrarySystem and Member load their data from localStorage to restore the last state

## 🎨 Styling

Uses Tailwind CSS for utility-first styling.

## 🚀 How To Run

Clone or download this repo.

Make sure your HTML links to the compiled Tailwind CSS output:

<link href="/dist/output.css" rel="stylesheet" />
💡 Use npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch to build your CSS.

Open index.html in your browser.

Use the user switcher to toggle Admin and Member.

Add books, borrow them, return them — your library data persists automatically!

## ✅ Key Technologies

Vanilla JavaScript (ES6 classes, modules)

WeakMap for private in-memory data

localStorage for persistence

Tailwind CSS for styling

## 📝 Next Steps (Ideas)

Add user login to persist borrowed books per user

Use SessionStorage or IndexedDB for more complex data

Add due dates or borrowing limits

Show error messages or confirmations for borrow/return

Refactor into a framework (React, Vue, etc.)
