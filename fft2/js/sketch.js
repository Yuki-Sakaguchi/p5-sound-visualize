let mic, fft, w, s;

function setup() {
  s = 64
  createCanvas(1000, 800)
  colorMode(HSB)
  noFill()
  mic = new p5.AudioIn()
  mic.start()
  fft = new p5.FFT(0.9, s)
  fft.setInput(mic)
  w = width / s
}

function draw() {
  background(0)
  noStroke()
  let spectrum = fft.analyze()

  for (let i = 0; i < spectrum.length; i++) {
    let amp = spectrum[i]
    let y = map(amp, 0, 255, height, 0)
    fill(i * 5, 255, 255)
    rect(i * w, y, w - 5, height - y)
  }
}
