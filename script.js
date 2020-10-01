import Tank from "./model/Tank.js"
import Missile from "./model/Missile.js"
import Invarder from "./model/Invader.js"

//draw canvas
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//load tank variable
const imgTank = new Image(50, 50);
imgTank.src = "./assets/tank.png";
var tank = new Tank(imgTank, canvas.width / 2 - 25, canvas.height - 60, 50, 50, 0, 0);

//load invader image
const imgInvader = new Image(50, 50);
imgInvader.src = "./assets/invader.png";

//load missile image
const imgMissile = new Image(50, 50);
imgMissile.src = "./assets/missile.png";

var invaderGroup = [];
var missileGourp = [];

//add audios
var shootAudio = new Audio("./assets/shoot.wav");
var explosionAudio = new Audio("./assets/explosion.wav");
var audio = new Audio("./assets/music.mpeg");

//press space to shoot
document.addEventListener("keyup", keyUpHandler.bind(this));

function keyUpHandler(e) {
  if ((e.key === " " || e.key === "Space") && missilesRemain > 0) {
    missileGourp.push(new Missile(imgMissile, 0, canvas.height, 50, 50, 0, 0, false));
    missilesRemain--;
    shootAudio.play();
  }
}

//add stats
var invaderShotDown = 0;
var missilesRemain = 10;

// if tank move out of canvas from top, add one missile
document.addEventListener("addMissile", (_e) => {
  missilesRemain++;
});

//play audio functions
function playAudio() {
  audio.play();
}

function pauseAudio() {
  audio.pause();
}

function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "red";
  ctx.font = "15px Arial";
  //load texts
  ctx.fillText("Invaders shot down: " + invaderShotDown, 10, 20);
  ctx.fillText("Missiles remaining: " + missilesRemain, 10, 40);
  //draw tank
  ctx.drawImage(tank.img, tank.x, tank.y, 50, 50);
  tank.move(canvas.width, canvas.height);

  //draw invader randomly
  let invaderDown = Math.random();
  if (invaderDown >= 0 && invaderDown < 0.01) {
    invaderGroup.push(new Invarder(imgInvader, canvas.width / 2 - 25, 0, 50, 50, 0, 0, canvas.width));
  }

  invaderGroup.forEach(invader => {
    ctx.drawImage(invader.img, invader.x, invader.y, 50, 50);
    invader.move(canvas.width, canvas.height);
  });


  //draw missile randomly
  missileGourp.forEach((missile) => {
    if (missile.wasflying) {
      ctx.drawImage(missile.img, missile.x, missile.y, 50, 50);
      missile.move(canvas.width, canvas.height);
    }
    else {
      missile.x = tank.x;
      missile.y = tank.y;
      missile.dy = -5;
      missile.wasflying = true;
    }
  }
  );

  for (var i = 0; i < missileGourp.length; i++) {
    if (missileGourp[i].y === 0) {
      missileGourp.splice(i--, 1);
    }
  }

  //check if missile hits invader
  for (var i = 0; i < invaderGroup.length; i++) {
    for (var j = 0; j < missileGourp.length; j++) {
      if (invaderGroup[i].intersects(missileGourp[j])) {
        invaderGroup.splice(i--, 1);
        missileGourp.splice(j--, 1);
        missilesRemain++;
        invaderShotDown++;
        explosionAudio.play();
        break;
      }
    }
  }
  window.requestAnimationFrame(draw);
}

const interval = setInterval(draw(), 10);
playAudio();


// game over
document.addEventListener("gameover", (_e) => {
  clearInterval(interval);
  pauseAudio();
  window.alert("Game Over!");
});
