class Generator extends Observable{

    constructor(c){
      super();

      if (c===undefined){
        this.c=undefined;
        this.grid= new Grid();
      }else{

        this.grid= new Grid(c);
        this.c=c;
      }

        //input being used
        this.input = new Input(this);

        this.paused=false;
        //color
        this.tileManager= new TileManager();

        this.backgroundC ='#ffffff';    //fix this
        this.tileC ='#000000';
        this.notMix=false;                                                      // ALERT correct to receive initial state
        this.maxSize = 1;
        this.minSize = 0;
        this.maxValue = 1;

        //cell and values
        this.cellList= [];
        this.matrix=[];
        this.invert=false;                                                       //correct to receive initial state

        //rotation
        this.rotation=false;
        this.rotationShade=true;
        this.rotationSequence=false;
        this.rotationRandom=false;
        this.angR=[];

        //engine
        this.genM= new GeneratorMotion();
        this.genS= new GeneratorStill();
        this.generator= this.genS;
        this.matrixbuilder= new MatrixStill();

        //zooming
        this.zoom=1;
        this.zoomMax = 3000;
        this.zoomMin = 100;

        //filters
        this.filter= new FilterProcess();

        //MODS
        this.modsDyn=[];
        this.mods=[];
        this.setMod();
        this.fontreader= new FontReader();
        this.drawer = new Drawer();
        this.textBoxes=[];
        this.tab="Import";

        //exports
        this.export= new PNGExport();

        this.blankMode=false;
    }

    //--------------------------------------------------------------------------DRAWING
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------

    generate(){
      if(this.input.hasInput()){
        this.matrixbuilder.checkForMatrixGen( this.input.getContentResize(this.grid.columns, this.grid.rows, this.filter) , this.matrix);
        this.generator.execute(this);
      }
    }


    setTab(e){
      this.tab=e;
    }

    reset(){
      this.tileManager= new TileManager();
      this.fontreader= new FontReader();
      this.drawer = new Drawer();
      this.filter= new FilterProcess();
      this.mods=[];
      this.setMod();
      this.notifyObservers("Reset");
    }
    resetTiles(){
      this.tileManager= new TileManager();
      this.maxSize=1;
      this.maxValue=1;
      this.setTileUpdate();
      this.notifyObservers("ResetTiles");
    }
    randomizeTiles(){
      this.tileManager.randomize();
      this.setTileUpdate();
      this.notifyObservers("ResetTiles");
    }
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

    getBrightnessMatrix(image) {

      let output = [];
      output = this.matrixbuilder.getBrightnessMatrix(image, this.invert);
      return output;
    }
    getBrightnessValue(pixelNumber, image) {
      var output= this.matrixbuilder.getBrightnessValue(pixelNumber,image, this.invert);
      return output;
    }
    setMatrix(){
      this.matrix= this.getBrightnessMatrix( this.input.getContentResize(this.grid.columns, this.grid.rows, this.filter), this.invert);
    }
    setGenMode(){
      if(this.input.getType()=="Video" || this.input.getType()=="Camera"){
        this.matrixbuilder = new MatrixMotion();
        this.generator = this.genM;
        this.notifyObservers("Play");
      }else{
        this.matrixbuilder = new MatrixStill();
        this.generator = new GeneratorStill();
      }
    }

    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------

      produceCellList(){                                                          // ALERT optimizar!
        this.cellList = [];
        for(var h=0; h< this.grid.rows; h++){
            for(var w=0; w< this.grid.columns; w++){
              let aux= new Cell( (w * this.grid.cellW) + (this.grid.cellW/2) ,  (h* this.grid.cellH)+ (this.grid.cellH/2) , 0, 0.8, this.tileManager.getTile());
              this.cellList.push(aux);
            }
          }
        if(this.input.hasInput()){
          if(this.tileManager.getTileLength() != 1){
            this.changeCellTilesGroup();
          }else{
            this.changeCellTilesInd();
          }
        }

      }
      changeCellTilesInd(){
        for(var h=0; h< this.grid.rows; h++){
          for(var w=0; w< this.grid.columns; w++){

              this.cellList[w + (h*(this.grid.columns))].setTile(this.tileManager.getTile());
          }
        }
        //
      }
      changeCellTilesGroup(){
        for(var h=0; h< this.grid.rows; h++){
          for(var w=0; w< this.grid.columns; w++){
              this.cellList[w + (h*(this.grid.columns))].setTile(this.tileManager.getTileFromGroup());
          }
        }
        //
      }
    //------------------------------------------------------------------------------ CLICKs/ MOVES
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------

    getClickedTile(posX, posY){
      var pos=[];
      var cellW = this.grid.getCellW() * this.zoom;
      var cellH = this.grid.getCellH()* this.zoom;

      var x = parseInt(posX/cellW);
      var y = parseInt(posY/cellH);
      pos.push(x);
      pos.push(y);

      return pos;
    }
    getMovedDistanceTile(ogposX, ogposY, posX, posY){
      var cellW = this.grid.getCellW() * this.zoom;
      var cellH = this.grid.getCellH()* this.zoom;
      var ox = parseInt(ogposX/cellW);
      var oy = parseInt(ogposY/cellH);
        var pos=[];
      var x = parseInt(posX/cellW);
      var y = parseInt(posY/cellH);
      pos.push(x - ox);
      pos.push(y - oy);
      return pos;
    }

    //------------------------------------------------------------------------------ MODS
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------

    setMod(){ //---------------------------calculate mod to fit the current grid
      for(var i=0 ; i < this.grid.columns ; i++){
        if(this.mods[i] == undefined || this.mods[i]== null){
          this.mods.push(new Array(this.grid.rows));
          for(var j=0; j<this.grid.rows ; j++){
            this.mods[i][j] = 0;
          }
        }
        for(var j=0 ; j < this.grid.rows ; j++){
          if(this.mods[i][j] == undefined || this.mods[i][j]== null){
              this.mods[i][j] = 0;
          }
        }
      }
    }

    //------------------------------------------------------------------------------ TEXT BOXES
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------

    getFontMatrix(){//-----------------------set the matrix with the font update
      var fr = this.fontreader;
      var matrix = this.mods;
      this.modsDyn=[];
      this.modsDyn= JSON.parse(JSON.stringify(this.mods));
      this.modsDyn= fr.executeList(this.modsDyn);
    }

    getFontList() {
      return this.fontreader.getFontList();
    }
    updateTextBox(e, obj) {
      this.fontreader.handleInput(e,obj);
      this.notifyObservers("Text");
    }
    addTextBox(){
      var e = new TextBox();
      this.fontreader.addNewBox();
    }
    deleteTextBox(e, obj) {
      this.fontreader.handleInput(e,obj);
      this.notifyObservers("TextDelete");
    }
    selectManualBox(e){
      var clicked = this.getClickedTile(e[0], e[1]);
      this.fontreader.clickBox(clicked[0], clicked[1]);
      this.notifyObservers("Text");
    }
    moveManualBox(e){ //array with two positions
      var moved = this.getMovedDistanceTile(e[0], e[1], e[2], e[3]);
      this.fontreader.moveDistance(moved);
      this.notifyObservers("Text");
    }
    hasTextBoxes(){
      return this.fontreader.hasTextBoxes();
    }
    hasSelected(){
      return this.fontreader.hasSelected();
    }
    getTextBox(e){
      var x = this.fontreader.handleInput("Get", e);
      return x;
    }

    getTextBoxIdDeleted() {
      var i= this.fontreader.getTextBoxIdDeleted();
      return i;
    }

    getSelected(){
      return this.fontreader.getSelected();
    }
    getAlign(){
      return this.fontreader.getAlign();
    }



    //------------------------------------------------------------------------------ DRAWING
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------

    setDrawInits(bS, bH, eS, eH){
      this.drawer.init(bS, bH, eS, eH);
    }
    checkLastTileDrawn(pX, pY){
      var tile= this.getClickedTile(pX, pY);
      var f = this.drawer.checkLastTileDrawn(tile);
      return f;
    }
    setBrushSettings(e, obj){
      this.drawer.handleInput(e, obj);
    }
    setDraw(pX, pY){
      var tile= this.getClickedTile(pX, pY);      //pos x= [0] y= [1]
      this.drawer.execute(this.mods,tile[0], tile[1]);

    }
    setBrush(e){
      this.drawer.handleInput(e, null);
      this.notifyObservers("Draw");
    }
    setEraseDraw(){
      this.drawer.eraseDraw(this.mods);
      this.updateMod();
    }
    setDrawSwitch(e){
      this.drawer.handleInput("Switch", e);
    }
    getBrush(){
      return this.drawer.getBrush();
    }
    getDrawSwitch(){
      return this.drawer.getDrawSwitch();
    }

    updateMod(){
      this.setMod();
      this.getFontMatrix();
    }

//------------------------------------------------------------------------------ SET INPUT, GRIDS, PROPORTION
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


    setInput(e, obj){
      this.input.handleInput(e, obj);
    }
    setInputTransformed(){
      this.inputTransf= this.input.getSelectedResize(this.grid.columns, this.grid.rows);
    }

    setShowGrid(){
      this.grid.setShowGrid();
      this.notifyObservers("Grid");
    }
    setColumns(e){
      this.grid.setColumns(e);
      this.notifyObservers("Grid");
    }
    setRows(e){
       this.grid.setRows(e);
      this.notifyObservers("Grid");
    }
    setContentResize(){
      //this.input.setContentResize(this.grid.columns, this.grid.rows);
      this.input.setContentResize(this.grid.columns, this.grid.rows, this.filter);

    }
    setExportProportion(e, a){
      if(true){
        if(e=="ImageW"){
          this.grid.setExportByW(a);
          this.notifyObservers("Export");
        }else{
          this.grid.setExportByH(a);
          this.notifyObservers("Export");
        }
      }
    }
    setExportSettings(e, obj){
      this.export.setSettings(this, e , obj);
      this.notifyObservers("Export");
    }

//------------------------------------------------------------------------------ SETS TILES
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

    setTile(e){
      this.tileManager.setTile(e);
      this.setTileUpdate();
      this.notifyObservers("Tiles");
    }
    setTileUpdate(){
      if(this.tileManager.getTileLength()==1){
        this.changeCellTilesInd();
      }else{
        this.changeCellTilesGroup();
      }
    }
    getTileGroup(){
      return this.tileManager.getTileGroup();
    }
    setBackgroundC(e){
      this.tileManager.setBackColor(e);
    };
    setTileC(e){
      this.tileManager.setTileColor(e);
    };
    setMaxSize(e){
      this.maxSize= e/100;
    }
    setMaxValue(e){
      this.maxValue= e;
    }
    setMinSize(e){
      this.minSize= e/100;
    }
    setInvert(){
      this.invert= !this.invert;
      this.matrixbuilder.checkForMatrixGen( this.input.getContentResize(this.grid.columns, this.grid.rows, this.filter) , this.matrix);
    }
    setMix(){
      this.tileManager.setMix();
      if(this.tileManager.getTileLength()==1){
        if(this.cellList[0] !=undefined && this.cellList[0]!= null){
          this.changeCellTilesInd();
        }
      }
      this.notifyObservers("Tiles");
    }
    //------------------------------------------------------------------------------ ROTATIONS
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
      switchRotation(e){
        this.rotation=e;
      }
      switchRotationShade(){
        this.rotationShade=true;
        this.rotationSequence=false;
        this.rotationRandom=false;
      }
      switchRotationSequence(){
        this.rotationSequence=true;
        this.rotationRandom=false;
        this.rotationShade=false;
      }
      switchRotationRandom(){
        this.rotationRandom=true;
        this.rotationSequence=false;
        this.rotationShade=false;
      }

    //------------------------------------------------------------------------------ ZOOMS AND FULLSCREENS
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    setZoom(e){
      var z= e/100;
      this.zoom=z;
      this.setResize();
    }
    setZoomOut(){
      if(this.grid.width * (this.zoom  + this.zoom*0.08)> this.zoomMin || this.grid.height *(this.zoom -0.05) > this.zoomMin){
        this.zoom= this.zoom - this.zoom*0.08;
      }
      this.setResize();
    }
    setZoomIn(){
      if(this.grid.width * (this.zoom  + this.zoom*0.08)< this.zoomMax || this.grid.height *(this.zoom +0.05) < this.zoomMax){
        this.zoom= this.zoom  + this.zoom*0.08;
      }
      this.setResize();
    }
    setFitScreenMargin(e){

      if(this.grid.width < this.grid.height){
        this.zoom= (e[1] - e[1]/4)/this.grid.height;
      }else{
        this.zoom = (e[0] - e[0]/4)/this.grid.width;
      }
      this.setResize();
    }
    setFitScreen(e){
      if(this.grid.width > this.grid.height){
        if(e[1] < e[0]){
          this.zoom= e[1]/this.grid.height;
        }else{
          this.zoom = e[0]/this.grid.width;
        }

      }else{
        if(true){
          this.zoom= e[1]/this.grid.height;
        }
      }
      this.setResize();
    }
    setResize(){
      resizeCanvas(this.grid.width * this.zoom, this.grid.height* this.zoom);
    };


    //------------------------------------------------------------------------------ FILTERS
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    setBrightness(e){
      this.filter.set("Brightness", e);
      this.notifyObservers("Filters");
    }
    setContrast(e){
      this.filter.set("Contrast", e);
      this.notifyObservers("Filters");
    }
    setBluriness(e){
      this.filter.set("Bluriness", e);
      this.notifyObservers("Filters");
    }
    setBlur(e){
      this.filter.set("Blur", e);
      this.notifyObservers("Filters");
    }
    setNoise(e){
      this.filter.set("Noise", e);
      this.notifyObservers("Filters");
    }
    setFilterReset(){
      this.filter.setFilterReset();
      this.notifyObservers("FilterReset");
    }


//------------------------------------------------------------------------------ GETS GRID
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

    getColumns(){
      return this.grid.getColumns();
    }
    getRows(){
      return this.grid.getRows();
    }
    getCellW(){
      return this.grid.getCellW();
    }
    getCellH(){
      return this.grid.getCellH();
    }
    getWidth(){
      return this.grid.getWidth();
    }
    getHeight(){
      return this.grid.getHeight();
    }
    getAllInputCopy(){
      return this.input;
    }
    getTileCol(){
      return this.tileManager.getTileColor();
    }
    getBackgroundCol(){
      return this.tileManager.getBackColor();
    }
    setExport(e){
      switch(e){
        case "PNG":
          this.export= new PNGExport();
          break;
        case "PDF":
          this.export= new PDFExport();
          break;
        case "SVG":
          this.export= new SVGExport();
          break;
        case "MP4":
          this.export= new MP4Export();
          break;
        case "GIF":
          this.export= new GIFExport();
          break;
        case "MOV":
          this.export= new MOVExport();
          break;
      }

      this.notifyObservers("Export");
    }

    getExport(){
      var e= this.export.execute(this);
    }
    getExportType(){ return this.export.getType()}
    getExportFormat(){ return this.export.getFormat()}
    getExportW(){ return ( parseInt(this.grid.width * this.grid.exportProportion));}
    getExportH(){ return (parseInt(this.grid.height* this.grid.exportProportion));}

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
    handleInput(e, obj){ //only for itself
      switch(e){
        case "EndUpload":

          function gridchanges(e){

            if(e.input.getType()!="Blank"){
              e.blankMode=false;
              e.grid= new Grid(e.c);
            }else{
              e.blankMode=true;
              e.grid= new GridExtend(e.c);
            }
            e.grid.changeResolution(e.input.getWidth(), e.input.getHeight());    //mudar a proporçao de colunas e rows based on image proportion
            e.cellList = [];             //limpamos as cells
            //e.notifyObservers("");   //atualizamos a grelha


            if(true){ //document.title=="Digitiles"
              e.notifyObservers("Grid");
            }else{
              e.produceCellList();
              e.updateMod();
              e.setContentResize();
              e.setMatrix();
            }

            e.produceCellList();         //limpar e trocar numero de celulas existentes
                         //fazer a mesma coisa com os mods
            resizeCanvas(e.grid.width , e.grid.height);
            e.setContentResize();
            e.setGenMode();
            e.setMatrix();
            e.updateMod();
            e.generate();
          }

          function help(e){
            if(String(document.title) == "Digitiles"){
              e.notifyObservers("EndUpload");
            }
          };


          async function runInOrder(e){
            await gridchanges(e);
            await help(e);
          }
          runInOrder(this);
          break;
    }
  }

}
