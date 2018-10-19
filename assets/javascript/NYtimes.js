// .on("click") function associated with the Search Button
$("#run-search").on("click", function(event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();
  
    // Build the query URL for the ajax request to the NYT API
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

            for (var i = 0; i < 5; i++) {
      
                video = response.data[i].images.original.url;
     
                image = response.data[i].images.original_still.url;
     
                rating = (response.data[i].rating).toUpperCase();
     
                var imagElement = $("<img>");
                $(imagElement).attr("src", image).attr("data-img", image).attr("data-vid", video).attr("data-live", "no");
             
                var pImage = $("<p>");
     
                $(pImage).append("Rated: " + rating + "<br>").append(imagElement).addClass("gif");
     
              
                $("#videoField").append(pImage);
     
               }
            
        }).fail(function(err) {
            throw err;
        });
  });
