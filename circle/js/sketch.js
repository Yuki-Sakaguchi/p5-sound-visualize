let mic

function setup () {
  createCanvas(window.innerWidth, window.innerHeight)
  background(255)
  noStroke()
  fill(255)
  frameRate(30)

  mic = new p5.AudioIn()
  mic.start()
}

function draw () {
  background(255)
  let vol = mic.getLevel()
  let size = vol * 1000
  console.log(vol)
  push()
  fill(0)
  ellipse(width/2, height/2, size, size)
  pop()
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight)
}