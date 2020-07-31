let spiller;
let romvesener = [];
let kuler = [];
let romvesenKuler = [];
let spillerBilde;
let romvesenBilde;
let gameOverBilde;
let bakgrunnBilde;
let hjerteBilde;
let gameOver = false;
let score = 0;
let level = 1;
let liv = 3;
let myStorage = window.localStorage;

function getHighscore() {
  return myStorage.getItem("highscore");
}

function setHighscore() {
  if (getHighscore() == null || parseInt(getHighscore()) < score) {
    myStorage.setItem("highscore", "" + score);
  }
}

function preload() {
  romvesenBilde = loadImage(romvesenPng)
  spillerBilde = loadImage(spillerPng)
  bakgrunnBilde = loadImage(bakgrunnPng)
  gameOverBilde = loadImage(gameOverPng)
  hjerteBilde = loadImage(hjertePng)
}

function setup() {
  createCanvas(400, 400);
  spiller = new Spiller(200, 360);
  setupRomvesener();
}

function setupRomvesener() {
  gameOver = false;
  romvesener = [];
  romvesenKuler = [];
  for (let index = 0; index < 7; index++) {
    for (let rad = 0; rad < 4; rad++) {
      romvesener.push(new Romvesen(50 + index * 50, 50 + rad * 30));
    }
  }
}

function tegnRomvesener() {
  let romvesenerKollidert = false;
  for (let index = 0; index < romvesener.length; index++) {
    if (romvesener[index].harKollidert()) {
      romvesenerKollidert = true;
    }

    if (romvesener[index].pos.y >= 360) {
      gameOver = true;
      level = 1;
      score = 0;
      setTimeout(setupRomvesener, 5000);
    }
  }

  for (let index = romvesener.length - 1; index >= 0; index--) {
    if (romvesenerKollidert) {
      romvesener[index].snu();
    }

    if (romvesener.y >= spiller.y) {

    }

    romvesener[index].show();
    romvesener[index].update();

    for (let indexb = kuler.length - 1; indexb >= 0; indexb--) {
      if (romvesener[index].getCenter().dist(kuler[indexb].pos) < 12) {
        //romvesener.splice(index, 1);
        //kuler.splice(indexb, 1);
        score++;
        romvesener[index].skalSlettes = true;
        kuler[indexb].skalSlettes = true;
      }
    }
  }
}

function tegnKuler() {
  for (let index = kuler.length - 1; index >= 0; index--) {
    kuler[index].show();
    kuler[index].update();

    if (kuler[index].pos.y < 0) {
      //kuler.splice(index, 1);
      kuler[index].skalSlettes = true;
    }
  }

  for (let index = romvesenKuler.length - 1; index >= 0; index--) {
    romvesenKuler[index].show();
    romvesenKuler[index].update();

    if (romvesenKuler[index].pos.y > height) {
      //kuler.splice(index, 1);
      romvesenKuler[index].skalSlettes = true;
    }
  }
}


function slettFigurer() {
  for (let indexA = romvesener.length - 1; indexA >= 0; indexA--) {
    if (romvesener[indexA].skalSlettes) {
      romvesener.splice(indexA, 1);
    }
  }

  for (let indexb = kuler.length - 1; indexb >= 0; indexb--) {
    if (kuler[indexb].skalSlettes) {
      kuler.splice(indexb, 1);
    }
  }
}

function tegnHjerter() {
  if(liv > 2) {
    image(hjerteBilde, 370, 30)
  }

  if(liv > 1) {
    image(hjerteBilde, 340, 30)
  }

  if(liv > 0) {
    image(hjerteBilde, 310, 30)
  }
}

function draw() {
  if (gameOver) {
    image(gameOverBilde, 0, 0);
  } else {
    rectMode(CENTER);
    background(bakgrunnBilde);
    fill(255);
    spiller.show();
    spiller.update();
    if (spiller.isHit()) {
      romvesenKuler = [];
      liv--;
      if (liv < 1) {
      gameOver = true;
      level = 1;
      score = 0;
    }
  }


    tegnRomvesener();
    tegnKuler();
    tegnHjerter();

    fill(0)
    textSize(15);
    text("Poengsum: " + score, 20, 20)
    text("Nivå " + level, 20, 50);
    text("Highscore: " + getHighscore(), 20, 80);
    setHighscore();

    if (romvesener.length == 0) {
      level++;
      setupRomvesener();
    }

    slettFigurer();
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    spiller.setthastighet(-1);
  }

  if (keyCode === RIGHT_ARROW) {
    spiller.setthastighet(1);
  }

  if (keyCode === UP_ARROW) {
    if (kuler.length <= 3) {
      kuler.push(new Skudd(spiller.pos.x + 25, spiller.pos.y, 5));
    }
  }
  if (keyCode === DOWN_ARROW) {
    spiller.setthastighet(0);
  }
}
