class Grid{
  constructor(c){

    if (c===undefined){
        this.columns=60;
    }else{
        this.columns=c;
    }

    this.rows=45;
    this.margin=0;

    //cell size
    this.cellW;
    this.cellH;


    //resolution
    this.width;
    this.height;


    this.imgProportion;
    this.exportProportion=1;

    this.gridSquare=true;
    this.cellSquare=true;
    this.showGrid=true;

    this.blankMode=false;

  }

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

  setColumns(c){
    this.columns=c;

    this.basedOnColumns();
  }
  setRows(c){
    this.rows=c;
    this.basedOnRows();
  }
  setCellW(c){
    this.cellW=c;
    this.basedOnCellW();
  }
  setCellH(c){
    this.cellH=c;
    this.basedOnCellH();
  }
  setCellSquare(){
    //this.cellSquare=!this.cellSquare;
  }
  setExportByW(w){
    this.exportProportion = w / this.width;
  }
  setExportByH(h){
    this.exportProportion =  h / this.height;
  }

  setCopy(grid){
    this.exportProportion =  h / this.height;
  }


  changeResolution(w, h){
    this.width= w;
    this.height=h;
    this.imgProportion= w/h;

    if(this.width< 500){
      this.width = 500;
      this.height = this.width / this.imgProportion;
    }else if(this.height< 500){
      this.height = 500;
      this.width = this.height *this.imgProportion;
    }
    this.basedOnColumns();

  }

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
  basedOnColumns(){
    this.cellW= this.width/ this.columns;
    if(this.cellSquare==true){
      this.rows= int(this.columns * (this.height/this.width)); //this has to update the values in the visual
      this.cellH= this.height/ this.rows;
      //this.cellH= this.cellW;
    }
  }
  basedOnRows(){
      this.cellH= this.height/ this.rows;
    if(this.cellSquare==true){
      this.columns= int(this.rows * (this.width/this.height));
      this.cellW= this.width/ this.columns;
      //this.cellW= this.cellH;
    }
  }
  basedOnCellW(){
    this.columns= int(this.width/ this.cellW);
    if(this.cellSquare==true){
      this.cellH= this.cellW;
      this.rows= int(this.height/ this.cellH);
    }
  }
  basedOnCellH(){
    this.rows= int(this.height/ this.cellH);
    if(this.cellSquare==true){
      this.cellW= this.cellH;
      this.columns= int(this.width/ this.cellW);
    }
  }


  //------------------------------------------------------------------------------
  //------------------------------------------------------------------------------
  //------------------------------------------------------------------------------

  basedOnSquareCell(){
    this.blankMode=false;
    this.columns= int(this.height/ this.cellH);
    this.rows= int(this.width/ this.cellW);
  }



//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

  changeGridSquare(){
    this.gridSquare=!this.gridSquare;
  }
  changeCellSquare(){
    this.cellSquare=!this.cellSquare;
  }
  setShowGrid(){
    this.showGrid=!this.showGrid;
  }

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

  getColumns(){
    return this.columns;
  }
  getRows(){
    return this.rows;
  }
  getCellW(){
    return parseFloat(this.cellW).toFixed(2);
  }
  getCellH(){
    return parseFloat(this.cellH).toFixed(2);
  }
  getWidth(){
    return parseFloat(this.width).toFixed(2);
  }
  getHeight(){
    return parseFloat(this.height).toFixed(2);
  }
}






//------------------------------------------------------------------------------

class GridExtend extends Grid{
  constructor(){
    super();

    this.rows= 40;
    this.columns=60;
    this.cellW=10;
    this.cellH=10;
    this.width=60*10;
    this.height=40*10;
  }

  setColumns(c){
    this.columns =c;
    this.width= c* this.cellW;
  }
  setRows(c){
    this.rows=c;
    this.height= c* this.cellH;
  }
  setCellW(c){
    this.cellW=c;
    this.width= this.columns *c;
  }
  setCellH(c){
    this.cellH=c;
    this.height= this.rows *c;
  }

  changeResolution(w, h){
    //this.width= w;
    //this.height=h;
    this.imgProportion= this.width/ this.height;
  }


}

//------------------------------------------------------------------------------


class LosangGrid extends Grid{
  constructor(){}
}
