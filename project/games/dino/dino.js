
var GS = 0
var MS = 0
function start_game(){
  GS += 1
  if (GS == 1){
    game()
  }
}

function game(){
  var ctx = canvas.getContext("2d");
	var w = canvas.width;
	var h = canvas.height;
  var drawdino1 = new Image()
  drawdino1.src = 'dino1.jpg'
  var drawdino2 = new Image()
  drawdino2.src = 'dino2.png'
  var cactus1 = new Image()
  cactus1.src = 'cactus1.png'
  var cactus2 = new Image()
  cactus2.src = 'cactus2.png'
  var background = new Image()
  var bird1 = new Image()
  bird1.src = 'flappybird.gif'
  background.src = 'background.png'
  var frame = 0
  var Vy = 100
  var bgx = 0
  var Jump = false
  var crouch = false
  var Vc = 25
  mscore.value = MS

  var dino = {
    y: 600,
    draw: (ctx)=>{
      if(crouch){
        if (frame%2 != 0){
          ctx.drawImage(drawdino2,100,dino.y,80,80)
        }else{
          ctx.drawImage(drawdino1,100,dino.y,80,80)
        }
      }else{
        if (frame%2 != 0){
          ctx.drawImage(drawdino2,100,dino.y,100,100)
        }else{
          ctx.drawImage(drawdino1,100,dino.y,100,100)
        }
      }
      
      score.value = Number(score.value)+1
      frame+=1
    }
  }


  function GameObject(GameobjectClass,picture,x){
    this.GameobjectClass = GameobjectClass;
    this.picture=picture;
    this.x=x;
    this.draw = (ctx)=>{
      if(this.GameobjectClass==1){                   //class of gameobjects ( both birdds and cactuses) (1-bird ; 2-cactus)
        ctx.drawImage(this.picture,this.x,550,100,100)
      }
      if(this.GameobjectClass==2){
        ctx.drawImage(this.picture,this.x,600,100,100)
      }                                  
      
    }
  }

  let r = Math.round(Math.random()*2)
  if (r ==0){// creating actual cactuses and birds
    var GO1 = new GameObject(2,cactus1,w)
  }
  if(r==1){
    var GO1 = new GameObject(1,bird1,w)
  }
  if(r==2){
    var GO1 = new GameObject(2,cactus2,w)
  }
  
  
  
  r = Math.round(Math.random()*2)
  if (r ==0){                   // creating actual cactuses and birds
    var GO2 = new GameObject(2,cactus1,GO1.x+Math.round(Math.random()*w+w/2))
  }
  if(r==1){
    var GO2 = new GameObject(1,bird1,GO1.x+Math.round(Math.random()*w+w/2))
  }
  if(r==2){
      var GO2 = new GameObject(2,cactus2,GO1.x+Math.round(Math.random()*w+w/2))
  }

  

  
  
  function Gaameobjectmove(){ // moving, drawing and redrawing after gameobject went from the canvas for every gameobject 
    ctx.fillStyle = 'rgb(239,228,176)'
    ctx.fillRect(GO1.x,600,100+Vc,100)
    GO1.draw(ctx)
    ctx.fillRect(GO2.x,600,100+Vc,100)
    GO2.draw(ctx)
    GO1.x -= Vc
    GO2.x -= Vc
    if(Vc<100){
      Vc *=1.00001
    }
    if(GO1.x<-100){
      GO1.x+=1400+Math.round(Math.random()*w)
      r = Math.round(Math.random()*2)
      if (r==0){
        GO1.picture = cactus1
        GO1.GameobjectClass = 2
      }else{
        if(r==1){
          GO1.picture = bird1
          GO1.GameobjectClass = 1
        }else{
          GO1.picture = cactus2
          GO1.GameobjectClass = 2
        }
        
      }
      ctx.clearRect(0,600,100,100)
    }
    if(GO2.x<-100){
      GO2.x+=1400+Math.round(Math.random()*w)
      r = Math.round(Math.random()*2)
      if (r==0){
        GO2.picture = cactus1
        GO2.GameobjectClass = 2
      }else{
        if(r==1){
          GO2.picture = bird1
          GO2.GameobjectClass = 1
        }else{
          GO2.picture = cactus2
          GO2.GameobjectClass = 2
        }
        
      }
      ctx.fillRect(0,600,100,100)
    }
    if (Math.abs(GO1.x-GO2.x)<500){
      if(GO1.x>GO2.x){
        GO1.x+=500
      }else{
        GO2.x+=500
      }
    }
  } 




  
  document.onmousedown = (e)=>{ // jump on click
    Jump = true
    if (dino.y==600){
       Vy = 100
    }
    
  }

  document.onkeydown = (e)=>{// crouch on key down and uncrouch on key up
    if (e.key == ' '){
      crouch = true
      if (!Jump){
        dino.y = 620
      }
    }
    
  }
  document.onkeyup = (e) =>{
    crouch  = false
    dino.y = 600
  }



  function lose(){
    alert('game over','score',score.value,'  ','record',mscore.value) // consiquenses of losing the game
    clearInterval(fps)
    GS = 0
    restart()
  }

  function phys(){ // basic physics like jumping and colliding
    if (Jump){
      dino.y-=Vy
      Vy -= 20
      if (dino.y>600){
        Jump= false
        dino.y = 600
      }
    }
    
    GOArray = []
    GOArray.push(GO1)
    GOArray.push(GO2)
    for (let i = 0; i<GOArray.length; i++){
      if((140>GOArray[i].x)&&(150<GOArray[i].x+90)){ // colliding
        console.log(GOArray[i].GameobjectClass)
        if (GOArray[i].GameobjectClass == 2){
          if(dino.y>590){
            lose()
          }
        }else{
          if(dino.y<610){
            lose()
          }
        }
      }
    }
  }
  

  function restart(){ // game restarting 
    ctx.clearRect(0,0,w,h)
    Vc = 20
    GO1.x += w*2
    GO2.x += w*2
    dino.y = 600
    if (Number(score.value)>Number(MS)){
      MS = score.value
    }
    score.value = 0
  }

  function control(){   // sonnecting every function that will be used avery frame 
    if (Number(score.value)>Number(MS)){
      MS = score.value
    }
    mscore.value = MS
    ctx.drawImage(background,0,0,w,h)
    Gaameobjectmove()
    dino.draw(ctx)
    phys()
    //time frame
  }
  var fps = setInterval(control,50)

}
function stop(){ // pause 
	alert("PAUSE")
}
