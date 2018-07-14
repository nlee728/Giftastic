 // Initial array of emotions
 var emotions = ["happy", "awkward", "sad", "crazy"];

 // displayemotionInfo function re-renders the HTML to display the appropriate content
 function displayemotionInfo() {

   var emotion = $(this).attr("data-name");
   var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + emotion;

   // Creating an AJAX call for the specific emotion button being clicked
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function(response) {

    console.log(response);

     // Creating a div to hold the emotion
     var emotionDiv = $("<div class='emotion'>");

     // Storing the rating data
     var rating = response.data.rating;

     // Creating an element to have the rating displayed
     var p = $("<p>").text("Rating: " + rating);

     // Displaying the rating
     emotionDiv.append(p);

     // Retrieving the URL for the image
     var imgURL = response.data.image_original_url;

     // Creating an element to hold the image
     var image = $("<img>").attr("src", imgURL);

     // Appending the image
     emotionDiv.append(image);

     // Putting the entire gif above the previous gifs
     $("#emotions-view").prepend(emotionDiv);
   });

 }

 // Function for displaying emotion data
 function renderButtons() {

   // Deleting the emotions prior to adding new emotions
   // (this is necessary otherwise you will have repeat buttons)
   $("#buttons-view").empty();

   // Looping through the array of emotions
   for (var i = 0; i < emotions.length; i++) {

     // Then dynamicaly generating buttons for each emotion in the array
     // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
     var a = $("<button>");
     // Adding a class of emotion-btn to our button
     a.addClass("emotion-btn");
     // Adding a data-attribute
     a.attr("data-name", emotions[i]);
     // Providing the initial button text
     a.text(emotions[i]);
     // Adding the button to the buttons-view div
     $("#buttons-view").append(a);
   }
 }

 // This function handles events where a emotion button is clicked
 $("#add-emotion").on("click", function(event) {
   event.preventDefault();
   // This line grabs the input from the textbox
   var emotion = $("#emotion-input").val().trim();

   // Adding emotion from the textbox to our array
   emotions.push(emotion);

   // Calling renderButtons which handles the processing of our emotion array
   renderButtons();
 });

 // Adding a click event listener to all elements with a class of "emotion-btn"
 $(document).on("click", ".emotion-btn", displayemotionInfo);

 // Calling the renderButtons function to display the intial buttons
 renderButtons();