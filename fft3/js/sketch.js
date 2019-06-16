var soundFile;
var amplitude;

var backgroundColor;

var rectRotate = true;
var rectMin = 15;
var rectOffset = 20;
var numRects = 10;

var beatHoldFrames = 30;

var beatThreshold = 0.11; 

var beatCutoff = 0;
var beatDecayRate = 0.98; // how fast does beat cutoff decay?
var framesSinceLastBeat = 0; // once this equals beatHoldFrames, beatCutoff starts to decay.


function preload() { 
  console.log('start prelaod')
  soundFile = loadSound('music/beat.mp3');
  console.log('end prelaod')
}

function setup() {
  console.log('start setup')
  c = createCanvas(windowWidth, windowHeight);
  noStroke();
  rectMode(CENTER);
  colorMode(HSL, 360, 100, 100, 100)
  background(100)
  backgroundColor = color( random(0,255), random(0,255), random(0,255) );

  // amplitude = new p5.Amplitude();

  soundFile.play();

  // amplitude.setInput(soundFile);
  // amplitude.smooth(0.9);

  console.log('end setup')
}

function draw() {
  console.log('test')
  background(backgroundColor);

  // var level = amplitude.getLevel();
  var level = 0.2
  detectBeat(level);

  // distort the rectangle based based on the amp
  var distortDiam = map(level, 0, 1, 0, 1200);
  var w = rectMin;
  var h = rectMin;

  // distortion direction shifts each beat
  if (rectRotate) {
    var rotation = PI/ 2;
  } else {
    var rotation = PI/ 3;
  }

  // rotate the drawing coordinates to rectCenter position
  var rectCenter = createVector(width/3, height/2);

  push();

    // draw the rectangles
    for (var i = 0; i < numRects; i++) {
      var x = rectCenter.x + rectOffset * i;
      var y = rectCenter.y + distortDiam/2;
      // rotate around the center of this rectangle
      translate(x, y); 
      rotate(rotation);
      rect(0, 0, rectMin, rectMin + distortDiam);
    }
  pop();
}

function detectBeat(level) {
  if (level  > beatCutoff && level > beatThreshold){
    onBeat();
    beatCutoff = level *1.2;
    framesSinceLastBeat = 0;
  } else{
    if (framesSinceLastBeat <= beatHoldFrames){
      framesSinceLastBeat ++;
    }
    else{
      beatCutoff *= beatDecayRate;
      beatCutoff = Math.max(beatCutoff, beatThreshold);
    }
  }
}

function onBeat() {
  backgroundColor = color( random(0,255), random(0,255), random(0,255) );
  rectRotate = !rectRotate;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}