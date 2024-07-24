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
              <td><a class="button button-secondary editBookButton" data-book-id="${book.id}" href="#">edit book</a></td>
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
            // Implement edit functionality here
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
              <td><a class="button button-secondary editBookButton" href="#">edit book</a></td>
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
});
