// Chord Editor modal

// Global variable on purpose
ChordEditor = {

  $node: $('#chord-editor-modal'),

  chord: undefined,

  $find: function(selector) {
    return this.$node.find(selector);
  },

  edit: function(chord, success, failure) {

    // Save state
    this.chord = chord;
    this.success = success;
    this.failure = failure;

    // Set up options based on chord
    this.$find('.chord-option').removeClass('selected');
    this.$find('.chord-option[data-interval="' + chord.interval + '"]').addClass('selected');
    this.$find('.chord-option[data-quality="' + chord.quality + '"]').addClass('selected');
    this.$find('.chord-option[data-add="' + chord.add + '"]').addClass('selected');

    this.open();
  },

  select: function(selector) {
    $(selector)
      .addClass('selected')
      .siblings('.chord-option')
      .removeClass('selected');
  },

  save: function() {

    // save to chord object
    this.chord.interval = this.$find('.chord-option[data-interval].selected').data('interval');
    this.chord.quality = this.$find('.chord-option[data-quality].selected').data('quality');
    this.chord.add = this.$find('.chord-option[data-add].selected').data('add');
    this.chord.save(); // Anything else the chord needs to do
  },

  open: function() {
    this.$node.modal('show');
  },

  close: function() {
    this.$node.modal('hide');
  }

};

// Bind to events

ChordEditor.$find('.chord-option').on('mousedown touchstart', function(e) {
  ChordEditor.select(e.target);
  return false
});

ChordEditor.$find('.modal-footer .btn-danger').on('click touchend', function(e) {
  ChordEditor.close();
  ChordEditor.failure();
  return false;
});

ChordEditor.$find('.modal-footer .btn-primary').on('click touchend', function(e) {
  ChordEditor.save();
  ChordEditor.close();
  ChordEditor.success(ChordEditor.chord);
  return false;
});
