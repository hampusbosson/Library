console.log('Script loaded');

function Book(title, author, pages, isRead) {
    this.title = title; 
    this.author = author; 
    this.pages = pages; 
    this.isRead = isRead;  
     
    this.info = function() {
        let readStatus = this.isRead ? 'read' : 'not read yet'; 
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
    };
}

let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false); 
console.log(theHobbit.info()); 