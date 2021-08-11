function qs(element) {
  return document.querySelector(element);
}

const addButton = qs('.add-btn');
const ul = qs('.ul');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static addBookToLibrary(book) {
    const li = document.createElement('li');
    const titleSpan = document.createElement('span');
    titleSpan.innerHTML = `${book.title} `;
    const authorSpan = document.createElement('span');
    authorSpan.innerHTML = `${book.author} `;
    const removeButton = document.createElement('button');
    const hr = document.createElement('hr');

    titleSpan.classList.add('book-title');
    authorSpan.classList.add('book-author');
    removeButton.classList.add('remove-btn');
    removeButton.setAttribute('data-title', `${book.title}`);
    removeButton.innerHTML = 'Remove';

    li.appendChild(titleSpan);
    li.appendChild(authorSpan);
    li.appendChild(removeButton);
   

    ul.appendChild(li);
  }

  static getFromLocalStorage() {
    const localstore = JSON.parse(localStorage.getItem('localstore')) || [];
    return localstore;
  }

  static setToLocalStorage(book) {
    const localstore = Book.getFromLocalStorage();
    localstore.push(book);
    localStorage.setItem('localstore', JSON.stringify(localstore));
  }

  static removeBook(title1) {
    const localstore = Book.getFromLocalStorage();
    for (let i = 0; i < localstore.length; i += 1) {
      if (localstore[i].title === title1) {
        localstore.splice(i, 1);
      }
    }
    localStorage.setItem('localstore', JSON.stringify(localstore));
  }

  static clearFields() {
    const title = qs('.form-title');
    const author = qs('.form-author');
    title.value = '';
    author.value = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const fromStorage = Book.getFromLocalStorage();
  fromStorage.forEach((book) => {
    Book.addBookToLibrary(book);
  });
});

addButton.addEventListener('click', (e) => {
  e.preventDefault();
  const title = qs('.form-title').value;
  const author = qs('.form-author').value;
  const book = new Book(title, author);
  Book.addBookToLibrary(book);
  Book.setToLocalStorage(book);
  Book.clearFields();
});

ul.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    e.target.parentElement.remove();
    const title = e.target.getAttribute('data-title');
    Book.removeBook(title);
  }
});
