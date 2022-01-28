
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
class QuadLevelsTile extends Tile{
  constructor(){
    super();
    this.shapes;
    this.button;
  }

  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    fill(c1);
    var l=6; //levels
    var q= int(map(value, 0,1,0,l));
    var s= cellX/25;

    noFill();
    rectMode(CENTER);
    stroke(c1);
    strokeWeight(s);
    for(var i=1; i< q+1; i++){
      rect(posX , posY, cellX/l *i,cellY/l*i);
    }
  }
  drawTileG(c,posX, posY, cellX, cellY, value, c1, c2){
    c.fill(c1);
    var l=6; //levels
    var q= int(map(value, 0,1,0,l));
    var s= cellX/25;

    c.noFill();
    c.rectMode(CENTER);
    c.stroke(c1);
    c.strokeWeight(s);
    for(var i=1; i< q+1; i++){
      c.rect(posX , posY, cellX/l *i,cellY/l*i);
    }
  }

  drawTileSVG(container, posX, posY, cellX, cellY, value, c1, c2){

  }

  getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){
    var e = createGraphics(cellX, cellY, SVG);
    posX= posX + cellX/2;
    posY= posY + cellY/2;
    e.id("peep");
    e.fill(c1);

    e.noStroke();
    e.fill(c2);
    e.rectMode(CENTER);
    e.rect(posX, posY,cellX, cellY);

    var l=4; //levels
    var q= int(map(value, 0,1,0,l));
    var s= cellX/25;

    e.noFill();
    e.rectMode(CENTER);
    e.stroke(c1);
    e.strokeWeight(s);
    for(var i=1; i< q+1; i++){
      e.rect(posX , posY, cellX/l *i,cellY/l*i);
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
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

class WeirdChessLinesTile extends Tile{
  constructor(){
    super();
    this.shapes;
    this.button;
  }

  drawTile(posX, posY, cellX, cellY, value, c1, c2){

    fill(c1);
    var q= int(map(value, 0,1,0,8));
    var space= cellX/q;
    var space2= cellY/q;
    var stroke= cellX/7;
    var stroke2= cellY/7;
    posX= posX-cellX/2;
    posY= posY -cellY/2;
    for(var i=0; i< q; i++){
      //line(posX + (space*i), posY, posX +(space*i), posY+cellY);
      if(i==0){
        rect(posX + (space*i),posY, stroke,cellY);
      }else if(i==1){
        rect(posX, posY + (space2*(i-1)),cellX, stroke2);
      }else{
        if(i%2==0){
          rect(posX + (space*i),posY, stroke,cellY);
          rect(posX - (space*i),posY, stroke,cellY);
        }else{
          rect(posX, posY + (space2*(i-1)),cellX, stroke2);
          rect(posX, posY - (space2*(i-1)),cellX, stroke2);
        }
      }
      //rect(posX + (space*i),posY, stroke,cellY);
      //rect(posX, posY + (space2*i),cellX, stroke2);
    }
  }
  drawTileG(c,posX, posY, cellX, cellY, value, c1, c2){
    c.fill(c1);
    var q= int(map(value, 0,1,0,10));
    var space= cellX/q;
    var space2= cellY/q;
    var stroke= cellX/10;
    var stroke2= cellY/10;
    for(var i=0; i< q; i++){
      //line(posX + (space*i), posY, posX +(space*i), posY+cellY);
      if(i%2==0){
        c.rect(posX + (space*i),posY, stroke,cellY);
      }else{
        c.rect(posX, posY + (space2*i),cellX, stroke2);
      }
    }
  }

  drawTileSVG(container, posX, posY, cellX, cellY, value, c1, c2){

  }

  getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){
    var e = createGraphics(cellX, cellY, SVG);

    e.id("peep");
    e.noStroke();
    e.noStroke();
    e.fill(c2);
    e.rectMode(CORNER);
    e.rect(posX, posY,cellX, cellY);

    e.rectMode(CORNER);
    e.fill(c1);
    var ang= TWO_PI/3;
    var aux= PI/6;
    e.fill(c1);
    var q= int(map(value, 0,1,0,10));
    var space= cellX/q;
    var space2= cellY/q;
    var stroke= cellX/10;
    var stroke2= cellY/10;
    for(var i=0; i< q; i++){
      //line(posX + (space*i), posY, posX +(space*i), posY+cellY);
      if(i%2==0){
        e.rect(posX + (space*i),posY, stroke,cellY);
      }else{
        e.rect(posX, posY + (space2*i),cellX, stroke2);
      }
    }
    var f= document.querySelector("#peep").getElementsByTagName("svg")[0];
    container= f;
    div.getElementsByTagName("svg")[0].remove();
    div.appendChild(f);
    this.div= div;
    document.querySelector("#peep").remove();
  }
}
