// Functions to help move notes around

var letterToOrdinal = {
  'a' : 1,
  'a#': 2,
  'bb': 2,
  'b' : 3,
  'b#': 4,
  'cb': 3,
  'c' : 4,
  'c#': 5,
  'db': 5,
  'd' : 6,
  'd#': 7,
  'eb': 7,
  'e' : 8,
  'e#': 9,
  'fb': 8,
  'f' : 9,
  'f#': 10,
  'gb': 10,
  'g' : 11,
  'g#': 12,
  'ab': 12
}

var ordinalToLetter = {
  1 : ['a'],
  2 : ['a#', 'bb'],
  3 : ['b', 'cb'],
  4 : ['b#', 'c'],
  5 : ['c#', 'db'],
  6 : ['d'],
  7 : ['d#', 'eb'],
  8 : ['e', 'fb'],
  9 : ['e#', 'f'],
  10: ['f#', 'gb'],
  11: ['g'],
  12: ['g#', 'ab']
}

// Takes a key and a note (i.e., C, G) and returns a half step interval (7)
function noteToInterval(key, note) {

  // Find out the difference between the note and the key (might be negative)
  var diff = letterToOrdinal[note.toLowerCase()] - letterToOrdinal[key.toLowerCase()];

  // Correct for negative diffs and return
  return (diff < 0 ? diff + 12 : diff);
}

// Takes a key id and an interval id (i.e., 4, 4) and returns a note (E)
function intervalToNote(keyId, intervalId) {

  // Add interval to key
  var note = keyId + intervalId;

  // Look up the actual chord
  return ordinalToLetter[note > 12 ? note - 12 : note][0];
}

