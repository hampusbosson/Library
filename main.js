const bookInput = document.getElementById('book');
const authorInput = document.getElementById('author');
const statusInput = document.getElementById('status');
const submitButton = document.getElementById('submit-btn');
const addedBookContent = document.querySelector('.added-books');

class Book {
    static currentId = 0; 

    constructor(title, author, isRead) {
        this.id = Book.currentId++; 
        this.title = title;
        this.author = author;
        this.isRead = isRead;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
        this.displayBooks();
    }

    deleteBook(bookId) {
        this.books = this.books.filter(book => book.id !== bookId);
        this.displayBooks();
    }

    toggleReadStatus(bookId) {
        const book = this.books.find(book => book.id === bookId);
        if (book) {
            book.isRead = book.isRead === 'READ' ? 'NOT READ' : 'READ';
            this.displayBooks();
        }
    }

    displayBooks() {
        addedBookContent.innerHTML = '';
        this.books.forEach(book => {
            const bookBox = document.createElement('div');
            bookBox.classList.add('added-books-text');

            const titleDiv = document.createElement('div');
            titleDiv.classList.add('added-book');
            titleDiv.textContent = book.title;
            bookBox.appendChild(titleDiv);

            const authorDiv = document.createElement('div');
            authorDiv.classList.add('added-author');
            authorDiv.textContent = book.author;
            bookBox.appendChild(authorDiv);

            const readBtn = document.createElement('button');
            readBtn.textContent = book.isRead;
            readBtn.classList.add('read-button');
            readBtn.addEventListener('click', () => this.toggleReadStatus(book.id));
            bookBox.appendChild(readBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'DELETE';
            deleteBtn.classList.add('delete-button');
            deleteBtn.addEventListener('click', () => this.deleteBook(book.id));
            bookBox.appendChild(deleteBtn);

            addedBookContent.appendChild(bookBox);
        });

        addedBookContent.style.display = 'inline-block';
    }
}

const myLibrary = new Library();

submitButton.addEventListener('click', () => {
    event.preventDefault();
    if (bookInput.value.trim() === "" || authorInput.value.trim() === "") {
        alert("Book title and author are required.");
        return;
    }
    const readStatus = statusInput.value === 'read' ? 'READ' : 'NOT READ';
    const newBook = new Book(bookInput.value, authorInput.value, readStatus);

    myLibrary.addBook(newBook);

    bookInput.value = '';
    authorInput.value = '';
});



