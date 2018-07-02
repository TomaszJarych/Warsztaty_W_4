displayBooks();

$("#formAddBook").submit(function(event) {
    event.preventDefault();

    var url = $(this).attr("action");

    $.ajax({ 
            headers: { 
                'Content-Type': 'application/json' 
            },
            url: "http://localhost:8282/books",
            type: "POST",
            data: JSON.stringify({
                "isbn": $("#inputIsbn").val(), 
                "title": $("#inputTitle").val(),
                "author": $("#inputAuthor").val(),
                "publisher": $("#inputPublisher").val(),
                "type": $("#inputType").val() 
            }),
            success: displayBooks,
            dataType: "json"
        }
    );
});

function displayBooks() {
    $.ajax({
        url: "http://localhost:8282/books",
        type: "GET",
        dataType: "json",
        success: function(books) {
            if(!books) { return; }
    
            var booksDisplay = $("#booksDisplay");
            booksDisplay.html("");

            books.forEach(book => {
                var bookHtml = "<div class=\"BookEntry\"><p id=\"book_" + book["id"] + "\">" + book["title"] + 
                    "</p><button id=\"book_" + book["id"] + 
                    "_delete\">DELETE</button><div class=\"Collapsable\" id=\"book_details_" + book["id"] + 
                    "\"></div></div>";
                booksDisplay.append(bookHtml);
                $("#book_" + book["id"]).on("click", {id: book["id"]}, displayBookDetails);
                $("#book_" + book["id"] + "_delete").on("click", {id: book["id"]}, deleteBook);
            });
        }
    });
}

function deleteBook(event) {
    var bookDetails = $.ajax({
        url: "http://localhost:8282/books/" + event.data.id,
        type: "DELETE",
        success: displayBooks
    });
}

function displayBookDetails(event) {
    var bookDetails = $.ajax({
        url: "http://localhost:8282/books/" + event.data.id,
        type: "GET",
        dataType: "json",
        success: function(book) {
            if(!book) { return; }

            $("#book_details_" + event.data.id).html(
                "<p> Isbn: " + book["isbn"] + "</p>" +
                "<p> Author: " + book["author"] + "</p>" +
                "<p> Publisher: " + book["publisher"] + "</p>" +
                "<p> Type: " + book["type"] + "</p>"
            );
            $("#book_details_" + event.data.id).toggleClass("Collapsable");
        }
    });
}