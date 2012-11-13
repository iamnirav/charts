// http://matt.might.net/articles/how-to-native-iphone-ipad-apps-in-javascript/

$(function() {

  function render() {
    $.each(song.chords, function(index ,chord) {
      $('.container').append(
        $('<p>').html(chordToString(chord))
      );
    });
  }

});