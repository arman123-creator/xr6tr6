var dog,sadDog,happyDog;
var foodObj;
var foodS, foodStock;
var fedTime, lastFed, feed, addFood;    

function preload(){
  sadDog=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");

}

function setup() {
  database = firebase.database()
  createCanvas(1000,500);
  
  foodObj = new Food();

  foodStock = database.ref('food');
  foodStock.on("value", readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.2;

  feed = createButton("Feed the dog");
  feed.position(500,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(600,95);
  addFood.mousePressed(addFoods);

  var name = createInput("NAME")
  name.position(900,95);

var title = createElement('h4')
title.html("PLEASE GIVE YOUR PET A NAME")
title.position(900,50)


}

function draw() {
  background("yellow");

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data){
    lastFed = data.val();
  })

  fill("red");
  textSize(15);
  if (lastFed >= 12) {
    text("Last Feed: " + lastFed %12 + "PM", 350, 30);
  }
  else if(lastFed == 0) {
    text("Last Feed: 12AM ", 350, 30);
  }
  else {
    text("Last Feed:  " + lastFed + "AM", 350, 30);
  }

  drawSprites();

}

//function to read Stock
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

//function to update food stock and last fed time
  function feedDog() {
    dog.addImage(happyDog);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food: foodObj.getFoodStock(),
      FeedTime : hour()
    })
  }


//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    food: foodS
  })
}
