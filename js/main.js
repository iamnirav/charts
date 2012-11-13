// http://matt.might.net/articles/how-to-native-iphone-ipad-apps-in-javascript/

$(function() {

  fixtures();

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