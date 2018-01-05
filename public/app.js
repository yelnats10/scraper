// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<div class='card ' " + "data-id=" + data[i]._id  + ">" + "<div class='card-header bg-primary text-white'><p id='title" + data[i]._id  + "'>" + data[i].title + "</p><a class='btn btn-success text-white float-right save' " + "data-id=" + data[i]._id  +  " role='button'>Save</a>" + "</div>" + "<div class='card-body'><p id='body" + data[i]._id  + "'>" + data[i].link + "</p></div></div><br />");
// `<a href=${data[i].link}> ${data[i].title}</a>`
    }
  });

  $.getJSON("/saved", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#s-articles").append("<div class='card ' " + "data-id=" + data[i]._id  + ">" + "<div class='card-header bg-primary text-white'><p id='title" + data[i]._id  + "'>" + data[i].title + "</p><a class='btn btn-success text-white float-right delete' " + "data-id=" + data[i]._id  +  " role='button'>Delete</a>" + "</p></p><a class='btn btn-warning text-white float-right comment' " + "data-id=" + data[i]._id  +  " role='button'>Comment</a></p></div>" + "<div class='card-body'><p id='body" + data[i]._id  + "'>" + data[i].body + "</p></div></div><br />");
// "<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
  });



  $().ready(function () {
  $("#scrape").on("click", function () {

    $.ajax({
        method: "GET",
        url: "/scrape/"
      })
      .done(function() {

        location.reload();

      });

  });
});

// When you click the savenote button
$(document).on("click", ".save", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  console.log($("#title" + thisId).text());
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/saved",
      data: {
        // Value taken from title input
        title: $("#title" + thisId).text(),
        // Value taken from note textarea
        body: $("#body" + thisId).text()
      }
    })
      // With that done
      .done(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        // $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    // $("#titleinput").val("");
    // $("#bodyinput").val("");
  });


  $(document).on("click", ".delete", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  console.log($("#title" + thisId).text());
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "DELETE",
      url: "/saved",
      data: {
        // Value taken from title input
        title: $("#title" + thisId).text(),
        // Value taken from note textarea
        body: $("#body" + thisId).text()
      }
    })
      // With that done
      .done(function(data) {
        // Log the response
        console.log(data);
        location.reload();
        // Empty the notes section
        // $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    // $("#titleinput").val("");
    // $("#bodyinput").val("");
  });



  $(document).on("click", ".comment", function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/save/" + thisId
    })
      // With that done, add the note information to the page
      .done(function(data) {
        console.log(data);
        // The title of the article
        $("#notes").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        // $("#notes").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          // $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });
  

  // When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/save/" + thisId,
    data: {
      // Value taken from title input
      title: $("h2").text(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  // $("#titleinput").val("");
  $("#bodyinput").val("");
});