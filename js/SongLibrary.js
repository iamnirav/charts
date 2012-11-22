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
      .siblings('tr')
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
      this.$find('.song-list tbody').empty();
      var that = this;
      $.each(this.songs, function(index, value) {
        $('<tr>')
          .append('<td>' + value.title + '</td>')
          .append('<td>' + value.letterKey() + '</td>')
          .appendTo(that.$find('.song-list tbody'));
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

SongLibrary.$find('.song-list tbody').on('mousedown touchstart', 'tr', function(e) {
  SongLibrary.select(this);
  return false
});

SongLibrary.$find('.modal-footer .new-song-btn').on('click touchend', function(e) {
  SongLibrary.close();
  return false;
});

SongLibrary.$find('.modal-footer .close-btn').on('click touchend', function(e) {
  SongLibrary.close();
  return false;
});

SongLibrary.$find('.modal-footer .btn-primary').on('click touchend', function(e) {
  // TODO(nirav) open the new song
  SongLibrary.close();
  return false;
});
