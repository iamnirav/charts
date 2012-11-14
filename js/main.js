// http://matt.might.net/articles/how-to-native-iphone-ipad-apps-in-javascript/
// http://www.sitepen.com/blog/2011/12/07/touching-and-gesturing-on-iphone-android-and-more/
// To deploy: ./deploy.sh

$(function() {

  fixtures();

  // Prevent elastic scrolling
  $('body').on('touchmove', function(e) {
    return false;
  });

  $('.transpose-down').on('click touchend', function(e) {
    $chart.setKey($chart.key - 1);
    $chart.renderInto('.chart-wrapper');
    return false;
  });

  $('.transpose-up').on('click touchend', function(e) {
    $chart.setKey($chart.key + 1);
    $chart.renderInto('.chart-wrapper');
    return false;
  });

  $('.chart-library').on('click touchend', function(e) {
    $('#chart-library-modal').modal();
    return false;
  });

  $('.chart-wrapper').on('click touchend', function(e) {
    $(e.target).addClass('editing');
    $('#chord-editor-modal').modal();
    return false;
  });

});