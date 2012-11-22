// Song Library modal

// Global variable on purpose
SongLibrary = {

  $node: $('#song-library-modal'),

  songs: [],

  isDirty: true,

  $find: function(selector) {
    return this.$node.find(selector);
  },

  select: function(selector) {
    $(selector)
      .addClass('selected')
      .siblings('.song-entry')
      .removeClass('selected');
  },

  load: function() {
    this.songs = [];
    for (var key in localStorage) {
      if (key.indexOf('Song') === 0) {
        this.songs.push(Song.open(key));
      }
    }
    this.songs.sort(function(song1, song2) {
      return song1.title > song2.title;
    });
  },

  open: function(forceLoad) {

    // Only load songs from localStorage and render if we need to
    if (this.isDirty || forceLoad) {
      this.load();
      this.$find('.song-list').empty();
      var that = this;
      $.each(this.songs, function(index, value) {
        $('<li>')
          .html(value.title)
          .appendTo(that.$find('.song-list'));
      });
      this.isDirty = false;
    }

    this.$node.modal('show');
  },

  close: function() {
    this.$node.modal('hide');
  }

};

// Bind to events

SongLibrary.$find('.song-entry').on('mousedown touchstart', function(e) {
  SongLibrary.select(e.target);
  return false
});

SongLibrary.$find('.modal-footer .btn-danger').on('click touchend', function(e) {
  SongLibrary.close();
  return false;
});

SongLibrary.$find('.modal-footer .btn-primary').on('click touchend', function(e) {
  // TODO(nirav) open the new song
  SongLibrary.close();
  return false;
});
