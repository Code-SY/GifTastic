var topics = ["bread", "coffee", "tea", "cake", "pie", "apple", "cookie", "salade", "broccoli"];

$("#addTopic").on("click", function(event) {
  event.preventDefault();

  var topicName = $("#topic-input")
    .val()
    .trim();

  if (topics.indexOf(topicName) === -1 && topicName !== "") {
    topics.push(topicName);
  }
  $("#topic-input").val("");

  renderButtons();
});

// Click event, display GIFs
$(document).on("click", ".topic", displayGIFs);

$(document).on("click", ".gif-image", toggleGIF);

function renderButtons() {
  $("#topicButtons").empty();

  for (var i = 0; i < topics.length; i++) {
    var newButton = $("<button>");

    newButton.addClass("topic");

    newButton.attr("data-topic", topics[i]);

    newButton.text(capitalizeFirstLetter(topics[i]));

    $("#topicButtons").append(newButton);
  }
}

function displayGIFs() {
  $("#topics-container").empty();
  var API_KEY = "sI83TBnL9lluOPV6gt4WfBGKLIjJk20d"; // API Key
  var limit = 10; // Limit 10 GIFs
  var queryTopic = $(this).attr("data-topic"); // Topic
  // Query URL per GIPHY's documentation
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    queryTopic +
    "&api_key=" +
    API_KEY +
    "&limit=" +
    limit;

  // AJAX
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    // For-loop
    for (var i = 0; i < response.data.length; i++) {
      var newDiv = $("<div>");
      var rating = response.data[i]["rating"];
      var stillImage = response.data[i]["images"]["fixed_height_still"]["url"];
      var gif = response.data[i]["images"]["fixed_height"]["url"];
      var imgCaption = capitalizeFirstLetter(response.data[i]["title"]);

      var gifDiv = $("<img>");

      gifDiv.attr("src", stillImage);
      gifDiv.attr("alt", imgCaption);
      gifDiv.addClass("gif-image");

      gifDiv.data("values", {
        "still-image": stillImage,
        gif: gif,
        state: "still"
      });

      newDiv.append("<p>Rating: " + rating + "</p>");
      newDiv.append(gifDiv);
      newDiv.addClass("gifs");

      $("#topics-container").append(newDiv);
    }
  });
}

function toggleGIF() {
  if ($(this).data().values.state === "still") {
    $(this).attr("src", $(this).data().values.gif);
    $(this).data().values.state = "moving";
  } else if ($(this).data().values.state === "moving") {
    $(this).attr("src", $(this).data().values["still-image"]);
    $(this).data().values.state = "still";
  }
}

// Capitalize the first letter for multiple words in the button string
function capitalizeFirstLetter(string) {
  return string.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

renderButtons();
s;
