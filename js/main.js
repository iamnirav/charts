// http://matt.might.net/articles/how-to-native-iphone-ipad-apps-in-javascript/
// http://www.sitepen.com/blog/2011/12/07/touching-and-gesturing-on-iphone-android-and-more/

// To deploy: ./deploy.sh

DEBUG = true;

function debug(arg) {
  DEBUG && console.log(arg);
}

$(function() {

  var $song = false;
  for (var key in localStorage) {
    if (key.indexOf('Song') === 0) {
      $song = Song.open(key);
      break;
    }
  }

  // If no saved songs found, load from fixture data
  if (!$song) {
    $song = loadFixtures();
  }

  $song.save();

  $song.renderInto('.chart-wrapper');
  $song.renderTitleInto('.song-title');

  // Prevent elastic scrolling
  $('body').on('touchmove', function(e) {
    return false;
  });

  // TODO(nirav) refactor all of the below into a Toolbar.js

  $('.transpose-down-btn').on('click touchend', function(e) {
    $song.setKey($song.key - 1);
    $song.renderInto('.chart-wrapper');
    return false;
  });

  $('.transpose-up-btn').on('click touchend', function(e) {
    $song.setKey($song.key + 1);
    $song.renderInto('.chart-wrapper');
    return false;
  });

  $('.song-library-btn').on('click touchend', function(e) {
    SongLibrary.open();
    return false;
  });

  $('.chart-wrapper').on('mousedown touchstart', function(e) {
    var $cell = $(e.target);
    $cell.addClass('editing');
    return false;
  });

  $('.chart-wrapper').on('click touchend', function(e) {
    var $cell = $(e.target);
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