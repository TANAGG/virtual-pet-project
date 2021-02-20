var Food,database,foodStock;
var position,lastfed;
var dog,dogHappy,dogImg,feedDog;
var gameState = "play";
var readState
var bedRoom,washRoom,garden;
var updateCount,feed;
var sadDog,milkImg,milk,milk1,milk2,milk3,milk4;
var gar,wash,bed;
var fed

function preload()
{
  dogHappy = loadImage("images/dogImg1.png");
  dogImg = loadImage("images/dogImg.png");
  bedRoom = loadImage("img/BedRoom.png")
  washRoom = loadImage("img/WashRoom.png")
  garden = loadImage("img/Garden.png")
  sadDog = loadImage("img/Lazy.png")
  milkImg = loadImage("images/Milk.png ")
  fed = loadImage("images/fedimage.jpeg")
}

function setup() {
  createCanvas(800, 400);
  
  dog = createSprite(700,200,160,150);
  dog.addImage("dog",dogImg)
  dog.scale = 0.5;
  milk = createSprite(100,200,20,70);
  milk.addImage("milkImage1",milkImg)
  milk.scale = 0.1;
  milk1 = createSprite(200,200,20,70);
  milk1.addImage("milkImage2",milkImg)
  milk1.scale = 0.1;
  milk2 = createSprite(300,200,20,70);
  milk2.addImage("milkImage3",milkImg)
  milk2.scale = 0.1;
  milk3 = createSprite(400,200,20,70);
  milk3.addImage("milkImage4",milkImg)
  milk3.scale = 0.1;
  milk3.visible = true
  database = firebase.database()
  foodStock = database.ref("food")
  foodStock.on("value",readStock)
  feed = createButton("feed the dog")
  feed.position(700,95)
  gar = createButton("garden")
  gar.position(500,370)
  wash = createButton("washroom")
  wash.position(600,370)
  bed = createButton("bedroom")
  bed.position(700,370)
  addFood = createButton("add food")
  addFood.position(800,95)
  
}


function draw() {  
  background("white")
  drawSprites();
 
  
  
  
  feed.mousePressed(function(){
    milk2.visible = "false"
   background(fed)
   })

   gar.mousePressed(function(){
    background(garden)
    feed.hide();
    addFood.hide()
    
   })

   wash.mousePressed(function(){
    background(washRoom)
    feed.hide();
    addFood.hide()
   })

   bed.mousePressed(function(){
    background(bedRoom)
    feed.hide();
    addFood.hide()
   })
  

  foodObj.display()
  var fedtime = database.ref("feedtime")
  fedtime.on("value",function(data){
    lastfed = data.val();
  })
  fill(255,255,254)
  textSize(15)
  if(lastfed>=12){
    text("Last Feed"+ lastfed%12 + "PM",350,30)
  }else if(lastfed = 0){
     text("Last Feed : 12 AM",350,30)
  }else{
    text("Last Feed :"+ lastfed +"AM",350,30)
  }
  drawSprites();
  
  getState()
  readState = database.ref('gameState')
  readState.on("value",function(data){
  gameState = data.val();
  })

 
  

  
  }
  if(gameState!="Hungry"){
  
  
  
  }else{
    
    addFood.show();
    
  }




function readStock(data){
  foods = data.val();
  foodObj.updateFoodStock(foods)
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}

  currentTime = hour();
  if(currentTime===(lastFed+1)){
     update("playing")
     foodObj.garden()
  }else if(currentTime===(lastFed + 2)){
     update("sleeping")
     foodObj.bedroom()
  }else if(currentTime>(lastFed + 2) && currentTime<=(lastFed + 4)){
     update("bathing")
     foodObj.washRoom()
  }else {
   update("Hungry");
   foodObj.display();
  }

  function feedDog(){
   

    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
    database.ref('/').update({
      food : foodObj.getFoodStock(),
      feedTime: hour()
    })
  }



