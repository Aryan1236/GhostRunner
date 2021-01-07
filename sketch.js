var Ghost,
    Ghost_Image,
    Tower,
    Tower_Image,
    climber,
    climber_Image,
    door_Image,
    door,
    balconyMaterial,
    balconyMaterial1;

var PLAY = 1,
    END = 0,
    gameState = "PLAY" ;



function preload ()
{
  Ghost_Image = loadImage("ghost-standing.png");
  Tower_Image = loadImage("tower.png");
  door_Image = loadImage("door.png");
  climber_Image = loadImage("climber.png");
}

function setup ()
{
  createCanvas(400,400);
  
  Tower = createSprite(0,0,40,40);
  Tower.addImage(Tower_Image);
  Tower.scale = 1.5;
  Tower.velocityY = 10;
  
  Ghost = createSprite(300,200);
  Ghost.addImage(Ghost_Image);
  Ghost.scale = 0.3;
  
  balconyMaterial1 = new Group ();
  balconyMaterial = new Group ();

  
}

function draw  ()
{
  background(220);
  
   if (Tower.y > 300)
    {
      Tower.y = 100;
    }
  
  if(gameState === PLAY)
    {
        if(keyWentDown("space"))
    {
      Ghost.velocityY = -5;
      
    }
  
  Ghost.velocityY = Ghost.velocityY  +  1;
  
  if(keyDown("left"))
    {
      Ghost.velocityX = Ghost.velocityX - 5;
    }  
  
    if(keyWentDown("right"))
    {
      Ghost.velocityX = Ghost.velocityX + 5;
    }
      
      
    balcony();
      
      if(balconyMaterial.isTouching(Ghost)|| Ghost.y >400)
        {
          gameState = END;
        }
    }
  
  if ( gameState === END)
    {
      stroke(red);
      text("gameover",200,200);
      Ghost.destroy();
      Ghost.setVelocity (0,0);
      
    }

  
  
  
  drawSprites();
}

function balcony()
{
   if(World.frameCount%150 === 0)
     {
       climber = createSprite(200,100,25,25);
       climber.addImage(climber_Image);
       climber.x = Math.round(random(100,350));
       climber.setVelocity (0,2);
       climber.lifetime = 200;
       balconyMaterial.add(climber);
       
       door = createSprite(200,30,25,25);
       door.addImage(door_Image);
       door.x = climber.x;
       door.setVelocity(0,2);
       door.lifetime = 200;
       balconyMaterial1.add(door);
       
       Ghost.depth = door.depth;
       Ghost.depth = Ghost.depth + 1;
     }
  
}