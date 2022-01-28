
class LinesComp extends Tile{
  constructor(){
    super();
  }
  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    var n=4;
    posX= posX-(cellX/2);
    var valT= int(map(value, 0,1, 0,4));
    var t= cellX/(n+n-1);
    fill(c1);
    rectMode(CENTER);
    for(var i=0; i< (valT+valT-1); i++){
      if(i%2==0){
        rect(posX + (t*i)+(t/2), posY, t, cellY);
      }
    }
  }
  drawTileG(c ,posX, posY, cellX, cellY, value, c1, c2){
    var n=4;
    posX= posX-(cellX/2);
    var valT= int(map(value, 0,1, 0,4));
    var t= cellX/(n+n-1);
    c.fill(c1);
    c.rectMode(CENTER);
    for(var i=0; i< (valT+valT-1); i++){
      if(i%2==0){
        c.rect(posX + (t*i)+(t/2), posY, t, cellY);
      }
    }
  }
  getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){
    //value=map(value,0,1,1,0);
    var e = createGraphics(cellX, cellY, SVG);
    posX= posX + cellX/2;
    posY= posY + cellY/2;
    e.id("peep");
    e.noStroke();

    e.fill(c2);
    e.rectMode(CENTER);
    e.rect(posX, posY,cellX, cellY);

    var n=4;
    posX= posX-(cellX/2);
    var valT= int(map(value, 0,1, 0,4));
    var t= cellX/(n+n-1);
    e.fill(c1);
    e.rectMode(CENTER);
    for(var i=0; i< (valT+valT-1); i++){
      if(i%2==0){
        e.rect(posX + (t*i)+(t/2), posY, t, cellY);
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


//------------------------------------------------------------------------------




class ChessComp extends Tile{
  constructor(){
    super();
    this.grid=4;
  }
  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    posX= posX - cellX/2;
    posY= posY - cellY/2;
    var grid=this.grid;
    var count=0;
    var value= int((map(value, 0,1, 0,grid*grid)) /2);
    var cw= cellX/grid;
    var ch= cellY/grid;
    /*stroke(255,255,0);
    noFill();
    rect(posX, posY, cellX, cellY);
    noStroke(); */
    rectMode(CORNER);
    fill(c1);
    for(var y=0; y<grid; y++){
      for(var x=0; x<grid ; x++){

        if( ((y*grid +y)+x) %2 == 0  && count < value){
          rect(x * cw + posX, y* ch+posY, cw, ch);
          count++;

        }
      }
    }
  }

  drawTileG(c ,posX, posY, cellX, cellY, value, c1, c2){
    posX= posX - cellX/2;
    posY= posY - cellY/2;
    var grid=this.grid;
    c.rectMode(CORNER);
    var count=0;
    var value= int((map(value, 0,1, 0,grid*grid)) /2);
    var cw= cellX/grid;
    var ch= cellY/grid;
    /*stroke(255,255,0);
    noFill();
    rect(posX, posY, cellX, cellY);
    noStroke(); */
    c.fill(c1);
    for(var y=0; y<grid; y++){
      for(var x=0; x<grid ; x++){

        if( ((y*grid +y)+x) %2 == 0  && count < value){
          c.rect(x * cw + posX, y* ch+posY, cw, ch);
          count++;

        }
      }
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
    //value=map(value,0,1,1,0);
    var e = createGraphics(cellX, cellY, SVG);

    e.id("peep");
    e.noStroke();
    e.fill(c2);
    e.rectMode(CORNER);
    e.rect(posX, posY,cellX, cellY);

    var grid=this.grid;
    var count=0;
    var value= int((map(value, 0,1, 0,grid*grid)) /2);
    var cw= cellX/grid;
    var ch= cellY/grid;
    /*stroke(255,255,0);
    noFill();
    rect(posX, posY, cellX, cellY);
    noStroke(); */
    e.fill(c1);
    for(var y=0; y<grid; y++){
      for(var x=0; x<grid ; x++){

        if( ((y*grid +y)+x) %2 == 0  && count < value){
          e.rect(x * cw + posX, y* ch+posY, cw, ch);
          count++;

        }
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


//------------------------------------------------------------------------------


class RandomSquaresComp extends Tile{
  constructor(){
    super();
    this.grid=4;
  }
  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    fill(c1);
    rectMode(CORNER);
    posX= posX - cellX/2;
    posY= posY - cellY/2;
    var grid=this.grid;
    var pocket=[];
  
    var value= int(map(value, 0,1, 0,grid*grid));
    var cw= cellX/grid;
    var ch= cellY/grid;
    for(var x=0; x<grid; x++){
      for(var y=0; y<grid; y++){
        pocket.push([x,y]);
      }
    }
    for(var a=0; a<value; a++){
      let s= int(Math.random()*(pocket.length));
      let r = pocket[s];
      rect(r[0] * cw + posX, r[1]* ch+posY, cw, ch);
      pocket.splice(s,1);
    }
  }
  drawTileG(c ,posX, posY, cellX, cellY, value, c1, c2){
    c.fill(c1);
    c.rectMode(CORNER);

    posX= posX - cellX/2;
    posY= posY - cellY/2;
    var grid=this.grid;
    var pocket=[];
    var value= int(map(value, 0,1, 0,grid*grid));
    var cw= cellX/grid;
    var ch= cellY/grid;
    for(var x=0; x<grid; x++){
      for(var y=0; y<grid; y++){
        pocket.push([x,y]);
      }
    }
    for(var a=0; a<value; a++){
      let s= int(Math.random()*(pocket.length));
      let r = pocket[s];
      c.rect(r[0] * cw + posX, r[1]* ch+posY, cw, ch);
      pocket.splice(s,1);
    }
  }


  getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){
    var e = createGraphics(cellX, cellY, SVG);
    e.id("peep");
    e.noStroke();

    e.fill(c2);
    e.rectMode(CORNER);
    e.rect(posX, posY,cellX, cellY);

    e.fill(c1);
    var grid=this.grid;
    var pocket=[];

    var value= int(map(value, 0,1, 0,grid*grid));
    var cw= cellX/grid;
    var ch= cellY/grid;
    for(var x=0; x<grid; x++){
      for(var y=0; y<grid; y++){
        pocket.push([x,y]);
      }
    }
    for(var a=0; a<value; a++){
      let s= int(Math.random()*(pocket.length));
      let r = pocket[s];
      e.rect(r[0] * cw + posX, r[1]* ch+posY, cw, ch);
      pocket.splice(s,1);
    }

    var f= document.querySelector("#peep").getElementsByTagName("svg")[0];
    container= f;
    div.getElementsByTagName("svg")[0].remove();
    div.appendChild(f);
    this.div= div;
    document.querySelector("#peep").remove();
  }
}



//------------------------------------------------------------------------------


class Rec5LSSM extends Tile{
  constructor(){
    super();
    this.s=6;
  }
  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    fill(c1);
    rectMode(CENTER);
    for(var i=0; i<4; i++){
      push();
      translate(posX, posY);
        if(i==0){ scale(1,1); }else if(i==1){ scale(-1,1); }else if(i==2){ scale(-1,-1); }else{  scale(1,-1); }
      stroke(0);
      strokeWeight(cellX/40);
      line(cellX/2,cellY/2 , 0, 0);
      noStroke();
      rect( - (cellX/2  - ( (cellX/(this.s))  /2)), - (cellY/2 - ( (cellY/(this.s))  /2)), cellX/this.s, cellY/this.s);
      translate(-posX, -posY);
      pop();
    }
    var hyp1= Math.sqrt( Math.pow(cellX,2) + Math.pow(cellY,2));
    var hyp2 = Math.sqrt( Math.pow((cellX/this.s)*2,2) + Math.pow((cellY/this.s)*2,2));
    var hypR= hyp1 -  hyp2;
    //var rx = (cellX-((cellX/this.s) ));
    //var ry = (cellX-((cellX/this.s) )); for the rect
    ellipse(posX, posY, (hypR )     * value, (hypR )   * value);

  }
  drawTileG(c ,posX, posY, cellX, cellY, value, c1, c2){
    c.fill(c1);
    c.rectMode(CENTER);
    for(var i=0; i<4; i++){
      c.push();
      c.translate(posX, posY);
        if(i==0){ c.scale(1,1); }else if(i==1){ c.scale(-1,1); }else if(i==2){ c.scale(-1,-1); }else{  c.scale(1,-1); }
      c.stroke(0);
      c.strokeWeight(cellX/40);
      c.line(cellX/2,cellY/2 , 0, 0);
      c.noStroke();
      c.rect( - (cellX/2  - ( (cellX/(this.s))  /2)), - (cellY/2 - ( (cellY/(this.s))  /2)), cellX/this.s, cellY/this.s);
      c.translate(-posX, -posY);
      c.pop();
    }
    var hyp1= Math.sqrt( Math.pow(cellX,2) + Math.pow(cellY,2));
    var hyp2 = Math.sqrt( Math.pow((cellX/this.s)*2,2) + Math.pow((cellY/this.s)*2,2));
    var hypR= hyp1 -  hyp2;
    c.ellipse(posX, posY, (hypR )     * value, (hypR )   * value);
  }


  getAnimation(div, container, posX, posY, cellX, cellY, value, c1, c2){
    posX= posX+cellX/2;
    posY= posY+cellY/2;
    var e = createGraphics(cellX, cellY, SVG);
    e.id("peep");
    e.noStroke();

    e.fill(c2);
    e.rectMode(CORNER);
    e.rect(posX, posY,cellX, cellY);

    e.fill(c1);
    e.rectMode(CENTER);
    for(var i=0; i<4; i++){
      e.push();
      e.translate(posX, posY);
        if(i==0){ e.scale(1,1); }else if(i==1){ e.scale(-1,1); }else if(i==2){ e.scale(-1,-1); }else{  e.scale(1,-1); }
      e.stroke(0);
      e.strokeWeight(cellX/40);
      e.line(cellX/2,cellY/2 , 0, 0);
      e.noStroke();
      e.rect( - (cellX/2  - ( (cellX/(this.s))  /2)), - (cellY/2 - ( (cellY/(this.s))  /2)), cellX/this.s, cellY/this.s);
      e.translate(-posX, -posY);
      e.pop();
    }
    var hyp1= Math.sqrt( Math.pow(cellX,2) + Math.pow(cellY,2));
    var hyp2 = Math.sqrt( Math.pow((cellX/this.s)*2,2) + Math.pow((cellY/this.s)*2,2));
    var hypR= hyp1 -  hyp2;
    e.ellipse(posX, posY, (hypR )     * value, (hypR )   * value);

    var f= document.querySelector("#peep").getElementsByTagName("svg")[0];
    container= f;
    div.getElementsByTagName("svg")[0].remove();
    div.appendChild(f);
    this.div= div;
    document.querySelector("#peep").remove();
  }
}
