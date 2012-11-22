// Models
// - Chart
// - Chord
// Requires notes.js

// CONSTRUCTOR

function Song(options) {
  options    = options || {};
  this.chart = [];
  this.key   = options.key || 0; // C
  this.title = options.title || "Enter a title...";

  options.chart && this.reviveChart(options.chart);
}

// CLASS METHODS

Song.open = function() {

  // revive saved charts
  var reviver = function(key, value) {
    return (key === 'Song') ? (new Song(value)) : value;
  };

  var parsed = JSON.parse(localStorage.song, reviver);
  debug('Loaded song from localStorage');
  return parsed.Song;
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
    this.chart[row].push(new Chord(this, -1));
  }

  // Create new Chord object and add to chart at the right place
  this.chart[row][col] = new Chord(this, options);
};

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

Song.prototype.setKey = function(key) {
  if (key < 0) {
    key += 12;
  } else if (key > 11) {
    key -= 12;
  }
  this.key = key;
};

Song.prototype.toJSON = function() {
  return {
    chart : this.chart,
    key   : this.key,
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
  localStorage.song = JSON.stringify({Song: this});
  debug('Saved song to localStorage');
};

// options:
//   interval:   0|1|2|...
//   quality:    -2|-1|0|1 (dim|min|maj|aug)
//   add:        0|2|6|7|9|...
function Chord(song, options) {
  this.song = song;
  if (options && !options.simile) {
    this.interval = options.interval || 0;
    this.quality  = options.quality  || 0;
    this.add      = options.add      || 0;
  } else {
    this.simile = true;
  }
}

Chord.prototype.toString = function() {
  if (this.simile) {
    return '%';
  } else {
    return intervalToPitch(this.song.key, this.interval).toUpperCase() +
           (this.quality    === -1 ? '&ndash;' : '') +
           (this.quality    === -2 ? '&deg;'  : '') +
           (this.quality    ===  1 ? '+'      : '') +
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