const bookInput = document.getElementById('book');
const authorInput = document.getElementById('author');
const statusInput = document.getElementById('status');
const submitButton = document.getElementById('submit-btn');
const readButton = document.getElementById('read-btn');
const deleteButton = document.getElementById('del-btn');
const addedBookContent = document.querySelector('.added-books')
const addedBook = document.querySelector('.added-book');
const addedAuthor = document.querySelector('.added-author');
const bookInfoText = document.querySelector('added-book-box')


submitButton.addEventListener('click', addBookToLibrary);


let myLibrary = []; 
let bookId = 0; 


function Book(title, author, isRead) {
    this.id = bookId++; 
    this.title = title; 
    this.author = author; 
    this.isRead = isRead;  
}

function addBookToLibrary() {
    event.preventDefault();

    if (bookInput.value.trim() === "" || authorInput.value.trim() === "") {
        alert("Book title and author are required.")
        return;
    }

    let readStatus = statusInput.value === 'read' ? 'READ' : 'NOT READ';
    let bookInfo = new Book(bookInput.value, authorInput.value, readStatus);

    myLibrary.push(bookInfo);

    displayBooks();

    bookInput.value = '';
    authorInput.value = ''; 
}

function displayBooks() {
    // Clear previous content
    addedBookContent.innerHTML = '';

    // Loop through all books in myLibrary and create a new box for each
    myLibrary.forEach(book => {
        // Create the container for this book's information
        const bookBox = document.createElement('div');
        bookBox.classList.add('added-books-text');

        // Create and append the title element
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('added-book');
        titleDiv.textContent = book.title;
        bookBox.appendChild(titleDiv);

        // Create and append the author element
        const authorDiv = document.createElement('div');
        authorDiv.classList.add('added-author');
        authorDiv.textContent = book.author;
        bookBox.appendChild(authorDiv);

        // Create and append the read status button
        const readBtn = document.createElement('button');
        readBtn.textContent = book.isRead; // Or set to "READ"/"NOT READ" based on book.isRead
        // Add event listeners or other attributes to readBtn as needed
        readBtn.classList.add('read-button');
        readBtn.addEventListener('click', function() {
            if (readBtn.textContent === 'READ') {
                readBtn.textContent = 'NOT READ';
            } else {
                readBtn.textContent = 'READ'; 
            }
        });
        bookBox.appendChild(readBtn);

        // Create and append the delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'DELETE';
        deleteBtn.classList.add('delete-button');
        // Add event listeners or other attributes to deleteBtn as needed
        deleteBtn.setAttribute('data-book-id', book.id); // Set the book's ID as a data attribute
        deleteBtn.addEventListener('click', function() {
            // Use the book's ID from the data attribute to filter the array
            myLibrary = myLibrary.filter(b => b.id !== book.id);
            displayBooks(); // Re-render the book list
        });

        bookBox.appendChild(deleteBtn);

        // Append the new book box to the addedBookContent container
        addedBookContent.appendChild(bookBox);
    });

    // Make the addedBookContent visible
    addedBookContent.style.display = 'inline-block';
}


