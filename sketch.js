let bodyWidth = document.body.clientWidth;
let bodyHeight = document.body.clientHeight;

let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 10000;
let commandTabSize = 0; //bodyWidth*.25;
let walk = false;

function setup() {
  createCanvas(bodyWidth, bodyHeight);
  generateWalls();
  particle = new Particle();
}

function generateWalls() {
  walls = [];
  for (let i = 0; i < 5; i++) {
    let x1 = random(width - commandTabSize);
    let x2 = random(width - commandTabSize);
    let y1 = random(height);
    let y2 = random(height);
    walls[i] = new Boundary(x1, y1, x2, y2);
  }

  walls.push(new Boundary(0, 0, width - commandTabSize, 0));
  walls.push(new Boundary(0, height, 0, 0));
  walls.push(
    new Boundary(width - commandTabSize, 0, width - commandTabSize, height)
  );
  walls.push(new Boundary(width - commandTabSize, height, 0, height));
}

function windowResized() {
  bodyWidth = document.body.clientWidth;
  bodyHeight = document.body.clientHeight;
  resizeCanvas(bodyWidth, bodyHeight);
  walls.pop();
  walls.pop();
  walls.push(
    new Boundary(width - commandTabSize, 0, width - commandTabSize, height)
  );
  walls.push(new Boundary(width - commandTabSize, height, 0, height));
}

function draw() {
  background(0);
  for (let wall of walls) {
    wall.show();
  }

  let x = mouseX;
  let y = mouseY;
  if (x > width - commandTabSize) x = width - commandTabSize;
  if (x < 0) x = 0;
  if (y > height) y = height;
  if (y < 0) y = 0;
  particle.update(x, y);

  //particle.update(noise(xoff) * (width - commandTabSize), noise(yoff) * height);
  // xoff += 0.0025;
  // yoff += 0.0025;

  particle.show();
  particle.look(walls);
}
