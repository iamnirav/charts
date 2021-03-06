// http://matt.might.net/articles/how-to-native-iphone-ipad-apps-in-javascript/
// http://www.sitepen.com/blog/2011/12/07/touching-and-gesturing-on-iphone-android-and-more/

// To deploy: ./deploy.sh

DEBUG = true;

function debug(arg) {
  DEBUG && console.log(arg);
}

$(function() {

  $song = false;

  // Load from localStorage if possible
  if (localStorage['currentSong']) {
    $song = Song.open(localStorage['currentSong']);
  }

  // If we still haven't loaded a song, just pick one
  if (!$song) {
    for (var key in localStorage) {
      if (key.indexOf('Song') === 0) {
        $song = Song.open(key);
        break;
      }
    }
  }

  // If no saved songs found, load from fixture data
  if (!$song) {
    $song = loadFixtures();
  }

  $song.save();

  $song.renderInto('.chart-wrapper');
  $song.renderTitleInto('.song-title');
  $song.renderFavKeysInto('.fav-keys-group');

  // Prevent elastic scrolling
  $('body').on('touchmove', function(e) {
    return false;
  });

  // TODO(nirav) refactor all of the below into a Toolbar.js

  $('.fav-keys-group').on('click touchend', 'button', function(e) {

    // Set the key on the song object
    $song.setKey(parseInt($(this).data('key')));

    // Update classes to highlight the right button
    $(this)
      .addClass('btn-info')
      .siblings('.btn')
      .removeClass('btn-info');

    // Save 'n render
    $song.save();
    $song.renderInto('.chart-wrapper');
  });

  $('.song-library-btn').on('click touchend', function(e) {
    SongLibrary.open();
    return false;
  });

  $('.song-details-btn').on('click touchend', function(e) {
    SongDetails.open();
    return false;
  });

  $('.add-row-btn').on('click touchend', function(e) {
    $song.addRow();
    $song.save();
    $song.renderInto('.chart-wrapper');
    return false;
  });

  $('.delete-last-row-btn').on('click touchend', function(e) {
    $song.deleteLastRow();
    $song.save();
    $song.renderInto('.chart-wrapper');
    return false;
  });

  $('.chart-wrapper').on('mousedown touchstart', 'td', function(e) {
    var $cell = $(this);
    $cell.addClass('editing');
    return false;
  });

  $('.chart-wrapper').on('click touchend', 'td', function(e) {
    var $cell = $(this);
    var deselect = function() {
      $cell.animate(
        {
          backgroundColor: '#f5f5f5',
          color: '#333'
        },
        350, // Duration
        function() {

          // Remove inline styles to return control to the stylesheet
          $(this).css({
            backgroundColor: '',
            color: ''
          });

          $(this).removeClass('editing');
        }
      );
    };
    var success = function(newChord) {
      newChord.renderInto($cell);
      deselect();
    };
    var failure = function() {
      deselect();
    };
    ChordEditor.edit($song.getChordFromCell($cell), success, failure);
    return false;
  });

});