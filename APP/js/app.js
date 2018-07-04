$(document).ready(function () {
    $.ajax({
        url: "http://localhost:8282/books",
        type: "GET",
        dataType: "json"
    }).done(function (booksList) {
        if (!booksList) {
            return;
        }
        var booksListDiv = $("#booksList");
        for (var book of booksList) {
            var element = "";
            var element = "<div class = \"bookEntry\"><h1>" + book["title"] + "</h1>";
            element += "<button id=\"bookID" + book["id"] + "\">Details </button>";
            element += "<div class=\"showDetails\" id=\"bookDetailsID" + book["id"] + 
            "\"></div>";
            element += "</div>";
            booksListDiv.append(element);
            $("#bookID" + book["id"]).on("click", {id: book["id"]}, function(){
                console.log("Pyk i działa");
            });
        }

    })

});