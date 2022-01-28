class Export{
  constructor(){

  }
  execute(){}
  getType(){}
  drawing(e,g, w, h, cW, cH){
    if(g.input.hasInput()){
      e.fill(g.tileManager.getBackColor());
      e.noStroke();
      e.rectMode(CORNER);
      e.rect(0, 0, w, h);
      for(var h=0; h< g.grid.rows; h++){
          for(var w=0; w< g.grid.columns; w++){
            if(g.cellList.length ==0){
              g.produceCellList();
            }
            let shade= g.matrix[h][w];
            e.noStroke();
            let shadeMod = g.modsDyn[w][h]; //***
              shade= Math.max(shade , shadeMod);

              g.cellList[w + (h*(g.grid.columns))].setValue(shade);

            if(shade>0.05){
              //g.cellList[w + (h*(g.grid.columns))].drawTileG(e, cW * g.maxSize, cH * g.maxSize, g.tileManager.getTileColor(), g.tileManager.getBackColor(), g.grid.exportProportion);

              if(g.rotation==false ){
                g.cellList[w + (h*(g.grid.columns))].drawTileG(e,  cW * g.maxSize, cH * g.maxSize, g.tileManager.getTileColor(), g.tileManager.getBackColor(), g.grid.exportProportion);

              } else{

                // rotation------------------------------------------------------------------
                if(g.rotationShade==true){

                  var ang= map(shade, 0,1, 0,TWO_PI);
                  e.push();
                  e.translate(  g.cellList[w + (h*(g.grid.columns))].posX *g.grid.exportProportion, g.cellList[w + (h*(g.grid.columns))].posY *g.grid.exportProportion);
                  e.rotate(ang);
                  g.cellList[w + (h*(g.grid.columns))].drawTileSecG(e,0,0, cW * g.maxSize, cH * g.maxSize, g.tileManager.getTileColor(), g.tileManager.getBackColor(), g.grid.exportProportion);
                  e.pop();

                }else if(g.rotationSequence==true){
                  var ang=0;
                  if( w%2==1 && h%2==0){ ang= PI/2 }else if( w%2==1 && h%2==1 ){ ang = PI; }else if(w%2==0 && h%2==1){  ang = PI + PI/2;}
                  e.push();
                  e.translate(  g.cellList[w + (h*(g.grid.columns))].posX *g.grid.exportProportion, g.cellList[w + (h*(g.grid.columns))].posY *g.grid.exportProportion);
                  e.rotate(ang);
                  g.cellList[w + (h*(g.grid.columns))].drawTileSecG(e,0,0, cW * g.maxSize, cH * g.maxSize, g.tileManager.getTileColor(), g.tileManager.getBackColor(), g.grid.exportProportion);
                  e.pop();
                }else if(g.rotationRandom==true){

                  var angR= parseInt(random(0,4));
                  var ang=0;

                  if( angR==0 ){ ang= PI/2 }else if( angR==1 ){ ang = PI; }else if(angR==3){  ang = PI + PI/2;}
                  e.push();
                  e.translate(  g.cellList[w + (h*(g.grid.columns))].posX *g.grid.exportProportion, g.cellList[w + (h*(g.grid.columns))].posY *g.grid.exportProportion);
                  e.rotate(ang);
                  g.cellList[w + (h*(g.grid.columns))].drawTileSecG(e,0,0, cW * g.maxSize, cH * g.maxSize, g.tileManager.getTileColor(), g.tileManager.getBackColor(), g.grid.exportProportion);
                  e.pop();
                }
              }



            }
          }
        }
    }
  }

}



class PNGExport extends Export{
  constructor(){
    super();
  }
  execute(g){
    var w = g.grid.width   * g.grid.exportProportion;
    var h = g.grid.height  * g.grid.exportProportion;
    var cW= g.grid.cellW   * g.grid.exportProportion;
    var cH= g.grid.cellH   * g.grid.exportProportion;
    var e = createGraphics(w, h);
    this.drawing(e,g, w, h, cW, cH);
    save(e,"Digitile.png");
  }

  getType(){
    return "PNG";
  }
  getFormat(){
    return "Image";
  }
  setSettings(e, obj){}

}

class PDFExport extends Export{
  constructor(){super();
    this.orientation= "Portrait";
    this.units;
    this.format= "custom";
    const { jsPDF } = window.jspdf;
  }

  execute(g){
    var w = g.grid.width   * g.grid.exportProportion;

    var { jsPDF } = window.jspdf;
    var doc;

    if(this.format!="custom"){
      if(this.orientation=="Portrait"){
        doc = new jsPDF('p','pt', this.format);
      }else{
        doc = new jsPDF('l','pt', this.format);
      }

      g.setExportProportion("ImageW", doc.internal.pageSize.getWidth()  );
        var h = g.grid.height  * g.grid.exportProportion;
      if(h> doc.internal.pageSize.getHeight()){
        g.setExportProportion("ImageH", doc.internal.pageSize.getHeight()  );
      }
    }else{
      doc = new jsPDF('l','pt', [w,h]);
    }
    w = g.grid.width   * g.grid.exportProportion;
    h = g.grid.height  * g.grid.exportProportion;
    var cW= g.grid.cellW   * g.grid.exportProportion;
    var cH= g.grid.cellH   * g.grid.exportProportion;
    var e = createGraphics(w, h, SVG);
    e.id("svgExport");
    this.drawing(e,g, w, h, cW, cH);

    var options;
    var f= document.getElementById("svgExport").getElementsByTagName("svg")[0];

    svgElementToPdf(f, doc, doc);
        // Save the PDF
    doc.save('TestSVG.pdf');
    e.remove();
  }


  getType(){
    return "PDF";
  }
  getFormat(){
    return "Image";
  }
  setSettings(g, e, obj){
    switch(e){
      case "Orientation":
        var { jsPDF } = window.jspdf;
        this.orientation=obj;
        var doc;
        if(this.format!="custom"){
          if(this.orientation=="Portrait"){
            doc = new jsPDF('p','pt', this.format);
          }else{
            doc = new jsPDF('l','pt', this.format);
          }
          g.setExportProportion("ImageW", doc.internal.pageSize.getWidth()  );
            var h = g.grid.height  * g.grid.exportProportion;
          if(h> doc.internal.pageSize.getHeight()){
            g.setExportProportion("ImageH", doc.internal.pageSize.getHeight()  );
          }
        }
        break;
      case "Format":
        var { jsPDF } = window.jspdf;
        this.format=obj;
        var doc;
        if(this.format!="custom"){
          if(this.orientation=="Portrait"){
            doc = new jsPDF('p','pt', this.format);
          }else{
            doc = new jsPDF('l','pt', this.format);
          }
          g.setExportProportion("ImageW", doc.internal.pageSize.getWidth()  );
            var h = g.grid.height  * g.grid.exportProportion;
          if(h> doc.internal.pageSize.getHeight()){
            g.setExportProportion("ImageH", doc.internal.pageSize.getHeight()  );
          }
        }
        break;
      case "Units":
        this.units=obj;
        break;
    }

    this.unit;
    this.format;
  }
}

class SVGExport extends Export{
  constructor(){super();}
  execute(g){
    var w = g.grid.width   * g.grid.exportProportion;
    var h = g.grid.height  * g.grid.exportProportion;
    var cW= g.grid.cellW   * g.grid.exportProportion;
    var cH= g.grid.cellH   * g.grid.exportProportion;
    var e = createGraphics(w, h, SVG);
    e.id("svgExport");
    this.drawing(e,g, w, h, cW, cH);
    save(e,"Digitile.svg");
    e.remove();
  }
  getType(){
    return "SVG";
  }
  getFormat(){
    return "Image";
  }
}

class GIFExport extends Export{
  constructor(){
    super();
    this.capturer;
    this.maxFrame=300;
  }
  execute(){
    this.capturer.save();
  }
  getType(){
    return "GIF";
  }
  getFormat(){
    return "Video";
  }
  render(g){
    var t=this;

    g.generator.switchRecording(g,t, "start");
  }
  stopRecording(g){
    if(this.capturer!= undefined){
      this.capturer.stop();
      this.stop=true;
      g.notifyObservers("Export+StopRecording",null);
    }

    g.generator.switchRecording(g,this, "stop");

    g.notifyObservers("Export+NoRecord",null);
  }
  setSettings(g, e, obj){
    var t=this;
    switch(e){
      case "StartRecording":

        this.capturer = new CCapture( {
          framerate: 60,
	        verbose: true,
          format: 'gif',
          name: "Digitiles",
          workersPath: 'JS/'
        } );
        this.capturer.start();
        this.stop=false;
        var e=this;
        t.render(g);
        g.notifyObservers("Export+Recording",null);
        break;
      case "StopRecording":
        this.stopRecording(g);
        break;
    }
  }
}

class MP4Export extends Export{
  constructor(){
    super();
    this.capturer;
    this.stop=true;
    this.frame=3000;
  }
  execute(){
    this.capturer.save();
  }
  getType(){
    return "MP4";
  }
  getFormat(){
    return "Video";
  }
  render(g){
    var t=this;

    g.generator.switchRecording(g,t, "start");
    //g.generator.render(g, t);
  }
  stopRecording(g){
    if(this.capturer!= undefined){
      this.capturer.stop();
      this.stop=true;
      g.notifyObservers("Export+StopRecording",null);
    }

    g.generator.switchRecording(g,this, "stop");

    g.notifyObservers("Export+NoRecord",null);
  }
  setSettings(g, e, obj){
    var t=this;
    switch(e){
      case "StartRecording":

        this.capturer = new CCapture( {
          framerate: 20,
          format: 'webm',
          name: "Digitiles"
        } );
        this.capturer.start();
        this.stop=false;
        var e=this;
        t.render(g);
        g.notifyObservers("Export+Recording",null);
        break;
      case "StopRecording":
        this.stopRecording(g);
        break;
    }
  }
}

class MOVExport extends Export{
  constructor(){super();}
  execute(){}
  getType(){
    return "MOV";
  }
  getFormat(){
    return "Video";
  }
}
