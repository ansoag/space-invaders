class Spiller {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.hastighet = 3;
    this.w = 7;
    this.h = 7;
  }

  getCenter() {
    return createVector(this.pos.x + this.w/2, this.pos.y + this.h/2)
  }

  setthastighet(hastighet) {
    this.hastighet = hastighet;
  }

  show() {
    fill(255, 0, 0);
    //rect(this.pos.x, this.pos.y, 50, 50);
    image(spillerBilde, this.pos.x, this.pos.y);
  }
    isHit() {
      let hit = false;

      for (let index = 0; index < romvesenKuler.length; index++) {
        if (this.pos.dist(romvesenKuler[index].pos) < 18) {
          hit = true;
        }
      }

      return hit;
    }

  update() {
    if (this.hastighet > 0 && this.pos.x > width - 50) {
      this.hastighet = 0;
    }

    if (this.hastighet < 0 && this.pos.x < 0) {
      this.hastighet = 0;
    }


    this.pos.x += this.hastighet;
  }
}
