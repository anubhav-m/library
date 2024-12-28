const myLibrary = [];

function Book(name, author, pages, isRead) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.isRead  = isRead;
}

Book.prototype.isReadToggle = function() {
  this.isRead = !this.isRead;  
}

function addBookToLibrary(bookObj) {
  myLibrary.push(bookObj);
}

addBookToLibrary(new Book("abc", "a", 23, true));
addBookToLibrary(new Book("def", "b", 343, false));
addBookToLibrary(new Book("ghi", "c", 533, false));
addBookToLibrary(new Book("jkl", "d", 33, true));
addBookToLibrary(new Book("mno", "e", 653, false));
addBookToLibrary(new Book("pqr", "f", 24, true));
addBookToLibrary(new Book("stu", "g", 64, false));

console.log(myLibrary);


function displayBooks(myLibrary){

  mainCont = document.querySelector(".main-cont");
  mainCont.innerHTML = "";

  myLibrary.forEach((book, index)=>{
    bookCont = document.createElement("div");
    mainCont.appendChild(bookCont);
    bookCont.className = "book-cont";

    title = document.createElement("div");
    title.textContent = `"${book.name}"`;
    bookCont.appendChild(title);

    author = document.createElement("div");
    author.textContent = `by ${book.author}`;
    bookCont.appendChild(author);

    pages = document.createElement("div");
    pages.textContent = `${book.pages} pages`;
    bookCont.appendChild(pages);

    isRead = document.createElement("div");
    isRead.textContent = book.isRead == 1 ? "Read" : "Not read";
    bookCont.appendChild(isRead);
    isRead.className = book.isRead == 1 ? "read" : "notread";
    isRead.setAttribute("data-index", `${index}`);

    remove = document.createElement("div");
    remove.textContent = "Remove";
    bookCont.appendChild(remove);
    remove.className = "remove";
    remove.setAttribute("data-index", `${index}`);
  });
}

displayBooks(myLibrary);

document.querySelector(".main-cont").addEventListener("click",(e)=>{
  if (e.target.classList.contains("read") || e.target.classList.contains("notread")) {
    const index = e.target.getAttribute("data-index");
    myLibrary[index].isReadToggle();
    displayBooks(myLibrary);
  }
});

document.querySelector(".main-cont").addEventListener("click",(e)=>{
  if (e.target.classList.contains("remove")) {
    const index = e.target.getAttribute("data-index");
    myLibrary.splice(index, 1);
    displayBooks(myLibrary);
  }
});


addBtn = document.querySelector(".add");
overlayForm = document.querySelector(".overlay-form-cont");
overlay = document.querySelector(".overlay");

addBtn.addEventListener("click", ()=>{
  overlayForm.style.display = "flex";
  overlay.style.display = "block";
})

overlay.addEventListener("click", ()=>{
  overlayForm.style.display = "none";
  overlay.style.display = "none";
})

document.querySelector(".overlay-form-cont").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission

  // Retrieve values from the form
  const title = document.querySelector('.title').value;
  const author = document.querySelector('.author').value;
  const pages = document.querySelector('.pages').value;
  const isRead = document.querySelector('#is-read').checked;

  // Create a new Book object using the retrieved values
  const newBook = new Book(title, author, pages, isRead);
  
  // Add the new book to the library
  addBookToLibrary(newBook);


  // Close the overlay form after submission 
  overlayForm.style.display = "none";
  overlay.style.display = "none";

  // Display updated books
  displayBooks(myLibrary);

  console.log(myLibrary);
});
