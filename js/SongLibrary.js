// Song Library modal

// Global variable on purpose
SongLibrary = {

  $node: $('#song-library-modal'),

  songs: [],

  isDirty: true,

  cancellable: true,

  $find: function(selector) {
    return this.$node.find(selector);
  },

  select: function(selector) {
    this.$find(selector)
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
      return song1.title.toLowerCase() > song2.title.toLowerCase() ? 1 : -1;
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
          .append('<td>' + value.letterKeys().join(', ') + '</td>')
          .appendTo(that.$find('.song-list tbody'));
      });
      this.isDirty = false;
    }

    if ($song) {
      this.select('tr[data-id="' + $song.id + '"]');
    }

    // You can only cancel if there's an existing song
    this.cancellable = !!$song;
    this.$find('.modal-footer .close-btn').toggleClass('disabled', !this.cancellable);

    this.$node.modal({
      show: true,
      backdrop: 'static'
    });
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
  if (SongLibrary.cancellable) {
    SongLibrary.close();
  }
  return false;
});

SongLibrary.$find('.modal-footer .btn-primary').on('click touchend', function(e) {

  // Grab the selected element
  var $selected = SongLibrary.$find('.song-list tbody tr.selected');

  // Open the song if it exists; otherwise create it
  if ($selected.data('id')) {
    $song = Song.open($selected.data('id'));
  } else {
    var newTitle = $selected.find('.song-title').val();
    var newKey = pitchToNumeral($selected.find('.song-key').val());
    if (newTitle.length === 0 || newKey === undefined) {
      return false;
    }
    $song = new Song({title:newTitle,key:newKey});
  }

  // Open song
  $song.renderInto('.chart-wrapper');
  $song.renderTitleInto('.song-title');
  $song.renderFavKeysInto('.fav-keys-group');
  $song.save();

  SongLibrary.close();

  // Clear the new song input fields
  $selected.find('.song-title, .song-key').val('');

  return false;
});
