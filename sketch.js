//Create variables here
var happyDog, dogImg;
var foodS, foodStock;
var database;
var lastFed;
var changingGameState;
var readingGameState;
var bedroom;
var garden;
var washroom;

function preload()
{
  //load images here
  dogImg = loadImage("sprites/dogImg.png");
  happyDog= loadImage("sprites/dogImg1.png");

  bedroom = loadImage("images/virtual pet images/BedRoom.png");
  garden = loadImage("images/virtual pet images/Garden.png");
  washroom = loadImage("images/virtual pet images/WashRoom.png");
}

function setup() {
  createCanvas(800, 500);
  database=firebase.database();

  foodObj = new Food(30,200);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
  
  dog= createSprite(650,250,10,10);
  dog.addImage(dogImg);
  dog.scale=0.5


  feed=createButton("Feed the dog");
  feed.position(700,120);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food")
  addFood.position(800,120);
  addFood.mousePressed(addFoods);
}


function draw() { 
  background(46, 139, 87);

  currentTime=hour();

  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.bedroom();
  }
  else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }
  else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.wahroom();
  }
  else{
    update("Hungry");
    foodObj.display();
  }

  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }
  else{
    feed.show();
    addFood.show();
    dog.addImage(dogImg);
  }

    foodObj.display();

  drawSprites();

  textSize(25);
  fill(255,255,254);
  stroke("black"); 
  text("Food remaining : "+foodS,300,480);
  

  

  if(lastFed>=12){
    text("Last Fed: " +lastFed%12+ "PM",600,30)
  }
  else if(lastFed===0){
    text("Last Fed: 12 AM",350,30);
  }
  else{
    text("Last Fed: "+ lastFed +"AM",350,30)
  }
  //add styles here

  

  

}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){

  if(x<=0){
    x=0
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  });
  
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}


