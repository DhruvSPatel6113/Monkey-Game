var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground1, ground2;
var score = 0;
var survivalTime = 0;

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {
  createCanvas(400, 400);

  monkey = createSprite(60, 280, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.2;

  ground1 = createSprite(100, 342, 200, 10);
  ground1.velocityX = -2;

  ground2 = createSprite(400, 342, 400, 10);
  ground2.velocityX = -2;

  FoodGroup = new Group();
  obstacleGroup = new Group();

}

function draw() {
  background(220);

  if (ground2.x === 200) {

    ground2.x = 400;
    ground1.x = 100;

  }

  monkey.collide(ground1);
  monkey.collide(ground2);

  if (keyDown("space") && monkey.y >= 270) {

    monkey.velocityY = -12;

  }

  if (monkey.isTouching(FoodGroup)) {

    score = score + 1;
    FoodGroup.destroyEach();

  }

  monkey.velocityY = monkey.velocityY + 0.4;

  ground1.shapeColor = "brown";
  ground2.shapeColor = "brown";

  food();
  obstacles();

  obstacles.depth = monkey.depth;
  monkey.depth = monkey.depth + 1;

  drawSprites();

  stroke("white");
  fill("black");
  textSize(15);
  text("score:" + score, 300, 20);

  survivalTime = Math.ceil(frameCount / 30);
  text("survivalTime:" + survivalTime, 100, 20);

}

function food() {

  if (frameCount % 80 === 0) {

    var rand = Math.round(random(120, 200));
    banana = createSprite(400, rand, 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifetime = 100;
    FoodGroup.add(banana);

  }
}

function obstacles() {

  if (frameCount % 300 === 0) {

    obstacle = createSprite(410, 300, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -4;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);

  }
}