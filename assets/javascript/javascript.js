//////Variables/////////////
var userSearchTerm;
var topics = ["drones", "football", "fortnite", "saab", "robotics", "Star Wars", "Trains"];
var videoReturnAmount = 10;
var video;
var image;
var getVid;

/////////add permanent topics///////////////
for (var i = 0; i < topics.length; i++) {
       
    $("#buttonField").append("<button id=" + topics[i] + " class='topicBut' value =" + topics[i] + ">" + topics[i] + "</button>");
}


//////check for add/saved topics////////////////
var checkStorage = JSON.parse(localStorage.getItem("SavedTopics"));


if (checkStorage !== null && checkStorage.length !== 0) {
  for (var t = 0; t < checkStorage.length; t++) {
  $("#buttonField").append("<button id='" + checkStorage[t] + "'class='topicBut saved' value =" + checkStorage[t] + ">" + checkStorage[t] + "</button>");
  }
}


$(document).ready(function() {

//////////////"listen" for dynamic img click///////////////////////
  $(document).on("touch click", "img", function() {
    var picValue = $(this).attr("data-live");
    if (picValue === "no") {
      $(this).attr("data-live", "yes");
      $(this).attr("src", $(this).attr("data-vid"));

    }
    else if (picValue === "yes") {
      $(this).attr("data-live", "no");
      $(this).attr("src", $(this).attr("data-img"));
    }

  });
   /////////////////on click get button text and retrieve api info//////////////////////////////////////
    $(document).on("touch click", "button.topicBut", function() {
        $("#videoField").empty();
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
          'api-key': "b3319917b4b54c0ba4a7eb463d0099d9",
          'q': "Jets"
        });
        $.ajax({
          url: url,
          method: 'GET',
        }).done(function(result) {
          console.log(result);
        }).fail(function(err) {
          throw err;
        });
        
      });


    /////search click///////////////////////////////////////
   $("#buttonSearch").on("touch click", function(event) {
      userSearchTerm = $("#userInput").val().trim();
      $("#userInput").val('');
      if (userSearchTerm !== "") {
        /////////local storage for Topics/////////////////////
        var tempTopics = localStorage.getItem("SavedTopics");
        //////////////if first time or no local storage found//////////////////////////
        if (tempTopics === null || tempTopics === undefined || tempTopics === 'null') {
         tempTopics = [];
         tempTopics = JSON.stringify(tempTopics);
        } 
        
        tempTopics = JSON.parse(tempTopics);
        tempTopics.push(userSearchTerm);
        $(".saved").remove();
       
        for (var g = 0; g < tempTopics.length; g++) {
       
          $("#buttonField").append("<button id='" + tempTopics[g] + "' class='topicBut saved' value =" + tempTopics[g] + ">" + tempTopics[g] + "</button>");
        }
        tempTopics = JSON.stringify(tempTopics);
        localStorage.setItem("SavedTopics", tempTopics);
        
        
      }


    });
///////////////clear user entered search terms///////////////////
    $("#clearSaved").on("touch click", function() {
      $(".saved").remove();
      var clearAll = [];
      clearAll = JSON.stringify(clearAll);
      localStorage.setItem("SavedTopics", clearAll);
    });

/////////////Increase Gif Return/////////////////////////////////
    $("#addOne").on("touch click", function() {
      videoReturnAmount++;
      if (videoReturnAmount === 26) {
        videoReturnAmount = 25;
      }
      $("#numberGifs").text(videoReturnAmount + " Gifs");
    });
/////////////Decrease Gif Return////////////////////////////////
    $("#subtractOne").on("touch click", function() {
      videoReturnAmount--;
      if (videoReturnAmount === 0) {
        videoReturnAmount = 1;
      }
      $("#numberGifs").text(videoReturnAmount + " Gifs");
    });

});




