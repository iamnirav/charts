// Chart.js for Chart objects
// Requires notes.js

function Chart(options) {
  this._chart = options.chart || [];
  this.key    = options.key   || 0; // C
  this.title  = options.title || "Enter a title...";
}

// Rows and cols are 0-indexed
Chart.prototype.addChord = function(row, col, interval, quality, add) {

  // Add empty rows to accomodate the new chord if necessary
  while (row > this._chart.length - 1) {
    this._chart.push([]);
  }

  // Add simile cells to accomodate the new chord if necessary
  while (col > this._chart[row].length - 1) {
    this._chart[row].push(new Chord(this, -1));
  }

  // Create new Chord object and add to chart at the right place
  this._chart[row][col] = new Chord(this, interval, quality, add);
};

Chart.prototype.renderInto = function(selector) {
  $table = $('<table>').addClass('table table-bordered chart');
  $.each(this._chart, function(i, row) {
    var $row = $('<tr>');
    $.each(row, function(j, chord) {
      $('<td>')
        .html(chord.toString())
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
    chart : this._chart,
    key   : this.key,
    title : this.title
  };
};

// interval:   -1|0|1|2|...
// quality:    -2|-1|0|1 (dim|min|maj|aug)
// add:        0|2|6|7|9|...
function Chord(chart, interval, quality, add) {
  this.chart      = chart;
  this.simile     = interval === -1;
  this.interval   = interval   || 0;
  this.quality    = quality    || 0;
  this.add        = add        || 0;
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
