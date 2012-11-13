function fixtures() {

  $chart = new Chart();

  $chart.addChord(0, 0, 0, 0, 6);
  $chart.addChord(0, 1, -1);
  $chart.addChord(0, 2, 0, -1, 6);
  $chart.addChord(0, 3, -1);
  $chart.addChord(0, 4, 7, 0, 6);
  $chart.addChord(0, 5, -1);
  $chart.addChord(0, 6, 4, 0, 7);
  $chart.addChord(0, 7, -1);

  $chart.addChord(1, 0, 9, 0, 7);
  $chart.addChord(1, 1, -1);
  $chart.addChord(1, 2, 2, 0, 7);
  $chart.addChord(1, 3, -1);
  $chart.addChord(1, 4, 7, 0, 6);
  $chart.addChord(1, 5, -1);
  $chart.addChord(1, 6, 7, 0, 7);
  $chart.addChord(1, 7, -1);

  $chart.addChord(2, 0, 0, 0, 6);
  $chart.addChord(2, 1, -1);
  $chart.addChord(2, 2, 0, -1, 6);
  $chart.addChord(2, 3, -1);
  $chart.addChord(2, 4, 7, 0, 6);
  $chart.addChord(2, 5, -1);
  $chart.addChord(2, 6, 4, 0, 7);
  $chart.addChord(2, 7, -1);

  $chart.addChord(3, 0, 9, -1, 6);
  $chart.addChord(3, 1, 4, 0, 7);
  $chart.addChord(3, 2, 9, -1, 6);
  $chart.addChord(3, 3, 0, -1, 6);
  $chart.addChord(3, 4, 7, 0, 6);
  $chart.addChord(3, 5, 11, 0, 7);
  $chart.addChord(3, 6, 4, -1, 6);
  $chart.addChord(3, 7, 4, -2, 0);

  $chart.addChord(4, 0, 7, 0, 6);
  $chart.addChord(4, 1, -1);
  $chart.addChord(4, 2, 9, -1, 7);
  $chart.addChord(4, 3, 2, 0, 7);
  $chart.addChord(4, 4, 7, 0, 6);
  $chart.addChord(4, 5, -1);
  $chart.addChord(4, 6, -1);
  $chart.addChord(4, 7, 7, 0, 7);

  $chart.render().appendTo('.container');

}