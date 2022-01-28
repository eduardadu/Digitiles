class TextBox{
  constructor(string, font, x, y,  size, stroke, kerning, id){
    this.string= string;
    this.x = x;
    this.y = y;
    this.font= font;
    this.size=size;
    this.stroke=stroke;
    this.id=id;

    this.kerning=kerning;

    this.width=2;
    this.height=2;
    this.lineHeight=1;
    this.align="left";

    this.breakLine=true;
  }


  //----------------------------------------------------------------------------

  setString(string){ this.string=string;}
  setFont(font){ this.font= font; }
  setPosX(x){ this.x = x;}
  setPosY(y){ this.y=y; }
  setSize(s){ this.size=s ; }
  setStroke(s){ this.stroke=s; }
  setKerning(s){ this.kerning=s; }

  setLineHeight(s){ this.lineHeight=s; }
  setBreakLine(s){ this.breakLine=s; }
  setAlign(s){
    this.align=s; }

  //----------------------------------------------------------------------------

  getMatrix(fontreader, matrix){ //overwrites the array

    matrix = fontreader.execute(matrix, this.string, this.font, this.x, this.y, this.size, this.stroke, this.kerning, this.lineHeight, this.breakLine);
    return matrix;
  }

  setWidthHeight(w, h){
    this.width=w;
    this.height=h;
  }

  //----------------------------------------------------------------------------

  getId(){
    return this.id;
  }
  getString(){
    return this.string;
  }
  getPosX(){
    return this.x;
  }
  getPosY(){
    return this.y;
  }
  getSize(){
    return this.size;
  }
  getStroke(){
    return this.stroke;
  }
  getKerning(){
    return this.kerning;
  }
  getFont(){
    return this.font;
  }
  getAlign(){
    return this.align;
  }
  getLineHeight(){
    return parseInt(this.lineHeight);
  }
  getWidth(){
    return this.width;
  }
  getHeight(){
    return this.height;
  }
}
