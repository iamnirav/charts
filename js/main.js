// http://matt.might.net/articles/how-to-native-iphone-ipad-apps-in-javascript/
// http://www.sitepen.com/blog/2011/12/07/touching-and-gesturing-on-iphone-android-and-more/

$(function() {

  fixtures();

  // Prevent elastic scrolling
  $('body').on('touchmove', function(e) {
    e.preventDefault();
  });

  $('.transpose-down').click(function(e) {
    $chart.setKey($chart.key - 1);
    $('.chart').replaceWith($chart.render());
  });

  $('.transpose-up').click(function(e) {
    $chart.setKey($chart.key + 1);
    $('.chart').replaceWith($chart.render());
  });

  $('.chart-menu').click(function(e) {
    $('#chordEditor').modal();
  });

});