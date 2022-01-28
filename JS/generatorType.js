class GeneratorType{
  constructor(){
  }

  execute(){
  }

  drawOnCanvas(e){
    clear();
    background(e.backgroundC);
    //var inp= e.input.getContentResize(e.grid.columns, e.grid.rows);
    push();
    scale(e.zoom,e.zoom);
    fill(e.tileManager.getBackColor());
    noStroke();
    rectMode(CORNER);
    rect(0, 0, e.grid.width, e.grid.height);
    noStroke();

    for(var h=0; h< e.grid.rows; h++){
        for(var w=0; w< e.grid.columns; w++){
          let shade= e.matrix[h][w];
          let shadeMod = e.modsDyn[w][h];
          shade= Math.max(shade , shadeMod);
          shade= Math.min(shade , e.maxValue);
          e.cellList[w + (h*(e.grid.columns))].setValue(shade);

          //if(shade!=0){
            if(shade>0.05){

            if(e.rotation==false ){
              e.cellList[w + (h*(e.grid.columns))].drawTile( e.grid.cellW * e.maxSize, e.grid.cellH * e.maxSize , e.tileManager.getTileColor(), e.tileManager.getBackColor());

            } else{

              // rotation------------------------------------------------------------------
              if(e.rotationShade==true){
                var ang= map(shade, 0,1, 0,TWO_PI);
                push();
                translate(  e.cellList[w + (h*(e.grid.columns))].posX , e.cellList[w + (h*(e.grid.columns))].posY);
                rotate(ang);
                e.cellList[w + (h*(e.grid.columns))].drawTileSec(0,0,e.grid.cellW * e.maxSize, e.grid.cellH* e.maxSize, e.tileManager.getTileColor(), e.tileManager.getBackColor());
                pop();

              }else if(e.rotationSequence==true){
                var ang=0;
                if( w%2==1 && h%2==0){ ang= PI/2 }else if( w%2==1 && h%2==1 ){ ang = PI; }else if(w%2==0 && h%2==1){  ang = PI + PI/2;}
                push();
                translate(  e.cellList[w + (h*(e.grid.columns))].posX , e.cellList[w + (h*(e.grid.columns))].posY);
                rotate(ang);
                e.cellList[w + (h*(e.grid.columns))].drawTileSec(0,0,e.grid.cellW * e.maxSize, e.grid.cellH* e.maxSize, e.tileManager.getTileColor(), e.tileManager.getBackColor());
                pop();
              }else if(e.rotationRandom==true){

                var angR= parseInt(random(0,4));
                var ang=0;

                if( angR==0 ){ ang= PI/2 }else if( angR==1 ){ ang = PI; }else if(angR==3){  ang = PI + PI/2;}
                push();
                translate(  e.cellList[w + (h*(e.grid.columns))].posX , e.cellList[w + (h*(e.grid.columns))].posY);
                rotate(ang);
                e.cellList[w + (h*(e.grid.columns))].drawTileSec(0,0,e.grid.cellW * e.maxSize, e.grid.cellH* e.maxSize, e.tileManager.getTileColor(), e.tileManager.getBackColor());
                pop();
              }
            }
            // rotation END------------------------------------------------------------------

          }

        }
      }
      /*fill(255,0,0);
      textSize(20);
      text(round(frameRate(),2), 10,20); */
      pop();
  }

  render(g, t){

    function render(g, t){
      if(t.stop != true){
        var w = g.grid.width   * g.grid.exportProportion;
        var h = g.grid.height  * g.grid.exportProportion;
        var cW= g.grid.cellW   * g.grid.exportProportion;
        var cH= g.grid.cellH   * g.grid.exportProportion;
        var e = createGraphics(w, h);
        t.drawing(e,g, w, h, cW, cH);
        t.capturer.capture(e.elt );
        requestAnimationFrame( function(){   render(g, t)} );
        //g.generator.switchRecording();
      }
    }
    render(g, t);
  }

  notrender(){}

  switchRecording(g, t, state){
    this.t= t;
    this.g= g;
    if(state=="stop"){
      this.recorder = this.notrender;
    }else if(state=="start"){
      this.recorder = this.render;
    }


  }

}



//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


class GeneratorStill extends GeneratorType{
  constructor(){
    super();
    this.recorder = this.notrender;
    this.g;
    this.t;
  }
  execute(e){
    //e.matrix = e.matrixbuilder.checkForMatrixGen( e.input.getContentResize(e.grid.columns, e.grid.rows) , e.matrix);
    if(e.input.hasInput()  && e.matrix!= undefined && e.matrix.length!=0){
      this.drawOnCanvas(e);


      this.recorder(this.g, this.t);
      switch(e.tab){
        case "Type":
          e.fontreader.drawLimitBox(e.grid.getCellW(), e.grid.getCellH(), e.zoom);
          break;
        case "Draw":
          break;
      }
    }
  }

  executeVideoRecording(e){

  }
}



//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------



class GeneratorMotion extends GeneratorType{
  constructor(){
    super();

    this.recorder = this.notrender;
    this.g;
    this.t;

    this.running=false;

    this.execution= this.execute;
  }
  execute(e){
    if(this.running==false){
      this.running=true;
      this.animate(e);
    }

  }

  animate(e){
      if(String(generator.input.getType())!="Image" && String(generator.input.getType())!="LocalImage" && generator.input.hasInput()){ //should be "e" instead of generator but it saves empty refferebce when i create a new generator

        e.matrix = e.matrixbuilder.checkForMatrixGen( e.input.getContentResize(e.grid.columns, e.grid.rows , e.filter) , e.matrix, e.invert);
        var t=this;
        requestAnimationFrame(function(){t.animate(e)});

        if(e.matrix!= undefined){
          t.drawOnCanvas(e);
          this.recorder(this.g, this.t);
          if(e.tab=="Type"){
            e.fontreader.drawLimitBox(e.grid.getCellW(), e.grid.getCellH(), e.zoom);
          }
        }
      }else{
        this.running=false;
      }
  }




  render(g, t){
    function render(g){
      if(t.stop!=true){
        var w = g.grid.width   * g.grid.exportProportion;
        var h = g.grid.height  * g.grid.exportProportion;
        var cW= g.grid.cellW   * g.grid.exportProportion;
        var cH= g.grid.cellH   * g.grid.exportProportion;
        var e = createGraphics(w, h);
        t.drawing(e,g, w, h, cW, cH);
        t.capturer.capture(e.elt );
        //g.generator.switchRecording();
      }
    }
    render(g);
  }


}
