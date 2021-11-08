var path,craft,fuel,coin,jwellery,stone;
var pathImg,craftImg,fuelImg,coinImg,jwelleryImg,stoneImg,startImg,bgImg,video;
var treasureCollection = 0;
var fuelG,coinG,jwelleryG,stoneGroup;
var coin = 0;
//Game States
var PLAY=3;
var END=0;
var gameState = 1;
var Start=1
var Start2=2

function preload(){
  pathImg = loadImage("space.png");
  craftImg = loadAnimation("craft.png");
  fuelImg = loadImage("fuel.png");
  coinImg = loadImage("coin.png");
  jwelleryImg = loadImage("jwell.png");
  stoneImg = loadImage("stone.png");
  endImg =loadAnimation("gameOver.png");
  startImg=loadImage("sss.jpeg")
  bgImg=loadImage("bg2.jpeg")
  video=VideoLoad("video.mp4")
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
craft = createSprite(width/2,height-20,20,20);
craft.addAnimation("flying",craftImg);
craft.scale=0.08;
  
  
fuelG=new Group();
coinG=new Group();
jwelleryG=new Group();
stoneGroup=new Group();




}

function draw() {

if(gameState === Start){
  background(startImg);
  textSize(40);
  fill("red")
  text("Space Runner",width/2,height/2);

if(keyCode===32){
  gameState = 2;
}

}
if(gameState === 2){
background(bgImg)
//video.play()

if(keyDown("UP_ARROW")){
  gameState = 3;
}
}








  if(gameState===PLAY){
  background(0);
  craft.x = World.mouseX;
  
  edges= createEdgeSprites();
  craft.collide(edges);
  
  //code to reset the background
  if(path.y > height){
    path.y = height/3;
   
  }
  
    createFuel();
    createCoin();
    createJwellery();
    createStone();
    showFuelBar();

    if (fuelG.isTouching(craft)) {
      fuelG.destroyEach();
      treasureCollection=treasureCollection+0;
    }
    else if (coinG.isTouching(craft)) {
      coinG.destroyEach();
      treasureCollection=treasureCollection+0;
      
    }else if(jwelleryG.isTouching(craft)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 0;
      
    }else{
      if(stoneGroup.isTouching(craft)) {
       gameState=END;
        
        craft.addAnimation("flying",endImg);
        craft.x=width/2;
        craft.y=height/2;
        craft.scale=0.6;
        
        fuelG.destroyEach();
        coinG.destroyEach();
        jwelleryG.destroyEach();
        stoneGroup.destroyEach();
        
        fuelG.setVelocityYEach(0);
        coinG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        stoneGroup.setVelocityYEach(0);
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("F U E L : "+ treasureCollection,width/2,30);
  image(fuelImg, width / 2 - 130,  50, 20, 20);
  }

}

function createFuel() {
  if (World.frameCount % 200 == 0) {
  var fuel = createSprite(Math.round(random(50, width-50),70, 40, 40));
  fuel.addImage(fuelImg);
  fuel.scale=0.12;
  fuel.velocityY = 3;
  fuel.lifetime = height-50;
  fuelG.add(fuel);
  }
}

function createCoin() {
  if (World.frameCount % 320 == 0) {
  var coin = createSprite(Math.round(random(50, width-50),40, 10, 10));
  coin.addImage(coinImg);
  coin.scale=0.3;
  coin.velocityY = 3;
  coin.lifetime = height-20;
  coinG.add(coin);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = height-20;
  jwelleryG.add(jwellery);
  }
}

function createStone(){
  if (World.frameCount % 530 == 0) {
  var stone = createSprite(Math.round(random(50, width-50),40, 10, 10));
  stone.addImage(stoneImg);
  stone.scale=0.2;
  stone.velocityY = 3;
  stone.lifetime = height-20;
  stoneGroup.add(stone);
  }
}

function showFuelBar() {
  //image(fuelImg, width / 2 - 130,  50, 20, 20);
  fill("white");
  rect(width / 2 - 100, 50, 185, 20);
  fill("#ffc400");
  //rect(width / 2 - 100,  50, player.fuel, 20);
  noStroke();
}