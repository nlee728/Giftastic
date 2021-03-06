 // Initial array of emotions
 var emotions = ["cool", "awkward", "sad", "excited"];

 // displayemotionInfo function re-renders the HTML to display the appropriate content
 function displayemotionInfo() {

   var emotion = $(this).attr("data-name");
   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        emotion + "&api_key=dc6zaTOxFJmzC&limit=10";

   // Creating an AJAX call for the specific emotion button being clicked
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function(response) {

    console.log(response);

    // storing the data from the AJAX request in the results variable
    var results = response.data;

    // Looping through each result item
    for (var i = 0; i < results.length; i++) {

    // Retrieving the URL for the image and adding image to div
     var emotionDiv = $("<div class='emotion'>");

     // Add favorite button and append to emotiondiv
    var faveButton = $("<i>").attr("class", "fa fa-heart")
                            .attr("id", "fave-button");
    emotionDiv.append(faveButton);

     var gifURL = results[i].images.downsized.url;
     var stillURL = results[i].images.downsized_still.url;

     var image = $("<img>").attr("src", stillURL)
                           .attr("data-still", stillURL)
                           .attr("data-animate", gifURL)
                           .attr("data-state", "still")
                           .attr("class", "gif");
     emotionDiv.append(image);

  
     //Get title info and append to div
     var title = response.data[i].title;
     var p = $("<p>").text("Title: " + title);
     emotionDiv.append(p);
    
    //Get rating info and append to div
      var rating = response.data[i].rating;
      var p = $("<p>").text("Rating: " + rating);
      emotionDiv.append(p);

    //Create download now link and append to div
    var downloadLink = $("<a>").attr("href", gifURL)
    .text("Download Now")
    .attr("download", "");
    emotionDiv.append(downloadLink);

    // Add page break after download button
    var pageBreak = $("<hr>");
    emotionDiv.append(pageBreak);

    // Add emotion div to top of html emotions-view div
    $("#emotions-view").prepend(emotionDiv);

      }
   });

 }

//Function that handles clicks on the gif images to switch between still and animated
 $("#emotions-view").on("click", ".gif", function() {
     console.log("click");
    var state = $(this).attr("data-state");
    console.log(state);

    //If still, switch to animated gif and vice-versa
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
    console.log(state);
  });

 // Function for displaying emotion gifs and data
 function renderButtons() {

   // Deleting the emotions prior to adding new emotions to avoid repeat buttons
   $("#buttons-view").empty();

   // Looping through the array of emotions and dynamically generating buttons for each emotion in the array
   for (var i = 0; i < emotions.length; i++) {
     var a = $("<button>");
     a.addClass("emotion-btn");
     a.attr("data-name", emotions[i]);
     a.text(emotions[i]);
     $("#buttons-view").append(a);
   }
 };

 // Click event handler for the emotions buttons
 $("#add-emotion").on("click", function(event) {
   event.preventDefault();
   // Grabs the input from the textbox and adds to array
   var emotion = $("#emotion-input").val().trim();
   emotions.push(emotion);

   // Calling renderButtons to display the emotions array after adding new value
   renderButtons();
 });

//Click event handler to add a favorite
  $("#emotions-view").on("click", ".fa-heart", function() {
  
  if( $(this).attr("class") == "fa fa-heart" ){
    $(this).attr("class", "fa fa-heart favorited");
    console.log("I favorited this gif");
    }
    else{
    $(this).attr("class", "fa fa-heart");
    console.log("I un-favorited this gif");
    }

    function moveGif (gif) {
      if( $(gif).parent().attr("class") == "favorited" ){
          $(gif).detach().appendTo('#favorites-view');
      }
      else{
          $(gif).detach().appendTo('#emotions-view'); 
      }
  }
  moveGif();
  });

 
 

 // Adding a click event listener to all elements with a class of "emotion-btn"
 $(document).on("click", ".emotion-btn", displayemotionInfo);

 // Calling the renderButtons function to display the intial buttons
 renderButtons();