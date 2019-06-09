
let mic
let elSoundBtn = document.querySelector('.js-sound')
let elBtn = document.querySelectorAll('.btn')
let particles = []

const bgColor = 255
const defaultSize = 3000
let magnification = defaultSize

// クリックしてから動かす
elSoundBtn.addEventListener('click', () => {
  elSoundBtn.remove()
  mic = new p5.AudioIn()
  mic.start()
})

// 大きさを制御
Array.prototype.forEach.call(elBtn, event => {
  const activeClass = 'js-active'
  event.addEventListener('click', e => {
    Array.prototype.forEach.call(elBtn, target => {
      target.classList.remove(activeClass)
    })
    e.currentTarget.classList.add(activeClass)
    const size = e.currentTarget.getAttribute('data-size')
    if (size) {
      magnification = size
    } else {
      magnification = defaultSize
    }
  })
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
    let size = vol * magnification
    
    console.log(vol)
  
    if (vol > 0.01) {
      particles.push(new Particle({
        x: random(0, width),
        y: random(0, height),
        size
      }))
    }

    particles.forEach((value, index) => {
      value.draw()
      if (Math.floor(value.size) <= 0) {
        particles.splice(index, 1)
      }
    })
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
    this.color = random(0, 360)
  }
  draw () {
    this.size *= 0.85
    push()
    fill(this.color, 100, 50, 30)
    ellipse(this.x, this.y, this.size, this.size)
    pop()
  }
}
