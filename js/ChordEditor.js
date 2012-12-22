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
    this.$find('.option').removeClass('selected');
    this.$find('.option[data-type="' + (chord.simile ? 0 : 1) + '"]').addClass('selected');
    this.$find('.option[data-pitch="' + chord.getPitch() + '"]').addClass('selected');
    this.$find('.option[data-quality="' + chord.quality + '"]').addClass('selected');
    this.$find('.option[data-add="' + chord.add + '"]').addClass('selected');

    this.open();
  },

  select: function(selector) {
    $(selector)
      .addClass('selected')
      .siblings('.option')
      .removeClass('selected');
  },

  save: function() {

    // save to chord object
    this.chord.simile = !parseInt(this.$find('.option[data-type].selected').data('type'));
    this.chord.setPitch(parseInt(this.$find('.option[data-pitch].selected').data('pitch')));
    this.chord.quality = parseInt(this.$find('.option[data-quality].selected').data('quality'));
    this.chord.add = parseInt(this.$find('.option[data-add].selected').data('add'));

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

ChordEditor.$find('.option').on('mousedown touchstart', function(e) {

  // Turn off simile bar if you're editing anything else
  if (!$(this).is('[data-type]')) {
    ChordEditor.select('.option[data-type="1"]');
  }

  ChordEditor.select($(this));
  return false;
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
