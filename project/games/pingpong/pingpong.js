function main(){
	var ctx = canvas.getContext("2d");
	var w = canvas.width;
	var h = canvas.height;
  var a = Math.PI/3;
  var v = 15;
  var vY = Math.sin(a)*v;
  var vX = Math.cos(a)*v;
  var xb = 700;
  var yb = 100;
  var r = 10;
  score.value = 0;
  function draw(){
    ctx.clearRect(0, 0, w, h)
    ctx.beginPath();
    ctx.strokeStyle="black"
    ctx.fillStyle="green"
    ctx.arc(xb,yb,r,0,2*Math.PI);
		ctx.fill();
    }
  function phys(){
    if (xb>w-r||xb<0+r){
      vX = -vX
    }
    if (yb<0+r||(player.y-yb<r&&player.x-xb<25&&player.x-xb>-25)){
      vY = -vY
      score.value = Number(score.value)+0.5//тупейшее решение тупейшей задачи
			if (Number(score.value)>Number(mscore.value)){
				mscore.value = score.value
			}
    }else if (yb>h-r) {     //условия остановки игры при проигрыше и действия при проигрыше
      v = 0
      alert("GAME OVER");
			alert(score.value);
			isDrug = false;
      xb = 700;
      yb = 100;
      score.value = 0
			v = 15;
		  vY = Math.sin(a)*v;
		  vX = Math.cos(a)*v;
    }
    vX = vX*1.001 ;
		vY = vY*1.001 ;
    xb += vX
    yb += vY;
    draw();
  }
    // так мы сделали физику шарика а теперь игрока
  var isDrug = false;
  var offset = {
  	x: 0,
  	y: 0,
  };
  var player = {
  	x: w/2,
  	y: 15*h/16,
  	draw: (ctx) => {
  		ctx.fillRect(player.x-25,player.y,50,10);
  	}
  }
  //движение игрока
  canvas.onmousedown = (e)=>{
    if (player.x-e.offsetX<25&&player.x-e.offsetX>-25){
      offset.x = -e.offsetX + player.x;
      isDrug = true;
    }
  }
  canvas.onmouseup = (e)=>{
      isDrug = false;
  }
  canvas.onmousemove = (e)=>{
  	if (isDrug) {
  		player.x = e.offsetX+offset.x;
    }
  }
    //время fps
  function control(){
    phys();
    draw();
    player.draw(ctx)
  }
  setInterval(control, 50 );
    //счет правила игры и тд
}
//  паузa
function stop(){
	alert("PAUSE")
}
