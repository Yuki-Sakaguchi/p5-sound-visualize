let mic, fft;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  colorMode(HSL, 360, 100, 100, 100)
  mic = new p5.AudioIn()
  mic.start()
  fft = new p5.FFT()
  fft.setInput(mic)
}

function draw() {
  background(250)

  let spectrum = fft.analyze();
  console.log(spectrum)
  beginShape()
  for (let i = 0; i < spectrum.length; i++) {
    vertex(i, map(spectrum[i], 0, 255, height, 0))
  }
  endShape()
}
