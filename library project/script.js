function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

// Display constructor
function Display() {
  // this.books = [];
}
// Add methods to Display Prototype
Display.prototype.add = function(book) {
  // Adding the book to the display
  console.log('adding');
  let tableBody = document.getElementById('tableBody');
  let uistring = `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`;
  tableBody.innerHTML += uistring;

  // Update local storage
  let bookdata = localStorage.getItem('bookdata');
  let bookdataobj;
  if (bookdata == null) {
    bookdataobj = [];
  } else {
    bookdataobj = JSON.parse(bookdata);
  }
  bookdataobj.push(book); // Adding the new book to the array
  localStorage.setItem('bookdata', JSON.stringify(bookdataobj)); // Storing updated data back to local storage
};
// adding scroll bar
let tableContainer = document.getElementById('table');
// Check if the table container's height exceeds the maximum height
if (tableContainer.scrollHeight > tableContainer.clientHeight) {
  tableContainer.style.overflowY = 'scroll';
} else {
  tableContainer.style.overflowY = 'auto';
}


Display.prototype.search = function(query) {
  // Convert the query to lowercase for case-insensitive search
  query = query.toLowerCase();

  // Filter the books array based on the search query
  let filteredBooks = this.books.filter(function(book) {
    return book.name.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
  });

  // Clear the table body before displaying filtered books
  let tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = '';

  // Display filtered books in the table
  filteredBooks.forEach(function(book) {
    let uistring = `<tr>
                          <td>${book.name}</td>
                          <td>${book.author}</td>
                          <td>${book.type}</td>
                      </tr>`;
    tableBody.innerHTML += uistring;
  });
};


// Implementing clear function
Display.prototype.clear = function() {
  let libraryform = document.getElementById('libraryForm');
  libraryform.reset();
};

// Implementing validate function
Display.prototype.validate = function(book) {
  if (book.name.length < 2 || book.author.length < 2) {
    return false;
  } else {
    return true;
  }
};

// Implementing show function
Display.prototype.show = function(type, showmessage) {
  let message = document.getElementById('message');
  message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <strong>Great!</strong>${showmessage} 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;

  setTimeout(function() {
    message.innerHTML = '';
  }, 2000);
};

let deletebutton = document.getElementById('button')
deletebutton.addEventListener('click', function() {
  let tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = '';

})


// Add submit event Listener to libraryform
let libraryform = document.getElementById('libraryForm');
libraryform.addEventListener('submit', LibraryFormSubmit);

function LibraryFormSubmit(e) {
  e.preventDefault();
  let name = document.getElementById('bookName').value;
  let author = document.getElementById('author').value;
  let fiction = document.getElementById('fiction');
  let programming = document.getElementById('programming');
  let cooking = document.getElementById('cooking');

  let type;
  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (cooking.checked) {
    type = cooking.value;
  }

  let book = new Book(name, author, type);
  let display = new Display();

  let searchInput = document.getElementById('searchTxt');
  searchInput.addEventListener('input', function() {
    let query = searchInput.value;
    display.search(query);
  });

  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.search('');
    display.show('success', 'Your book has been successfully added');
  } else {
    display.show('danger', 'Sorry, you cannot add this book');
  }


  e.preventDefault(); // Preventing default behavior of submit
}
