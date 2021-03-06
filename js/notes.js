// Functions to help store notes
// http://en.wikipedia.org/wiki/Pitch_class#Integer_notation
// Flat sign: &#9837;
// Sharp sign: &#9839;

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
  0 : ['c'],
  1 : ['d&#9837;', 'c&#9839;'],
  2 : ['d'],
  3 : ['e&#9837;', 'd&#9839;'],
  4 : ['e'],
  5 : ['f'],
  6 : ['g&#9837;', 'f&#9839;'],
  7 : ['g'],
  8 : ['a&#9837;', 'g&#9839;'],
  9 : ['a'],
  10: ['b&#9837;', 'a&#9839;'],
  11: ['b']
}

var _sharpKeys = [0, 2, 4, 7, 9, 11],
     _flatKeys = [1, 3, 5, 6, 8, 10];

// Translates a pitch into its numeral
function pitchToNumeral(pitch) {
  return (pitch && pitch.toLowerCase) ? _letterToNumeral[pitch.toLowerCase()] : undefined;
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

  // Interval can be undefined if you just want a pitch
  interval = interval || 0;

  // Add interval to key
  var note = parseInt(key) + parseInt(interval);

  // Look up the actual pitch
  var letterOpts = _numeralToLetter[note > 11 ? note - 12 : note];

  // Return the correct version of the pitch based on the key
  return letterOpts.length > 1 && hasSharps(key) ? letterOpts[1] : letterOpts[0];
}

function hasSharps(key) {
  return _sharpKeys.indexOf(key) >= 0;
}
