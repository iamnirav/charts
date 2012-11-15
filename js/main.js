// http://matt.might.net/articles/how-to-native-iphone-ipad-apps-in-javascript/
// http://www.sitepen.com/blog/2011/12/07/touching-and-gesturing-on-iphone-android-and-more/
// To deploy: ./deploy.sh

$(function() {

  fixtures();

  // Prevent elastic scrolling
  $('body').on('touchmove', function(e) {
    return false;
  });

  $('.transpose-down-btn').on('click touchend', function(e) {
    $chart.setKey($chart.key - 1);
    $chart.renderInto('.chart-wrapper');
    return false;
  });

  $('.transpose-up-btn').on('click touchend', function(e) {
    $chart.setKey($chart.key + 1);
    $chart.renderInto('.chart-wrapper');
    return false;
  });

  $('.chart-library-btn').on('click touchend', function(e) {
    $('#chart-library-modal').modal();
    return false;
  });

  $('.chart-wrapper').on('mousedown touchstart', function(e) {
    var $cell = $(e.target);
    $cell.addClass('editing');
    return false;
  });

  $('.chart-wrapper').on('click touchend', function(e) {
    var $cell = $(e.target);
    var deselect = function() {
      $cell.animate(
        {
          backgroundColor: '#f5f5f5',
          color: '#333'
        },
        200, // Duration
        function() {

          // Remove inline styles to return control to the stylesheet
          $(this).css({
            backgroundColor: '',
            color: ''
          });

          $(this).removeClass('editing');
        }
      );
    };
    var success = function(newChord) {
      newChord.renderInto($cell);
      deselect();
    };
    var failure = function() {
      deselect();
    };
    ChordEditor.edit($chart.getChordFromCell($cell), success, failure);
    return false;
  });

});