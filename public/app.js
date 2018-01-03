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
      $("#s-articles").append("<div class='card ' " + "data-id=" + data[i]._id  + ">" + "<div class='card-header bg-primary text-white'><p id='title" + data[i]._id  + "'>" + data[i].title + "</p><a class='btn btn-success text-white float-right delete' " + "data-id=" + data[i]._id  +  " role='button'>Delete</a>" + "</div>" + "<div class='card-body'><p id='body" + data[i]._id  + "'>" + data[i].body + "</p></div></div><br />");
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