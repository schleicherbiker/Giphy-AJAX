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

    //Respond to gif button clicks
    $(".gif-button").click(function(){
        getGif($(this).text());
        console.log($(this).text());
        console.log("test");
    })
});

function makeButton(text) {
        var button = $("<button>");
        button.html(text);
        button.addClass("btn btn-primary gif-button");
        $("#buttons").append(button);  
        console.log(text);
}

function getGif(search) {

    var apiKey = "78fec19e2d8242fbae167723b8736325";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apiKey + "&limit=10";
  
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {

        var gifs = response.data;

        for (i=0; i<gifs.length; i++) {
            //Make container
            var container = $("<div>").addClass("img text-center");

            //Append Gif and rating
            var gif = $("<img>").attr("src", gifs[i]["images"]["downsized"]["url"]);
            container.append("Rating: " + gifs[i]["rating"])
            container.append(gif);
            $("#gifs").prepend(container);
        }
    })
}