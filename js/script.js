function searchMovie() {
  $("#movie-list").html("");
  $.ajax({
    url: "http://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "ffcf3ec2",
      s: $("#search-input").val(),
    },
    success: function (result) {
      if (result.Response == "True") {
        const movies = result.Search;
        $.each(movies, function (i, data) {
          $("#movie-list").append(`
                    <div class="col-md-2">
                    <div class="card">
                    <img src="${data.Poster}" class="card-img-top">
                    <div class="card-body">
                      <h5 class="card-title">${data.Title}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                      <a href="#" class="card-link" data-bs-toggle="modal" data-bs-target="#exampleModal">See Detail</a>
                    </div>
                  </div>
                  </div>
                    `);
        });
      } else if ($("#search-input").val() == "") {
        $("#movie-list").html(` <div class="col">
                <h1 class="text-center">You havent added any movies yet</h1>
                </div>`);
      } else {
        $("#movie-list").html(`
                <div class="col">
                    <h1 class="text-center">${result.Error}</h1>
                </div>
               
                `);
      }
    },
  });
}
//-------------
$("#search-button").on("click", function () {
  searchMovie();
});
//-------------
$("#search-input").on("keyup", function (e) {
  if (e.keyCode === 13) {
    searchMovie();
  }
});
