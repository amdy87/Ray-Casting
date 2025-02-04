class Particle {
  constructor(min = 0.01) {
    this.pos = createVector(width / 2, height / 2);
    this.numRays = 0;
    this.rays = [];
    this.genRays(360);
    this.color = [255, 255, 255, 50];
    this.min = min;
  }

  update(x, y, r, g, b, a) {
    this.pos.set(x, y);
    this.color = [r, g, b, a];
  }

  genRays(raySize) {
    if (raySize == 0) raySize = this.min;
    if (Math.floor(360 / raySize) != this.numRays) {
      this.rays = [];
      this.numRays = Math.floor(360 / raySize);
      for (let a = 0; a < 360; a += raySize) {
        this.rays.push(new Ray(this.pos, radians(a)));
      }
    }
  }

  look(walls) {
    for (let ray of this.rays) {
      let closest = null;
      let record = Infinity;
      for (let wall of walls) {
        let pt = ray.cast(wall);
        if (pt) {
          const d = p5.Vector.dist(this.pos, pt);
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }
      if (closest) {
        stroke(this.color[0], this.color[1], this.color[2], this.color[3]);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
    }
  }

  show() {
    for (let ray of this.rays) {
      ray.show();
    }

    fill(0);
    ellipse(this.pos.x, this.pos.y, 1);
  }
}
