var tLSpeed = 1000; //tilelistspeed
var js;

class TileList{
  constructor(){

  }
  getAllSubclasses() {
    var list=[

      Rec1LSSM,

      Cir1LSSM,
      HalfCirc1LMRM,
      Tri1LSSC,
      Losang1LMSM,
      Star1LSSM,
      Arrow1LMSM,

      Arc2LSSA, //svg
      Arc1LMSM, //svg
      Plus2LMSM, //svg into plus!

      Bar1LMSM,

      Pupil2LSSM,
      RecPupil2LSSM,
      Flower1LMRM, //changename
      CirStar5LMRM,
      Petal1LMRM, //changename
      CurveRect1LMRM, //changename
      Mix9LMRM, //changeanem
      //Life1LMRM,
      Smile1LMRM,

      Octogon1LMSM,
      Shuriken1LMRM, //fix svg

      Tri2LSSM,
      Tri2LSSA,
      Tri4LSSA,
      Tri4LSSC,
      TriRec5LSSC,


      WeirdChessLinesTile, //fix svg
      CubeTile, //fix svg
      QuadLevelsTile ,//fix svg
      LinesComp,
      RandomSquaresComp,
      ChessComp,
      Rec5LSSM
      //
    ];
    return list;
  }



}


class Tile{
  constructor(){
    this.listTiles   = [];
    this.shapesAnimB = [];
    this.shapesAnim  = [];
    this.div;
    //this.max         = js.getTileValue(str(this.name));
  }

  drawTile(posX, posY, cellX, cellY, value, c1, c2){}
  drawTileG(c, posX, posY, cellX, cellY, value, c1, c2){}

  drawTileSVG(container,posX, posY, cellX, cellY, value,c1, c2){}

  getAnimationBackground(container, posX, posY, cellX, cellY, c2){
    var aux = container.rect( posX + (cellX- cellX)/2, posY + (cellY-cellY)/2, cellX , cellY).attr({
      fill: `${c2}`,
      "stroke-width": 0
    });
    this.shapesAnimB.push(aux);
  }

  getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){}

  changeAnimColors(posX, posY, cellX, cellY, value,  c1, c2){
    if(Array.isArray(this.shapesAnim) && this.shapesAnim[0]!= undefined){
      for(var i=0; i<this.shapesAnim.length; i++){
        this.shapesAnim[i].attr({
          fill: `${c1}`
        });;
      }
    }else{
      var div= this.div;
      var container;
      this.getAnimation(div, container, posX, posY, cellX, cellY, value,  c1, c2);
    }
  }

  changeAnimColorsB(posX, posY, cellX, cellY, value,  c1, c2){ //changeAnimColorsB(c2){
    if(Array.isArray(this.shapesAnimB) && this.shapesAnim[0]!= undefined){
      for(var i=0; i<this.shapesAnimB.length; i++){
        this.shapesAnimB[i].attr({
          fill: `${c2}`
        });;
      }
    }else{
      //console.log("erro");
      var div= this.div;
      var container;
      this.getAnimation(div, container, posX, posY, cellX, cellY, value,  c1, c2);
    }
  }
}


//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

class Rec1LSSM extends Tile{
  constructor(){
    super();
  }

  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    fill(c1);
    rectMode(CENTER);
    rect(posX , posY , cellX * value, cellY*value);
  }

  drawTileG(c ,posX, posY, cellX, cellY, value, c1, c2){
    c.fill(c1);
    c.rectMode(CENTER);
    c.rect(posX , posY , cellX * value, cellY*value);
  }

  drawTileSVG(container,posX, posY, cellX, cellY, value,c1, c2){
    this.shapes= container.rect(posX + (cellX- cellX*value)/2,posY + (cellY-cellY*value)/2, cellX * value, cellY*value).attr({
      fill: `${c1}`,
      "stroke-width": 0
    });
  }
  animateTilesSVG(value, speed){
    this.shapes.animate({width: cellX * value,
                height: cellY*value,
                x: posX + (cellX- cellX*value)/2,
                y: posY + (cellY-cellY*value)/2
              }, speed);
  }

  getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){
    function hoverIn(){
      var r = aux.attr('width') == 0 ? cellX : 0;
      aux.animate({width: r,
        height:r,
        x: posX + (cellX- r)/2,
        y: posY + (cellY-r)/2
      }, tLSpeed, hoverIn);
    };
    function hoverOut(){
      aux.stop();
      aux.attr({width: cellX * value,
        height: cellY*value,
        x: posX + (cellX- cellX*value)/2,
        y: posY + (cellY-cellY*value)/2
      });
    }
    var aux = container.rect( posX + (cellX- cellX*value)/2, posY + (cellY-cellY*value)/2, cellX * value, cellY*value).attr({
      fill: `${c1}`,
      "stroke-width": 0
    });
    this.shapesAnim.push(aux);
    div.addEventListener("mouseenter", function(){ hoverIn(); });
    div.addEventListener("mouseleave", function(){ hoverOut();});
  }

}
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

class Cir1LSSM extends Tile{
  constructor(){
    super();
  }

  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    fill(c1);
    ellipseMode(CENTER);
    ellipse(posX , posY, cellX * value, cellY*value);
  }
  drawTileG(c,posX, posY, cellX, cellY, value, c1, c2){
    c.fill(c1);
    c.ellipseMode(CENTER);
    c.ellipse(posX, posY, cellX * value, cellY*value);
  }
  drawTileSVG(container,posX, posY, cellX, cellY, value,c1, c2){
    this.shapes = container.circle(posX + cellX/2,posY + cellY/2, cellX * value, cellY*value).attr({
      fill: `${c1}`,
      "stroke-width": 0
    });;
  }
  animateTilesSVG(value, speed){
    this.shapes.animate({width: cellX * value,
                height: cellY*value,
                x: posX + (cellX- cellX*value)/2,
                y: posY + (cellY-cellY*value)/2
              }, speed);
  }
  getAnimation(div, container, posX, posY, cellX, cellY, value,  c1, c2){
    cellX= cellX/2;
    cellY= cellY/2;

    function hoverIn(){
      var r = aux.attr('r') == 0 ? cellX : 0;
      aux.animate({r: r}, tLSpeed, hoverIn);
    };
    function hoverOut(){
      aux.stop();
      //aux.animate({r: cellX * value}, tLSpeed);
      aux.attr({r: cellX * value});
    }

    var aux = container.circle(posX + (cellX), posY +(cellY), cellX * value, cellY*value).attr({
      fill: `${c1}`,
      "stroke-width": 0
    });
    this.shapesAnim.push(aux);
    div.addEventListener("mouseenter", function(){ hoverIn(); });
    div.addEventListener("mouseleave", function(){ hoverOut();});
  }

}

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

class Tri1LSSC extends Tile{
  constructor(){
    super();
  }
  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    fill(c1);
    var cw= map(value, 0,1,0,cellX);
    var ch= map(value, 0,1,0,cellY);
    push();
    translate(posX, posY);
    beginShape();
      vertex(-cellX/2, cellY/2 - ch);
      vertex(-cellX/2 +cw, cellY/2);
      vertex(-cellX/2, cellY/2);
    endShape(CLOSE);
    pop();
  }
  drawTileG(c, posX, posY, cellX, cellY, value, c1, c2){
    c.fill(c1);
    var cw= map(value, 0,1,0,cellX);
    var ch= map(value, 0,1,0,cellY);
    c.push();
    c.translate(posX, posY);
    c.beginShape();
      c.vertex(-cellX/2, cellY/2 - ch);
      c.vertex(-cellX/2 +cw, cellY/2);
      c.vertex(-cellX/2, cellY/2);
    c.endShape(CLOSE);
    c.pop();
  }

  drawTileSVG(container,posX, posY, cellX, cellY, value,c1, c2){

  }
  getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){
    var d ="";
    var d1 ="";
    var d2 ="";
    function hoverIn(){
      var r = aux.attr('path').valueOf() == d2 ? d1 : d2;                  //ALERT
      aux.animate({path: r}, tLSpeed, hoverIn);
    };
    function hoverOut(){
      aux.stop();
      aux.attr({path: d});
    }
    d= getPath(value);
    d1= getPath(1);
    d2=getPath(0);

    function getPath(val){
      var d="";
      var cw= map(val, 0,1,0,cellX);
      var ch= map(val, 0,1,0,cellY);
      d= d + "M" + parseFloat(-cellX/2) + "," + parseFloat(cellY/2 - ch);
      d= d + "L" + parseFloat(-cellX/2 + cw) + "," + parseFloat(cellY/2);
      d= d + "L" + parseFloat(-cellX/2) + "," + parseFloat(cellY/2);
      return d;
    }
    var aux = container.path(d).attr({
      fill: `${c1}`,
      "stroke-width": 0
    });
    aux.translate(cellX/2, cellY/2);
    this.shapesAnim.push(aux);
    div.addEventListener("mouseenter", function(){ hoverIn(); });
    div.addEventListener("mouseleave", function(){ hoverOut();});
  }
}

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

class Losang1LMSM extends Tile{ //DIAMOND TILE
  constructor(){
    super();
  }
  drawTile( posX, posY, cellX, cellY, value, c1, c2){
    fill(c1);
    var aux= map(value, 0,1, 0,cellX/2);
    beginShape();
      vertex(posX , posY -cellY/2);
      vertex(posX  +aux, posY );
      vertex(posX , posY + cellY - cellY/2);
      vertex(posX  -aux, posY );
    endShape(CLOSE);

  }
  drawTileG(c, posX, posY, cellX, cellY, value, c1, c2){
    c.fill(c1);
    var aux= map(value, 0,1, 0,cellX/2);
    c.beginShape();
      c.vertex(posX , posY-cellY/2);
      c.vertex(posX  +aux, posY );
      c.vertex(posX, posY + cellY- cellY/2);
      c.vertex(posX -aux, posY );
    c.endShape(CLOSE);
  }
    drawTileSVG(container,posX, posY, cellX, cellY, value,c1, c2){
      var aux= map(val, 0,1, 0,cellX/2);
      var d="";
          d= d + "M" + (posX +cellX/2) + "," +(posY);
          d= d + "L" + (posX +cellX/2 +aux) + "," +(posY +cellY/2);
          d= d + "L" + (posX +cellX/2) + "," +(posY + cellY);
          d= d + "L" + (posX +cellX/2 -aux) + "," +(posY + cellY/2);

    this.shapes = container.path(d).attr({
      fill: `${c1}`,
      "stroke-width": 0
    });
  }
  getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){
    var d ="";
    var d1="";
    var d2 ="";
    function hoverIn(){
      var r = aux.attr('path').valueOf() == d2 ? d1 : d2;                  //ALERT
      aux.animate({path: r}, tLSpeed, hoverIn);
    };
    function hoverOut(){
      aux.stop();
      //aux.animate({path: d}, tLSpeed);
      aux.attr({path: d});
    }

    d = getPath(value);
    d1= getPath(1);
    d2= getPath(0);

    function getPath(val){
      var aux= map(val, 0,1, 0,cellX/2);
      var d="";
          d= d + "M" + (posX +cellX/2) + "," +(posY);
          d= d + "L" + (posX +cellX/2 +aux) + "," +(posY +cellY/2);
          d= d + "L" + (posX +cellX/2) + "," +(posY + cellY);
          d= d + "L" + (posX +cellX/2 -aux) + "," +(posY + cellY/2);
      return d;
    }
    var aux = container.path(d).attr({
      fill: `${c1}`,
      "stroke-width": 0
    });
    this.shapesAnim.push(aux);
    div.addEventListener("mouseenter", function(){ hoverIn(); });
    div.addEventListener("mouseleave", function(){ hoverOut();});
  }

}


//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

class Arrow1LMSM extends Tile{ //ARROW TILE
  constructor(){
    super();
    this.ang=0.35;
  }
  drawTile( posX, posY, cellX, cellY, value, c1, c2){
    fill(c1);
    var aux= map(value, 0,1, 0, cellX *this.ang);
    var x= cellX *this.ang;
    posX= posX -cellX/2;
    posY= posY-cellY/2;
    beginShape();
      vertex(posX +x - aux, posY);
      vertex(posX +x + aux, posY );
      vertex(posX +cellX -((x-aux)*2), posY + (cellY/2));

      vertex(posX +x + aux, posY + cellY);
      vertex(posX +x- aux , posY + cellY);
      vertex(posX +cellX -(x-aux)*2 -(aux*2) , posY + (cellY/2));
    endShape(CLOSE);

  }
  drawTileG(c, posX, posY, cellX, cellY, value, c1, c2){
    c.fill(c1);
    var aux= map(value, 0,1, 0, cellX *0.35);
    var x= cellX *0.35;
    posX= posX -cellX/2;
    posY= posY-cellY/2;
    c.beginShape();
      c.vertex(posX +x - aux, posY);
      c.vertex(posX +x + aux, posY );
      c.vertex(posX +cellX -((x-aux)*2), posY + (cellY/2));

      c.vertex(posX +x + aux, posY + cellY);
      c.vertex(posX +x- aux , posY + cellY);
      c.vertex(posX +cellX -(x-aux)*2 -(aux*2) , posY + (cellY/2));
    c.endShape(CLOSE);
  }
    drawTileSVG(container,posX, posY, cellX, cellY, value,c1, c2){
      var aux= map(value, 0,1, 0, cellX *0.35);
      var x= cellX *0.35;
      var d="";
          d= d + "M" + (posX +x - aux) + "," +(posY);
          d= d + "L" + (posX +x + aux) + "," +(p9osY);
          d= d + "L" + (posX +cellX -((x-aux)*2)) + "," +(posY + (cellY/2));

          d= d + "L" + (posX +x + aux) + "," +(posY + cellY);
          d= d + "L" + (posX +x- aux) + "," +(posY + cellY);
          d= d + "L" + (posX +cellX -(x-aux)*2 -(aux*2)) + "," +(posY + (cellY/2));

    this.shapes = container.path(d).attr({
      fill: `${c1}`,
      "stroke-width": 0
    });
  }
  getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){
    var d ="";
    var d1="";
    var d2 ="";
    function hoverIn(){
      var r = aux.attr('path').valueOf() == d2 ? d1 : d2;                  //ALERT
      aux.animate({path: r}, tLSpeed, hoverIn);
    };
    function hoverOut(){
      aux.stop();
      //aux.animate({path: d}, tLSpeed);
      aux.attr({path: d});
    }

    d = getPath(value);
    d1= getPath(1);
    d2= getPath(0);

    function getPath(val){
      var aux= map(val, 0,1, 0, cellX *0.35);
      var x= cellX *0.35;
      var d="";
      d= d + "M" + (posX +x - aux) + "," +(posY);
      d= d + "L" + (posX +x + aux) + "," +(posY);
      d= d + "L" + (posX +cellX -((x-aux)*2)) + "," +(posY + (cellY/2));

      d= d + "L" + (posX +x + aux) + "," +(posY + cellY);
      d= d + "L" + (posX +x- aux) + "," +(posY + cellY);
      d= d + "L" + (posX +cellX -(x-aux)*2 -(aux*2)) + "," +(posY + (cellY/2));
      return d;
    }
    var aux = container.path(d).attr({
      fill: `${c1}`,
      "stroke-width": 0
    });
    this.shapesAnim.push(aux);
    div.addEventListener("mouseenter", function(){ hoverIn(); });
    div.addEventListener("mouseleave", function(){ hoverOut();});
  }

}

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

class Star1LSSM extends Tile{
  constructor(){
    super();
  }
  drawTile( posX, posY, cellX, cellY, value, c1, c2){
    fill(c1);
    var ang= TWO_PI/10;
    var aux=   PI/2;
    beginShape();
    for(var i=0; i<10; i++){
      if(i%2==1){
        vertex(((value*(cellX/2))*cos(ang*i+ aux)) +(posX), ((value* (cellY/2))*sin(ang *i + aux)) + (posY ));
      }else{
        vertex(((value*(cellX/4))*cos(ang*i+ aux)) +(posX), ((value* (cellY/4))*sin(ang *i + aux)) + (posY ));
      }
    }
    endShape(CLOSE);
  }
  drawTileG(c, posX, posY, cellX, cellY, value, c1, c2){
    c.fill(c1);
    var ang= TWO_PI/10;
    var aux=   PI/2;
    c.beginShape();
    for(var i=0; i<10; i++){
      if(i%2==1){
        c.vertex(((value*(cellX/2))*cos(ang*i+ aux)) +(posX), ((value* (cellY/2))*sin(ang *i + aux)) + (posY ));
      }else{
        c.vertex(((value*(cellX/4))*cos(ang*i+ aux)) +(posX), ((value* (cellY/4))*sin(ang *i + aux)) + (posY ));
      }
    }
    c.endShape(CLOSE);
  }
    drawTileSVG(container,posX, posY, cellX, cellY, value,c1, c2){
    for(var i=0; i<10; i++){
      var x= ((value*(cellX/2))*cos(ang*i+ aux)) +(posX+cellX/2);
      var y= ((value* (cellY/2))*sin(ang *i + aux)) + (posY +cellY/2);
      if(i!=0){
        d= d + "L" + x + "," +y;
      }else{
        d= d + "M" + x + "," +y;
      }
    }
    this.shapes = container.path(d).attr({
      fill: `${c1}`,
      "stroke-width": 0
    });
  }
  getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){
    var ang= TWO_PI/10;
    var aux=  -PI/2;
    var d ="";
    var d1="";
    var d2 ="";
    function hoverIn(){
      var r = aux.attr('path').valueOf() == d2 ? d1 : d2;                  //ALERT
      aux.animate({path: r}, tLSpeed, hoverIn);
    };
    function hoverOut(){
      aux.stop();
      //aux.animate({path: d}, tLSpeed);
      aux.attr({path: d});
    }

    d = getPath(value);
    d1= getPath(1);
    d2= getPath(0);

    function getPath(val){
      var d="";
      for(var i=0; i<10; i++){
        var x, y;

        if(i%2==1){
          x= ((val*(cellX/3.5))*cos(ang*i+ aux)) +(posX+cellX/2);
          y= ((val* (cellY/3.5))*sin(ang *i + aux)) + (posY +cellY/2);
        }else{
          x= ((val*(cellX/2))*cos(ang*i+ aux)) +(posX+cellX/2);
          y= ((val* (cellY/2))*sin(ang *i + aux)) + (posY +cellY/2);
        }
        if(i!=0){
          d= d + "L" + x + "," +y;
        }else{
          d= d + "M" + x + "," +y;
        }
      }
      return d;
    }
    var aux = container.path(d).attr({
      fill: `${c1}`,
      "stroke-width": 0
    });
    this.shapesAnim.push(aux);
    div.addEventListener("mouseenter", function(){ hoverIn(); });
    div.addEventListener("mouseleave", function(){ hoverOut();});
  }

}


//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------



class Bar1LMSM extends Tile{
  constructor(){
    super();
  }

  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    fill(c1);
    rectMode(CENTER);
    rect(posX , posY , cellX , cellY*value);
  }
  drawTileG(c, posX, posY, cellX, cellY, value, c1, c2){
    c.fill(c1);
    c.rectMode(CENTER);
    c.rect(posX , posY , cellX , cellY*value);
  }

  drawTileSVG(container,posX, posY, cellX, cellY, value,c1, c2){
    this.shapes= container.rect(posX + (cellX- cellX*value)/2,posY + (cellY-cellY*value)/2, cellX , cellY*value).attr({
      fill: `${c1}`,
      "stroke-width": 0
    });;
  }
  animateTilesSVG(value, speed){
    this.shapes.animate({height: cellY*value,
                y: posY + (cellY-cellY*value)/2
              }, speed);
  }
  getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){
    function hoverIn(){
      var r = aux.attr('height') == 0 ? cellY : 0;
      aux.animate({height:r,
        y: posY + (cellY-r)/2
      }, tLSpeed, hoverIn);
    };
    function hoverOut(){
      aux.stop();
      /*aux.animate({height: cellY*value,
                  y: posY + (cellY-cellY*value)/2
                }, tLSpeed); */
      aux.attr({height: cellY*value,
            y: posY + (cellY-cellY*value)/2
      });
    }
    var aux = container.rect( posX , posY + (cellY-cellY*value)/2, cellX * 1, cellY*value).attr({
      fill: `${c1}`,
      "stroke-width": 0
    });
    this.shapesAnim.push(aux);
    div.addEventListener("mouseenter", function(){ hoverIn(); });
    div.addEventListener("mouseleave", function(){ hoverOut();});

  }

}

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------



class Pupil2LSSM extends Tile{
  constructor(){
    super();
  }

  drawTile(posX, posY, cellX, cellY, value, c1, c2){
  //  if(value>0.005){
      fill(c1);
      ellipseMode(CENTER);
      ellipse(posX , posY, cellX , cellY);
      fill(c2);
      ellipse(posX , posY, cellX * (1-value), cellY*(1-value));
    //}
  }
  drawTileG(c,posX, posY, cellX, cellY, value, c1, c2){
    //if(value!=0){
    c.fill(c1);
    c.ellipseMode(CENTER);
    c.ellipse(posX, posY, cellX , cellY);
    c.fill(c2);
    c.ellipse(posX, posY, cellX * (1-value), cellY*(1-value));
    //}
  }
  drawTileSVG(container,posX, posY, cellX, cellY, value,c1, c2){

  }
  animateTilesSVG(value, speed){
    this.shapes.animate({width: cellX * value,
                height: cellY*value,
                x: posX + (cellX- cellX*value)/2,
                y: posY + (cellY-cellY*value)/2
              }, speed);
  }
getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){
    cellX= cellX/2;
    cellY= cellY/2;

    function hoverIn(){
      var r = aux.attr('r') == cellX ? 0 : cellX;
      aux.animate({r: r}, tLSpeed, hoverIn);
    };
    function hoverOut(){
      aux.stop();
      //aux.animate({r: cellX * (1-value)}, tLSpeed);
      aux.attr({r: cellX * (1-value)});
    }

    var aux1=container.circle(posX + (cellX), posY +(cellY), cellX , cellY).attr({
      fill: `${c1}`,
      "stroke-width": 0
    });
    var aux = container.circle(posX + (cellX), posY +(cellY), cellX * (1-value), cellY*(1-value)).attr({
      fill: `${c2}`,
      "stroke-width": 0
    });
    this.shapesAnim.push(aux1);
    this.shapesAnimB.push(aux);
    div.addEventListener("mouseenter", function(){ hoverIn(); });
    div.addEventListener("mouseleave", function(){ hoverOut();});
  }

}


//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------



class RecPupil2LSSM extends Tile{
  constructor(){
    super();
  }

  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    fill(c1);
    rectMode(CENTER);
    rect(posX , posY, cellX , cellY);
    fill(c2);
    rect(posX , posY, cellX * (1-value), cellY*(1-value));
  }

  drawTileG(c,posX, posY, cellX, cellY, value, c1, c2){
    c.fill(c1);
    c.rectMode(CENTER);
    c.rect(posX , posY, cellX , cellY);
    c.fill(c2);
    c.rect(posX , posY, cellX * (1-value), cellY*(1-value));
  }
  drawTileSVG(container,posX, posY, cellX, cellY, value,c1, c2){

  }
  animateTilesSVG(value, speed){
    this.shapes.animate({width: cellX * value,
                height: cellY*value,
                x: posX + (cellX- cellX*value)/2,
                y: posY + (cellY-cellY*value)/2
              }, speed);
  }
getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){
    var aux;
    function hoverIn(){
      var r = aux.attr('width') == cellX ? 0 : cellX;
      aux.animate({width: r,
        height:r,
        x: posX + (cellX- r)/2,
        y: posY + (cellY-r)/2
      }, tLSpeed, hoverIn);
    };
    function hoverOut(){
      aux.stop();
      aux.attr({width: cellX * (1-value),
                  height: cellY*(1-value),
                  x: posX + (cellX- cellX*(1-value))/2,
                  y: posY + (cellY-cellY*(1-value))/2
                });
      /*aux.animate({width: cellX * (1-value),
                  height: cellY*(1-value),
                  x: posX + (cellX- cellX*(1-value))/2,
                  y: posY + (cellY-cellY*(1-value))/2
                }, tLSpeed); */
    }

    var aux1 =container.rect( posX + (cellX- cellX)/2, posY + (cellY-cellY)/2, cellX , cellY).attr({
      fill: `${c1}`,
      "stroke-width": 0
    });
    var aux = container.rect( posX + (cellX- cellX*(1-value))/2, posY + (cellY-cellY*(1-value))/2, cellX * (1-value), cellY*(1-value)).attr({
      fill: `${c2}`,
      "stroke-width": 0
    });
    this.shapes=aux;

    this.shapesAnim.push(aux1);
    this.shapesAnimB.push(aux);

    div.addEventListener("mouseenter", function(){ hoverIn(); });
    div.addEventListener("mouseleave", function(){ hoverOut();});
  }

}
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

class Octogon1LMSM extends Tile{
  constructor(){
    super();

  }
  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    fill(c1);
    var n=8; var ang= TWO_PI/n; var aux=  PI/2; var d ="";
    // noStroke();
    beginShape();
    for(var i=0; i<n; i++){
      if(i%2==1){
        vertex(((value*(cellX/2))*cos(ang*i+ aux)) +(posX), ((value* (cellY/2))*sin(ang *i + aux)) + (posY ));
      }else{
        vertex(((1*(cellX/2))*cos(ang*i+ aux)) +(posX), ((1* (cellY/2))*sin(ang *i + aux)) + (posY ));
      }
    }
    endShape(CLOSE);
  }
  drawTileG(c,posX, posY, cellX, cellY, value, c1, c2){
    c.fill(c1);
    var n=8; var ang= TWO_PI/n; var aux=  PI/2; var d ="";
    // c.noStroke();
    c.beginShape();
    for(var i=0; i<n; i++){
      if(i%2==1){
        c.vertex(((value*(cellX/2))*cos(ang*i+ aux)) +(posX), ((value* (cellY/2))*sin(ang *i + aux)) + (posY ));
      }else{
        c.vertex(((1*(cellX/2))*cos(ang*i+ aux)) +(posX), ((1* (cellY/2))*sin(ang *i + aux)) + (posY ));
      }
    }
    c.endShape(CLOSE);
  }
  drawTileSVG(){

  }
  getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){
    var n=8;
    var ang= TWO_PI/n;
    var aux=  PI/2;
    var d ="";
    var d2 ="";
    var d1="";
    function hoverIn(){
      var r = aux.attr('path').valueOf() == d2 ? d1 : d2;
      aux.animate({path: r}, tLSpeed, hoverIn);
    };
    function hoverOut(){
      aux.stop();
      aux.attr({path: d});
      //aux.animate({path: d}, tLSpeed);
    }

    d = getPath(value);
    d1= getPath(1);
    d2= getPath(0);


    function getPath(val){
      var d="";
      for(var i=0; i<n; i++){
        var x, y;
        if(i%2==1){
          x= ((val*(cellX/2))*cos(ang*i+ aux)) +(posX+cellX/2);
          y= ((val* (cellY/2))*sin(ang *i + aux)) + (posY +cellY/2);
        }else{
          x= ((1*(cellX/2))*cos(ang*i+ aux)) +(posX+cellX/2);
          y= ((1* (cellY/2))*sin(ang *i + aux)) + (posY +cellY/2);
        }
        if(i!=0){
          d= d + "L" + x + "," +y;
        }else{
          d= d + "M" + x + "," +y;
        }
      }
      return d;
    }

    var aux = container.path(d).attr({
      fill: `${c1}`,
      "stroke-width": 0
    });
    this.shapesAnim.push(aux);
    div.addEventListener("mouseenter", function(){ hoverIn(); });
    div.addEventListener("mouseleave", function(){ hoverOut();});

  }
}

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

class Shuriken1LMRM extends Tile{
  constructor(){
    super();

  }
  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    fill(c1);
    var n=8;var ang= TWO_PI/n;var aux=  PI/2;var d ="";
    beginShape();
    for(var i=0; i<n; i++){
      if(i%2==1){
        curveVertex(((value*(cellX/2))*cos(ang*i+ aux)) +(posX), ((value* (cellY/2))*sin(ang *i + aux)) + (posY ));
      }else{
        //orcurve?
        vertex(((value*(cellX/2))*cos(ang*i+ aux)) +(posX), ((value* (cellY/2))*sin(ang *i + aux)) + (posY ));
        vertex(((1*(cellX/2))*cos(ang*i+ aux)) +(posX), ((1* (cellY/2))*sin(ang *i + aux)) + (posY ));
      }
    }
    endShape(CLOSE);
  }
  drawTileG(c,posX, posY, cellX, cellY, value, c1, c2){
    c.fill(c1);
    var n=8;var ang= TWO_PI/n;var aux=  PI/2;var d ="";
    c.beginShape();
    for(var i=0; i<n; i++){
      if(i%2==1){
        c.curveVertex(((value*(cellX/2))*cos(ang*i+ aux)) +(posX), ((value* (cellY/2))*sin(ang *i + aux)) + (posY ));
      }else{
        //orcurve?
        c.vertex(((value*(cellX/2))*cos(ang*i+ aux)) +(posX), ((value* (cellY/2))*sin(ang *i + aux)) + (posY ));
        c.vertex(((1*(cellX/2))*cos(ang*i+ aux)) +(posX), ((1* (cellY/2))*sin(ang *i + aux)) + (posY ));
      }
    }
    c.endShape(CLOSE);
  }
  getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){
    var e = createGraphics(cellX, cellY, SVG);
    posX= posX + cellX/2;
    posY= posY + cellY/2;
    e.id("peep");

    e.noStroke();
    e.fill(c2);
    e.rectMode(CENTER);
    e.rect(posX, posY,cellX, cellY);
    e.fill(c1);
    var n=8;var ang= TWO_PI/n;var aux=  PI/2;var d ="";
    e.beginShape();
    for(var i=0; i<n; i++){
      if(i%2==1){
        e.curveVertex(((value*(cellX/2))*cos(ang*i+ aux)) +(posX), ((value* (cellY/2))*sin(ang *i + aux)) + (posY ));
      }else{
        //orcurve?
        e.vertex(((value*(cellX/2))*cos(ang*i+ aux)) +(posX), ((value* (cellY/2))*sin(ang *i + aux)) + (posY ));
        e.vertex(((1*(cellX/2))*cos(ang*i+ aux)) +(posX), ((1* (cellY/2))*sin(ang *i + aux)) + (posY ));
      }
    }
    e.endShape(CLOSE);
    var f= document.querySelector("#peep").getElementsByTagName("svg")[0];
    container= f;
    div.getElementsByTagName("svg")[0].remove();
    div.appendChild(f);
    this.div= div;
    document.querySelector("#peep").remove();
  }
}
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

class Tri2LSSM extends Tile{
  constructor(){
    super();
  }
  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    fill(c1);
    var auxX= map(value, 0,1,0,cellX);
    var auxY= map(value, 0,1, 0,cellY);
    posX = posX -cellX/2;
    posY= posY - cellY/2;
    beginShape();
    vertex(posX, posY);
    vertex(posX + auxX, posY);
    vertex(posX, posY+auxY);
    endShape(CLOSE);

    beginShape();
    vertex(posX + cellX, posY+cellY);
    vertex(posX + cellX - auxX, posY+cellY);
    vertex(posX + cellX, posY+cellY-auxY);
    endShape(CLOSE);
  }
  drawTileG(c,posX, posY, cellX, cellY, value, c1, c2){
    c.fill(c1);
    var auxX= map(value, 0,1,0,cellX);
    var auxY= map(value, 0,1, 0,cellY);
    posX = posX -cellX/2;
    posY= posY - cellY/2;
    c.beginShape();
    c.vertex(posX, posY);
    c.vertex(posX + auxX, posY);
    c.vertex(posX, posY+auxY);
    c.endShape(CLOSE);

    c.beginShape();
    c.vertex(posX + cellX, posY+cellY);
    c.vertex(posX + cellX - auxX, posY+cellY);
    c.vertex(posX + cellX, posY+cellY-auxY);
    c.endShape(CLOSE);
  }
  getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){

    var d ="";var d1 ="";var d2 ="";var b=""; var b1=""; var b2="";

        function hoverIn(){
          var r = tri1.attr('path').valueOf() == d2 ? d1 : d2;
          tri1.animate({path: r}, tLSpeed, hoverIn);

          var r1 = tri2.attr('path').valueOf() == b2 ? b1 : b2;
          tri2.animate({path: r1}, tLSpeed, hoverIn);
        };

        function hoverOut(){
          tri1.stop();
          tri2.stop();
          tri1.attr({path: d});
          tri2.attr({path: b});
        }
        d= getPath(value);
        d1= getPath(1);
        d2= getPath(0);

        b= getPath2(value);
        b1= getPath2(1);
        b2= getPath2(0);

        function getPath(val){
          var d="";
          var auxX= map(val, 0,1,0,cellX);
          var auxY= map(val, 0,1, 0,cellY);
          d= d + "M" + posX + ","+ posY;
          d= d + "L" + parseFloat(posX + auxX) + "," + parseFloat(posY);
          d= d + "L" + parseFloat(posX ) + "," + parseFloat(posY+auxY);
          return d;
        }
        function getPath2(val){
          var d="";
          var auxX= map(val, 0,1,0,cellX);
          var auxY= map(val, 0,1, 0,cellY);
          d= d + "M" + parseFloat(posX + cellX) + ","+ parseFloat(posY + cellY);
          d= d + "L" + parseFloat(posX + cellX - auxX) + "," + parseFloat(posY+cellY);
          d= d + "L" + parseFloat(posX + cellX ) + "," + parseFloat(posY+cellY-auxY);
          return d;
        }

        var tri1 = container.path(d).attr({
          fill: `${c1}`,
          "stroke-width": 0
        });
        var tri2 = container.path(b).attr({
          fill: `${c1}`,
          "stroke-width": 0
        });
        this.shapesAnim.push(tri1);
        this.shapesAnim.push(tri2);

        div.addEventListener("mouseenter", function(){ hoverIn(); });
        div.addEventListener("mouseleave", function(){ hoverOut();});
      }
}

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

class Tri4LSSA extends Tile{
  constructor(){
    super();
  }
  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    fill(c1);
    let auxX= map(value, 0, 1,  0, (cellX/2));
    let auxY= map(value, 0, 1, 0, (cellY/2));

    for(var i=0; i<4; i++){
      push();
      translate(posX , posY );
      rotate(PI/2* i);
      beginShape();
      if(i%2==0){
        vertex(0, (cellY/2) - auxY);
        vertex( -auxX, cellY/2);
        vertex(auxX, cellY/2);
      }else{
        vertex(0, (cellX/2) - auxX);
        vertex( -auxY, cellX/2);
        vertex(auxY, cellX/2);
      }
      endShape(CLOSE);
      pop();
    }
  }
  drawTileG(c,posX, posY, cellX, cellY, value, c1, c2){
    c.fill(c1);
    let auxX= map(value, 0, 1,  0, (cellX/2));
    let auxY= map(value, 0, 1, 0, (cellY/2));

    for(var i=0; i<4; i++){
      c.push();
      c.translate(posX , posY );
      c.rotate(PI/2* i);
      c.beginShape();
      if(i%2==0){
        c.vertex(0, (cellY/2) - auxY);
        c.vertex( -auxX, cellY/2);
        c.vertex(auxX, cellY/2);
      }else{
        c.vertex(0, (cellX/2) - auxX);
        c.vertex( -auxY, cellX/2);
        c.vertex(auxY, cellX/2);
      }
      c.endShape(CLOSE);
      c.pop();
    }
  }
  getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){        // FIX
    let d ="";
    let d1="";
    let d2="";
      function hoverIn(){
        var r = aux[0].attr('path').valueOf() == d2 ? d1 : d2;
        for(var i=0; i<4; i++){
          var n= 90*i;
          aux[i].animate({
            path: r
            //'transform':`${n}`,
          }, tLSpeed, hoverIn);
        }
      };
    function hoverOut(){
      for(var i=0; i<4; i++){
        var n= 90*i;
        aux[i].stop();
        aux[i].attr({
          path: d
          });
      }
    }
    d= getPath(value);
    d1= getPath(1);
    d2= getPath(0);

    function getPath(val){
      var d="";
      var auxX= map(val, 0,1,0,cellX/2);
      var auxY= map(val, 0,1, 0,cellY/2);
      d= d + "M" + parseFloat(posX + (cellX/2) - auxX) + ","+ posY;
      d= d + "L" + parseFloat(posX + (cellX/2) + auxX) + "," + posY;
      d= d + "L" + parseFloat(posX + (cellX/2) ) + "," + parseFloat(auxY);
      return d;
    }
    var aux=[];
    for(var i=0; i<4; i++){
      aux.push(
        container.path(d).attr({
          fill: `${c1}`,
          "stroke-width": 0
        })
      );
      aux[i].rotate(90*i, posX+cellX/2, posY+cellY/2);
    }
    this.shapesAnim =aux;

    div.addEventListener("mouseenter", function(){ hoverIn(); });
    div.addEventListener("mouseleave", function(){ hoverOut();});
  }
}


//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

class Tri4LSSC extends Tile{ //CORNER TRIANGLES
  constructor(){
    super();
  }
  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    value=map(value,0,1,0,0.97);
      var y=0;var x=cellX/2;
      if(value<=0.5){ x= map(value, 0, 0.5, 0, cellX/2); }else{ y =map(value -0.5, 0, 0.5, 0, cellY/2); };

      push();
      translate(posX, posY  );
      fill(c1);
      rectMode(CENTER);
      rect(0, 0, cellX, cellY);
      fill(c2);

      beginShape();
          vertex((-cellX/2) + x, (-cellY/2) +y);
          vertex((cellX/2) - x, (-cellY/2) +y);

          vertex((cellX/2) - y , (-cellY/2) + x);
          vertex((cellX/2) - y, (cellY/2) -x);

          vertex(((-cellX/2) + x)*-1, ((-cellY/2) +y)*-1);
          vertex(((cellX/2) - x)*-1, ((-cellY/2) +y)*-1);

          vertex(((cellX/2) - y)*-1 , ((-cellY/2) + x)*-1);
          vertex(((cellX/2) - y)*-1, ((cellY/2) -x)*-1);
      endShape(CLOSE);
      translate(-posX, -posY );
      pop();
    }



  drawTileG(c, posX, posY, cellX, cellY, value, c1, c2){
    value=map(value,0,1,0,0.97);
      var y=0;var x=cellX/2;
      if(value<=0.5){ x= map(value, 0, 0.5, 0, cellX/2); }else{ y =map(value -0.5, 0, 0.5, 0, cellY/2); };

      c.push();
      c.translate(posX, posY  );
      c.fill(c1);
      c.rectMode(CENTER);
      c.rect(0, 0, cellX, cellY);
      c.fill(c2);

      c.beginShape();
          c.vertex((-cellX/2) + x, (-cellY/2) +y);
          c.vertex((cellX/2) - x, (-cellY/2) +y);

          c.vertex((cellX/2) - y , (-cellY/2) + x);
          c.vertex((cellX/2) - y, (cellY/2) -x);

          c.vertex(((-cellX/2) + x)*-1, ((-cellY/2) +y)*-1);
          c.vertex(((cellX/2) - x)*-1, ((-cellY/2) +y)*-1);

          c.vertex(((cellX/2) - y)*-1 , ((-cellY/2) + x)*-1);
          c.vertex(((cellX/2) - y)*-1, ((cellY/2) -x)*-1);
      c.endShape(CLOSE);
      c.translate(-posX, -posY );
      c.pop();
  }
  getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){        // FIX
    let d ="";
    let d1="";
    let d2="";
    function getPath(val){
      var f="";
      var auxX= map(val, 0,1,0,cellX);
      var auxY= map(val, 0,1, 0,cellY);
      f= f + "M" + posX + ","+ posY;
      f= f + "L" + parseFloat(posX + auxX) + "," + parseFloat(posY);
      f= f + "L" + parseFloat(posX ) + "," + parseFloat(posY+auxY);
      return f;
    }

    d= getPath(value);
    d1= getPath(1);
    d2= getPath(0);

    function hoverIn(){
        var r = aux[0].attr('path').valueOf() == d2 ? d1 : d2;
        for(var i=0; i<4; i++){
          aux[i].animate({
            path: r
          }, tLSpeed, hoverIn);
        }
    };
    function hoverOut(){
      for(var i=0; i<4; i++){
        aux[i].stop();
        aux[i].attr({
          path: d
          });
      }
    }
    var aux=[];
    for(var i=0; i<4; i++){
      aux.push(
        container.path(d).attr({
          fill: `${c1}`,
          "stroke-width": 0
        })
      );
      aux[i].rotate(90*i, posX+cellX/2, posY+cellY/2);
    }
    this.shapesAnim =aux;
    div.addEventListener("mouseenter", function(){ hoverIn(); });
    div.addEventListener("mouseleave", function(){ hoverOut();});
  }
}


//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

class TriRec5LSSC extends Tile{
  constructor(){
    super();
  }
  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    fill(c1);
    var auxX= map(value, 0, 1,  0, cellX/2);
    var auxY= map(value, 0, 1, 0, cellY/2);
    var x= map(value, 0, 1, 0, cellX/2);
    var y= map(value, 0, 1, 0, cellY/2);
    push();
    translate(posX , posY );
    fill(c1);
    rectMode(CENTER);
    rect(0, 0, cellX, cellY);
    fill(c2);
    beginShape();
        vertex(-cellX/2 + x, -cellY/2);
        vertex( cellX/2 -x, -cellY/2);

        vertex(cellX/2  , -cellY/2 + y);
        vertex(cellX/2 , cellY/2 -y);

        vertex(cellX/2 -x,  cellY/2);
        vertex(-cellX/2 +x, cellY/2);

        vertex(-cellX/2 , cellY/2 -y);
        vertex(-cellX/2, -cellY/2 + y);
    endShape(CLOSE);
    fill(c1);
    beginShape();
      vertex(0, -auxY);
      vertex( auxX, 0);
      vertex(0, auxY);
      vertex(-auxX,0);
    endShape(CLOSE);
    pop();
  }
  drawTileG(c, posX, posY, cellX, cellY, value, c1, c2){
    c.fill(c1);
    var auxX= map(value, 0, 1,  0, cellX/2);
    var auxY= map(value, 0, 1, 0, cellY/2);
    var x= map(value, 0, 1, 0, cellX/2);
    var y= map(value, 0, 1, 0, cellY/2);
    c.push();
    c.translate(posX , posY );
    c.fill(c1);
    c.rectMode(CENTER);
    c.rect(0, 0, cellX, cellY);
    c.fill(c2);
    c.beginShape();
        c.vertex(-cellX/2 + x, -cellY/2);
        c.vertex( cellX/2 -x, -cellY/2);

        c.vertex(cellX/2  , -cellY/2 + y);
        c.vertex(cellX/2 , cellY/2 -y);

        c.vertex(cellX/2 -x,  cellY/2);
        c.vertex(-cellX/2 +x, cellY/2);

        c.vertex(-cellX/2 , cellY/2 -y);
        c.vertex(-cellX/2, -cellY/2 + y);
    c.endShape(CLOSE);
    c.fill(c1);
    c.beginShape();
      c.vertex(0, -auxY);
      c.vertex( auxX, 0);
      c.vertex(0, auxY);
      c.vertex(-auxX,0);
    c.endShape(CLOSE);
    c.pop();
  }

  getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){        // FIX
    let d =""; let d1=""; let d2="";
    let e =""; let e1=""; let e2="";
    function getPath(val){
      var f="";
      var auxX= map(val, 0,1,0,cellX/2);
      var auxY= map(val, 0,1, 0,cellY/2);
      f= f + "M" + posX + ","+ posY;
      f= f + "L" + parseFloat(posX + auxX) + "," + parseFloat(posY);
      f= f + "L" + parseFloat(posX ) + "," + parseFloat(posY+auxY);
      return f;
    }
    function getPath2(val){
      var f="";
      var auxX= map(val, 0,1,0,cellX/2);
      var auxY= map(val, 0,1, 0,cellY/2);
      f= f + "M" + (posX+(cellX/2)) + ","+ (posY-auxY+(cellY/2));
      f= f + "L" + (posX +(cellX/2) +auxX) + "," + (posY+(cellY/2));
      f= f + "L" + (posX +(cellX/2)) + "," +(posY+auxY+(cellY/2));
      f= f + "L" + (posX-auxX +(cellX/2)) + "," +(posY+(cellY/2));
      return f;
    }
    d= getPath(value);d1= getPath(1);d2= getPath(0);
    e= getPath2(value);e1= getPath2(1);e2= getPath2(0);

    function hoverIn(){
        var r = aux[0].attr('path').valueOf() == d2 ? d1 : d2;
        for(var i=0; i<4; i++){
          aux[i].animate({ path: r }, tLSpeed, hoverIn);
        };
        var r2 = aux2.attr('path').valueOf() == e2 ? e1 : e2;
          aux2.animate({ path: r2 }, tLSpeed, hoverIn);
    };
    function hoverOut(){
      aux2.stop();
      for(var i=0; i<4; i++){
        aux[i].stop();
        aux[i].attr({path: d});
      }
      aux2.attr({ path: e});
    }
    var aux=[];
    for(var i=0; i<4; i++){
      aux.push(
        container.path(d).attr({
          fill: `${c1}`,
          "stroke-width": 0
        })
      );
      aux[i].rotate(90*i, posX+cellX/2, posY+cellY/2);
    }
    var aux2 = container.path(e).attr({
        fill: `${c1}`,
        "stroke-width": 0
      });


    this.shapesAnim =aux;
    this.shapesAnim.push(aux2);
    div.addEventListener("mouseenter", function(){ hoverIn(); });
    div.addEventListener("mouseleave", function(){ hoverOut();});
  }
}
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------


//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

class Arc2LSSA extends Tile{
  constructor(){
    super();
  }
  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    fill(c1);
    var ang= TWO_PI/3;
    var aux= PI;

    arc(posX, posY, cellX *value, cellY * value, -PI/2,PI/2, CHORD);
    //arc(posX-(cellX *value/2), posY, cellX *value, cellY * value, -PI/2,PI/2, CHORD);
    arc(posX-(cellX/2), posY, cellX *value, cellY * value, -PI/2,PI/2, CHORD);

  }
  drawTileG(c, posX, posY, cellX, cellY, value, c1, c2){
    c.fill(c1);
    var ang= TWO_PI/3;
    var aux= PI/6;
    c.arc(posX, posY, cellX *value, cellY * value, -PI/2,PI/2, CHORD);
    //c.arc(posX-(cellX *value/2), posY, cellX *value, ceLLY * value, -PI/2,PI/2, CHORD);
    c.arc(posX-(cellX/2), posY, cellX *value, cellY * value, -PI/2,PI/2, CHORD);
  }

  drawTileSVG(container,posX, posY, cellX, cellY, value,c1, c2){
  }
  getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){
    var e = createGraphics(cellX, cellY, SVG);
    posX= posX + cellX/2;
    posY= posY + cellY/2;
    e.id("peep");
    e.noStroke();
    e.fill(c2);
    e.rectMode(CENTER);
    e.rect(posX, posY,cellX, cellY);

    e.fill(c1);
    var ang= TWO_PI/3;
    var aux= PI/6;
    e.arc(posX, posY, cellX *value, cellY * value, -PI/2,PI/2, CHORD);
    e.arc(posX-(cellX/2), posY, cellX *value, cellY * value, -PI/2,PI/2, CHORD);

    var f= document.querySelector("#peep").getElementsByTagName("svg")[0];
    container= f;
    div.getElementsByTagName("svg")[0].remove();
    div.appendChild(f);
    this.div= div;
    document.querySelector("#peep").remove();
  }
}


//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

class Arc1LMSM extends Tile{
  constructor(){
    super();
  }
  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    fill(c1);
    var ang= map(value, 0,1, 0, TWO_PI);
    arc(posX, posY, cellX , cellY , -ang/2+PI, ang/2+PI, PIE);
  }
  drawTileG(c, posX, posY, cellX, cellY, value, c1, c2){
    c.fill(c1);
    var ang= map(value, 0,1, 0, TWO_PI);
    c.arc(posX, posY, cellX , cellY  , -ang/2+PI, ang/2+PI, PIE);
  }

  drawTileSVG(container,posX, posY, cellX, cellY, value,c1, c2){
    var ang= TWO_PI/3;
    var aux=  PI/6;
    var d ;
    for(var i=0; i<3; i++){
      var x= ((value*(cellX/2))*cos(ang*i+ aux)) +(posX+cellX/2);
      var y= ((value* (cellY/2))*sin(ang *i + aux)) + (posY +cellY/2);
      if(i!=0){
        d= d + "L" + x + "," +y;
      }else{
        d= d + "M" + x + "," +y;
      }
    }
    this.shapes = container.path(d).attr({
      fill: `${c1}`,
      "stroke-width": 0
    });
  }
  getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){
    var e = createGraphics(cellX, cellY, SVG);
    posX= posX + cellX/2;
    posY= posY + cellY/2;
    e.id("peep");
    e.noStroke();
    e.fill(c2);
    e.rectMode(CENTER);
    e.rect(posX, posY,cellX, cellY);

    e.fill(c1);
    var ang= TWO_PI/3;
    var aux= PI/6;
    e.fill(c1);
    var ang= map(value, 0,1, 0, TWO_PI);
    e.arc(posX, posY, cellX , cellY  , -ang/2+PI, ang/2+PI, PIE);
    var f= document.querySelector("#peep").getElementsByTagName("svg")[0];
    container= f;
    div.getElementsByTagName("svg")[0].remove();
    div.appendChild(f);
    this.div= div;
    document.querySelector("#peep").remove();
  }
}
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

class MoonTile extends Tile{
  constructor(){
    super();

  }
  drawTile(c, posX, posY, cellX, cellY, value, c1, c2){
    c.fill(c1);
    var ang= TWO_PI/10;
    var aux=   PI/2;
    c.beginShape();
    for(var i=0; i<3; i++){
      c.vertex(((value*(cellX/2))*cos(ang*i+ aux)) +(posX), ((value* (cellY/2))*sin(ang *i + aux)) + (posY ));
    }
    c.endShape(CLOSE);
  }
  getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){

  }
}
