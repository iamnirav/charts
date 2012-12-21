// Song Details modal

// Global variable on purpose
SongDetails = {

  $node: $('#song-details-modal'),

  $find: function(selector) {
    return this.$node.find(selector);
  },

  open: function(forceLoad) {
    this.$node.modal('show');
  },

  close: function() {
    this.$node.modal('hide');
  }

};

// Bind to events

SongDetails.$find('.modal-footer .close-btn').on('click touchend', function(e) {
  SongDetails.close();
  return false;
});

SongDetails.$find('.modal-footer .btn-primary').on('click touchend', function(e) {
  // save any changes
  SongDetails.close();
  return false;
});
