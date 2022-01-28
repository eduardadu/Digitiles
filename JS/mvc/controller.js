class Controller extends Observer{

  constructor(view){
    super();
    this.view= view;
    this.generator= this.view.getGenerator();

    this.generator.addObserver(this);
    //this.model.addObserver(this);
  }



  handleInput(e, obj){

    var message= e.split("+");

    switch(message[0]){

//------------------------------------------------------------------------------UPLOADS
      case "Input":

        switch(message[1]){

          case "Upload":
            this.view.startLoading();
            async function runInOrder(e){
              await e.generator.setInput(message[1], obj);
            }
            runInOrder(this);

            //this.generator.setInput(message[1], obj); //this is super unecessary
            break;
          case "Webcam":
            this.generator.setInput(message[1],obj)
            break;
          case "Blank":
            this.generator.setInput(message[1],obj)
            break;
          case "LocalImage":

            this.generator.setInput(message[1],obj);
            break;
          case "LocalVideo":
            this.generator.setInput(message[1],obj);
            break;
        }

        break;

//------------------------------------------------------------------------------GRID

      case "Grid":

        switch(message[1]){
          case "Columns":
            this.generator.setColumns(obj);
            this.generator.produceCellList();
            this.generator.updateMod();
            this.generator.setMatrix();
            break;
          case "Rows":
            this.generator.setRows(obj);
            this.generator.produceCellList();
            this.generator.updateMod();
            this.generator.setMatrix();
            break;

          case "ShowGrid":
            this.generator.setShowGrid();
            this.generator.produceCellList();
            break;
        }
      //  if(this.generator.input.getType()== "Blank"){
          this.generator.setResize(); //resize canvas??
        //}
        break;

//------------------------------------------------------------------------------STYLE

      case "Style":
        switch(message[1]){
          case "TileC":
            this.generator.setTileC(obj);
            this.view.changeColorTileList(obj);
            break;
          case "BackgroundC":
            this.generator.setBackgroundC(obj);
            this.view.changeColorTileBList(obj);
            break;
          case "Tile":
            this.generator.setTile(obj);
            break;
          case "MaxSize":
            this.generator.setMaxSize(obj);
            break;
          case "MaxValue":
            this.generator.setMaxValue(obj);
            break;
          /*case "MinSize":
            this.generator.setMinSize(obj);
            break; */
          case "NumShades":
            this.generator.setMinSize(obj);
            break;
          case "Invert":
            this.generator.setInvert();
            break;
          case "Mix":
            this.generator.setMix();
            break;

          case "Rotate":
            this.generator.switchRotation(obj);
            break;
          case "RotateShade":
            this.generator.switchRotationShade();
            break;
          case "RotateRandom":
            this.generator.switchRotationRandom();
            break;
          case "RotateSequence":
            this.generator.switchRotationSequence();
            break;
        }
        break;
//------------------------------------------------------------------------------TEXT
      case "Text":
        switch(message[1]){
          case "Delete":
            this.generator.deleteTextBox(message[1], obj);
            this.generator.updateMod();
            break;
          case "MoveMouseDown":
            this.generator.moveManualBox(obj);
            this.generator.updateMod();
            break;
          case "SelectMouseDown":
            this.generator.selectManualBox(obj);
            break;
          default:
            this.generator.updateTextBox(message[1], obj);
            this.generator.updateMod();
            break;
        }

        break;

//------------------------------------------------------------------------------FILTER
      case "Filter":
        switch(message[1]){
          case "Brightness":
            this.generator.setBrightness(obj);
            break;
          case "Contrast":
            this.generator.setContrast(obj);
            break;
          case "Blurriness":
            this.generator.setBluriness(obj);
            break;
          case "Noise":
            this.generator.setNoise(obj);
            break;
          case "FilterReset":
            this.generator.setFilterReset();
            break;
          }
        break;
//------------------------------------------------------------------------------DRAW

      case "Draw":
        switch(message[1]){
          case "MouseDown":
            this.generator.setDraw(obj[0], obj[1]);
            this.generator.updateMod();
            break;
          case "Switch":
            this.generator.setDrawSwitch(obj);
            break;
          case "Pencil":
            this.generator.setBrush("Pencil");
            break;
          case "Eraser":
            this.generator.setBrush("Eraser");
            break;
          case "EraseDraw":
            this.generator.setEraseDraw();
            this.generator.updateMod();
            break;
          case "BrushSize":
            this.generator.setBrushSettings("BrushSize", obj);
            break;
          case "BrushHard":
            this.generator.setBrushSettings("BrushHard",obj);
            break;
          case "BrushShade":
            this.generator.setBrushSettings("BrushShade",obj);
            break;
        }
        break;

//------------------------------------------------------------------------------ZOOMS
      case "ZoomIn":
        this.generator.setZoomIn();
        break;
      case "ZoomOut":
        this.generator.setZoomOut();
        break;
      case "Zoom":
        this.generator.setZoom(obj);
        break;
      case "FullScreen":
        break;
      case "Fit":
        this.generator.setFitScreen(obj);
        break;
      case "Tab":
        this.generator.setTab(obj);
        break;


//------------------------------------------------------------------------------EXPORTS
      case "Export":
        switch(message[1]){
          case "File":
            this.generator.setExport(obj);
            break;
          case "ImageW":
            this.generator.setExportProportion(message[1], obj);
            break;
          case "ImageH":
            this.generator.setExportProportion(message[1], obj);
            break;
          case "Format":
            this.generator.setExportSettings(message[1], obj);
            break;
          case "Orientation":

            this.generator.setExportSettings(message[1], obj);
            break;
          case "Units":
            this.generator.setExportSettings(message[1], obj);
            break;

          case "Export":

            this.generator.getExport();
            break;
          case "StopRecording":
            this.generator.setExportSettings(message[1], obj);
            break;
          case "StartRecording":
            this.generator.setExportSettings(message[1], obj);
            break;
          }
        break;
//------------------------------------------------------------------------------SETTINGS
        case "Reset":
          switch(message[1]){
              case "All":
                this.generator.reset();
                break;
              case "Tiles":
                this.generator.resetTiles();
                break;
              case "Randomize":
                this.generator.randomizeTiles();
                break;
          }
          break;
        case "Settings":
          switch(message[1]){
            case "Hide":
             this.view.hideMenus();
             break;
          };
          break;
    }
    if(this.generator.input.getType()!="Video" && this.generator.input.getType()!="Camera" && this.generator.input.hasInput()){
      //this.generator.updateMod();
      this.generator.setMatrix();
      this.generator.generate();
    }

  }

  update(e){
    switch(e){
      case "Grid":
        this.generator.produceCellList();
        this.generator.updateMod();
        this.generator.setContentResize();
        this.generator.setMatrix();
        if(this.generator.input.getType()!="Video" || this.generator.input.getType()!="Camera" ){
          this.generator.generate();
        }
        break;
      case "HomeGrid":
        this.generator.produceCellList();
        this.generator.updateMod();
        this.generator.setMatrix();
        if(this.generator.input.getType()!="Video" || this.generator.input.getType()!="Camera" ){
          this.generator.generate();
        }
          break;
      case "Filters":
        this.generator.setContentResize();
        this.generator.setMatrix();
        if(this.generator.input.getType()!="Video" || this.generator.input.getType()!="Camera" ){
          this.generator.generate();
        }

        break;
      case "FilterReset":
        this.generator.setContentResize();
        this.generator.setMatrix();
        if(this.generator.input.getType()!="Video" || this.generator.input.getType()!="Camera" ){
          this.generator.generate();
        }
        break;
      case "Play":
        this.generator.generate();
        break;
      case "EndUpload":
        let g=[];
        g.push(document.querySelector("main").getBoundingClientRect().width);
        g.push(document.querySelector("main").getBoundingClientRect().height);

        this.generator.setFitScreenMargin(g);
        this.view.stopLoading();
        break;
    }
  }
}
