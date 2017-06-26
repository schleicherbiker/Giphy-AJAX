$(document).ready(function(){
    //Declare topics
    var topics = ["Spongebob", "Patrick", "Rick and Morty", "Peter Griffin", "Stewie Griffin", "Quagmire"];

    //Make initial buttons
    for (i=0; i<topics.length; i++) {
        makeButton(topics[i]);
    }

    //Make form for new button
    $("#addGif").click(function() {
        text = $("input").val();
        if (text !== "") {
            $("input").val("");
            makeButton(text);
        }
    });
});

function makeButton(text) {
        var button = $("<button>");
        button.html(text);
        button.addClass("btn btn-primary gif-button");
        button.click(function(){
            getGif($(this).text());
        })
        $("#buttons").append(button);  
}

function getGif(search) {

    var apiKey = "78fec19e2d8242fbae167723b8736325";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apiKey + "&limit=10";
  
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);
        var gifs = response.data;

        for (i=0; i<gifs.length; i++) {
            //Make container
            var container = $("<div>").addClass("img text-center");

            //Append Gif and rating
            var gif = $("<img>").attr("src", gifs[i]["images"]["downsized_still"]["url"]);
            gif.attr("data-state", "still");
            gif.attr("data-still", gifs[i]["images"]["downsized_still"]["url"]);
            gif.attr("data-animate", gifs[i]["images"]["downsized"]["url"]);
            gif.click(function() {
                var state = $(this).attr("data-state");
                console.log($(this));
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animated");
                } else if (state !== "still") {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }

            });
            container.append("Rating: " + gifs[i]["rating"])
            container.append(gif);
            $("#gifs").prepend(container);
        }
    })
}