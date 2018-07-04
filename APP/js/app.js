showAllBooks();
$("#addBookButton").on("click", addBook);

function showAllBooks() {
    $.ajax({
        url: "http://localhost:8282/books",
        type: "GET",
        dataType: "json"
    }).done(function (booksList) {
        if (!booksList) {
            return;
        }
        var booksListDiv = $("#booksList");
        booksListDiv.html("")
        for (var book of booksList) {
            var element = "";
            var element = "<div class = \"bookEntry\"><h1>" + book["title"] + "</h1>";
            element += "<button id=\"bookID" + book["id"] + "\">Details </button>";
            element += "<button id=\"deleteBook" + book["id"] + "\">Delete </button>";
            element += "<div class=\"showDetails\" id=\"bookDetailsID" + book["id"] +
                "\"></div>";
            element += "</div>";
            booksListDiv.append(element);
            $("#bookID" + book["id"]).on("click", {
                id: book["id"]
            }, bookDetail);
            $("#deleteBook" + book["id"]).on("click", {
                id: book["id"]
            }, deleteBook);
        }

    });

    function bookDetail(event) {
        $.ajax({
            url: "http://localhost:8282/books/" + event.data.id,
            type: "GET",
            dataType: "json"
        }).done(function (book) {
            $("#bookDetailsID" + event.data.id).html(
                "<h2> Autor: " + book["author"] + "</h2>" +
                "<h3> Tytuł: " + book["title"] + "</h3>" +
                "<p> ISBN: " + book["isbn"] + "</p>" +
                "<p> Wydawca: " + book["publisher"] + "</p>" +
                "<p> Typ: " + book["type"] + "</p>"
            );
        });
        $("#bookDetailsID" + event.data.id).toggleClass("showDetails")

    }

    function deleteBook(event) {
        $.ajax({
            url: "http://localhost:8282/books/" + event.data.id,
            type: "DELETE"
        }).done(showAllBooks)
    }
}

function addBook(event) {
    event.preventDefault();
    var authorInput = $("#inputAuthor").val();
    var titleInput = $("#inputTitle").val();
    var isbnInput = $("#inputIsbn").val();
    var publisherInput = $("#inputPublisher").val();
    var typeInput = $("#inputType").val()
    var bookToSend = {
        isbn: isbnInput,
        title: titleInput,
        author: authorInput,
        publisher: publisherInput,
        type: typeInput
    }

    
    $.ajax({
        headers: { 
            'Content-Type': 'application/json' 
        },
        url: "http://localhost:8282/books",
        type: "POST",
        data: JSON.stringify(bookToSend),
        dataType: "json"
    }).done(showAllBooks)
  
    


}