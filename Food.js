class Food {
    constructor(){
        this.foodStock=0;
        this.lastFed;
        this.milk=loadImage("sprites/Milk.png");
    }



getFedTime(lastFed){
    this.lastFed=lastFed;   
  }

getFoodStock(){
  return this.foodStock;
}

updateFoodStock(foodStock){
 this.foodStock= foodStock;
}

deductFoodStock(){
if(this.foodStock>0){
  this.foodStock= this.foodStock-1;
}
}

display(){
 var x=80,y=10;

 imageMode(CENTER);
 image(this.milk,400,400,70,70);

 if(this.foodStock!=0){
     for(var i=0;i< this.foodStock; i++){
        if(1%10){
            x=80
            y=y+50
        }
        image(this.milk,x,y,50,50);
        x=x+20;
     }
    
    }
 
}
bedroom(){
  background(bedroom,550,550);
}
garden(){
  background(garden,550,500);
}
washroom(){
  background(washroom,550,500);
}

}