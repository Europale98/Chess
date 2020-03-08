window.addEventListener("resize", resize);
function drawChessBoard() {
    
  var w = window.innerWidth;
  var h = window.innerHeight;
  
  if (window.innerHeight > window.innerWidth) {
    var Square = (0.7*w)/8;
    var Topx =(w*0.5)-(Square*8*0.5);
    var Topy =(0.5*w)/8;
  }
  
  else{
    var Square = (0.7*h)/8;
    var Topx =(w*0.5)-(Square*8*0.5);
    var Topy =(0.5*h)/8;
  }
 

  let canvas = document.getElementById("chessBoard");
  context = canvas.getContext("2d");
  
  for(let i=0; i<8; i++) {
    for(let j=0; j<8; j++) {
      if((i%2==0  && j%2==1)||(i%2==1  && j%2==0)) {
        context.fillStyle="black";
      }
      else {
        context.fillStyle="white";
      }
      let xOffset = Topx + j*Square;
      let yOffset = Topy + i*Square;
      context.fillRect(xOffset, yOffset, Square, Square);
    }
  }

  context.strokeStyle = "black";
  context.strokeRect(Topx, Topy, Square*8, Square*8)
}

function resize(){
  let canvas = document.getElementById("chessBoard");
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawChessBoard();
}
