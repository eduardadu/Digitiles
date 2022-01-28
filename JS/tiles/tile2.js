
class Tri2LSSA extends Tile{
  constructor(){
    super();
  }
  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    fill(c1);
    var center= cellX/4;
    var cw= map(value, 0,1, 0,cellX/4);
    var ch= map(value, 0,1, 0,cellY/2);
    for(var i=0; i<2; i++){
      var aux=0; if(i==0){aux=center;}else{aux=center*-1}
      push();
      translate(posX -aux, posY);
      beginShape();
        vertex(-cw , -ch);
        vertex(cw, 0);
        vertex(-cw, ch);
      endShape();
      pop();
    }
  }
  drawTileG(c ,posX, posY, cellX, cellY, value, c1, c2){
    c.fill(c1);
    var center= cellX/4;
    var cw= map(value, 0,1, 0,cellX/4);
    var ch= map(value, 0,1, 0,cellY/2);
    for(var i=0; i<2; i++){
      var aux=0; if(i==0){aux=center;}else{aux=center*-1}
      c.push();
      c.translate(posX -aux, posY);
      c.beginShape();
        c.vertex(-cw , -ch);
        c.vertex(cw, 0);
        c.vertex(-cw, ch);
      c.endShape();
      c.pop();
    }
  }

  drawTileSVG(container,posX, posY, cellX, cellY, value,c1, c2){
    this.shapes= container.rect(posX + (cellX- cellX*value)/2,posY + (cellY-cellY*value)/2, cellX * value, cellY*value).attr({
      fill: `${c1}`,
      "stroke-width": 0
    });;
  }
  animateTilesSVG(value, speed){
  }
  getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){

    let d =""; let d1=""; let d2="";
    let e =""; let e1=""; let e2="";

    function getPath(val){
      var f="";
      var cw= map(val, 0,1, 0,cellX/4);
      var ch= map(val, 0,1, 0,cellY/2);
      f= f + "M" + (posX -cw) + ","+ (posY -ch);
      f= f + "L" + parseFloat(posX +cw ) + "," + parseFloat(posY );
      f= f + "L" + parseFloat(posX -cw ) + "," + parseFloat(posY+ch );
      return f;
    }
    d= getPath(value);d1= getPath(1);d2= getPath(0);
    function hoverIn(){
        var r = aux[0].attr('path').valueOf() == d2 ? d1 : d2;
        for(var i=0; i<2; i++){
          aux[i].animate({ path: r }, tLSpeed, hoverIn);
        };
    };
    function hoverOut(){
      for(var i=0; i<2; i++){
        aux[i].stop();
        aux[i].attr({path: d});
      }
    }
    var center= cellX/4;
    var aux=[];
    for(var i=0; i<2; i++){
      var c=center;
      if(i==0){c=center;}else{c=center*-1}
      aux.push(
        container.path(d).attr({
          fill: `${c1}`,
          "stroke-width": 0
        })
      );
      aux[i].translate(c + cellX/2, cellY/2);
    }
    this.shapesAnim =aux;
    div.addEventListener("mouseenter", function(){ hoverIn(); });
    div.addEventListener("mouseleave", function(){ hoverOut();});
  }

}


//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

class Plus2LMSM extends Tile{
  constructor(){
    super();
  }
  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    value=map(value,0,1,0,0.95);
    fill(c1);
    var ang= TWO_PI/3;
    var aux= PI;
    rectMode(CENTER)
    rect(posX, posY, cellX , cellY*value);
    rect(posX, posY, cellX *value , cellY);
  }
  drawTileG(c, posX, posY, cellX, cellY, value, c1, c2){
    value=map(value,0,1,0,0.95);
    c.fill(c1);
    var ang= TWO_PI/3;
    var aux= PI;
    c.rectMode(CENTER)
    c.rect(posX, posY, cellX , cellY*value);
    c.rect(posX, posY, cellX *value , cellY);
  }

  drawTileSVG(container,posX, posY, cellX, cellY, value,c1, c2){

  }
  getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){
    let d =""; let d1=""; let d2="";
    function getPath(val){
      var f="";
      var cw= map(val, 0,1, 0,cellX/3);
      f= f + "M" + (-cw) + ","+ (-cellY/2);
      f= f + "L" + parseFloat(posX +cw ) + "," + parseFloat(-cellY/2);
      f= f + "L" + parseFloat(cw ) + "," + parseFloat(cellY/2 );
      f= f + "L" + parseFloat(-cw ) + "," + parseFloat(cellY/2 );
      return f;
    }
    d= getPath(value);d1= getPath(1);d2= getPath(0);
    function hoverIn(){
      var r = aux[0].attr('path').valueOf() == d2 ? d1 : d2;
      for(var i=0; i<2; i++){
        aux[i].animate({ path: r }, tLSpeed, hoverIn);
      };
    };
    function hoverOut(){
      for(var i=0; i<2; i++){
        aux[i].stop();
        aux[i].attr({path: d});
      }
    }
    var aux=[];
    for(var i=0; i<2; i++){
      aux.push(
        container.path(d).attr({
          fill: `${c1}`,
          "stroke-width": 0
        })
      );
      aux[i].rotate(90*i, posX+cellX/2, posY+cellY/2);
      aux[i].translate(cellX/2, cellY/2);
    }
    this.shapesAnim =aux;
    div.addEventListener("mouseenter", function(){ hoverIn(); });
    div.addEventListener("mouseleave", function(){ hoverOut();});
  }
}


//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

class Flower1LMRM extends Tile{
  constructor(){
    super();

  }
  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    noStroke();
    fill(c1);
    rectMode(CENTER);
    for(var i=0; i<4;i++){
      push();
      translate((posX ), (posY ) );
      rotate((TWO_PI/4 *i));
      arc( 0, (cellY/3/2 ) , cellX/3*2 *value , cellY/3*2*value , 0, -PI, PIE);
      pop();
    }
    strokeWeight(cellX/20);
    stroke(c2);
    rect(posX, posY, cellX/3 *value, cellY/3 *value);
  }
  drawTileG(c,posX, posY, cellX, cellY, value, c1, c2){
    c.noStroke();
    c.fill(c1);
    for(var i=0; i<4;i++){
      c.push();
      c.translate((posX ), (posY ) );
      c.rotate((TWO_PI/4 *i));
      c.arc( 0, (cellY/3/2), cellX/3*2 *value , cellY/3*2*value , 0, -PI, PIE);
      c.pop();
    }
    c.strokeWeight(cellX/20);
    c.stroke(c2);
    c.rectMode(CENTER);
    c.rect(posX, posY, cellX/3 *value, cellY/3 *value);
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
    for(var i=0; i<4;i++){
      e.push();
      e.translate((posX ), (posY ) );
      e.rotate((TWO_PI/4 *i));
      e.arc( 0, (cellY/3/2), cellX/3*2 *value , cellY/3*2*value , 0, -PI, PIE);
      e.pop();
    }
    e.strokeWeight(cellX/20);
    e.stroke(c2);
    e.rectMode(CENTER);
    e.rect(posX, posY, cellX/3 *value, cellY/3 *value);

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

class CirStar5LMRM extends Tile{
  constructor(){
    super();

  }
  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    noStroke();
    push();
    fill(c1);
    translate(posX, posY);
    for(var i=0; i<4;i++){
      rotate(TWO_PI/4 *i);
      ellipse((cellX/2/2),(cellY/2/2), cellX/1.5 *value, cellY/1.5 *value);
    }
    pop();
    strokeWeight(cellX/20);
    stroke(c2);
    fill(c1);
    ellipseMode(CENTER);
    ellipse(posX, posY, cellX/1.5 *value, cellY/1.5 *value);
  }
  drawTileG(c,posX, posY, cellX, cellY, value, c1, c2){
    c.noStroke();
    c.push();
    c.fill(c1);
    c.translate(posX, posY);
    for(var i=0; i<4;i++){
      c.rotate(TWO_PI/4 *i);
      c.ellipse((cellX/2/2),(cellY/2/2), cellX/1.5 *value, cellY/1.5 *value);
    }
    c.pop();
    c.strokeWeight(cellX/20);
    c.stroke(c2);
    c.fill(c1);
    c.ellipseMode(CENTER);
    c.ellipse(posX, posY, cellX/1.5 *value, cellY/1.5 *value);
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

    e.noStroke();
    e.push();
    e.fill(c1);
    e.translate(posX, posY);
    e.ellipseMode(CENTER);
    for(var i=0; i<4;i++){
      e.rotate(TWO_PI/4 *i);
      e.ellipse((cellX/2/2),(cellY/2/2), cellX/1.5 *value, cellY/1.5 *value);
    }
    e.pop();
    e.strokeWeight(cellX/15);
    e.stroke(c2);
    e.fill(c1);
    e.ellipseMode(CENTER);
    e.ellipse(posX, posY, cellX/1.5 *value, cellY/1.5 *value);

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

class Petal1LMRM extends Tile{
  constructor(){
    super();

  }
  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    value=map(value,0,1,1,0);
    push();
    translate(posX, posY);
    beginShape();
    fill(c1);

    vertex(-cellX/2, -cellY/2);
    bezierVertex(-cellX/2 + (cellX-cellX*value), -cellY/2,      cellX/2,  cellY/2- (cellY - cellY*value),     cellX/2, cellY/2);
    vertex(cellX/2, cellY/2);
    bezierVertex(cellX/2 - (cellX-cellX*value),  cellY/2,    -cellX/2 , -cellY/2+ (cellY - cellY*value),  -cellX/2, -cellY/2);

    vertex(-cellX/2, -cellY/2);
    endShape(CLOSE);
    pop();
  }
  drawTileG(c,posX, posY, cellX, cellY, value, c1, c2){
    value=map(value,0,1,1,0);
    c.push();
    c.translate(posX, posY);
    c.beginShape();
    c.fill(c1);
    c.vertex(-cellX/2, -cellY/2);
    c.bezierVertex(-cellX/2 + (cellX-cellX*value), -cellY/2,      cellX/2,  cellY/2- (cellY - cellY*value),     cellX/2, cellY/2);
    c.vertex(cellX/2, cellY/2);
    c.bezierVertex(cellX/2 - (cellX-cellX*value),  cellY/2,    -cellX/2 , -cellY/2+ (cellY - cellY*value),  -cellX/2, -cellY/2);
    c.endShape(CLOSE);
    c.pop();
  }
  getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){
    value=map(value,0,1,1,0);
    var e = createGraphics(cellX, cellY, SVG);
    posX= posX + cellX/2;
    posY= posY + cellY/2;
    e.id("peep");
    e.noStroke();
    e.fill(c2);
    e.rectMode(CENTER);
    e.rect(posX, posY,cellX, cellY);

    e.push();
    e.translate(posX, posY);
    beginShape();
    e.fill(c1);
    e.vertex(-cellX/2, -cellY/2);
    e.bezierVertex(-cellX/2 + (cellX-cellX*value), -cellY/2,      cellX/2,  cellY/2- (cellY - cellY*value),     cellX/2, cellY/2);
    e.vertex(cellX/2, cellY/2);
    e.bezierVertex(cellX/2 - (cellX-cellX*value),  cellY/2,    -cellX/2 , -cellY/2+ (cellY - cellY*value),  -cellX/2, -cellY/2);
    e.endShape(CLOSE);
    e.pop();

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

class Mix9LMRM extends Tile{
  constructor(){
    super();

  }
  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    noStroke();
    fill(c1);

    rectMode(CENTER);
    fill(c1);
    for(var i=0; i<4;i++){
      push();
      translate((posX ), (posY ) );
      rotate((TWO_PI/4 *i));
      rect(0,  (cellY/3/2)  , cellX/3 *value, cellY/3*value);
      arc( 0, (cellY/3/2)+ cellY/3/2*value, cellX/3 *value , cellY/3*value , 0, -PI, PIE);
      pop();
    }
  }
  drawTileG(c,posX, posY, cellX, cellY, value, c1, c2){
    c.fill(c1);
    for(var i=0; i<4;i++){
      c.push();
      c.translate((posX ), (posY ) );
      c.rotate((TWO_PI/4 *i));
      c.rect(0,  (cellY/3/2)  , cellX/3 *value, cellY/3*value);
      c.arc( 0, (cellY/3/2)+ cellY/3/2*value, cellX/3 *value , cellY/3*value , 0, -PI, PIE);
      c.pop();
    }
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
    for(var i=0; i<4;i++){
      e.push();
      e.translate((posX ), (posY ) );
      e.rotate((TWO_PI/4 *i));
      e.rect(0,  (cellY/3/2)  , cellX/3 *value, cellY/3*value);
      e.arc( 0, (cellY/3/2)+ cellY/3/2*value, cellX/3 *value , cellY/3*value , 0, -PI, PIE);
      e.pop();
    }

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

class CurveRect1LMRM extends Tile{
  constructor(){
    super();

  }
  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    value=map(value,0,1,1,0);
    push();
    translate(posX, posY);
    beginShape();
    fill(c1);

    vertex(-cellX/2, -cellY/2);
    bezierVertex(-cellX/2+ (cellX/2*value) , -cellY/2+ (cellY/2*value),      cellX/2- (cellX/2*value), -cellY/2+ (cellY/2*value),      cellX/2, -cellY/2);
    vertex(cellX/2, -cellY/2);
    bezierVertex(cellX/2 - (cellX/2*value), -cellY/2+ (cellY/2*value),      cellX/2- (cellY/2*value),  cellY/2- (cellY/2*value),     cellX/2, cellY/2);

    vertex(cellX/2, cellY/2);
    bezierVertex(cellX/2 - (cellX/2*value),  cellY/2- (cellY/2*value),    -cellX/2+ (cellX/2*value), cellY/2- (cellY/2*value),  -cellX/2, cellY/2);

    vertex(-cellX/2, cellY/2);
    bezierVertex(-cellX/2 + (cellX/2*value),  cellY/2- (cellY/2*value),    -cellX/2+ (cellX/2*value) , -cellY/2+ (cellY/2*value), -cellX/2, -cellY/2);
    vertex(-cellX/2, -cellY/2);
    endShape(CLOSE);
    pop();
  }
  drawTileG(c,posX, posY, cellX, cellY, value, c1, c2){
    value=map(value,0,1,1,0);
    c.push();
    c.translate(posX, posY);
    c.beginShape();
    c.fill(c1);
    c.vertex(-cellX/2, -cellY/2);
    c.bezierVertex(-cellX/2+ (cellX/2*value) , -cellY/2+ (cellY/2*value),      cellX/2- (cellX/2*value), -cellY/2+ (cellY/2*value),      cellX/2, -cellY/2);
    c.vertex(cellX/2, -cellY/2);
    c.bezierVertex(cellX/2 - (cellX/2*value), -cellY/2+ (cellY/2*value),      cellX/2- (cellY/2*value),  cellY/2- (cellY/2*value),     cellX/2, cellY/2);

    c.vertex(cellX/2, cellY/2);
    c.bezierVertex(cellX/2 - (cellX/2*value),  cellY/2- (cellY/2*value),    -cellX/2+ (cellX/2*value), cellY/2- (cellY/2*value),  -cellX/2, cellY/2);

    c.vertex(-cellX/2, cellY/2);
    c.bezierVertex(-cellX/2 + (cellX/2*value),  cellY/2- (cellY/2*value),    -cellX/2+ (cellX/2*value) , -cellY/2+ (cellY/2*value), -cellX/2, -cellY/2);
    c.vertex(-cellX/2, -cellY/2);
    c.endShape(CLOSE);
    c.pop();
  }
  getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){
    value=map(value,0,1,1,0);
    var e = createGraphics(cellX, cellY, SVG);
    posX= posX + cellX/2;
    posY= posY + cellY/2;
    e.id("peep");
    e.noStroke();
    e.fill(c2);
    e.rectMode(CENTER);
    e.rect(posX, posY,cellX, cellY);

    e.push();
    e.translate(posX, posY);
    beginShape();
    e.fill(c1);
    e.vertex(-cellX/2, -cellY/2);
    e.bezierVertex(-cellX/2+ (cellX/2*value) , -cellY/2+ (cellY/2*value),      cellX/2- (cellX/2*value), -cellY/2+ (cellY/2*value),      cellX/2, -cellY/2);
    e.vertex(cellX/2, -cellY/2);
    e.bezierVertex(cellX/2 - (cellX/2*value), -cellY/2+ (cellY/2*value),      cellX/2- (cellY/2*value),  cellY/2- (cellY/2*value),     cellX/2, cellY/2);

    e.vertex(cellX/2, cellY/2);
    e.bezierVertex(cellX/2 - (cellX/2*value),  cellY/2- (cellY/2*value),    -cellX/2+ (cellX/2*value), cellY/2- (cellY/2*value),  -cellX/2, cellY/2);

    e.vertex(-cellX/2, cellY/2);
    e.bezierVertex(-cellX/2 + (cellX/2*value),  cellY/2- (cellY/2*value),    -cellX/2+ (cellX/2*value) , -cellY/2+ (cellY/2*value), -cellX/2, -cellY/2);
    e.vertex(-cellX/2, -cellY/2);
    e.endShape(CLOSE);
    e.pop();

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

class Life1LMRM extends Tile{
  constructor(){
    super();

  }
  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    var cx= map(value,0,1,-cellX/4, cellX/4);
    var cy= map(value,0,1,-cellY/4, cellY/4);
    var c2= map(value,0,1,-cellY/4, cellY/4);
    push();
    translate(posX, posY);
    beginShape();
    fill(c1);

    vertex(0, -cellY/2);
    bezierVertex(0,  -cellY/2-cy,      cellX/2 +cx, 0,      cellX/2, 0);
    vertex(cellX/2, 0);
    bezierVertex(  cellX/2 -cx, 0,    0,  -cellY/2+cy,  0, -cellY/2);
    vertex(0, -cellY/2);
    endShape(CLOSE);

    beginShape();
    vertex(0, cellY/2);
    bezierVertex(0,  cellY/2+cy,    -cellX/2-cx, 0,  -cellX/2, 0);
    vertex(-cellX/2, 0);
    bezierVertex(    -cellX/2+cx, 0, 0,  cellY/2-cy, 0, cellX/2);
    vertex(0, cellY/2);
    endShape(CLOSE);


    /*
    vertex(0, -cellY/2);
    bezierVertex(c2,  -cellY/2-cy,      cellX/2 +cx, -c2,      cellX/2, 0);
    vertex(cellX/2, 0);
    vertex(cellX/2, cellY/2);
    vertex(0, cellY/2);
    bezierVertex(-c2,  cellY/2+cy,    -cellX/2-cx, c2,  -cellX/2, 0);
    vertex(-cellX/2, 0);
    vertex(-cellX/2, -cellY/2);
    vertex(0, -cellY/2);
    endShape(CLOSE); */

    /* strokeWeight(1);
    stroke(0);
    bezier(0, -cellY/2, c2,  -cellY/2-cy,      cellX/2 +cx, -c2,      cellX/2, 0);
    bezier(0, cellY/2, -c2,  cellY/2+cy,    -cellX/2-cx, c2,  -cellX/2, 0); */
    pop();
  }
  drawTileG(c,posX, posY, cellX, cellY, value, c1, c2){
    value=map(value,0,1,1,0);
    c.push();
    c.translate(posX, posY);
    c.beginShape();
    c.fill(c1);
    c.vertex(-cellX/2, -cellY/2);
    c.bezierVertex(-cellX/2+ (cellX/2*value) , -cellY/2+ (cellY/2*value),      cellX/2- (cellX/2*value), -cellY/2+ (cellY/2*value),      cellX/2, -cellY/2);
    c.vertex(cellX/2, -cellY/2);
    c.bezierVertex(cellX/2 - (cellX/2*value), -cellY/2+ (cellY/2*value),      cellX/2- (cellY/2*value),  cellY/2- (cellY/2*value),     cellX/2, cellY/2);

    c.vertex(cellX/2, cellY/2);
    c.bezierVertex(cellX/2 - (cellX/2*value),  cellY/2- (cellY/2*value),    -cellX/2+ (cellX/2*value), cellY/2- (cellY/2*value),  -cellX/2, cellY/2);

    c.vertex(-cellX/2, cellY/2);
    c.bezierVertex(-cellX/2 + (cellX/2*value),  cellY/2- (cellY/2*value),    -cellX/2+ (cellX/2*value) , -cellY/2+ (cellY/2*value), -cellX/2, -cellY/2);
    c.vertex(-cellX/2, -cellY/2);
    c.endShape(CLOSE);
    c.pop();
  }
  getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){
    value=map(value,0,1,1,0);
    var e = createGraphics(cellX, cellY, SVG);
    posX= posX + cellX/2;
    posY= posY + cellY/2;
    e.id("peep");
    e.noStroke();
    e.fill(c2);
    e.rectMode(CENTER);
    e.rect(posX, posY,cellX, cellY);

    e.push();
    e.translate(posX, posY);
    beginShape();
    e.fill(c1);
    e.vertex(-cellX/2, -cellY/2);
    e.bezierVertex(-cellX/2+ (cellX/2*value) , -cellY/2+ (cellY/2*value),      cellX/2- (cellX/2*value), -cellY/2+ (cellY/2*value),      cellX/2, -cellY/2);
    e.vertex(cellX/2, -cellY/2);
    e.bezierVertex(cellX/2 - (cellX/2*value), -cellY/2+ (cellY/2*value),      cellX/2- (cellY/2*value),  cellY/2- (cellY/2*value),     cellX/2, cellY/2);

    e.vertex(cellX/2, cellY/2);
    e.bezierVertex(cellX/2 - (cellX/2*value),  cellY/2- (cellY/2*value),    -cellX/2+ (cellX/2*value), cellY/2- (cellY/2*value),  -cellX/2, cellY/2);

    e.vertex(-cellX/2, cellY/2);
    e.bezierVertex(-cellX/2 + (cellX/2*value),  cellY/2- (cellY/2*value),    -cellX/2+ (cellX/2*value) , -cellY/2+ (cellY/2*value), -cellX/2, -cellY/2);
    e.vertex(-cellX/2, -cellY/2);
    e.endShape(CLOSE);
    e.pop();

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

class Smile1LMRM extends Tile{
  constructor(){
    super();

  }
  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    var cx= map(value,0,1,0, cellX/8*6);
    var cy= map(value,0,1,0, cellY/8*6);
    push();
    translate(posX, posY);
    fill(c1);
    ellipse(-cellX/4, -cellY/4, cellX/4, cellY/4*value );
    ellipse(cellX/4, -cellY/4,  cellX/4, cellY/4 *value);
    beginShape();
    vertex( -cellX/2 + cellX/8,0);
    vertex( cellX/2 - cellX/8,0);
    bezierVertex(   (cellX/2 - cellX/8),cy,    -cellX/2 + cellX/8,cy   ,-cellX/2 + cellX/8,0);
    vertex( -cellX/2 + cellX/8,0);
    endShape(CLOSE);
    pop();
  }
  drawTileG(c,posX, posY, cellX, cellY, value, c1, c2){
    var cx= map(value,0,1,0, cellX/8*6);
    var cy= map(value,0,1,0, cellY/8*6);
    c.push();
    c.translate(posX, posY);
    c.fill(c1);
    c.ellipse(-cellX/4, -cellY/4, cellX/4, cellY/4*value );
    c.ellipse(cellX/4, -cellY/4,  cellX/4, cellY/4 *value);
    c.beginShape();
    c.vertex( -cellX/2 + cellX/8,0);
    c.vertex( cellX/2 - cellX/8,0);
    c.bezierVertex(   (cellX/2 - cellX/8),cy,    -cellX/2 + cellX/8,cy   ,-cellX/2 + cellX/8,0);
    c.vertex( -cellX/2 + cellX/8,0);
    c.endShape(CLOSE);
    c.pop();

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

    var cx= map(value,0,1,0, cellX/8*6);
    var cy= map(value,0,1,0, cellY/8*6);
    e.push();
    e.translate(posX, posY);
    e.fill(c1);
    e.ellipse(-cellX/4, -cellY/4, cellX/4, cellY/4*value );
    e.ellipse(cellX/4, -cellY/4,  cellX/4, cellY/4 *value);
    e.beginShape();
    e.vertex( -cellX/2 + cellX/8,0);
    e.vertex( cellX/2 - cellX/8,0);
    e.bezierVertex(   (cellX/2 - cellX/8),cy,    -cellX/2 + cellX/8,cy   ,-cellX/2 + cellX/8,0);
    e.vertex( -cellX/2 + cellX/8,0);
    e.endShape(CLOSE);
    e.pop();

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

class CurveEdgeRect1LMRM extends Tile{ //not being used
  constructor(){
    super();
  }
  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    value=map(value,0,1,1,0);
    push();
    translate(posX, posY);
    beginShape();
    fill(c1);

    vertex(-cellX/2, -cellY/2);
    bezierVertex(-cellX/2 , -cellY/2+ (cellY/2*value),      cellX/2, -cellY/2+ (cellY/2*value),      cellX/2, -cellY/2);
    vertex(cellX/2, -cellY/2);
    bezierVertex(cellX/2 - (cellX/2*value), -cellY/2,      cellX/2- (cellY/2*value),  cellY/2,     cellX/2, cellY/2);

    vertex(cellX/2, cellY/2);
    bezierVertex(cellX/2 ,  cellY/2- (cellY/2*value),    -cellX/2 , cellY/2- (cellY/2*value),  -cellX/2, cellY/2);

    vertex(-cellX/2, cellY/2);
    bezierVertex(-cellX/2 + (cellX/2*value),  cellY/2,    -cellX/2+ (cellX/2*value) , -cellY/2, -cellX/2, -cellY/2);
    vertex(-cellX/2, -cellY/2);
    endShape(CLOSE);
    pop();
  }
  drawTileG(c,posX, posY, cellX, cellY, value, c1, c2){
    value=map(value,0,1,1,0);
    c.push();
    c.translate(posX, posY);
    c.beginShape();
    c.fill(c1);
    c.vertex(-cellX/2, -cellY/2);
    c.bezierVertex(-cellX/2 , -cellY/2+ (cellY/2*value),      cellX/2, -cellY/2+ (cellY/2*value),      cellX/2, -cellY/2);
    c.vertex(cellX/2, -cellY/2);
    c.bezierVertex(cellX/2 - (cellX/2*value), -cellY/2,      cellX/2- (cellY/2*value),  cellY/2,     cellX/2, cellY/2);

    c.vertex(cellX/2, cellY/2);
    c.bezierVertex(cellX/2 ,  cellY/2- (cellY/2*value),    -cellX/2 , cellY/2- (cellY/2*value),  -cellX/2, cellY/2);

    c.vertex(-cellX/2, cellY/2);
    c.bezierVertex(-cellX/2 + (cellX/2*value),  cellY/2,    -cellX/2+ (cellX/2*value) , -cellY/2, -cellX/2, -cellY/2);
    c.vertex(-cellX/2, -cellY/2);
    c.endShape(CLOSE);
    c.pop();
  }
  getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){
    value=map(value,0,1,1,0);
    var e = createGraphics(cellX, cellY, SVG);
    posX= posX + cellX/2;
    posY= posY + cellY/2;
    e.id("peep");
    e.noStroke();
    e.fill(c2);
    e.rectMode(CENTER);
    e.rect(posX, posY,cellX, cellY);

    e.push();
    e.translate(posX, posY);
    beginShape();
    e.fill(c1);
    e.vertex(-cellX/2, -cellY/2);
    e.bezierVertex(-cellX/2 , -cellY/2+ (cellY/2*value),      cellX/2, -cellY/2+ (cellY/2*value),      cellX/2, -cellY/2);
    e.vertex(cellX/2, -cellY/2);
    e.bezierVertex(cellX/2 - (cellX/2*value), -cellY/2,      cellX/2- (cellY/2*value),  cellY/2,     cellX/2, cellY/2);

    e.vertex(cellX/2, cellY/2);
    e.bezierVertex(cellX/2 ,  cellY/2- (cellY/2*value),    -cellX/2 , cellY/2- (cellY/2*value),  -cellX/2, cellY/2);

    e.vertex(-cellX/2, cellY/2);
    e.bezierVertex(-cellX/2 + (cellX/2*value),  cellY/2,    -cellX/2+ (cellX/2*value) , -cellY/2, -cellX/2, -cellY/2);
    e.vertex(-cellX/2, -cellY/2);
    e.endShape(CLOSE);
    e.pop();

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

class HalfCirc1LMRM extends Tile{
  constructor(){
    super();

  }
  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    //value=map(value,0,1,1,0);
    fill(c1);
    posX= posX - cellX/2;
    posY= posY + cellY/2;
    arc(posX, posY, cellX*value*2, cellY*value*2, PI + HALF_PI, TWO_PI, PIE);
  }
  drawTileG(c,posX, posY, cellX, cellY, value, c1, c2){

    posX= posX - cellX/2;
    posY= posY + cellY/2;
    c.fill(c1);
    c.arc(posX, posY, cellX*value*2, cellY*value*2, PI + HALF_PI, TWO_PI, PIE);

  }
  getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){
    //value=map(value,0,1,1,0);
    var e = createGraphics(cellX, cellY, SVG);
    posX= posX + cellX/2;
    posY= posY + cellY/2;
    e.id("peep");
    e.noStroke();
    posX= posX - cellX/2;
    posY= posY + cellY/2;
    e.fill(c1);
    e.arc(posX, posY, cellX*value*2, cellY*value*2, PI + HALF_PI, TWO_PI, PIE);

    var f= document.querySelector("#peep").getElementsByTagName("svg")[0];
    container= f;
    div.getElementsByTagName("svg")[0].remove();
    div.appendChild(f);
    this.div= div;
    document.querySelector("#peep").remove();
  }
}
