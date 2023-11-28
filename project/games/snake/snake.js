var GS = 0
				function start_game(){
					GS+=1
					if ( GS ==1){
						main_code()
					}
				}
				//pause
				function stop(){
					alert("PAUSE")
				}
				
				function main_code(){
					var ctx = canvas.getContext("2d");//поле
					var w = canvas.width;
					var h = canvas.height;
					var walls = wall.checked
					var cd = true
					var speed = 300
					var drawhead = new Image()
					drawhead.src = 'snakehead.png'
					var drawheadR = new Image()
					drawheadR.src = 'snakeheadR.png'
					var drawheadL = new Image()
					drawheadL.src = 'snakeheadL.png'
					var drawheadD = new Image()
					drawheadD.src = 'snakeheadD.png'
					var drawtail = new Image()
					drawtail.src = 'snaketail.png'
					var drawdino = new Image()
					drawdino.src = 'dino1.png'
				
				
					//проигрыш
					function lose (){
						speed = 300
						clearInterval(smi)
						clearInterval(ddi)
						smi = setInterval(snake_movement,speed)
						ddi = setInterval(dinodrawing,speed)
						alert('lose')
						walls = wall.checked
						ctx.clearRect(0,0,w,h)
						score.value = 0
						pieces = []
						var P = new snake_piece(w/2,h/2)
						pieces.push(P)
						var P = new snake_piece(w/2,h/2+16)
						pieces.push(P)
						var P = new snake_piece(w/2,h/2+32)
						pieces.push(P)
					}
				
				
				
					function snake_piece(x,y){//описание секции змеи
						this.x = x
						this.y = y
						this.draw = (ctx) =>{
							ctx.drawImage(drawtail,this.x,this.y,16,16)
						}
					}
					pieces = []// составление массива змеиных ячеек
					var P = new snake_piece(w/2,h/2)
					pieces.push(P)
					var P = new snake_piece(w/2,h/2+16)
					pieces.push(P)
					var P = new snake_piece(w/2,h/2+32)
					pieces.push(P)
				
					var forward = false
					var backward = false
					var left = false
					var right = false
				
					function cooldown(){
						cd = true
					}
				
					document.onkeydown = (e)=>{//управление
					console.log(e)
						timeout = setTimeout(cooldown,speed)//задание cd для поворота змейки
						if (e.key == 'ArrowDown'){
						if((forward == false)&&(cd)){
								forward = false
								backward = true
								left = false
								right = false
								cd = false
							}
					}
					if (e.key == 'ArrowUp'){
						if ((cd)&&(backward == false)){
								forward = true
								backward = false
								left = false
								right = false
								cd = false
							}
					}
					if (e.key == 'ArrowRight'){
						if((cd)&&(left == false)){
								forward = false
								backward = false
								left = false
								right = true
								cd = false
							}
					}
					if (e.key == 'ArrowLeft'){
						if ((cd)&&(right==false)){
								forward = false
								backward = false
								left = true
								right = false
								cd = false
							}
					}
				  }
				
				
					function snake_movement(){
									//движение змеи и смена направления
						if (forward){
							ctx.clearRect(pieces[0].x,pieces[0].y,16,16)
							pieces[0].y -= 16
							pieces[0].draw(ctx)
						}
						if (backward){
							ctx.clearRect(pieces[0].x,pieces[0].y,16,16)
							pieces[0].y += 16
							pieces[0].draw(ctx)
						}
						if (right){
							ctx.clearRect(pieces[0].x,pieces[0].y,16,16)
							pieces[0].x += 16
							pieces[0].draw(ctx)
						}
						if (left){
							ctx.clearRect(pieces[0].x,pieces[0].y,16,16)
							pieces[0].x -= 16
							pieces[0].draw(ctx)
						}
				
				
				
						for (let i = pieces.length-1;i>0;i--){
							ctx.clearRect(pieces[pieces.length-1].x,pieces[pieces.length-1].y,16,16)
							pieces[i].x = pieces[i-1].x
							pieces[i].y = pieces[i-1].y
							if ( i==1){
								if (forward){
									ctx.drawImage(drawhead,pieces[i].x,pieces[i].y,16,16)
								}
								if (right){
									ctx.drawImage(drawheadR,pieces[i].x,pieces[i].y,16,16)
								}
								if (left){
									ctx.drawImage(drawheadL,pieces[i].x,pieces[i].y,16,16)
								}
								if (backward){
									ctx.drawImage(drawheadD,pieces[i].x,pieces[i].y,16,16)
								}
							}else{
								pieces[i].draw(ctx)
							}
						}
						//условие столкновение со змеёй
						for (let i = 2;i<pieces.length;i++){
							for (let j = 2;j<i;j++){
								if((pieces[i].x==pieces[j].x)&&(pieces[i].y==pieces[j].y)){
									lose()
								}
							}
						}
				
				
				
				
						for (let i = 0;i<pieces.length;i++){// стены (прохождение сквозь или столкновение)
							if (walls){
								if (pieces[i].x>w-16){
									lose()
								}
								if (pieces[i].x<0){
									lose()
								}
								if (pieces[i].y>h-16){
									lose()
								}
								if (pieces[i].y<0){
									lose()
								}
							}else{
								if (pieces[i].x>w-16){
									pieces[i].x=0
								}
								if (pieces[i].x<0){
									pieces[i].x=w-16
								}
								if (pieces[i].y>h-16){
									pieces[i].y=0
								}
								if (pieces[i].y<0){
									pieces[i].y=h-16
								}
							}
						}
						if(Number(score.value)>Number(mscore.value)){//максимальный счет
							mscore.value = score.value
						}
					}
					//food
					var dino = {
						x: Math.round(50*Math.random())*16,
					y: Math.round(50*Math.random())*16,
					draw: (ctx)=>{
								ctx.drawImage(drawdino,dino.x,dino.y,16,16)
					}
				  }
					function dinodrawing(){//события при съедении еды(смена скорости,кд,координаты еды и тп)
						dino.draw(ctx)
						for (let i = 0;i<pieces.length;i++){
							if ((dino.y==pieces[i].y)&&(dino.x==pieces[i].x)){
								dino.x = Math.round(50*Math.random())*16
								dino.y = Math.round(50*Math.random())*16
								for (let i = 0;i<pieces.length;i++){
										if (dino.x == pieces[i].x&&dino.y == pieces[i].y){
											while (dino.x != pieces[i].x||dino.y != pieces[i].y){
												dino.x = Math.round(50*Math.random())*16
												dino.y = Math.round(50*Math.random())*16
											}
										}
								}
								if (speed>100){
									speed -=20
								}
								clearInterval(smi)
								clearInterval(ddi)
								smi = setInterval(snake_movement,speed)
								ddi = setInterval(dinodrawing,speed)
								score.value = Number(score.value)+ 1
								var P = new snake_piece(pieces[pieces.length-1].x,pieces[pieces.length-1].y)
								pieces.push(P)
							}
						}
					}
				
				
				
					let smi = setInterval(snake_movement,speed)
					let ddi = setInterval(dinodrawing,speed)//просто течение времени fps
				}