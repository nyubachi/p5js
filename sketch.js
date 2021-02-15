function setup() {
  createCanvas(600, 350);
  textAlign(CENTER);
  frameRate(5);
}

let alpha0 = 0;
let alpha1 = 0;
let alpha2 = 0;

const ba = 0.95;
const ka = 0.3;
const k12 = 0.2;
const k21 = 0.1;
const ke = 0.1;

const v1 = 30;
const v2 = 45;

const dose = 1000;
let drug = 0;
const dinterval = 8;
const endadmin = 168;

const endloop = 480;

let gut = 0;
let comp1 = 0;
let comp2 = 0;

let c1 = 0;
let c2 = 0;

function draw() {
  background(060);

  textSize(20);
  fill(999);
  text("吸収区画", 86, 85);
  text("中心区画", 286, 85);
  text("組織区画", 486, 85);

  text("ka", 190, 150)
  text("k12", 386, 125)
  text("k21", 386, 205)
  text("ke", 320, 260)

  textSize(30);
  text("→", 190, 180)
  text("→", 386, 155)
  text("←", 386, 185)
  text("↓", 290, 265)
  text(frameCount + " hr", 500, 300);

  i = frameCount % dinterval;

  if (i === 0) {
    drug = dose;
  } else {
    drug = 0;
  }

  if (frameCount > endadmin) {
    drug = 0;
  }

  if (frameCount === endloop) {
    noLoop();
  }

  gut += drug*ba;
  
  dgut = - gut*ka;
  dcomp1 = gut*ka - comp1*k12 - comp1*ke + comp2*k21;
  dcomp2 = comp1*k12 - comp2*k21;
  
  gut += dgut;
  comp1 += dcomp1;
  comp2 += dcomp2;

  c1 = comp1/v1;
  c2 = comp2/v2;

  alpha0 = gut / dose * 255;
  fill(255, 235, 205, alpha0);
  square(30, 100, 120, 20);
  
  alpha1 = c1*5;
  fill(176, 224, 230, alpha1);
  square(230, 100, 120);
  
  alpha2 = c2*5;
  fill(176, 224, 230, alpha2);
  square(430, 100, 120);
}
