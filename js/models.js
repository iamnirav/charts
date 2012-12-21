// Models
// - Chart
// - Chord
// Requires notes.js

// CONSTRUCTOR

function Song(options) {
  options    = options       || {};
  this.id    = options.id    || Song.generateId();
  this.key   = options.key   || 0; // C
  this.title = options.title || "Enter a title...";
  this.chart = [];

  options.chart && this.reviveChart(options.chart);
}

// CLASS METHODS

Song.open = function(id) {

  if (!localStorage[id]) {
    debug('Error in Song.open: Tried to open a nonexistent song')
    return false;
  }

  // revive saved charts
  var reviver = function(key, value) {
    return (key === 'Song') ? (new Song(value)) : value;
  };

  var parsed = JSON.parse(localStorage[id], reviver);
  debug('Song.open: Loaded song ' + id + ' from localStorage');
  return parsed.Song;
};

Song.generateId = function() {

  // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
  var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });

  return 'Song:' + guid;
};

// INSTANCE METHODS

// Rows and cols are 0-indexed
Song.prototype.addChord = function(row, col, options) {

  // Add empty rows to accomodate the new chord if necessary
  while (row > this.chart.length - 1) {
    this.chart.push([]);
  }

  // Add simile cells to accomodate the new chord if necessary
  while (col > this.chart[row].length - 1) {
    this.chart[row].push(new Chord(this));
  }

  // Create new Chord object and add to chart at the right place
  this.chart[row][col] = new Chord(this, options);
};

Song.prototype.addRow = function() {
  this.addChord(this.chart.length, 7);
  // TODO(nirav) maybe render here?
};

// TODO(nirav) make a more general row deleter
Song.prototype.deleteLastRow = function() {
  if (this.chart.length) {
    this.chart.pop(); // TODO(nirav) how to properly remove?!?!
  }
}

Song.prototype.getChord = function(row, col) {
  if (row < this.chart.length && col < this.chart[row].length) {
    return this.chart[row][col];
  }
};

Song.prototype.getChordFromCell = function($cell) {
  return this.getChord($cell.data('row'), $cell.data('col'));
};

Song.prototype.renderInto = function(selector) {
  $table = $('<table>').addClass('table table-bordered chart');
  $.each(this.chart, function(i, row) {
    var $row = $('<tr>');
    $.each(row, function(j, chord) {
      $('<td>')
        .html(chord.toString())
        .attr({
          'data-row': i,
          'data-col': j
        })
        .appendTo($row);
    });
    $table.append($row);
  });
  $(selector).html($table);
};

Song.prototype.renderTitleInto = function(selector) {
  $(selector).html(this.title);
};

Song.prototype.renderKeyInto = function(selector) {
  $(selector).html(this.letterKey());
};

Song.prototype.setKey = function(key) {
  if (key < 0) {
    key += 12;
  } else if (key > 11) {
    key -= 12;
  }
  this.key = key;
};

Song.prototype.letterKey = function() {
  return intervalToPitch(this.key).toUpperCase();
};

Song.prototype.toJSON = function() {
  return {
    id    : this.id,
    key   : this.key,
    chart : this.chart,
    title : this.title
  };
};

Song.prototype.reviveChart = function(chart) {
  var that = this;
  $.each(chart, function(i, row) {
    that.chart.push([]);
    $.each(row, function(j, chord) {
      that.chart[i].push(new Chord(that, chord));
    });
  });
};

Song.prototype.save = function() {
  localStorage[this.id] = JSON.stringify({'Song': this});
  SongLibrary.isDirty = true;
  debug('Song.prototype.save: Saved song ' + this.id + ' to localStorage');
};

Song.prototype.delete = function() {
  delete localStorage[this.id];
  SongLibrary.isDirty = true;
  debug('Song.prototype.delete: Deleted song ' + this.id + ' from localStorage');
};

// options:
//   interval:   0|1|2|...
//   quality:    -2|-1|0|1 (dim|min|maj|aug)
//   add:        0|2|6|7|9|...
function Chord(song, options) {
  this.song = song;
  this.simile = !options || options.simile;

  options = options || {};

  this.interval = options.interval || 0;
  this.quality  = options.quality  || 0;
  this.add      = options.add      || 0;
}

Chord.prototype.toString = function() {
  if (this.simile) {
    return '%';
  } else {
    return intervalToPitch(this.song.key, this.interval).toUpperCase() +
           (this.quality === -1 ? '&ndash;' : '') +
           (this.quality === -2 ? '&deg;'   : '') +
           (this.quality ===  1 ? '+'       : '') +
           (this.add || '');
  }
};

Chord.prototype.renderInto = function(selector) {
  $(selector).html(this.toString());
};

Chord.prototype.toJSON = function() {
  return {
    interval : this.interval,
    quality  : this.quality,
    add      : this.add,
    simile   : this.simile
  };
};

Chord.prototype.save = function() {
  this.song.save();
};

Chord.prototype.getPitch = function() {

  // TODO(nirav) this functionality is duplicated in notes.js
  var note = this.song.key + this.interval;
  return note > 11 ? note - 12 : note;
};

Chord.prototype.setPitch = function(pitch) {

  // TODO(nirav) this functionality is duplicated in notes.js
  var diff = pitch - this.song.key;
  this.interval = diff < 0 ?  diff + 12 : diff;
};