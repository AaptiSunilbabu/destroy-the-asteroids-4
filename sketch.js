var path,spaceship,asteroid,asteroid2,asteroid3,spaceship2,bullet,restart;
var pathImg,spaceshipImg,asteroidImg,asteroid2Img,asteroid3Img,spaceship2Img,bulletImg,endImg,restartImg;
var AsteroidsDestroyed = 0;
var Life = 3;
var Gasteroid,Gasteroid2,Gasteroid3,spaceshipGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("space.png");
  spaceshipImg = loadAnimation("spaceship.png");
  asteroidImg = loadImage("asteroid.png");
  asteroid2Img = loadImage("asteroid2.png");
  asteroid3Img = loadImage("asteroid3.png");
  spaceship2Img = loadImage("spaceship2.png");
  endImg =loadAnimation("gameOver.png");
  restartImg = loadImage("restart.png")
  bulletImg = loadImage("bullet.png");
}

function setup(){
  
  createCanvas(400,600);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating  spaceship
spaceship = createSprite(70,580,20,20);
spaceship.addAnimation("spaceship",spaceshipImg);
spaceship.scale=0.3;
  
  
Gasteroid=new Group();
Gasteroid2=new Group();
Gasteroid3=new Group();
spaceshipGroup=new Group();
bulletGroup=new Group();

restart = createSprite(300,140);
restart.addImage(restartImg);
restart.scale = 0.5;
restart.visible = false;

}

function draw() {

  if(gameState===PLAY){
  background(0);
  spaceship.x = World.mouseX;
  
  edges= createEdgeSprites();
  spaceship.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createasteroid();
    createasteroid2();
    createasteroid3();
    createspaceship2();

    if(keyDown("space")){
      shootBullet();
    }

    if (bulletGroup.isTouching(Gasteroid)){
      Gasteroid.destroyEach();
      AsteroidsDestroyed=AsteroidsDestroyed+50;
    }
    else if (bulletGroup.isTouching(Gasteroid2)) {
      Gasteroid2.destroyEach();
      AsteroidsDestroyed=AsteroidsDestroyed+50;
    }
    else if (bulletGroup.isTouching(Gasteroid3)) {
      Gasteroid3.destroyEach();
      AsteroidsDestroyed=AsteroidsDestroyed+100;
    }
    else if(bulletGroup.isTouching(spaceshipGroup)) {
        gameState=END;
    }else{
      if(gameState === END){ 
      restart.visible = true;
        
         spaceship.addAnimation("spaceship",endImg);
        

        spaceship.x=200;
        spaceship.y=300;
        spaceship.scale=0.3;
        
         Gasteroid.destroyEach;
         Gasteroid2.destroyEach;
         Gasteroid3.destroyEach;
         spaceshipGroup.destroyEach;

        
        Gasteroid.setVelocityYEach(0);
        Gasteroid2.setVelocityYEach(0);
        Gasteroid3.setVelocityYEach(0);
        spaceshipGroup.setVelocityYEach(0);
     
    }
  }

if(Gasteroid.isTouching(spaceship)){
  Life=Life-1;
}

if(Gasteroid2.isTouching(spaceship)){
  Life=Life-1;
}

if(Gasteroid3.isTouching(spaceship)){
  Life=Life-1;
}

if(mousePressedOver(restart)) {
  reset();
}

  drawSprites();
  textSize(20);
  fill(255);
  text("Asteroids Destroyed: "+ AsteroidsDestroyed,10,30);

  textSize(20);
  fill(255);
  text("Life: "+ Life,300,30);
  }

}

function createasteroid() {
  if (World.frameCount % 200 == 0) {
  var asteroid = createSprite(Math.round(random(50, 350),40, 10, 10));
  asteroid.addImage(asteroidImg);
  asteroid.scale=0.3;
  asteroid.velocityY = 3;
  asteroid.lifetime = 150;
  Gasteroid.add(asteroid);
  }
}

function reset(){
  gameState = PLAY;
  restart.visible = false;
}

function createasteroid2() {
  if (World.frameCount % 320 == 0) {
  var asteroid2 = createSprite(Math.round(random(50, 350),40, 10, 10));
  asteroid2.addImage(asteroid2Img);
  asteroid2.scale=0.3;
  asteroid2.velocityY = 3;
  asteroid2.lifetime = 150;
  Gasteroid2.add(asteroid2);
}
}

function createasteroid3() {
  if (World.frameCount % 410 == 0) {
  var asteroid3 = createSprite(Math.round(random(50, 350),40, 10, 10));
  asteroid3.addImage(asteroid3Img);
  asteroid3.scale=0.3;
  asteroid3.velocityY = 3;
  asteroid3.lifetime = 150;
  Gasteroid3.add(asteroid3);
  }
}

function createspaceship2(){
  if (World.frameCount % 530 == 0) {
  var spaceship2 = createSprite(Math.round(random(50, 350),40, 10, 10));
  spaceship2.addImage(spaceship2Img);
  spaceship2.scale=0.3;
  spaceship2.velocityY = 3;
  spaceship2.lifetime = 150;
  spaceshipGroup.add(spaceship2);
  }
}

function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.x= spaceship.x-20
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityY= -7
  bulletGroup.add(bullet)
}

function gameOver() {
  swal(
    {
      title: `You've Lost`,
      text: "Try Again",
      imageUrl:
        "https://o.remove.bg/downloads/d3cce50a-1780-4e6c-b4c8-94c8767d25cc/spaceship-removebg-preview.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}