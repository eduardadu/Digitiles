
//------------------------------------------------------------------------------ FONT READER TO IMATE


class FontReader{
  constructor(){
    this.fontList ={};
    var fontValues= [
      "Sante",
      //"DC",
      "Truchet-SansSerif",
      "Truchet-Serif",
      "Truchet-Mono",
      "EightBit",
     
    ];
    this.n=[
      "Sante Serif",
      //"Design Comp Small",
      "Truchet Sans Serif",
      "Truchet Serif",
      "Truchet Mono",
      "Eight Bit",
    ];


    this.fontValues= fontValues;
    this.fontNames=[
    ];
    this.textBoxes=[];
    this.lastDeletedId;
    //retirar mais tarde

    this.selected ;
    this.dragged ;
    async function runInOrder(e){
      await e.readFonts();
      //await getNames(e);
    }
    runInOrder(this);
  }
  readFonts(){
    for(var i=0; i< this.fontValues.length; i++){
      this.fontList[this.fontValues[i]] = new Font("assets/myfonts/" + this.fontValues[i] + ".txt");
    }
  }

  getFontList(){
    return this.fontList;
  }

  execute(matrix, e){

    var breakLine=true;
    var string= e.string;

    var font= e.font;
    var posX = e.x;
    var posY = e.y;

    var size= e.size;
    var stroke = e.stroke;
    var kerning = e.kerning;
    var lineHeight = e.lineHeight;
    var breakLine = e.breakLine;

    var f= this.fontList[font];
    var h= size * f.height ;
    var posw= 0;

    for(var i=0; i<string.length; i++){            //percorrer os caracteres da string
      var c=string.charAt(i);
      if(c == " "){c ='" "'}

      var aux = f.retrieveChar(c);
      for(var y=0; y< aux.length; y++){            //matriz da letra para os dois eixos
        for(var x=0; x< aux[y].length; x++){

          for(var a= 0; a< size; a++){             //tamanho das letras para os dois eixos
            for(var b= 0; b< size; b++){
              var sAddX=(size *x) + a;             // match the right size in X
              var sAddY=(size *y) + b;             // match the right size in Y
              if((posX + (posw)  + sAddX) < matrix.length && (posY  + sAddY) < matrix[y].length    &&  (posX + (posw)  + sAddX) >=0   &&    (posY  + sAddY) >0    ){
                matrix[ posX + (posw)  + sAddX][ posY  +  sAddY] = max( matrix[ posX + (posw) + sAddX][ posY  + sAddY ] , aux[y][x]); // w e y switches since to match the other array
              }else if((posY  + sAddY) <=0 && breakLine==true ){

              }
            }
          }

        }
      }
      var w= (size * (aux[0].length + kerning)) ; //string.length *
      posw= w+ posw;
    }
    e.width = posw ;
    e.height = h ;
    return matrix;
  }



  executeList(matrix){
    for(var i=0; i < this.textBoxes.length ; i++){
      var e= this.textBoxes[i];
      matrix = this.execute(matrix, e);
    }
    return matrix;
  }



  drawLimitBox(cellW, cellH, zoom){  //do a svg one
    if(this.selected!=null){
      var c=  '#52BEEC';
      var sel= this.selected;
      strokeWeight(3);
      noFill();
      stroke(c);
      rectMode(CORNER);
      var posX = sel.x *cellW*zoom - (cellW*zoom/2);
      var posY= sel.y*cellH*zoom - (cellH*zoom/2);
      rect(posX, posY , parseFloat((sel.width * cellW ))*zoom, parseFloat((sel.height * cellH ))*zoom);
      noStroke();
      fill(c);
      if(sel.align=="center"){
        rect(posX + (sel.width/2*cellW*zoom) -5, posY + (sel.height/2*cellH*zoom ) -5 ,8,8);
      }else if(sel.align=="right"){
        rect(posX + (sel.width*cellW*zoom) -5, posY -5 ,10,10);
      }else{
        rect(posX-5,posY-5,10,10);
      }
    }
  }

  dragBox(ex, ey){
    this.selected.setPosX(this.selected.getPosX()+ ex);
    this.selected.setPosY(this.selected.getPosY()+ ey);
  }
  clickBox(ex, ey){
    var ver=false;
    for(var i=0; i< this.textBoxes.length;i++){
      var x= this.textBoxes[i].getPosX();
      var y= this.textBoxes[i].getPosY();
      var w= this.textBoxes[i].getWidth();
      var h= this.textBoxes[i].getHeight();
      if(ex< x+w && ex> x && ey<y+h && ey>y){
        this.selected = this.textBoxes[i];
        ver=true;
      }
      if(ver==false){
        this.selected=null;
      }
    }
  }
  addNewBox(e){
    this.textBoxes.push(e);
  }
  moveDistance(e){
    if(this.selected!=undefined){
      this.selected.setPosX( parseInt(this.selected.getPosX()) + parseInt(e[0]));
      this.selected.setPosY( parseInt(this.selected.getPosY()) + parseInt(e[1]));
    }
  }

  getTextBoxIdDeleted(){
    return this.lastDeletedId;
  }
  hasTextBoxes(){
    if(this.textBoxes.length!=0){
      return true;
    }else{
      return false;
    }
  }
  hasSelected(){
    if(this.selected!=null){
      return true;
    }else{
      return false;
    }
  }
  getSelected(){
    return this.selected;
  }
  getAlign(){
    return this.selected.getAlign();
  }
  handleInput(e, obj){
    switch(e){
      case "Add":
        this.textBoxes.push(obj);
        this.selected = this.textBoxes[this.textBoxes.length -1];
        break;
      case "Delete":
        for(var i=0; i<this.textBoxes.length; i++){
          if(this.textBoxes[i].getId() == obj ){
            this.textBoxes.splice(i,1);
          }
        }

        this.selected = this.textBoxes[this.textBoxes.length -1];
        this.lastDeletedId=obj;
        break;
      case "Select":
        for(var i=0; i<this.textBoxes.length; i++){
          if(this.textBoxes[i].getId() == obj){
              this.selected= this.textBoxes[i];
            break;
          }
        }
        break;

      case "String":
        if(this.selected!=null){
          this.selected.setString(obj);
        }
        break;
      case "PosX":
        if(this.selected!=null){
          this.selected.setPosX(obj);
        }
        break;
      case "PosY":
        if(this.selected!=null){
          this.selected.setPosY(obj);
        }
        break;
      case "Stroke":
        this.selected.setStroke(obj);
        break;
      case "Font":
        if(this.selected!=null){
          this.selected.setFont(obj);
        }
        break;
      case "Size":
        if(this.selected!=null){
          this.selected.setSize(obj);
        }
        break;
      case "Kerning":
        if(this.selected!=null){
          this.selected.setKerning(obj);
        }
        break;

      case "Align":
        this.selected.setAlign(obj);
        break;

      case "Get":
        switch(obj){
          case "PosX":
            return this.selected.getPosX();
            break;
          case "PosY":
            return this.selected.getPosY();
            break;
          case "Stroke":
            return this.selected.getStroke();
            break;
          case "Size":
            return this.selected.getSize();
            break;
          case "Kerning":
            return this.selected.getKerning();
            break;
          case "LineHeight":
            return this.selected.getLineHeight();
            break;
          case "Font":
            return this.selected.getFont();
            break;

        }
      break;
    }
  }
}


class Font{
  constructor(file){
    this.val =1;
    async function runInOrder(e){
      await e.readTextFile(file, e.interpret);
      }
      //await e.interpret();

    runInOrder(this);
    sigh(this);
    function sigh(t){
      t.name;
      t.width;
      t.height;
      t.maxStroke;
      t.str;
      t.file=file;
      t.dict={};
    }

  }


  readTextFile(file, c){
    var t= this;
    //this.str= $.ajax({type: "GET", url: file, async: false}).responseText;
    fetch(file, t)
      .then(response => response.text())
      .then((data) => {
        t.str=data;
        c(t);

      })
  }

    interpret(e){
      var str= e.str;

      var a= str.indexOf("Nam: ");
      var b= str.indexOf(';', a);
      e.name = str.substring(a +5,b);

      a= str.indexOf("Wid: ");
      b= str.indexOf(';', a);
      e.width = parseInt(str.substring(a +5,b));

      a= str.indexOf("Hei: ");
      b= str.indexOf(';', a);
      e.height = parseInt(str.substring(a +5,b));

    ///str = str.replace(/(\r\n|\n|\r)/gm, "");
      var lc=0; //last character index
      var c=[];

      while(lc != -1 ){
        if(str.indexOf('$/', lc) != -1){
          var lcn= str.indexOf('$/', lc) + 2;
          lc= str.indexOf('$/', lc) + 5;


          var w = lc;                       //start of line
          var n = str.indexOf('\n', w) -1 ;   //end of line

          w = n -w;                         //width

          var lc2= lc;
          var matrix= new Array(e.height);

          for(var i=0; i < matrix.length; i++){
            matrix[i] = new Array(w);

            for(var j=0 ; j< matrix[i].length +2; j++){
              if( j== matrix[i].length || j== matrix[i].length +1 ){

              }else{
                matrix[i][j] = str.charAt(lc +(i * (matrix[i].length+2) + j));
                if(str.charAt(lc +(i * (matrix[i].length+2) + j)) == "-"){
                  matrix[i][j] = 0;
                }else if( str.charAt(lc +(i * (matrix[i].length+2) + j)) == "0"){
                  matrix[i][j] = e.val;
                }else{
                  matrix[i][j] = 5;
                }
              }

            }
          }


          e.dict[str.charAt(lcn)] = matrix;
        }else{
          lc=-1;
        }
      }

    }

  retrieveChar(char){
    var matrix;

    if(this.dict[char]==null || this.dict[char]===undefined){
      matrix = this.dict[" "];

    }else{
      matrix = this.dict[char];
    }

    return matrix;
  }


  getName(){
    return str(this.name);
  }
  getFileName(){
    return str(this.file);
  }
}
