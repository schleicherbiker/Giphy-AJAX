//Declare topics
var topics = ["Spongebob", "Patrick", "Rick and Morty", "Peter Griffin", "Stewie Griffin", "Quagmire"];
console.log("test");

//Make buttons
for (i=0; i<topics.length; i++) {
    var button = $("<button>");
    button.html(topics[i]);
    button.addClass("btn-primary");
    button.click(function(){
        getGif($(this).text());
    })
    $("#buttons").append(button);
}




function getGif(search) {

    var apiKey = "78fec19e2d8242fbae167723b8736325";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apiKey + "&limit=10";
    console.log(queryURL);
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
