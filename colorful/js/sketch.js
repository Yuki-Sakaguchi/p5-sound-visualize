let mic
let bgColor = 255
let elSoundBtn = document.querySelector('.js-sound')

// クリックしてから動かす
elSoundBtn.addEventListener('click', () => {
  elSoundBtn.remove()
  mic = new p5.AudioIn()
  mic.start()
})

function setup () {
  createCanvas(window.innerWidth, window.innerHeight)
  colorMode(HSL, 360, 100, 100, 100)
  background(bgColor)
  noStroke()
  frameRate(30)
}

function draw () {
  // 初期化
  background(bgColor)

  // ボリューム取得
  if (mic) {
    let vol = mic.getLevel()
    let size = vol * 3000
    
    console.log(vol)
  
    if (vol > 0.01) {
      const particle = new Particle({
        x: random(0, width),
        y: random(0, height),
        size
      })
      particle.draw()
    }
  }
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight)
}

class Particle {
  constructor ({ x, y, size }) {
    this.x = x
    this.y = y
    this.life = 10
    this.size = size
  }
  draw () {
    push()
    fill(random(0, 360), 100, 50, 30)
    ellipse(this.x, this.y, this.size, this.size)
    pop()
  }
}