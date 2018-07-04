$(document).ready(function () {
    $.ajax({
        url: "http://localhost:8282/books/"
    }).done(function (booksJSON) {
        var books = [];
        $.each(booksJSON, function () {
            books.push(this)
        });
        var tbody = $("#tbody");
        for (var book of books) {
            var newTr = $("<tr>");
            var newTdID = $("<td>")
            newTdID.text(book.id);
            var newTdISBN = $("<td>")
            newTdISBN.text(book.isbn);
            var newTdAuthor = $("<td>")
            newTdAuthor.text(book.author)
            var newTdTitle = $("<td>")
            newTdTitle.text(book.title);
            var button = $("<button>")
            button.text("Więcej informacji")
            newTdTitle.append(button);
            var newTdPublisher = $("<td>")
            newTdPublisher.text(book.publisher)
            var newTdType = $("<td>")
            newTdType.text(book.type);
            var newDiv = $("<div>", {
                id: book.id
            });
            newTr.append(newTdID).append(newTdISBN).append(newTdAuthor)
                .append(newTdTitle).append(newTdPublisher)
                .append(newTdType);
            tbody.append(newTr).append(newDiv);
        }
    }); // tutaj dodać fail() i always();

})
var tbody = $("#tbody");
tbody.on("click", "button", function (event) {
    var target = $(event.target);
    var div = target.parent().parent().next("div");
    var bookId = (div.attr("id"));
    $.ajax({
        url: "http://localhost:8282/books/"+bookId
    }).done(function (booksJSON) {
        
        var additionalInfo = "ID to "+ booksJSON.id+ " ISBN to: "+booksJSON.isbn +" Autor to "+ booksJSON.author+ 
        " Tytuł to "+booksJSON.title+ " Wydawca to "+booksJSON.publisher+ " Gatunek : "+ booksJSON.type;
        var newP = $("<p>").text(additionalInfo)
        div.append(newP)
        
    });
        



});