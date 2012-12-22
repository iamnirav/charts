// Song Details modal

// Global variable on purpose
SongDetails = {

  $node: $('#song-details-modal'),

  $find: function(selector) {
    return this.$node.find(selector);
  },

  open: function() {

    // TODO(nirav) maybe refactor into some other method?
    this.$find('h3').html($song.title);

    // Clear previously selected keys
    this.$find('.option[data-key]').removeClass('selected');

    // Select favorite keys
    var that = this;
    $.each($song.favKeys, function(index, value) {
      that.$find('.option[data-key="' + value + '"]').addClass('selected');
    });

    this.$node.modal('show');
  },

  close: function() {
    this.$node.modal('hide');
  },

  save: function() {
    $song.favKeys = this.$find('.option.selected[data-key]')
      .map(function() { return parseInt($(this).data('key')); })
      .get();

    $song.save();
  },

  toggleSelect: function(selector) {
    var $target = $(selector);

    // Don't deselect if nothing else is selected
    if ($target.hasClass('selected') && $target.siblings('.option.selected').length === 0) {
      return false;
    }

    $target.toggleClass('selected');
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
    this.cancelDelete(); // re-hide the "really delete" button
    SongLibrary.open();
  }

};

// Bind to events

// Select
SongDetails.$find('.option').on('click touchend', function(e) {
  SongDetails.toggleSelect(this);
  return false;
});

// Cancel
SongDetails.$find('.modal-footer .close-btn').on('click touchend', function(e) {
  SongDetails.close();
  return false;
});

// Save
SongDetails.$find('.modal-footer .btn-primary').on('click touchend', function(e) {
  SongDetails.save();
  $song.renderFavKeysInto('.fav-keys-group');
  SongDetails.close();
  return false;
});

// Confirm delete
SongDetails.$find('.modal-footer .confirm-delete-btn').on('click touchend', function(e) {
  SongDetails.confirmDelete();
  return false;
});

// Cancel delete
SongDetails.$find('.modal-footer .cancel-delete-btn').on('click touchend', function(e) {
  SongDetails.cancelDelete();
  return false;
});

// Really delete
SongDetails.$find('.modal-footer .really-delete-btn').on('click touchend', function(e) {
  SongDetails.reallyDelete();
  return false;
});
