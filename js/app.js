// wait for DOM to load before running JS
$(document).on('ready', function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  var $spotifySearch = $('#spotify-search');

  var $track = $('#track');

  var $results = $('#results');

  var $loading = $('#loading');

  $spotifySearch.on('submit', function handleFormSubmit(event) {
    even.preventDefault();

    $results.empty();

    var searchTrack = $track.val();

    if (searchTrack !== "") {
      $loading.show();

      var searchUrl = 'https://api.spotify.com/v1/search?type=track&q=' + searchTrack;

      $.ajax({
        method: 'GET',
        url: searchUrl,
        success: handleSpotifyData
      });
    } else {
      alert("You need to search for something first!");
    }

    $spotifySearch[0].reset();
    $track.focus();
  });

  function handleSpotifyData(data) {
    var trackResults = data.tracks.items;

    $loading.hide();

    if (trackResults.length > 0) {
      trackResults.forEach(function (results, index) {
        var trackData = {
          albumArt: results.album.images.length > 0 ? results.album.images[0].url : null,
          artist: results.artists[0].name,
          name: results.name,
          previewUrl: results.preview_url
        };

        var $trackHtml = '<div class="row"><div class="col-xs-4">' +
          '<img src="' + trackData.albumArt + '" class="img-responsive"></div>' +
          '<div class="col-xs-8"><p><strong>' + trackData.name + '</strong> by ' +
          trackData.artist + '</p><p><a href="' + trackData.previewUrl +
          '" target="_blank" class="btn btn-sm btn-default">Preview ' +
          '<span class="glyphicon glyphicon-play"></span></a></p></div></div><hr>';

          $results.append($trackHtml);
      });

    } else {
      $results.append('<p class="text-center">Nothing Here</p>');
    }
  }

});
