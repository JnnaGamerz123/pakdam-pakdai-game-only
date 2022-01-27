var bg;
var ground, invisibleGround, groundImage;
var steve, steveImage,steveDead;
var zombie, zombieImage, zombieSaturated;
var obstacle, obImg, obstacle2;
var score=0;
var reset;
//Game States
var PLAY = 1;
var END = 0;
var gameState = PLAY;
//Sound
var bgM, deadMusic, jump;

function preload(){
bg=loadImage("./Assets/bg.jpg")
groundImage = loadImage("./Assets/gr.jpg");
steveImage = loadImage("./Assets/steve.gif");
zombieImage = loadImage("./Assets/zombie.gif");
obImg = loadImage("./Assets/obstacle.png");
obstacle2 = loadImage("./Assets/ob2.png");
steveDead=loadImage("./Assets/steve_Dead.png");
zombieSaturated=loadImage("./Assets/dead.png");
jump=loadSound("./Assets/jump.mp3");
deadMusic=loadSound("./Assets/collided.wav");
bgM=loadSound("./Assets/BgMusic.mp3");
}
function setup() 
{
  //createCanvas(windowWidth, windowHeight);
  createCanvas(1350,570); 
  
  //GROUND
  ground=createSprite(675,560,2700,30);

  //STEVE
  steve=createSprite(700,510,50,50);
  steve.addImage(steveImage);
  steve.scale=0.25
//steve.debug=true;
steve.setCollider("rectangle",0,0,100,350)

//ZOMBIE
  zombie=createSprite(300,500,50,50)
  zombie.addImage(zombieImage);
  zombie.scale=0.7;
  zombie.setCollider("rectangle",0,0,100,150);
  
  obstacleG = new Group();
  score = 0;
  
//reset button
reset = createButton("Reset")
reset.position(1200,30);
reset.class("customButton");
}

function draw() 
{
background(bg);
if(!bgM.isPlaying()){
  bgM.play();
  bgM.setVolume(0.5);
  }
textSize(20);
  fill("d9e4e6")
  text("Score: "+ score,30,50);
  fill("d9e4e6")
  text("Press SPACE BAR/Tap On The Screen to Jump",500,50);

  //GameState Play
  if (gameState===PLAY){
  score = score + Math.round(getFrameRate()              /60);

if(touches.length > 0 ||keyDown("SPACE") && steve.y  >= height-120) {
  steve.velocityY = -15;
jump.play();
touches = [];
  }

  zombie.velocityY=zombie.velocityY+0.5;

zombie.collide(ground);
steve.velocityY = steve.velocityY + 0.5;

steve.collide(ground);
Obstacles()
if(zombie.isTouching(obstacleG)){
  zombie.velocityY=-15;}

  if(obstacleG.isTouching(steve)){
    steve.velocityY=0;
    zombie.x=steve.x-40;
  }

if(zombie.isTouching(steve)){
  gameState = END;
}
}
//GameState End
if (gameState === END) {
  deadMusic.play();
  steve.velocityY = 0;
  obstacleG.setVelocityXEach(0);
  zombie.velocityY=0;
  zombie.addImage(zombieSaturated);
  zombie.changeImage(zombieSaturated);
  zombie.scale=0.6;
  
//collision
 steve.addImage(steveDead)
steve.changeImage(steveDead);
 
 
}
resetButton()
drawSprites()
}
 function Obstacles() {
  if(frameCount % 100 === 0) {
     obstacle = createSprite(1350,520,50,50);
     //obstacle.debug = true
  
    obstacle.velocityX = -(6 + 2*score/100);
    
    obstacleG.add(obstacle);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obImg);
      obstacle.scale=0.4;
              break;
      case 2: obstacle.addImage(obstacle2);
      obstacle.scale=0.55;
              break;
      default: break;
      
    }
  }
}

function resetButton(){
  this.reset.mousePressed(() => {
      window.location.reload();
    });

}