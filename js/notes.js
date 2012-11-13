// Functions to help store notes
// http://en.wikipedia.org/wiki/Pitch_class#Integer_notation
// Flat sign: &#9837;

var _letterToNumeral = {
  'c' : 0,
  'c#': 1,
  'db': 1,
  'd' : 2,
  'd#': 3,
  'eb': 3,
  'e' : 4,
  'e#': 5,
  'fb': 4,
  'f' : 5,
  'f#': 6,
  'gb': 6,
  'g' : 7,
  'g#': 8,
  'ab': 8,
  'a' : 9,
  'a#': 10,
  'bb': 10,
  'b' : 11,
  'b#': 0,
  'cb': 11
}

var _numeralToLetter = {
  0 : ['c', 'b&#9839;'],
  1 : ['d&#9837;', 'c&#9839;'],
  2 : ['d'],
  3 : ['e&#9837;', 'd&#9839;'],
  4 : ['e', 'f&#9837;'],
  5 : ['f', 'e'],
  6 : ['g&#9837;', 'f&#9839;'],
  7 : ['g'],
  8 : ['a&#9837;', 'g&#9839;'],
  9 : ['a'],
  10: ['b&#9837;', 'a&#9839;'],
  11: ['b', 'c&#9837;']
}

// Translates a pitch into its numeral
function getPitchNumeral(pitch) {
  return _letterToNumeral(pitch.toLowerCase());
}

// Takes a key and a pitch (e.g., C, G) and returns a semitone interval (7)
function pitchToInterval(key, pitch) {

  // Find out the difference between the pitch and the key (might be negative)
  var diff = _letterToNumeral[pitch.toLowerCase()] - _letterToNumeral[key.toLowerCase()];

  // Correct for negative diffs and return
  return (diff < 0 ? diff + 12 : diff);
}

// Takes a key numeral and a semitone interval (i.e., 4, 4) and returns a letter pitch (E)
function intervalToPitch(key, interval) {

  // Add interval to key
  var note = key + interval;

  // Look up the actual pitch
  // TODO: intelligently figure out which version of the pitch to use
  return _numeralToLetter[note > 11 ? note - 12 : note][0];
}

