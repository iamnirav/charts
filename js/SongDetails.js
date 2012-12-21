// Song Details modal

// Global variable on purpose
SongDetails = {

  $node: $('#song-details-modal'),

  $find: function(selector) {
    return this.$node.find(selector);
  },

  open: function() {
    this.$find('h3').html($song.title);
    this.$node.modal('show');
  },

  close: function() {
    this.$node.modal('hide');
  },

  confirmDelete: function() {
    this.$find('.confirm-delete-btn').addClass('hide');
    this.$find('.delete-confirmation').removeClass('hide');
  },

  cancelDelete: function() {
    this.$find('.confirm-delete-btn').removeClass('hide');
    this.$find('.delete-confirmation').addClass('hide');
  },

  reallyDelete: function() {
    $song.delete();
    $song = undefined; // bye bye
    $('.chart-wrapper, .song-title, .transpose-key-btn').empty();
    this.close();
    SongLibrary.open();
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

SongDetails.$find('.modal-footer .confirm-delete-btn').on('click touchend', function(e) {
  SongDetails.confirmDelete();
  return false;
});

SongDetails.$find('.modal-footer .cancel-delete-btn').on('click touchend', function(e) {
  SongDetails.cancelDelete();
  return false;
});

SongDetails.$find('.modal-footer .really-delete-btn').on('click touchend', function(e) {
  SongDetails.reallyDelete();
  return false;
});
