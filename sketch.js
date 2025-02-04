let bodyWidth = document.body.clientWidth;
let bodyHeight = document.body.clientHeight;

let walls = [];
let commandTab = [];
let ray;
let particle;
let xoff = 0;
let yoff = 10000;
let commandTabSize = bodyWidth * 0.25;
let walk = false;
let padding = 20;
let elementGap = 50;

function setup() {
  createCanvas(bodyWidth, bodyHeight);
  generateWalls();
  particle = new Particle();
  generateCommandTab();
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

function generateCommandTab() {
  let startX = width - commandTabSize + padding;
  //refresh button
  commandTab.push(
    new Button(
      startX,
      elementGap,
      commandTabSize - 2 * padding,
      bodyHeight * 0.1,
      "Generate New Walls",
      generateWalls
    )
  );

  //color sliders
  commandTab.push(
    new Slider(
      startX,
      commandTab[0].getEndHeight() + elementGap,
      commandTabSize - 2 * padding,
      50,
      100,
      "Red",
      255
    )
  );

  commandTab.push(
    new Slider(
      startX,
      commandTab[1].getEndHeight() + elementGap,
      commandTabSize - 2 * padding,
      50,
      100,
      "Green",
      255
    )
  );

  commandTab.push(
    new Slider(
      startX,
      commandTab[2].getEndHeight() + elementGap,
      commandTabSize - 2 * padding,
      50,
      100,
      "Blue",
      255
    )
  );

  commandTab.push(
    new Slider(
      startX,
      commandTab[3].getEndHeight() + elementGap,
      commandTabSize - 2 * padding,
      50,
      20,
      "Alpha",
      255
    )
  );

  //number of rays slider
  commandTab.push(
    new Slider(
      startX,
      commandTab[4].getEndHeight() + elementGap,
      commandTabSize - 2 * padding,
      50,
      20,
      "Number of Projections",
      360,
      0.01,
      true
    )
  );
}

function windowResized() {
  bodyWidth = document.body.clientWidth;
  bodyHeight = document.body.clientHeight;
  commandTabSize = bodyWidth * 0.25;
  let v = createVector(bodyWidth, bodyHeight);

  //resize canvas and walls
  resizeCanvas(bodyWidth, bodyHeight);
  walls.pop();
  walls.pop();
  walls.push(
    new Boundary(width - commandTabSize, 0, width - commandTabSize, height)
  );
  walls.push(new Boundary(width - commandTabSize, height, 0, height));

  //move boundaries
  /*for (let wall of walls) {
    wall.resize(v.mag());
  }*/

  //resize command ui elements
  for (let i = 0; i < commandTab.length; i++) {
    let bonusY = 0;
    if (i > 0) bonusY = commandTab[i - 1].getEndHeight();
    commandTab[i].resize(
      width - commandTabSize + padding,
      bonusY + elementGap,
      commandTabSize - 2 * padding,
      bodyHeight * 0.1
    );
  }
}

function mousePressed() {
  for (let element of commandTab) {
    element.checkPress();
  }
}

function mouseReleased() {
  for (let element of commandTab) {
    element.released();
  }
}

function mouseDragged() {
  for (let element of commandTab) {
    element.drag();
  }
}

function draw() {
  background(0);
  for (let wall of walls) {
    wall.show();
  }

  for (let element of commandTab) {
    element.draw();
  }

  let x = mouseX;
  let y = mouseY;
  if (x > width - commandTabSize) x = width - commandTabSize - 4;
  if (x < 0) x = 0;
  if (y > height) y = height - 4;
  if (y < 0) y = 0;
  particle.update(
    x,
    y,
    commandTab[1].getValue() * 255,
    commandTab[2].getValue() * 255,
    commandTab[3].getValue() * 255,
    commandTab[4].getValue() * 255
  );

  particle.genRays(commandTab[5].getValue());

  //particle.update(noise(xoff) * (width - commandTabSize), noise(yoff) * height);
  // xoff += 0.0025;
  // yoff += 0.0025;

  particle.show();
  particle.look(walls);
}
