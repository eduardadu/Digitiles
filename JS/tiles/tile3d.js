//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
class CubeTile extends Tile{
  constructor(){
    super();
  }

  drawTile(posX, posY, cellX, cellY, value, c1, c2){
    var valueX = map(value, 0,1,0,cellX);
    var valueY = map(value, 0,1,0,cellY);
    var deslX= map(value, 0,1,cellX/4.5,0); //deslocation
    var deslY= map(value, 0,1,cellY/4.5,0);//deslocation
    fill(c1);
    rectMode(CENTER);
    rect(posX-deslX , posY-deslY , valueX, valueY);

    noFill();
    stroke(c1);
    strokeWeight(cellX/55);
    rect(posX , posY , cellX, cellY);
    line(posX- (cellX/2), posY-(cellY/2), posX -deslX -(valueX/2), posY -deslY -(valueY/2));
    line(posX+ (cellX/2), posY-(cellY/2),  posX -deslX +(valueX/2), posY -deslY - (valueY/2));
    line(posX+ (cellX/2), posY+(cellY/2), posX -deslX +(valueX/2), posY -deslY + (valueY/2));
    line(posX- (cellX/2), posY+(cellY/2), posX -deslX -(valueX/2), posY -deslY + (valueY/2));
  }

  drawTileG(c ,posX, posY, cellX, cellY, value, c1, c2){
    var valueX = map(value, 0,1,0,cellX);
    var valueY = map(value, 0,1,0,cellY);
    var deslX= map(value, 0,1,cellX/4.5,0); //deslocation
    var deslY= map(value, 0,1,cellY/4.5,0);//deslocation
    c.fill(c1);
    c.rectMode(CENTER);
    c.rect(posX-deslX , posY-deslY , valueX, valueY);

    c.noFill();
    c.stroke(c1);
    c.strokeWeight(cellX/35);
    c.rect(posX , posY , cellX, cellY);
    c.line(posX- (cellX/2), posY-(cellY/2), posX -deslX -(valueX/2), posY -deslY -(valueY/2));
    c.line(posX+ (cellX/2), posY-(cellY/2),  posX -deslX +(valueX/2), posY -deslY - (valueY/2));
    c.line(posX+ (cellX/2), posY+(cellY/2), posX -deslX +(valueX/2), posY -deslY + (valueY/2));
    c.line(posX- (cellX/2), posY+(cellY/2), posX -deslX -(valueX/2), posY -deslY + (valueY/2));
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

    var valueX = map(value, 0,1,0,cellX);
    var valueY = map(value, 0,1,0,cellY);
    var deslX= map(value, 0,1,cellX/4.5,0); //deslocation
    var deslY= map(value, 0,1,cellY/4.5,0);//deslocation
    e.fill(c1);
    e.rectMode(CENTER);
    e.rect(posX-deslX , posY-deslY , valueX, valueY);

    e.noFill();
    e.stroke(c1);
    e.strokeWeight(cellX/35);
    e.rect(posX , posY , cellX, cellY);
    e.line(posX- (cellX/2), posY-(cellY/2), posX -deslX -(valueX/2), posY -deslY -(valueY/2));
    e.line(posX+ (cellX/2), posY-(cellY/2),  posX -deslX +(valueX/2), posY -deslY - (valueY/2));
    e.line(posX+ (cellX/2), posY+(cellY/2), posX -deslX +(valueX/2), posY -deslY + (valueY/2));
    e.line(posX- (cellX/2), posY+(cellY/2), posX -deslX -(valueX/2), posY -deslY + (valueY/2));

    var f= document.querySelector("#peep").getElementsByTagName("svg")[0];
    container= f;
    div.getElementsByTagName("svg")[0].remove();
    div.appendChild(f);
    this.div= div;
    document.querySelector("#peep").remove();
  }

}
