var x,y,r;

var p;
var col;

var play = false;
var shrink = true;
var size = 75;
var score = 0;
let button;
var started = false
let startButton;

var bubbles = [];

function setup() {
  createCanvas(windowWidth,windowHeight);

  console.log(bubbles);
  button = createButton('RESTART');
  button.style('border', '4px solid #2df52a')
  button.style('background-color', color(255));
  button.style('font-size', '30px')
  button.style('border-radius', '5px')
  button.position(width/2 - 65, height/2 + 60);
  button.hide()

  startButton = createButton('PLAY');
  startButton.style('border', '4px solid #2df52a')
  startButton.style('background-color', color(255));
  startButton.style('font-size', '60px')
  startButton.style('border-radius', '5px')
  startButton.position(width/2 - 80, height/2 - 60);

   p = new Player();

  for (var i = 0; i < 1; i++) {
    bubbles[i] = new Bubble(random(width), random(height), size)
  }

}

function draw() {
  background(0);
  if (!started) {
    fill(255)
    textSize(40)
    textStyle(NORMAL)
    textAlign(CENTER)
    text('Try to catch the dots. They will get smaller as you go!',width/2, height - 270)

    fill(255)
    textSize(10)
    textAlign(CENTER)
    textStyle(ITALIC)
    text('by Spencer Plavoukos', width/2, height - 20)
  }
  startButton.mousePressed(function go() {
    started = true;
    startButton.hide();
    play = true;
  })

  if (play && started) {
    p.show();
     for (var i = 0; i < 1; i++) {
      bubbles[i].show();
      bubbles[i].update();
      bubbles[i].check(p);
    }
    fill(255)
    textSize(30)
    text('score: ' + score, width - 150, 50);
  }

  else if (!play && started){
    fill(255,0,0)
    textSize(60)
    textAlign(CENTER)
    text('YOU LOSE', width/2, height/2 - 60);
    fill(255)
    textSize(60)
    text('Score: ' + score, width/2, height/2 + 20)
    bubbles = [];
    cursor()

    button.show()
    button.mousePressed(function change() {
      size = 75;
      for (var i = 0; i < 1; i++) {
        bubbles[i] = new Bubble(random(width), random(height), size)
      }
      noCursor();
      score = 0;
      play = true;

      button.hide()
    })
  }
}


function Bubble(x,y,r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.col = 255;

  this.show = function(x,y,r) {
    fill(255,this.col,this.col);
    ellipse(this.x,this.y,this.r);
  }

  this.update = function() {
    if (this.r < 0) {
      play = false;
    }
    else {
      this.r -= 1;
    }
  }

    this.check = function(player) {
      d = dist(this.x,this.y,mouseX,mouseY);
      if (d < this.r + player.r) {
        this.col = 0;
        for (var i = 0; i < 1; i++) {
          size--
          score++
          bubbles[i] = new Bubble(random(width), random(height), size)
        }
      }
    }
  }

function Player() {
  this.r = 50
  this.show = function() {
    fill(10,245,10);
    ellipse(mouseX, mouseY, this.r)
  }
}
