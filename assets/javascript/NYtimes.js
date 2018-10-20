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
            'q': "unemployment",
            'begin_date': "19990101",
            'end_date': "19991231"
        });
        $.ajax({
            url: url,
            method: 'GET',
        }).done(function(result) {
            console.log(result);
            var test = result;
            console.log(test.response.docs.length);
            
            
           
            for (var i = 0; i < 10; i++) {

                if (test.response.docs[i].keywords.length !== 0) {
            
                    headline = test.response.docs[i].headline.main;
            
                    // image = response.data[i].images.original_still.url;
            
                        //rating = (response.data[i].rating).toUpperCase();
            
                        var imagElement = $("<img>");
                    // $(imagElement).attr("src", image).attr("data-img", image).attr("data-vid", video).attr("data-live", "no");
                    
                        var headliner = $("<p>");
            
                        $(headliner).append(test.response.docs[i].headline.main);
            
                    
                        $("#article-section").append(headliner);
                }
             }
            
        }).fail(function(err) {
            throw err;
        });
  });
