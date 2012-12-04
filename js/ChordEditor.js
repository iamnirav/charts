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
    this.$find('.chord-option[data-pitch="' + chord.getPitch() + '"]').addClass('selected');
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
    this.chord.setPitch(this.$find('.chord-option[data-pitch].selected').data('pitch'));
    this.chord.quality = this.$find('.chord-option[data-quality].selected').data('quality');
    this.chord.add = this.$find('.chord-option[data-add].selected').data('add');

    // TODO(nirav) make this render the new chord too!
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

ChordEditor.$find('.modal-footer .close-btn').on('click touchend', function(e) {
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
