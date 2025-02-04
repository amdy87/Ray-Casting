/**
 * UIElement parent class
 */
class UIElement {
  constructor() {
    this.clicked = false;
  }

  resize() {
    if (this.height < 40) this.height = 40;
    if (this.width < 125) this.width = 125;
    this.textSize = 0.00075 * (this.height * this.width);
    if (this.textSize < 12) {
      this.textSize = 12;
    }
  }

  checkPress() {
    if (mouseX > this.x && mouseX < this.x + this.width) {
      if (mouseY > this.y && mouseY < this.y + this.height) {
        this.clicked = true;
        return true;
      }
    }
    return false;
  }

  released() {
    this.clicked = false;
  }

  getEndHeight() {
    return this.height + this.y;
  }

  drag() {
    if (this.clicked) return true;
    return false;
  }
}

/**
 * Button class
 */
class Button extends UIElement {
  constructor(x, y, width, height, text, func) {
    super();
    this.resize(x, y, width, height);
    this.text = text;
    this.func = func;
  }

  draw() {
    fill(87, 87, 87);
    noStroke();
    rect(this.x, this.y, this.width, this.height);
    textAlign(CENTER);
    textSize(this.textSize);
    fill(0);
    text(
      this.text,
      this.x + this.width / 2,
      this.y + this.height / 2 + this.textSize / 3
    );
  }

  resize(x, y, width, height) {
    this.height = height;
    this.x = x;
    this.y = y;
    this.width = width;
    super.resize();
  }

  checkPress() {
    if (super.checkPress()) this.func();
  }
}

/**
 * Slider UIElement class
 */
class Slider extends UIElement {
  constructor(
    x,
    y,
    length,
    height,
    start,
    text = null,
    max = 1,
    min = 0,
    inverted = false
  ) {
    super();
    this.x = x;
    this.y = y;
    this.width = length;
    this.height = height;
    this.value = start / 100;
    this.title = null;
    if (text != null) this.title = text;
    this.max = max;
    this.min = min;
    this.inverted = inverted;
  }

  draw() {
    fill(255);
    textAlign(LEFT);
    if (this.title) text(this.title, this.x, this.y);
    textAlign(RIGHT);
    if (this.max) {
      let stringOfValue = "";
      if (!this.inverted) {
        stringOfValue = String(Math.floor(this.max * this.value));
      } else {
        if (this.value != 0) {
          stringOfValue = String(Math.floor(this.max / this.value));
        } else {
          stringOfValue = String(Math.floor(this.max / this.min));
        }
      }
      text(stringOfValue, this.x + this.width, this.y);
    }
    stroke(145, 145, 145);
    strokeWeight(10);
    line(
      this.x,
      this.y + this.height / 2,
      this.x + this.width,
      this.y + this.height / 2
    );
    ellipse(this.x + this.width * this.value, this.y + this.height / 2, 4);
    strokeWeight(1);
  }

  resize(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    super.resize();
  }

  checkPress() {
    if (super.checkPress()) {
      let ellipseX = mouseX;
      if (ellipseX < this.x) ellipseX = this.x;
      if (ellipseX > this.x + this.width) ellipseX = this.x + this.width;

      this.value = (ellipseX - this.x) / this.width;
    }
  }

  getValue() {
    return this.value;
  }

  drag() {
    if (super.drag()) {
      let ellipseX = mouseX;
      if (ellipseX < this.x) ellipseX = this.x;
      if (ellipseX > this.x + this.width) ellipseX = this.x + this.width;

      this.value = (ellipseX - this.x) / this.width;
    }
  }
}
