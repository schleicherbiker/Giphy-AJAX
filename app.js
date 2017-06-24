//Declare topics
var topics = ["Spongebob", "Patrick", "Squidward", "Rick", "Morty", "Jerry", "Peter", "Stewie", "Quagmire"];
console.log("test");

//Make buttons
for (i=0; i<topics.length; i++) {
    var button = $("<button>");
    button.html(topics[i]);
    button.addClass("btn-primary");
    $("#buttons").append(button);
}


search = "spongebob";
apiKey = "78fec19e2d8242fbae167723b8736325";
queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apiKey + "&limit=10";

$.ajax({
    url: queryURL,
    method: "GET"
}).done(function(response) {
    var gifs = response.data;
    console.log(gifs);
    for (i=0; i<gifs.length; i++) {
        var gif = $("<img>").attr("src", gifs[i]["images"]["downsized"]["url"]);
        gif.attr("alt", "#");
        $("#gifs").append(gif);
    }
})