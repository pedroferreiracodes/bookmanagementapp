$(document).ready(function () {
  $("#getAllBooksButton").click(function (e) {
    e.preventDefault();

    $.ajax({
      url: "http://localhost:8080/api/books",
      method: "GET",
      dataType: "json",
      success: function (data) {
        let bookTableBody = $("#bookTableBody");
        bookTableBody.empty();

        if (Array.isArray(data)) {
          data.forEach(function (book) {
            let row = `<tr>
              <td>${book.id}</td>
              <td>${book.title}</td>
              <td>${book.author}</td>
              <td>${book.isbn}</td>
              <td>${book.price}</td>
              <td>${book.publishedDate}</td>
              <td><a class="button button-secondary editBookButton" data-book-id="${book.id}" data-book-title="${book.title}" data-book-author="${book.author}" data-book-isbn="${book.isbn}" data-book-price="${book.price}" data-book-publishedDate="${book.publishedDate}" href="#">edit book</a></td>
              <td><a class="button button-secondary deleteBookButton" data-book-id="${book.id}" style="color:white; background-color:#AF4645" href="#">delete book</a></td>
            </tr>`;
            bookTableBody.append(row);
          });

          $(".deleteBookButton").click(function (e) {
            e.preventDefault();
            let bookId = $(this).data("book-id");
            deleteBook(bookId);
          });

          $(".editBookButton").click(function (e) {
            e.preventDefault();
            let bookId = $(this).data("book-id");
            let bookTitle = $(this).data("book-title");
            let bookAuthor = $(this).data("book-author");
            let bookIsbn = $(this).data("book-isbn");
            let bookPrice = $(this).data("book-price");
            let bookPublishedDate = $(this).data("book-publishedDate");
            openEditForm(
              $(this).closest("tr"),
              bookId,
              bookTitle,
              bookAuthor,
              bookIsbn,
              bookPrice,
              bookPublishedDate,
            );
          });
        } else {
          console.error("Expected an array of books, but got:", data);
        }
      },
      error: function (xhr, status, error) {
        console.error("Error fetching books:", error);
      },
    });
  });

  $("#getBookByIdButton").click(function (e) {
    let bookId = $("#bookIdInput").val();
    e.preventDefault();

    $.ajax({
      url: "http://localhost:8080/api/books/" + bookId,
      method: "GET",
      dataType: "json",
      success: function (data) {
        let bookByIdTable = $("#bookByIdPlace");
        bookByIdTable.empty();
        if (data) {
          let row = `<tr>
              <td>${data.id}</td>
              <td>${data.title}</td>
              <td>${data.author}</td>
              <td>${data.isbn}</td>
              <td>${data.price}</td>
              <td>${data.publishedDate}</td>
              <td><a class="button button-secondary editBookButton" data-book-id="${data.id}" data-book-title="${data.title}" data-book-author="${data.author}" data-book-isbn="${data.isbn}" data-book-price="${data.price}" data-book-publishedDate="${data.publishedDate}" href="#">edit book</a></td>
              <td><a class="button button-secondary deleteBookButton" style="color:white; background-color:#AF4645" href="#">delete book</a></td>
            </tr>`;
          bookByIdTable.append(row);

          $(".deleteBookButton").click(function (e) {
            e.preventDefault();
            let bookId = data.id;
            deleteBook(bookId);
          });

          $(".editBookButton").click(function (e) {
            e.preventDefault();
            let bookId = data.id;
            let bookTitle = data.title;
            let bookAuthor = data.author;
            let bookIsbn = data.isbn;
            let bookPrice = data.price;
            let bookPublishedDate = data.publishedDate;
            openEditForm(
              $(this).closest("tr"),
              bookId,
              bookTitle,
              bookAuthor,
              bookIsbn,
              bookPrice,
              bookPublishedDate,
            );
          });
        } else {
          console.error("Expected book, but got:", data);
        }
      },
      error: function (xhr, status, error) {
        console.error("Error fetching book:", error);
      },
    });
  });

  function deleteBook(bookId) {
    $.ajax({
      url: "http://localhost:8080/api/books/" + bookId,
      method: "DELETE",
      success: function (data) {
        alert("Book deleted successfully");
        $("#getAllBooksButton").click();
      },
      error: function (xhr, status, error) {
        console.error("Error deleting book:", error);
      },
    });
  }

  function openEditForm(
    row,
    bookId,
    title,
    author,
    isbn,
    price,
    publishedDate,
  ) {
    let formRow = `<tr class="editFormRow">
      <td colspan="8">
        <form id="editBookForm">
          <input type="hidden" id="editBookId" value="${bookId}">
          <label for="editBookTitle">Title:</label>
          <input type="text" id="editBookTitle" value="${title}">
          <label for="editBookAuthor">Author:</label>
          <input type="text" id="editBookAuthor" value="${author}">
          <label for="editBookIsbn">ISBN:</label>
          <input type="text" id="editBookIsbn" value="${isbn}">
          <label for="editBookPrice">Price:</label>
          <input type="text" id="editBookPrice" value="${price}">
          <label for="editBookPublishedDate">Published Date:</label>
          <input type="date" id="editBookPublishedDate" value="${publishedDate}">
          <button type="submit">Save</button>
          <button type="button" class="cancelEditButton">Cancel</button>
        </form>
      </td>
    </tr>`;

    row.after(formRow);

    $("#editBookForm").submit(function (e) {
      e.preventDefault();
      let bookId = $("#editBookId").val();
      let updatedBook = {
        title: $("#editBookTitle").val(),
        author: $("#editBookAuthor").val(),
        isbn: $("#editBookIsbn").val(),
        price: $("#editBookPrice").val(),
        publishedDate: $("#editBookPublishedDate").val(),
      };
      updateBook(bookId, updatedBook);
    });

    $(".cancelEditButton").click(function () {
      $(this).closest(".editFormRow").remove();
    });
  }

  function updateBook(bookId, updatedBook) {
    $.ajax({
      url: "http://localhost:8080/api/books/" + bookId,
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify(updatedBook),
      success: function (data) {
        alert("Book updated successfully");
        $("#getAllBooksButton").click();
      },
      error: function (xhr, status, error) {
        console.error("Error updating book:", error);
      },
    });
  }

  $("#addBookButton").click(function (e) {
    e.preventDefault();
    let newBook = {
      title: $("#bookTitleInput").val(),
      author: $("#bookAuthorInput").val(),
      isbn: $("#bookIsbnInput").val(),
      price: $("#bookPriceInput").val(),
      publishedDate: $("#bookPubDateInput").val(),
    };
    addBook(newBook);
  });

  function addBook(newBook) {
    $.ajax({
      url: "http://localhost:8080/api/books",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(newBook),
      success: function (data) {
        alert("Book added successfully");
        $("#getAllBooksButton").click();
      },
      error: function (xhr, status, error) {
        console.error("Error adding book:", error);
      },
    });
  }
});
