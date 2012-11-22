function loadFixtures() {

  var $song = new Song({title:"After You've Gone"});

  $song.addChord(0, 0, {interval:0,quality:0,add:6});
  $song.addChord(0, 1);
  $song.addChord(0, 2, {interval:0,quality:-1,add:6});
  $song.addChord(0, 3);
  $song.addChord(0, 4, {interval:7,quality:0,add:6});
  $song.addChord(0, 5);
  $song.addChord(0, 6, {interval:4,quality:0,add:7});
  $song.addChord(0, 7);

  $song.addChord(1, 0, {interval:9,quality:0,add:7});
  $song.addChord(1, 1);
  $song.addChord(1, 2, {interval:2,quality:0,add:7});
  $song.addChord(1, 3);
  $song.addChord(1, 4, {interval:7,quality:0,add:6});
  $song.addChord(1, 5);
  $song.addChord(1, 6, {interval:7,quality:0,add:7});
  $song.addChord(1, 7);

  $song.addChord(2, 0, {interval:0,quality:0,add:6});
  $song.addChord(2, 1);
  $song.addChord(2, 2, {interval:0,quality:-1,add:6});
  $song.addChord(2, 3);
  $song.addChord(2, 4, {interval:7,quality:0,add:6});
  $song.addChord(2, 5);
  $song.addChord(2, 6, {interval:4,quality:0,add:7});
  $song.addChord(2, 7);

  $song.addChord(3, 0, {interval:9,quality:-1,add:6});
  $song.addChord(3, 1, {interval:4,quality:0,add:7});
  $song.addChord(3, 2, {interval:9,quality:-1,add:6});
  $song.addChord(3, 3, {interval:0,quality:-1,add:6});
  $song.addChord(3, 4, {interval:7,quality:0,add:6});
  $song.addChord(3, 5, 11, 0, 7);
  $song.addChord(3, 6, {interval:4,quality:-1,add:6});
  $song.addChord(3, 7, {interval:4,quality:-2,add:0});

  $song.addChord(4, 0, {interval:7,quality:0,add:6});
  $song.addChord(4, 1);
  $song.addChord(4, 2, {interval:9,quality:-1,add:7});
  $song.addChord(4, 3, {interval:2,quality:0,add:7});
  $song.addChord(4, 4, {interval:7,quality:0,add:6});
  $song.addChord(4, 5);
  $song.addChord(4, 6);
  $song.addChord(4, 7, {interval:7,quality:0,add:7});

  debug("Loaded song from fixture data");

  return $song;

}