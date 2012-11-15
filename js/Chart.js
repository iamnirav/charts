// Chart.js for Chart objects
// Requires notes.js

function Chart(options) {
  options = options || {};
  this._chart = [];
  this.key    = options.key   || 0; // C
  this.title  = options.title || "Enter a title...";

  if (options.rawChart) {
    this.reviveChart(options.rawChart);
  }
}

// Rows and cols are 0-indexed
Chart.prototype.addChord = function(row, col, options) {

  // Add empty rows to accomodate the new chord if necessary
  while (row > this._chart.length - 1) {
    this._chart.push([]);
  }

  // Add simile cells to accomodate the new chord if necessary
  while (col > this._chart[row].length - 1) {
    this._chart[row].push(new Chord(this, -1));
  }

  // Create new Chord object and add to chart at the right place
  this._chart[row][col] = new Chord(this, options);
};

Chart.prototype.getChord = function(row, col) {
  if (row < this._chart.length && col < this._chart[row].length) {
    return this._chart[row][col];
  }
};

Chart.prototype.getChordFromCell = function($cell) {
  return this.getChord($cell.data('row'), $cell.data('col'));
};

Chart.prototype.renderInto = function(selector) {
  $table = $('<table>').addClass('table table-bordered chart');
  $.each(this._chart, function(i, row) {
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

Chart.prototype.renderTitleInto = function(selector) {
  $(selector).html(this.title);
};

Chart.prototype.setKey = function(key) {
  if (key < 0) {
    key += 12;
  } else if (key > 11) {
    key -= 12;
  }
  this.key = key;
};

Chart.prototype.toJSON = function() {
  return {
    rawChart : this._chart,
    key      : this.key,
    title    : this.title
  };
};

Chart.prototype.reviveChart = function(rawChart) {
  var that = this;
  $.each(rawChart, function(i, row) {
    that._chart.push([]);
    $.each(row, function(j, rawChord) {
      that._chart[i].push(new Chord(that, rawChord));
    });
  });
};

// options:
//   interval:   0|1|2|...
//   quality:    -2|-1|0|1 (dim|min|maj|aug)
//   add:        0|2|6|7|9|...
function Chord(chart, options) {
  this.chart = chart;
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
    return intervalToPitch(this.chart.key, this.interval).toUpperCase() +
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