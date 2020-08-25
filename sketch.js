var count=0
var PLAY=1
var END=0
var gamestate=PLAY
var trex,trexrunning;
function preload(){
 trexrunning=loadAnimation("trex1.png","trex2.png","trex3.png")
  groundimage=loadImage("ground2.png")
  cloudimage=loadImage("cloud.png")
  obstacle1image=loadImage("obstacle1.png")
  obstacle2image=loadImage("obstacle2.png")
  obstacle3image=loadImage("obstacle3.png")
  obstacle4image=loadImage("obstacle4.png")
  obstacle5image=loadImage("obstacle5.png")
  obstacle6image=loadImage("obstacle6.png")
  restartimage=loadImage("restart.png")
  gameoverimage=loadImage("gameOver.png")
  trexcollided=loadImage("trex_collided.png")
}
function setup(){
  createCanvas(600,300)
trex=createSprite(200,220)
  trex.scale=0.75
  trex.addAnimation("trexrunning",trexrunning)
  trex.addImage("trexcollided",trexcollided)
  ground=createSprite(200,280,1000,20)
  ground.x=ground.width/2
  ground.addImage("ground",groundimage)
  ground1=createSprite(200,290,600,10)
  ground1.visible=false
  restart=createSprite(300,150)
  restart.addImage(restartimage)
  restart.scale=0.5
  restart.visible=false
  gameover=createSprite(300,200)
  gameover.addImage(gameoverimage)
  gameover.scale=0.5
  gameover.visible=false
cloudgroup=new Group()
obstaclesgroup=new Group()


}

function draw(){
background("white")
  text("score:"+count,500,50)
  if (gamestate==PLAY){
    if (keyDown("space")&&trex.y>=238){
  trex.velocityY=-10}
    trex.velocityY=trex.velocityY+0.5
    ground.velocityX=-5
  
  if (ground.x<0){
     ground.x=ground.width/2
  }
  spawnclouds();
  spawnobstacles();
    if (obstaclesgroup.isTouching(trex)){
     gamestate=END 
    }
    count=count+Math.round(getFrameRate()/60)
}
else if(gamestate === END) {
    gameover.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesgroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeImage("trexcollided",trexcollided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesgroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    
  
    
  }
if (mousePressedOver(restart)){
reset() 
}
  
  
  
 drawSprites(); 


trex.collide(ground1)
  
}
function reset(){
  gamestate = PLAY;
  
  gameover.visible = false;
  restart.visible = false;
  
  obstaclesgroup.destroyEach();
  cloudgroup.destroyEach();
  
  trex.changeAnimation("trexrunning",trexrunning);
  
  count = 0;
  
}

function spawnclouds(){
  if (frameCount%60===0){
  var cloud=createSprite(600,random(200,100))
  cloud.velocityX=-3
    cloud.addImage (cloudimage);
    trex.depth=cloud.depth+1
    cloud.lifetime=200
    cloudgroup.add(cloud)
  }
}
function spawnobstacles(){
  if (frameCount%100===0){
  var obstacles=createSprite(600,260)
      obstaclesgroup.add(obstacles)

  obstacles.scale=0.6
obstacles.velocityX=-5
    var rand=Math.round (random(1,6))
    switch (rand){
      case 1:
      obstacles.addImage(obstacle1image)
        break;
    case 2:
      obstacles.addImage(obstacle2image)
        break;                 
    case 3:
      obstacles.addImage(obstacle3image)
        break;
    case 4:
      obstacles.addImage(obstacle4image)
        break;
        case 5:
      obstacles.addImage(obstacle5image)
        break;
   
   case 6:
      obstacles.addImage(obstacle6image)
        break;
        default:break
}}}
  
