var w;
var h;
var Square;
window.addEventListener("resize", resize);
window.addEventListener("click", clickPiece);
var p;

function drawChessBoard() {
  window.canvas=document.getElementById("chessBoard");
  window.context=window.canvas.getContext("2d");
  window.canvas.setAttribute('width', window.innerWidth);
  window.canvas.setAttribute('height', window.innerHeight);
  window.canvas.width = window.canvas.offsetWidth;
  window.canvas.height = window.canvas.offsetHeight;
  
  w = window.innerWidth;
  h = window.innerHeight;

  if (window.innerHeight > window.innerWidth) {
    Square = (0.7 * w) / 8;
    var Topx = w * 0.5 - Square * 8 * 0.5;
    var Topy = (0.5 * w) / 8;
  } else {
    Square = (0.7 * h) / 8;
    Topx = w * 0.5 - Square * 8 * 0.5;
    Topy = (0.5 * h) / 8;
  }

  

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if ((i % 2 === 0 && j % 2 === 1) || (i % 2 === 1 && j % 2 === 0)) {
        context.fillStyle = "black";
      } else {
        context.fillStyle = "white";
      }
      let xOffset = Topx + j * Square;
      let yOffset = Topy + i * Square;
      if(i===0 && j===0){
      }
      context.fillRect(xOffset, yOffset, Square, Square);
    }
  }

  context.strokeStyle = "black";
  context.strokeRect(Topx, Topy, Square * 8, Square * 8);
}

function resize() {
  window.context.clearRect(0, 0, window.canvas.width, window.canvas.height);
  Chess();
}

class Piece {
  constructor(col,row) {
    this.col = col;
    this.row = row;
    this.oldCol=col;
    this.oldRow=row;
    this.selectOrNot=0;
  }
  
  get getColumn(){
    return this.col;
  }
  
  get getRow(){
    return this.row;
  }
  
  get getSelect(){
    return this.selectOrNot;
  }
  
  get getOldCol(){
    return this.oldCol;
  }
  
  get getOldRow(){
    return this.oldRow;
  }
  
  setSelect(val){
    this.selectOrNot = val;
  }
  
  setPosition(col,row){
    this.col=col;
    this.row=row;
  }
  
  setOldPosition(col,row){
    this.oldCol=col;
    this.oldRow=row;
  }
  
  drawPiece() {
    var img = new Image();
    if (window.innerHeight > window.innerWidth) {
      var x=(w * 0.5 - Square* 8 * 0.5)+this.getColumn*Square;
      var y=(0.5 * w)/8+this.getRow*Square;
    }
    else{
      var x=(w * 0.5 - Square* 8 * 0.5)+this.getColumn*Square;
      var y=(0.5 * h)/8+this.getRow*Square;
    }
    
    img.onload = draw;
    
    let i,j;
    i=this.getOldCol;
    j=this.getOldRow;
    
     if ((i % 2 === 0 && j % 2 === 1) || (i % 2 === 1 && j % 2 === 0)) {
        context.fillStyle = "black";
      } else {
        context.fillStyle = "white";
      }
    
    if (window.innerHeight > window.innerWidth) { context.fillRect((w * 0.5 - Square* 8 * 0.5)+this.getOldCol*Square,(0.5 * w)/8+this.getOldRow*Square, Square, Square);}
    else{context.fillRect((w * 0.5 - Square* 8 * 0.5)+this.getOldCol*Square,(0.5 * h)/8+this.getOldRow*Square, Square, Square); }
     
    if(this.getSelect===0){
      img.src = "https://cdn.glitch.com/db3f10ea-50b3-4d76-8553-08f147f55642%2Fcavalier.png?v=1583759363337";
    }
    else if(this.getSelect===1){
      img.src = "https://cdn.glitch.com/db3f10ea-50b3-4d76-8553-08f147f55642%2FcavalierSelect.png?v=1583759358204";
    }
    this.setOldPosition(this.getColumn,this.getRow);
    function draw() {
      context.drawImage(img,x,y,Square,Square);
    } 
  }
  
}

function convertCoordinatesX(c){
  let init =(w * 0.5 - Square* 8 * 0.5);
  for(var i = 0 ; i < 8; i++){
    if(c<(init+(i+1)*Square) && c>(init+i*Square)){
      return i;
    }
  }
  return -1;
  
}

function convertCoordinatesY(c){
  if (window.innerHeight > window.innerWidth){
    var init =(0.5 * w) / 8;
  }
  else{
    init =(0.5 * h) / 8;
  }
  
  for(var i = 0 ; i < 8; i++){
    if(c<(init+(i+1)*Square) && c>(init+i*Square)){
      return i;
    }
  }
  return -1;
  
}

function clickPiece(){
  var rect = window.canvas.getBoundingClientRect();
  var x=event.pageX-rect.left;
  var y=event.pageY-rect.top;
  
  if(window.innerHeight > window.innerWidth) {
    var xInf=(w * 0.5 - Square* 8 * 0.5)+p.getColumn*Square
    var xSup=(w * 0.5 - Square* 8 * 0.5)+(p.getColumn + 1)*Square;
    var yInf=(0.5 * w)/8+p.getRow*Square;
    var ySup=(0.5 * w)/8+(p.getRow + 1)*Square;
  }
   else{
    var xInf=(w * 0.5 - Square* 8 * 0.5)+p.getColumn*Square;
    var xSup=(w * 0.5 - Square* 8 * 0.5)+(p.getColumn+1)*Square;
    var yInf=(0.5 * h)/8+p.getRow*Square;
    var ySup=(0.5 * h)/8+(p.getRow + 1)*Square;
    }
  
  if(x>=xInf-2 && x<xSup && y<ySup && y>=yInf-1){
    if(p.getSelect===0){p.setSelect(1);}
    else{p.setSelect(0);}
    p.drawPiece();
  }
  
  else if (p.getSelect===1){
    let newX=convertCoordinatesX(x);
    let newY=convertCoordinatesY(y);
    
    if(newX>=0 && newY>=0){
      p.setPosition(newX,newY);
      p.drawPiece();
    }
  }
}

function initBoardPieces() {
  p = new Piece(4,5);
  p.drawPiece();
}

function Chess() {
  drawChessBoard();
  initBoardPieces();
}


