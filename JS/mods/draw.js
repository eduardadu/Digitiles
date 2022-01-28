class Drawer{
  constructor(){
    this.bS= 1;
    this.bH= 1;
    this.shade= 1;
    this.lastDrawn=undefined;
    this.brush= new PencilBrush(this);          //type of brush being used
    this.switch=false;                          //true to turn on drawing
  }

  init(brushS, brushH, eraserS, eraserH){
    this.bS= brushS;
    this.bH= brushH;
    this.eS= eraserS;
    this.eH= eraserH;
  }

  execute(matrix, posX, posY){
    if(this.lastDrawn!=undefined){
      var x= posX - this.lastDrawn[0] ;
      var y= posY - this.lastDrawn[1] ;
      var aN= Math.max(abs(x)-1,abs(y)-1);
      var xV= -1;   if(x>0){xV=1}else if(x==0){xV=0}
      var yV= -1;   if(y>0){yV=1}else if(y==0){yV=0}
      var xA= [];
      var yA= [];
      var cx=0;
      var cy=0;

      for(var i=0; i<aN;i++){
        if(abs(posX - (this.lastDrawn[0] +cx)) > 0 ){ xA.push(xV);  }else{ xA.push(0);}
        if(abs(posY - (this.lastDrawn[1] + cy)) >0 ){ yA.push(yV);  }else{  yA.push(0); }

        var cx= cx +xA[i];
        var cy= cy +yA[i];
        this.brush.execute(matrix, this.lastDrawn[0] + cx, this.lastDrawn[1] + cy );
      }

    }


    this.brush.execute(matrix, posX, posY);
    this.lastDrawn=[posX, posY];
    return matrix;
  }
  checkLastTileDrawn(e){
    if(e== this.lastDrawn){
      return true;
    }else{
      return false;
    }
  }
  eraseDraw(matrix){
    for(var i=0 ; i < matrix.length ; i++){
      for(var j=0; j< matrix[i].length ; j++){
        matrix[i][j] = 0;
      }
    }
  }

  setBrushSize(n){ this.bS=n; this.brush.setBrushSize(n); }
  setBrushHard(n){ this.bH=n; this.brush.setBrushHard(n);  }
  setBrushShade(n){ this.shade=n; this.brush.setBrushShade(n);  }


  setSwitch(n){ this.switch=n; }

  getBrush(){
    return this.brush.getType();
  }
  getDrawSwitch(){
    return this.switch;
  }
  handleInput(e, obj){
    switch(e){
      case "Switch":
        this.switch = obj;
        break;
      case "BrushSize":
        this.setBrushSize(obj);
        break;
      case "BrushHard":
        this.setBrushHard(obj);
        break;
      case "BrushShade":
        this.setBrushShade(obj);
        this.brush.setBrushShade(obj);
        break;
      case "Pencil":
        this.brush= new PencilBrush(this);
        this.brush.setBrushSize(this.bS);
        this.brush.setBrushShade(this.shade);
        this.brush.setBrushHard(this.bH);
        break;
      case "Eraser":
        this.brush= new EraserBrush(this);
        this.brush.setBrushSize(this.bS);
        this.brush.setBrushShade(this.shade);
        this.brush.setBrushHard(this.bH);
        break;
    }
  }
}


class Brush{
  constructor(f){
  }
  execute(){}
}

class PencilBrush extends Brush{
  constructor(f){
    super();
    this.bS= f.bS;
    this.bH= f.bH;
    this.shade=f.shade;
  }
  execute(matrix, posX, posY){
    var aux=0;
    if(this.bS % 2==1){aux=1;}else{aux=0}
    var sizeTerm= int(this.bS/2);
    for(var x= - sizeTerm; x< sizeTerm+aux; x++){
      for(var y= - sizeTerm; y< sizeTerm+aux; y++){
        var nX= posX + x;
        var nY= posY + y;
        if(matrix[nX][nY]!= undefined){
          matrix[nX][nY] = Math.min(this.shade , 1);
        }
      }
    }
    // matrix[posX][posY] = Math.min(matrix[posX][posY] + this.bS, 1);
  }
  getType(){
    return "pencil";
  }
  setBrushSize(o){
    this.bS= o;
  }
  setBrushHard(o){
    this.bH= o/100;
  }
  setBrushShade(o){
    o= map(o, 0,100,100,0);
    this.shade= o/100;
  }
}

class EraserBrush extends Brush{
  constructor(f){
    super();
    this.bS= f.eS;
    this.bH= f.eH;
    this.shade=f.shade;
  }
  execute(matrix, posX, posY){
    var aux=0;
    if(this.bS % 2==1){aux=1;}else{aux=0}
    var sizeTerm= int(this.bS/2);
    for(var x= - sizeTerm; x< sizeTerm+aux; x++){
      for(var y= - sizeTerm; y< sizeTerm+aux; y++){
        var nX= posX + x;
        var nY= posY + y;
        if(matrix[nX][nY]!= undefined){
          matrix[nX][nY] = Math.max(matrix[nX][nY]- (this.shade), 0);
        }
      }
    }
  }

  getType(){
    return "eraser";
  }
  setBrushSize(o){
    this.bS= o;
  }
  setBrushHard(o){
    this.bH= o/100;
  }
  setBrushShade(o){
    o= map(o, 0,100,100,0);
    this.shade= o/100;
  }
}
