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
      this.$find('.song-list tbody tr').not('.new-song-row').remove();
      var that = this;
      $.each(this.songs, function(index, value) {
        $('<tr>')
          .attr('data-id', value.id)
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
});

SongLibrary.$find('.modal-footer .close-btn').on('click touchend', function(e) {
  SongLibrary.close();
  return false;
});

SongLibrary.$find('.modal-footer .btn-primary').on('click touchend', function(e) {
  var $selected = SongLibrary.$find('.song-list tbody tr.selected');
  var tmpSong = Song.open($selected.data('id'));
  if (!tmpSong) {
    var newTitle = $selected.find('.song-title').val();
    var newKey   = parseInt($selected.find('.song-key').val());
    tmpSong = new Song({title:newTitle,key:newKey});
  }
  $song = tmpSong;
  $song.renderInto('.chart-wrapper');
  $song.renderTitleInto('.song-title');
  $song.renderKeyInto('.transpose-key-btn');
  $song.save();
  SongLibrary.close();
  return false;
});
