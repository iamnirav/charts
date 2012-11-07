$(function() {
  var song = {
    key: 'g',
    chords: []
  };

  // note:       A|B|C|...
  // accidental: b|#|0
  // interval:   maj|min|aug|dim
  // factor:     1|6|7|9|...
  function addChord(note, accidental, interval, factor) {
    var chord = {
      note:       note,
      accidental: accidental,
      interval:   interval,
      factor:     factor
    };
    song.chords.push(chord);
  }

  function addRepeat() {
    song.chords.push({ repeat: true });
  }

  function chordToString(chord) {
    if (chord.repeat) {
      return '%';
    } else {
      return chord.note.toUpperCase() +
             (chord.accidental != '0' ? chord.accidental : '') +
             (chord.interval == 'min' ? '&ndash;' : '') +
             (chord.interval == 'aug' ? '+' : '') +
             (chord.interval == 'dim' ? '&deg;' : '') +
             (chord.factor != '1' ? chord.factor : '');
      }
  }

  function render() {
    $.each(song.chords, function(index ,chord) {
      $('.chart').append(
        $('<li>').html(chordToString(chord))
      );
    });
  }

  addChord('c', '0', 'maj', '6');
  addRepeat();
  addChord('c', '0', 'min', '6');
  addRepeat();
  addChord('g', '0', 'maj', '6');
  addRepeat();
  addChord('e', '0', 'maj', '7');
  addRepeat();

  render();

});