class Cell{
  constructor(posX, posY, value,  speed ,tile){
    this.currValue=value;
    this.targetValue =value;
    this.tile = tile;
    this.changeSpeed =0.6;
    this.step= 6;
    this.add= 1/6;

    this.posX = posX;
    this.posY = posY;
    this.colorT;
    this.colorB;
    this.colorS;

    this.seed = int(Math.random()*1000000);
    this.rotation= 0;
  }

  checkUpdate(targetValue){
    if(targetValue==this.currValue){
      return false;
    }else{
      return true;
    }
  }
  setTile(tile){
    this.tile=tile;
  }
  setSpeed(){

  }
  setTile(e){
    
    this.tile=e;

  }
  setValue(targetValue){
    this.currValue=targetValue;
  /*  this.currValue =  (this.currValue *this.changeSpeed)+ (targetValue*(1-this.changeSpeed));
    if(Math.abs(this.currValue - targetValue) < 0.005){
      this.currValue=targetValue;
    } */
  }

  drawTile(cellW, cellY, c1, c2){

    this.tile.drawTile( this.posX, this.posY, cellW, cellY, this.currValue, c1, c2);
  }

  drawTileSec(posX, posY, cellW, cellY, c1, c2){
    this.tile.drawTile( posX, posY, cellW, cellY, this.currValue, c1, c2);
  }


  drawTileSecG(c, posX, posY, cellW, cellY, c1, c2, prop){
    this.tile.drawTileG(c,  posX, posY, cellW, cellY, this.currValue, c1, c2);
  }
  drawTileG(c, cellW, cellY, c1, c2, prop){
    this.tile.drawTileG(c, this.posX*prop, this.posY*prop, cellW, cellY, this.currValue, c1, c2);
  }
}
